import NavBar from "@/components/UserNavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getUserToken } from "@/utils/getUserToken";

export default function Payment() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
    });
    const [user, setUser] = useState(null); // Define user state

    const event_id = router.query.eventId;
    const userIdCookie = getUserToken();

    const fetchUserData = async () => {
        // If cookie was manually removed from browser
        if (!userIdCookie) {
            console.error("No cookie found! Please signin");
            // redirect to signin
            router.push("/users/signin");
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/details`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_token: userIdCookie,
                }),
            }
        );
        if (!response.ok)
            throw new Error(`${response.status} ${response.statusText}`);
    
        // User Details fetched from API `/user/details`
        try {
            const data = await response.json();
            setUser(data); // Use setUser instead of setUserData
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };    

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/getevent`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            event_id: event_id,
                        }),
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setPrice(data.price);
                } else {
                    throw new Error(
                        `${response.status} ${response.statusText}`
                    );
                }
            } catch (error) {
                console.error("Error fetching event data:", error.message);
            }
        };

        if (event_id) {
            fetchEvent();
        }
    }, [event_id]);

    useEffect(() => {
        if (name && price && event_id) {
            setProduct({
                name: name,
                price: price,
                description: `Pay ${price} ETB for the most awaited event, ${name}`,
            });
        }
    }, [name, price, event_id]);

    const handlePayment = async () => {
        try {
            const userData = await fetchUserData();
            setUser(userData);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        product,
                        token: {
                            email: "example@example.com", 
                            id: "chapa_token_placeholder",
                           
                        },
                        user: userData,
                        event,
                    }),
                }
            );
            const data = await response.json();
            if (data.status === "success") {
                // Redirect to Chapa checkout page
                window.location.href = data.checkout_url;
            } else {
                console.error("Payment initialization failed:", data.message);
            }
        } catch (error) {
            console.error("Error initializing payment:", error);
        }
    };

    return (
        <div className="pt-20 lg:pt-8">
            <NavBar />
            <Head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Puritan&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <br/><br/><br/>
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
