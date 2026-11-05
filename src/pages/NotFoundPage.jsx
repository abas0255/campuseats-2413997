import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section>
      <h2 className="section-title">Page not found</h2>

      <p className="muted">
        That page does not exist.{' '}
        <Link to="/">Go to the home page</Link>
      </p>
    </section>
  )
}

export default NotFoundPage