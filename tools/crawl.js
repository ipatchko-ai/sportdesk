const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'https://dnsjkfn.pythonanywhere.com';
const RECON_DIR = path.join(__dirname, '..', 'recon');

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

const visitedUrls = new Set();
const urlsToVisit = ['/'];
const assets = new Set();
const designTokens = {
  colors: new Set(),
  fonts: new Set(),
  spacing: new Set(),
  borderRadius: new Set(),
  shadows: new Set()
};

async function sanitizeFilename(url) {
  return url
    .replace(BASE_URL, '')
    .replace(/^\//, '')
    .replace(/\//g, '_')
    .replace(/[?&=]/g, '-')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    || 'index';
}

async function extractDesignTokens(page) {
  const tokens = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const colors = new Set();
    const fonts = new Set();
    const spacing = new Set();
    const borderRadius = new Set();
    const shadows = new Set();

    elements.forEach(el => {
      const styles = window.getComputedStyle(el);

      // Colors
      if (styles.color && styles.color !== 'rgba(0, 0, 0, 0)') colors.add(styles.color);
      if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(styles.backgroundColor);
      if (styles.borderColor && styles.borderColor !== 'rgba(0, 0, 0, 0)') colors.add(styles.borderColor);

      // Fonts
      if (styles.fontFamily) fonts.add(styles.fontFamily);

      // Spacing
      if (styles.padding && styles.padding !== '0px') spacing.add(styles.padding);
      if (styles.margin && styles.margin !== '0px') spacing.add(styles.margin);
      if (styles.gap && styles.gap !== 'normal') spacing.add(styles.gap);

      // Border radius
      if (styles.borderRadius && styles.borderRadius !== '0px') borderRadius.add(styles.borderRadius);

      // Shadows
      if (styles.boxShadow && styles.boxShadow !== 'none') shadows.add(styles.boxShadow);
    });

    return {
      colors: Array.from(colors),
      fonts: Array.from(fonts),
      spacing: Array.from(spacing),
      borderRadius: Array.from(borderRadius),
      shadows: Array.from(shadows)
    };
  });

  // Merge tokens
  tokens.colors.forEach(c => designTokens.colors.add(c));
  tokens.fonts.forEach(f => designTokens.fonts.add(f));
  tokens.spacing.forEach(s => designTokens.spacing.add(s));
  tokens.borderRadius.forEach(r => designTokens.borderRadius.add(r));
  tokens.shadows.forEach(s => designTokens.shadows.add(s));
}

async function captureNetworkRequests(page) {
  page.on('response', async (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';

    if (contentType.includes('css') ||
        contentType.includes('javascript') ||
        contentType.includes('font') ||
        contentType.includes('image') ||
        url.match(/\.(css|js|woff|woff2|ttf|jpg|jpeg|png|gif|svg|ico)$/i)) {
      assets.add(url);
    }
  });
}

async function crawlPage(browser, url) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  if (visitedUrls.has(fullUrl)) return;
  visitedUrls.add(fullUrl);

  console.log(`\n📄 Crawling: ${fullUrl}`);

  const page = await browser.newPage();

  try {
    // Capture network requests
    captureNetworkRequests(page);

    // Navigate and wait for page to load
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const filename = await sanitizeFilename(fullUrl);

    // Save HTML
    const html = await page.content();
    await fs.writeFile(
      path.join(RECON_DIR, 'html', `${filename}.html`),
      html,
      'utf-8'
    );
    console.log(`  ✓ HTML saved`);

    // Extract design tokens
    await extractDesignTokens(page);

    // Take screenshots at different viewports
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500);

      await page.screenshot({
        path: path.join(RECON_DIR, 'screenshots', `${filename}_${viewport.name}.png`),
        fullPage: true
      });
      console.log(`  ✓ Screenshot saved (${viewport.name})`);
    }

    // Find all internal links
    const links = await page.evaluate((baseUrl) => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      return anchors
        .map(a => a.href)
        .filter(href => href.startsWith(baseUrl) || href.startsWith('/'))
        .map(href => href.replace(baseUrl, ''));
    }, BASE_URL);

    // Add new links to queue
    links.forEach(link => {
      const cleanLink = link.split('#')[0].split('?')[0];
      if (cleanLink && !visitedUrls.has(`${BASE_URL}${cleanLink}`)) {
        urlsToVisit.push(cleanLink);
      }
    });

    // Try to capture interactive states
    await captureInteractiveStates(page, filename);

  } catch (error) {
    console.error(`  ✗ Error crawling ${fullUrl}:`, error.message);
  } finally {
    await page.close();
  }
}

