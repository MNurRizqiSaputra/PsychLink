import Logo from "../../../../assets/images/logo3.png";
import { Link } from "react-router-dom";



function Header() {
    const email = localStorage.getItem("email");

    return (
        <header>
            {/* <!--Nav--> */}
            <nav
                aria-label="menu nav"
                className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
            >
                <div className="flex flex-wrap items-center">
                    <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                        <img
                            className="h-8 rounded-full mr-2"
                            src={Logo}
                            alt="Profile"
                        />
                    </div>


                    <div className="flex justify-center md:w-1/3">
                        
                    </div>

                    <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">

                        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li className="flex-1 md:flex-none md:mr-3">
                                <div className="relative inline-block">
                                    <button
                                        className="drop-button text-white py-2 px-2"
                                    >
                                        <span className="pr-2">
                                            <i className="em em-robot_face"></i>
                                        </span>{" "}
                                        Hi, {email}
                                    </button>
                                </div>
                            </li>
                            <button className="border border-rounded border-white mr-2 text-center">
                                <li className="flex-1 md:flex-none md:mr-3">
                                <Link to="/">
                                    <div className="inline-block py-2 px-4 text-white mr-2 text-center">
                                        <i className="fas fa-sign-out-alt mr-3"></i>
                                        Logout
                                    </div>
                                </Link>
                                </li>
                            </button>


                        </ul>
                    </div>
                </div>
            </nav>
            {/* <!--End Nav--> */}
        </header>
    );
}

export default Header;
