import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateReservation = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    reservationDate:"",
    startTime:"",
    endTime:"",
    guests:""

  });


  const [message,setMessage] = useState("");



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      const token = localStorage.getItem("token");


      const res = await axios.post(

        "http://localhost:5000/api/reservations",

        formData,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      setMessage(
        "Reservation created successfully"
      );


      setTimeout(()=>{

        navigate("/my-reservations");

      },1000);



    }
    catch(error){

      setMessage(

        error.response?.data?.message ||
        "Reservation failed"

      );

    }

  };



  return (

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">


      <form

        onSubmit={handleSubmit}

        className="bg-slate-900 p-8 rounded-2xl w-96"

      >


        <h1 className="text-3xl font-bold mb-6 text-center">

          Create Reservation

        </h1>



        <label>
          Reservation Date
        </label>


        <input

          type="date"

          name="reservationDate"

          value={formData.reservationDate}

          onChange={handleChange}

          className="w-full p-3 my-3 text-black rounded"

          required

        />



        <label>
          Start Time
        </label>


        <input

          type="time"

          name="startTime"

          value={formData.startTime}

          onChange={handleChange}

          className="w-full p-3 my-3 text-black rounded"

          required

        />



        <label>
          End Time
        </label>


        <input

          type="time"

          name="endTime"

          value={formData.endTime}

          onChange={handleChange}

          className="w-full p-3 my-3 text-black rounded"

          required

        />



        <label>
          Number of Guests
        </label>


        <input

          type="number"

          name="guests"

          min="1"

          value={formData.guests}

          onChange={handleChange}

          className="w-full p-3 my-3 text-black rounded"

          required

        />



        <button

          type="submit"

          className="w-full bg-yellow-500 text-black font-bold py-3 rounded mt-4"

        >

          Confirm Reservation

        </button>



        {
          message &&

          <p className="text-center mt-4">

            {message}

          </p>
        }



      </form>


    </div>

  );

};


export default CreateReservation;