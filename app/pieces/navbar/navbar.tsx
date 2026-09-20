import "./navbar.css"

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href="/">Home</a>
            <div className="flex-1"></div>
            <a href="/sign-up">Sign Up</a>
            <a href="/login">Log in</a>
        </nav>
    )
}