import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
const CreateReservation = () => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    reservationDate: "",
    startTime: "",
    endTime: "",
    guests: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };


  const validateForm = () => {
    if (!formData.reservationDate) {
      return "Please select reservation date";
    }

    if (!formData.startTime || !formData.endTime) {
      return "Please select reservation time";
    }

    if (formData.startTime >= formData.endTime) {
      return "End time must be after start time";
    }

    if (formData.guests < 1) {
      return "Guests must be at least 1";
    }

    return null;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      setMessage(error);
      return;
    }


    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }


    try {
      setLoading(true);
      setMessage("");

    await API.post(
  "/api/reservations",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMessage(
        "Reservation created successfully"
      );


      setTimeout(() => {
        navigate("/my-reservations");
      }, 1200);


    } catch (error) {

      console.error(
        "Reservation Error:",
        error
      );


      setMessage(
        error.response?.data?.message ||
        "Unable to create reservation"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="
        w-full max-w-md
        bg-slate-900
        text-white
        p-8
        rounded-2xl
        shadow-xl
        "
      >

        <h1 className="
        text-3xl 
        font-bold 
        text-center 
        mb-6
        ">
          Create Reservation
        </h1>


        <div className="mb-4">

          <label className="block mb-2">
            Reservation Date
          </label>

          <input
            type="date"
            name="reservationDate"
            min={today}
            value={formData.reservationDate}
            onChange={handleChange}
            required
            className="
            w-full
            p-3
            rounded
            text-black
            "
          />

        </div>



        <div className="mb-4">

          <label className="block mb-2">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="
            w-full
            p-3
            rounded
            text-black
            "
          />

        </div>



        <div className="mb-4">

          <label className="block mb-2">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="
            w-full
            p-3
            rounded
            text-black
            "
          />

        </div>



        <div className="mb-4">

          <label className="block mb-2">
            Number of Guests
          </label>


          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
            className="
            w-full
            p-3
            rounded
            text-black
            "
          />

        </div>



        <button
          disabled={loading}
          type="submit"
          className="
          w-full
          bg-yellow-500
          hover:bg-yellow-400
          disabled:bg-gray-500
          text-black
          font-bold
          py-3
          rounded
          transition
          "
        >

          {
            loading
            ? "Creating..."
            : "Confirm Reservation"
          }

        </button>



        {
          message && (

            <p
              className={`
              text-center
              mt-4
              ${
                message.includes("success")
                ? "text-green-400"
                : "text-red-400"
              }
              `}
            >
              {message}
            </p>

          )
        }


      </form>

    </div>
  );
};


export default CreateReservation;