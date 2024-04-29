import Dashboard_Filter from "@/components/Dashboard_Filter";
import Popup_Filter from "@/components/Popup_Filter";
import UserNavBar from "@/components/UserNavBar";
import { getUserToken } from "@/utils/getUserToken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { format } from "date-fns";

function UserDashboard() {
    const router = useRouter();
    const picRatio = 0.606;

    const userIdCookie = getUserToken();
    const [pastEvents, setPastEvents] = useState([]);

    const fetchAllEvents = async () => {
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
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        try {
            const data = await response.json();
            const currentDate = new Date();
            const filteredEvents = data.registeredEvents.filter((event) => {
                const eventDate = new Date(event.date);
                return eventDate < currentDate;
            });
            setPastEvents(filteredEvents);
        } catch (error) {
            console.error("Invalid JSON string:", error.message);
        }
    };

    useEffect(() => {
        fetchAllEvents();
    }, []);

    const [popupFilterOpen, setPopupFilterOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        keyword: "",
        category: "",
        dateRange: "",
        price: [10, 3000],
    });

    const handleFilterApply = () => {
        setPopupFilterOpen(false);
    };

    const handleClearFilter = () => {
        setFilterOptions({
            keyword: "",
            category: "",
            dateRange: "",
            price: [10, 3000],
        });
    };

    const handleSortByDate = () => {
        const sortedEvents = [...pastEvents].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
        setPastEvents(sortedEvents);
    };

    return (
        <div className="pt-20 lg:pt-8 overflow-y-hidden bg-[color:var(--primary-color)]">
            <UserNavBar />
            <div className="flex m-auto">
                <div className="flex mx-auto container ">
                    <div className="flex m-auto gap-4 lg:gap-8  overflow-y-hidden w-full h-[calc(88vh)]">
                        {/* Render the regular filter for medium screens and above */}
                        <div className="hidden md:flex flex-col p-4 sticky top-0 w-1/6 md:w-1/4">
                            <Dashboard_Filter
                                filterOptions={filterOptions}
                                setFilterOptions={setFilterOptions}
                                handleFilterApply={handleFilterApply}
                            />
                            <button
                                onClick={handleClearFilter}
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Clear Filter
                            </button>
                        </div>
                        {/* Render the popup filter for small screens */}
                        {popupFilterOpen && (
                            <div className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white rounded-lg p-4 w-5/6">
                                    <Popup_Filter
                                        filterOptions={filterOptions}
                                        setFilterOptions={setFilterOptions}
                                        handleFilterApply={handleFilterApply}
                                        handleClose={() =>
                                            setPopupFilterOpen(false)
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {/* Render the main content of the dashboard */}
                        <div className="flex w-full md:w-3/4 mx-auto justify-between container">
                            <div className="p-4 overflow-y-auto w-full h-[calc(80vh)]">
                                <h2 className="text-lg font-medium mb-4">
                                    Events
                                </h2>
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={handleSortByDate}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Sort by Date
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {pastEvents.length === 0 ? (
                                        <p>No past events</p>
                                    ) : (
                                        pastEvents.map((event) => (
                                            <div className="hover:scale-105 transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3 grayscale opacity-80"
                                                key={event._id} >
                                                <div className="relative h-[25rem]">
                                                    {event.profile && (
                                                        <Image
                                                            fill
                                                            className="object-cover h-full w-full rounded-md"
                                                            src={event.profile}
                                                            alt=""
                                                            sizes="(min-width: 640px) 100vw, 50vw"
                                                            priority
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-row justify-between items-start mt-4">
                                                    <div className="px-2">
                                                        <p className="text-sm text-gray-800 font-bold">
                                                            {event.name.length >
                                                            30
                                                                ? event.name.slice(
                                                                      0,
                                                                      30
                                                                  ) + "..."
                                                                : event.name}
                                                        </p>
                                                        <p className="text-sm text-gray-800">
                                                            {event.venue}
                                                        </p>
                                                        <p className="text-sm text-gray-800">
                                                            {format(
                                                                new Date(
                                                                    event.date
                                                                ),
                                                                "MMMM dd, yyyy"
                                                            )}
                                                        </p>
                                                    </div>
                                                    {/* Star component */}
                                                    <div className="flex flex-col justify-end items-center">
                                                        <span className="w-full flex flex-row items-center">
                                                            <FaUsers />
                                                            <span className="ml-2 text-sm">
                                                                Rating
                                                            </span>
                                                        </span>
                                                        <p className="text-sm text-gray-800 mt-2">
                                                            <strong className="whitespace-nowrap">
                                                                {event.price}  ETB
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Bottom buttons */}
                        <div className="fixed bottom-3 right-3">
                            {/* Button to open the popup filter */}
                            <button
                                onClick={() => setPopupFilterOpen(true)}
                                className="md:hidden flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-blue-500 hover:bg-blue-200 hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                                title="Filter Events"
                            >
                                <RxHamburgerMenu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
