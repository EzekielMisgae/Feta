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
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const router = useRouter();

    useEffect(() => {
        if (userIdCookie) {
            setStep(3);
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

    const handleVerifyEmail = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            setMessage({ errorMsg: "", successMsg: data.msg });
            setStep(2);
        } else {
            setMessage({
                errorMsg: "Email not registered. Redirecting you to Sign Up...",
                successMsg: "",
            });
            setTimeout(() => {
                router.push("/users/signup");
            }, 1700);
        }
    };

    const handleSubmit = async (event) => {
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
                    otp: otp,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            setStep(3);
            setUserToken(data.user_id);
        } else {
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div className="m-2">
            <FiArrowLeft
                onClick={() => router.push("/")}
                size={24}
                className="cursor-pointer"
            />
            <div className="text-center text-3xl font-bold">Sign In</div>
            <div className="max-w-md mx-auto mt-10">
                {message.errorMsg && (
                    <div className="rounded p-3 my-2 bg-red-200 text-red-600 font-medium">
                        {message.errorMsg}
                    </div>
                )}
                {message.successMsg && (
                    <div className="rounded p-3 my-2 bg-green-200 text-green-600 font-medium">
                        {message.successMsg}
                    </div>
                )}
                <div className="bg-white p-5 rounded-lg mt-2">
                    {step === 1 && (
                        <form onSubmit={handleVerifyEmail}>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Enter your Registered Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-full"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Verify
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Enter Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    autoComplete="none"
                                    required
                                    value={otp}
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                    {step === 3 && (
                        <div>
                            <div className="bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between">
                                <div>
                                    <div className="flex items-center">
                                        <p>
                                            <span className="font-bold">
                                                Hey there!{" "}
                                            </span>
                                            Welcome back, you're successfully
                                            signed in!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    router.push("/users/dashboard")
                                }
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Go to your dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
