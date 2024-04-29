//payment.jsx

import NavBar from "@/components/UserNavBar";
import { getUserToken } from "@/utils/getUserToken";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const handlePayment = async () => {
  const data = {
    eventData: JSON.stringify(eventData),
    userData: JSON.stringify(userData) 
  }
  await axios.post('http://localhost:5001/api/pay', data)
  }

  return (
    <div className="pt-20 lg:pt-8">
      <NavBar />
      <Head>
        {/* Add Head content here */}
      </Head>
      <br /><br /><br />
      <div className="flex flex-col m-6 justify-center items-center ">
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
