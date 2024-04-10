import { useRouter } from "next/router";

function Header() {
    const router = useRouter();

    return (
        <header className="fixed top-0 w-full z-20 bg-white shadow-md">
            <div className="max-w-0xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    <nav className="flex-grow">
                        <ul className="flex justify-end items-center space-x-4">
                            <li>
                                <a className="btn-sm text-white bg-blue-500 hover:bg-blue-200 w-full mb-4 sm:w-auto sm:mb-0" href="/users/signin">
                                    Signin
                                </a>
                            </li>
                            <li>
                                <a className="btn-sm text-white bg-blue-500 hover:bg-blue-200 w-full mb-4 sm:w-auto sm:mb-0" href="/users/signup">
                                    Signup
                                </a>
                            </li>
                            <li>
                                <a onClick={() => router.push("/admin/auth")} className="btn-sm text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4">
                                    Event Manager
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
