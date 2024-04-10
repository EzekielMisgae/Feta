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

export default function Signup({ userIdCookie }) {
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [regNumber, setRegNumber] = useState("");
    const [username, setUsername] = useState("");
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
            `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
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
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            setStep(2);
        } else {
            setMessage({
                errorMsg: data.msg,
                successMsg: "Redirecting you to Sign In...",
            });
            setTimeout(() => {
                router.push("/users/signin");
            }, 1700);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signup/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contactNumber: contactNumber,
                    otp: otp,
                    email: email,
                    username: username,
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
            <div className="text-center text-3xl font-bold">Sign Up</div>
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
                                Enter your email address
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
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-200"
                            >
                                Verify
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Your email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={email}
                                    disabled
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Enter Verification Code
                                </label>
                                <input
                                    type="number"
                                    id="otp"
                                    name="otp"
                                    autoComplete="none"
                                    required
                                    value={otp}
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    autoComplete="none"
                                    required
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Enter Contact Number
                                </label>
                                <input
                                    type="number"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={contactNumber}
                                    autoComplete="none"
                                    required
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                                    onChange={(e) =>
                                        setContactNumber(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-200"
                            >
                                Complete Signup
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
                                                Success :{" "}
                                            </span>
                                            Your account has been created!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    router.push("/users/dashboard")
                                }
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-200"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
