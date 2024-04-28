import { getAdminToken } from "@/utils/getAdminToken";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateEvent = () => {
  const router = useRouter();
  const admin_id = getAdminToken();

  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    organizer: "",
    datetime: "",
    price: "",
    profile: "",
    cover: "",
    description: "",
  });

  // function to handle the event form submission
  const handleEventFormSubmit = async (e) => {
    e.preventDefault();

    // Format date and time for server request
    const datetemp = new Date(formData.datetime);
    const formattedDate = datetemp.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = datetemp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const date = `${formattedDate}`;
    const time = `${formattedTime}`;

    // Set up request body with form data and admin ID
    const requestBody = {
      name: formData.name,
      venue: formData.venue,
      organizer: formData.organizer,
      date: date,
      time: time,
      description: formData.description,
      category: formData.category,
      price: formData.price,
      profile: formData.profile != "" ? formData.profile : undefined,
      cover: formData.cover != "" ? formData.cover : undefined,
      admin_id: admin_id,
    };

    // Send POST request to server with request body
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      // If request was successful, show success message and redirect to dashboard
      alert("Event Created Successfully");
      router.push("/admin/dashboard");
    } else {
      // If request failed, log error message to console
      console.error(`Failed with status code ${response.status}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex h-full text-left bg-white rounded-lg shadow-lg items-center">
        <div className="p-8 w-full">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Create an Event
          </h1>
          <form
            id="event-form"
            onSubmit={handleEventFormSubmit}
            className="space-y-8"
          >
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                Title:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="adminDropDownInput"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="venue"
                  className="block font-medium text-gray-700"
                >
                  Venue:
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  className="adminDropDownInput"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="organizer"
                  className="block font-medium text-gray-700"
                >
                  Organizer:
                </label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  className="adminDropDownInput"
                  value={formData.organizer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="datetime"
                  className="block font-medium text-gray-700"
                >
                  Date and Time:
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                  className="adminDropDownInput"
                  value={formData.datetime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block font-medium text-gray-700"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  max="10000"
                  className="adminDropDownInput"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="profile"
                  className="block font-medium text-gray-700"
                >
                  Profile Image URL:
                </label>
                <input
                  type="url"
                  id="profile"
                  name="profile"
                  className="adminDropDownInput"
                  value={formData.profile}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="cover"
                  className="block font-medium text-gray-700"
                >
                  Cover Image URL:
                </label>
                <input
                  type="url"
                  id="cover"
                  name="cover"
                  className="adminDropDownInput"
                  value={formData.cover}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block font-medium text-gray-700"
                >
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  className="adminDropDownInput"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="music">Music</option>
                  <option value="sport">Sports</option>
                  <option value="business">Business</option>
                  <option value="social">Social</option>
                  <option value="educational">Educational</option>
                  <option value="cultural">Cultural</option>
                  <option value="community">Community</option>
                  <option value="foodDrink">Food and Drink</option>
                  <option value="technology">Technology</option>
                  <option value="healthWellness">Health and Wellness</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="adminDropDownInput"
                  value={formData.description}
                  rows="2"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-200 transition-all ease-in-out text-white font-bold rounded-lg"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
