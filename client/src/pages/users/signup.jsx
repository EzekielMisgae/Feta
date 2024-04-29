import { setUserToken } from "@/utils/setUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


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
  const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (userIdCookie) {
      setTimeout(() => {
        setMessage({
          errorMsg: "",
          successMsg: "Redirecting you...",
        });
      }, 800);
      setTimeout(() => {
        router.push("/users/dashboard");
      }, 800);
    }
  }, []);

  const handleVerifyEmail = async (event) => {
    event.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({
        errorMsg: "Please enter a valid email address",
        successMsg: "",
      });
      return;
    }
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
      setUserToken(data.user_id);
      setTimeout(() => {
        router.push("/users/dashboard");
      }, 800);
    } else {
      setMessage({ errorMsg: data.msg, successMsg: "" });
    }
  };

  useEffect(() => {
    if (message.errorMsg || message.successMsg) {
      setTimeout(() => {
        setMessage({ errorMsg: "", successMsg: "" });
      }, 3000);
    }
  }, [message]);

    return (
        <div
            className="flex min-h-[100dvh] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2
                        className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?
                        <Link
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            href="#">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form action="#" className="space-y-6" method="POST">
                    <div>
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                autoComplete="name"
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                id="name"
                                name="name"
                                placeholder="Full name"
                                required
                                type="text" />
                        </div>
                    </div>
                    <div>
                        <Label className="sr-only" htmlFor="email">
                            Email address
                        </Label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MailIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                autoComplete="email"
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                required
                                type="email" />
                        </div>
                    </div>
                    <div>
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                autoComplete="new-password"
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                type="password" />
                        </div>
                    </div>
                    <div>
                        <Label className="sr-only" htmlFor="confirm-password">
                            Confirm Password
                        </Label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div
                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                autoComplete="new-password"
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Confirm Password"
                                required
                                type="password" />
                        </div>
                    </div>
                    <div>
                        <Button
                            className="flex w-full justify-center rounded-md border border-gray-200 border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-950 dark:border-gray-800"
                            type="submit">
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </div>

    );

}


function LockIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>)
    );

}


function MailIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>)
    );
}


function UserIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>)
    );
}

