import NavBar from "@/components/UserNavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserToken } from "@/utils/getUserToken";
import { payment } from "../../../../../server/controllers/paymentController";
import { getUserData, getEventData } from "../../../../../client/src/components/UserDropdown";

export default function Payment() {
  const router = useRouter();
  const [userData, setUserData] = useState(null); // Define userData state
  const [eventData, setEventData] = useState(null); // Define eventData state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [event_id, setEventId] = useState(router.query.eventId);

  useEffect(() => {
    const fetchUserData = async () => {
      const userIdCookie = getUserToken();
      if (!userIdCookie) {
        console.error("No cookie found! Please sign in");
        router.push("/users/signin");
      }
      try {
        const userData = await getUserData(userIdCookie); // Fetch user data
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventData(event_id); // Fetch event data
        setName(event.name);
        setPrice(event.price);
        setEventData(event);
      } catch (error) {
        console.error("Error fetching event data:", error.message);
      }
    };

    if (event_id) {
      fetchEvent();
    }
  }, [event_id]);

  const handlePayment = async () => {
    try {
      const checkoutUrl = await payment(userData._id, eventData._id, price); // Call the payment function with user and event IDs
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  };

  return (
    <div className="pt-20 lg:pt-8">
      <NavBar />
      <Head>
        {/* Add Head content here */}
      </Head>
      <br /><br /><br />
      <div className="flex flex-col m-6 justify-center items-center ">
        <div className="text-3xl">
          Pay using{" "}
          <span
            className="text-4xl font-bold"
            style={{
              color: "#5F57F7",
              fontFamily: "Puritan",
            }}
          >
            CHAPA
          </span>
        </div>
        <div className="m-6 flex flex-col ">
          <button
            className="flex justify-center w-max bg-green-100 rounded-full p-2"
            onClick={handlePayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
