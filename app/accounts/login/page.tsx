import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>

        <p className={styles.linkText}>
          Don't have an account?{' '}
          <Link href="/register" className={styles.link}>
            Register here
          </Link>
        </p>

        <Link href="/" className={styles.backLink}>
          ← Back to SportDesk
        </Link>
      </div>
    </div>
  )
}
