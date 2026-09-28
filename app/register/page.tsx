import Link from 'next/link'
import styles from './register.module.css'

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>

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
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
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

          <div className={styles.field}>
            <label htmlFor="password2" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Register
          </button>
        </form>

        <p className={styles.linkText}>
          Already have an account?{' '}
          <Link href="/accounts/login" className={styles.link}>
            Login here
          </Link>
        </p>

        <Link href="/" className={styles.backLink}>
          ← Back to SportDesk
        </Link>
      </div>
    </div>
  )
}
