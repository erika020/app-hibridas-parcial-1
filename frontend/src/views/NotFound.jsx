import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <main className="container notfound-wrapper">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-text">Error | Page not found</p>

            <Link to='/' className="notfound-btn">
                Return to home
            </Link>
        </main>
    )
}

export default NotFound