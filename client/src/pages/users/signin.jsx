// Import setUserToken function from utils
import { setUserToken } from "@/utils/setUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const userId = cookies.get("user_token");
    if (!userId) {
        return {
            props: { userIdCookie: null },
        };
    }
    return {
        props: { userIdCookie: userId },
    };
}

export default function Signin({ userIdCookie }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const router = useRouter();

    useEffect(() => {
        if (userIdCookie) {
            setTimeout(() => {
                setMessage({
                    errorMsg: "",
                    successMsg: "Redirecting you...",
                });
            }, 500);
            setTimeout(() => {
                router.push("/users/dashboard");
            }, 800);
        }
    }, []);

    const handleSignin = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signin/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            setUserToken(data.user_id);
            setTimeout(() => {
                router.push(`/users/dashboard`);
            }, 800); // Pass user_token with the URL
        } else {
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div>
            <FiArrowLeft
                onClick={() => router.push("/")}
                size={24}
                className="m-2"
            />
            {/* Error and success messages */}
            {message.errorMsg && (
                <div className="rounded p-2 my-2 bg-red-200 text-red-600 font-medium text-center">
                    {message.errorMsg}
                </div>
            )}
            {message.successMsg && (
                <div className="rounded p-2 my-2 bg-green-200 text-green-600 font-medium text-center">
                    {message.successMsg}
                </div>
            )}
            <div className="bg-gradient-to-br h-screen overflow-hidden flex items-center justify-center">
                <div className="space-y-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back to Feta</h1>
                        <p className="text-gray-500">Sign in to discover and ticket your favorite events.</p>
                    </div>
                    <br/>
                    <form className="space-y-4" onSubmit={handleSignin}>
                        {/* Email input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    autoComplete="email"
                                    className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                                    id="email"
                                    required
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Password input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                                    id="password"
                                    required
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Sign in button */}
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            type="submit"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
