# CLONE_SPEC.md — Спецификация клонирования

Дата создания: 2026-09-26  
Оригинал: https://dnsjkfn.pythonanywhere.com/

## 1. Карта сайта

### Основные маршруты:
- `/` — Главная (поиск турниров)
  - Query параметры: `?category=tournament|gathering|campus&country=Any|Чехия|Словакия&age=...&sort_by=...&duration=...&meals=on`
- `/accounts/login/` — Страница входа
- `/register/` — Страница регистрации

### URL-паттерны:
- Все внутренние ссылки начинаются с `/`
- Query-параметры используются для фильтрации
- Форма отправляется методом GET с auto-submit на изменение селектов

## 2. Страницы и компоненты

### 2.1 Главная страница (/)

**Заголовок (header):**
- Текст: "Tournament Search"
- Стиль: font-size 36px, font-weight 800, text-align center
- Кнопки авторизации справа:
  - "Login" (синяя, #0c73fe) → `/accounts/login/`
  - "Register" (оранжевая, #ff6d00) → `/register/`

**Табы категорий:**
- Три таба: "Tournaments" | "Camps" | "Campuses"
- Активный таб: синий фон (#0c73fe), белый текст
- Неактивный: белый фон, серый текст (#333)
- Border-radius: 30px
- onClick меняет hidden input `category` и перезагружает форму

**Верхние фильтры (top-search):**
- **Country**: select с опциями "Any", "Czech Republic" (Чехия), "Slovakia" (Словакия)
- **Child's Age**: select с опциями "All Ages", "8-12 Years", "10-14 Years", "14-18 Years"
- При изменении → auto-submit формы
- Label: uppercase, font-size 11px, font-weight bold, color #555

**Боковая панель (sidebar):**
- Заголовок: "Refine Search" (font-size 16px)
- **Sort by Price**: select
  - "Default"
  - "Price: Low to High" (value: price_asc)
  - "Price: High to Low" (value: price_desc)
- **Duration**: чекбоксы
  - "1 day"
  - "Weekend"
  - "Week"
- **Meals included**: один чекбокс (name="meals")
- Кнопка "Apply" (оранжевая, #ff6d00)

**Сетка карточек (grid):**
- Grid layout: `repeat(auto-fill, minmax(280px, 1fr))`
- Gap: 20px
- Каждая карточка:
  - Белый фон, border-radius 12px
  - Box-shadow: `0 4px 15px rgba(0,0,0,0.05)`
  - Hover: `transform: translateY(-3px)`
  - Promoted карточки: border 2px #ff6d00, фон #fffaf5

**Структура карточки:**
```
.card
  .card-header
    div
      .card-city: "📍 Страна, Город" (синий #0c73fe, uppercase, 12px)
      .card-title: Название (18px, bold, min-height 44px)
    .card-logo: круглая 45×45px (если есть логотип)
  .card-price: "€123" (20px, bold)
  .specs
    Age: "8-12 years"
    Dates: "November"
```

**Модальное окно (при клике на карточку):**
- Overlay: rgba(0,0,0,0.6)
- Контент: max-width 600px, border-radius 16px, padding 30px
- Анимация: slideUp 0.3s ease-out
- Кнопка закрытия (×) справа вверху
- Заголовок с логотипом (60×60px)

### 2.2 Страница входа (/accounts/login/)

**Элементы:**
- Заголовок: "Login"
- Форма с полями:
  - Username
  - Password
- Кнопка "Login"
- Ссылка на регистрацию

### 2.3 Страница регистрации (/register/)

**Элементы:**
- Заголовок: "Register"
- Форма с полями:
  - Username
  - Email
  - Password
  - Confirm Password
- Кнопка "Register"
- Ссылка на вход

## 3. Модель данных

### 3.1 Сущности

**Tournament (Турнир):**
- `id`: integer (PK)
- `name`: string (название, например "Senica Youth Weekend")
- `category`: enum ('tournament' | 'gathering' | 'campus')
- `country`: string ('Чехия' | 'Словакия')
- `city`: string (например "Senica")
- `price`: integer (в евро, например 77)
- `age_group`: string (например "8-12")
- `dates`: string (например "November")
- `duration`: string ('1 day' | 'Weekend' | 'Week')
- `meals_included`: boolean
- `extra`: string nullable (дополнительная активность, например "Stadium Tour", "Hiking")
- `logo_url`: string nullable (URL логотипа)
- `promoted`: boolean (выделенные карточки)
- `created_at`: timestamp
- `updated_at`: timestamp

**User (Пользователь):**
- `id`: integer (PK)
- `username`: string unique
- `email`: string unique
- `password_hash`: string
- `created_at`: timestamp

### 3.2 Связи

- Пока нет связей между таблицами (простая MVP-версия)
- В будущем: бронирования, избранное, комментарии

### 3.3 Справочники

**Countries:**
- "Any" (все)
- "Чехия"
- "Словакия"

**Age Groups:**
- "All Ages"
- "8-12 Years"
- "10-14 Years"
- "14-18 Years"

**Duration:**
- "1 day"
- "Weekend"
- "Week"

**Category:**
- "tournament" (Турниры)
- "gathering" (Лагеря / Camps)
- "campus" (Кэмпусы / Campuses)

### 3.4 Объём данных

Из crawl видно минимум 4 турнира:
1. Senica Youth Weekend (€77, Словакия)
2. Bohemians Prague 1905 (€180, Чехия)
3. Ružomberok Mountain ID (€165, Словакия)
4. Jablonec Northern Stars (€135, Чехия)

## 4. Бизнес-логика

### 4.1 Поиск и фильтрация

**Логика фильтрации:**
```
SELECT * FROM tournaments
WHERE category = :category
  AND (:country = 'Any' OR country = :country)
  AND (:age = 'All Ages' OR age_group = :age)
  AND (:duration IS NULL OR duration IN (:duration))
  AND (:meals IS NULL OR meals_included = true)
ORDER BY
  CASE :sort_by
    WHEN 'price_asc' THEN price ASC
    WHEN 'price_desc' THEN price DESC
    ELSE id DESC
  END
```

**Особенности:**
- Множественный выбор duration (чекбоксы)
- Country и Age — single select
- Auto-submit при изменении верхних селектов
- Кнопка Apply для боковой панели

### 4.2 Сортировка

- Default: по дате добавления (новые первые)
- Price: Low to High — ASC
- Price: High to Low — DESC

### 4.3 Валидация

**Регистрация:**
- Username: обязательно, уникальное
- Email: обязательно, уникальное, валидный формат
- Password: минимум 8 символов (предположительно)
- Confirm Password: совпадение

**Вход:**
- Username: обязательно
- Password: обязательно

## 5. Дизайн-система

### 5.1 Цветовая палитра

**Основные:**
- Primary Blue: `#0c73fe` (кнопки, активные элементы)
- Primary Orange: `#ff6d00` (CTA, промо)
- Dark: `#111111` (текст)
- Gray Text: `#555555`
- Light Gray: `#777777`

**Фоны:**
- Page Background: `#f7f7f7`
- Card Background: `#ffffff`
- Promoted Card: `#fffaf5`

**Границы:**
- Border Light: `#eeeeee`
- Border Medium: `#dddddd`
- Border Default: `#cccccc`

**Прочие:**
- Black: `#000000`
- White: `#ffffff`
- Overlay: `rgba(0, 0, 0, 0.6)`
- Shadow: `rgba(0, 0, 0, 0.05)`

### 5.2 Типографика

**Шрифты:**
- Primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Fallback: `Arial`, `"Times New Roman"`

**Размеры:**
- H1: 36px, font-weight 800
- Card Title: 18px, font-weight bold
- Card Price: 20px, font-weight bold
- Modal Title: 24px, font-weight bold
- Body: 14-16px
- Small: 11-13px

### 5.3 Spacing

**Ключевые значения:**
- Container padding: 40px 20px
- Card padding: 20px
- Section gaps: 30px
- Card gap: 20px
- Button padding: 10px 20px / 12px 25px

### 5.4 Border Radius

- Small: 6px, 8px
- Medium: 12px, 16px
- Large: 30px (табы)
- Circle: 50% (логотипы)

### 5.5 Shadows

- Card: `0 4px 15px rgba(0,0,0,0.05)`

### 5.6 Анимации

- Hover transition: `all 0.2s`
- Card hover: `transform: translateY(-3px)`
- Modal: `slideUp 0.3s ease-out`

## 6. SEO

### 6.1 Meta-теги

**Главная:**
```html
<title>Tournament Search</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Остальные страницы:** аналогично с соответствующими title

### 6.2 Отсутствует

- Meta description
- OG-теги (Open Graph)
- Favicon
- robots.txt
- sitemap.xml

**Рекомендация:** добавить в клоне для улучшения SEO.

## 7. Технические детали

### 7.1 Адаптивность

**Брейкпоинты:**
- Desktop: 1200px+ (main-layout max-width)
- Tablet: 768px
- Mobile: 375px

**Особенности:**
- Grid адаптируется: `auto-fill, minmax(280px, 1fr)`
- Main-layout с `flex-wrap: wrap`
- Sidebar: max-width 250px, на мобиле занимает всю ширину

### 7.2 JavaScript

**Функции:**
- `setCategory(cat)`: меняет hidden input и submit
- `openModal(...)`: открывает модалку с деталями турнира
- Auto-submit на change селектов

**Зависимости:** Нет внешних библиотек (vanilla JS)

### 7.3 Изображения

- Логотипы: Unsplash заглушки `https://images.unsplash.com/photo-1518605368461-1e1e38ce7058?q=80&w=100&auto=format&fit=crop`
- Размеры: 45×45px (карточки), 60×60px (модалка)
- Формат: круглые (border-radius: 50%)

## 8. Список неясностей

### Вопросы для уточнения:

1. ✅ **Авторизация:** Работает ли вход/регистрация на оригинале, или это заглушки?
   - Предположение: работает, так как есть ссылка "Login" в шапке

2. ✅ **Детальные страницы:** Есть ли отдельные URL для турниров, или только модалки?
   - Ответ: только модальные окна по клику

3. ✅ **Бронирование:** Есть ли функция бронирования?
   - Пока не видно в собранных данных

4. ❓ **Админ-панель:** Как добавляются турниры?
   - Нужно проверить исходный код в `./original`, если он есть

5. ✅ **Полный список турниров:** Сколько всего записей в базе?
   - На главной видны 4+ карточки, нужен полный seed

6. ❓ **Языки:** Только английский, или есть мультиязычность?
   - Пока видно только английский интерфейс

7. ❓ **Пагинация:** Есть ли она при большом количестве результатов?
   - Не видно в текущем crawl

8. ✅ **Promoted-логика:** Как определяется, какие турниры выделять?
   - Есть поле `promoted` в карточках

## 9. Следующие шаги

После согласования спецификации:

1. **Фаза 3:** Выбор стека (Python vs Next.js)
2. **Фаза 4:** Миграции БД и seed данных
3. **Фаза 5:** Реализация
4. **Фаза 6-7:** Тестирование (визуальное + функциональное)
5. **Фаза 8:** Деплой на Vercel
6. **Фаза 9:** Сдача

---

**Статус:** Готово к review  
**Ожидание:** Подтверждение от заказчика или переход к Фазе 3
