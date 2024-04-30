import { setUserToken } from "@/utils/setUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";
import Link from "next/link"

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
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (Password !== confirmPassword) {
      setMessage({
        errorMsg: "Passwords do not match",
        successMsg: "",
      });
      return;
    }
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
          password: Password,
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
    <div>
      <div className="m-2">
        <FiArrowLeft
          onClick={() => router.push("/")}
          size={24}
          className="cursor-pointer"
        />
      </div>
      <br /><br /><br /><br />
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
      <br />
      <div class="space-y-2 text-center flex flex-col items-center justify-center ">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">Welcome to Feta</h1>
          <p class="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400">
            The platform for discovering and ticketing your favorite events.
          </p>
        </div>
      </div>
      <br />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex gap-8">
        <div className="flex flex-col items-center p-4 w-1/3">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
              <circle cx="12" cy="13" r="3"></circle>
            </svg>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4">
            <p>Welcome to Feta
              {username && (
                <div className="mt-2 text-gray-500">
                  Dear, {username}!
                </div>
              )}
            </p>
          </button>
          <p className="text-xs text-gray-500 mt-2"></p>
        </div>
        <div className="flex flex-col justify-between w-2/3 mt-8">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={Password}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 rounded-full bg-green-400 hover:bg-green-300 text-white"
              onClick={handleVerifyEmail}
            >
              Verify
            </button>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Full Name"
              disabled={!email}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Phone Number"
              disabled={!email}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <input
              type="number"
              id="otp"
              name="otp"
              value={otp}
              className="flex h-10 w-full rounded-md border-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="OTP"
              disabled={!email}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-300 text-white"
              onClick={handleSubmit}
              disabled={!email || !otp || !contactNumber || !username || !Password || !confirmPassword}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

