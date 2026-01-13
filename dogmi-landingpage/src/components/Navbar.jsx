import logo from "../assets/logo.svg";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50">
            <div className="m-5">
            <img src={logo} alt="Logo" />
            </div>
        </nav>
    );
}

        