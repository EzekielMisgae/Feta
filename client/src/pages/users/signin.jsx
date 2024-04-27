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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userIdCookie) {
      setMessage({
        errorMsg: "",
        successMsg: "Redirecting you...",
      });
      setTimeout(() => router.push("/users/dashboard"), 800);
    }
  }, [userIdCookie, router]);

  const handleVerifyEmail = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setMessage({ errorMsg: "", successMsg: data.msg });
        setStep(2);
      } else {
        throw new Error(data.msg || "Email not registered.");
      }
    } catch (error) {
      setLoading(false);
      setMessage({ errorMsg: error.message, successMsg: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signin/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setUserToken(data.user_id);
        setMessage({ errorMsg: "", successMsg: "Successfully verified." });
        setTimeout(() => router.push("/users/dashboard"), 800);
      } else {
        throw new Error(data.msg || "Verification failed.");
      }
    } catch (error) {
      setLoading(false);
      setMessage({ errorMsg: error.message, successMsg: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
        <FiArrowLeft
          onClick={() => router.back()}
          size={24}
          className="cursor-pointer mb-4"
        />
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h2>
        {message.errorMsg && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
            {message.errorMsg}
          </div>
        )}
        {message.successMsg && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
            {message.successMsg}
          </div>
        )}
        {loading && (
          <div className="text-center text-blue-500">Processing...</div>
        )}
        <form
          onSubmit={step === 1 ? handleVerifyEmail : handleSubmit}
          className="mt-8 space-y-6"
        >
          {step === 1 && (
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <input
                id="otp"
                name="otp"
                type="text"
                autoComplete="off"
                required
                placeholder="Verification code"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading
              ? "Loading..."
              : step === 1
              ? "Send Verification Code"
              : "Verify and Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