async function captureInteractiveStates(page, baseFilename) {
  try {
    // Capture filter interactions
    const filters = await page.$$('select, input[type="checkbox"], input[type="radio"]');

    for (let i = 0; i < Math.min(filters.length, 5); i++) {
      try {
        const filter = filters[i];
        const tagName = await filter.evaluate(el => el.tagName.toLowerCase());

        if (tagName === 'select') {
          const options = await filter.$$('option');
          if (options.length > 1) {
            await options[1].click();
            await page.waitForTimeout(1000);

            await page.screenshot({
              path: path.join(RECON_DIR, 'screenshots', `${baseFilename}_filter_${i}.png`),
              fullPage: true
            });
          }
        }
      } catch (e) {
        // Continue if interaction fails
      }
    }

    // Capture forms
    const forms = await page.$$('form');
    if (forms.length > 0) {
      await page.screenshot({
        path: path.join(RECON_DIR, 'screenshots', `${baseFilename}_forms.png`),
        fullPage: true
      });
    }

  } catch (error) {
    // Interactive capture is best-effort
  }
}

async function saveAssets() {
  console.log(`\n💾 Saving asset list (${assets.size} assets)...`);

  const assetList = {
    total: assets.size,
    assets: Array.from(assets).sort(),
    byType: {
      css: Array.from(assets).filter(url => url.match(/\.css/i)),
      js: Array.from(assets).filter(url => url.match(/\.js/i)),
      fonts: Array.from(assets).filter(url => url.match(/\.(woff|woff2|ttf)/i)),
      images: Array.from(assets).filter(url => url.match(/\.(jpg|jpeg|png|gif|svg|ico)/i))
    }
  };

  await fs.writeFile(
    path.join(RECON_DIR, 'assets', 'asset-list.json'),
    JSON.stringify(assetList, null, 2),
    'utf-8'
  );
}

async function saveDesignTokens() {
  console.log('\n🎨 Saving design tokens...');

  const tokens = {
    colors: Array.from(designTokens.colors).sort(),
    fonts: Array.from(designTokens.fonts).sort(),
    spacing: Array.from(designTokens.spacing).sort(),
    borderRadius: Array.from(designTokens.borderRadius).sort(),
    shadows: Array.from(designTokens.shadows).sort()
  };

  await fs.writeFile(
    path.join(RECON_DIR, 'design-tokens.json'),
    JSON.stringify(tokens, null, 2),
    'utf-8'
  );

  console.log(`  ✓ ${tokens.colors.length} colors`);
  console.log(`  ✓ ${tokens.fonts.length} font families`);
  console.log(`  ✓ ${tokens.spacing.length} spacing values`);
  console.log(`  ✓ ${tokens.borderRadius.length} border radius values`);
  console.log(`  ✓ ${tokens.shadows.length} shadow values`);
}

async function main() {
  console.log('🚀 Starting website crawl...\n');
  console.log(`Target: ${BASE_URL}`);
  console.log(`Output: ${RECON_DIR}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    while (urlsToVisit.length > 0) {
      const url = urlsToVisit.shift();
      await crawlPage(browser, url);
    }

    await saveAssets();
    await saveDesignTokens();

    console.log('\n✅ Crawl complete!');
    console.log(`\n📊 Summary:`);
    console.log(`  • Pages crawled: ${visitedUrls.size}`);
    console.log(`  • Assets found: ${assets.size}`);
    console.log(`  • Screenshots: ${visitedUrls.size * viewports.length}`);

  } catch (error) {
    console.error('\n❌ Crawl failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
