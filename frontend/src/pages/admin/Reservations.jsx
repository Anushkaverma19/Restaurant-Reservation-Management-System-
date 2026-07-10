import { useEffect, useState } from "react";
import API from "../../api/axios";


const Reservations = () => {

  const [reservations,setReservations] = useState([]);



  const fetchReservations = async()=>{

    try{

      const {data}= await API.get(
        "/admin/reservations"
      );

      setReservations(
        data.reservations || []
      );

    }
    catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchReservations();

  },[]);



  const updateStatus = async(id,status)=>{

    try{

      await API.put(
        `/admin/reservations/${id}`,
        {
          status
        }
      );


      fetchReservations();

    }
    catch(error){

      console.log(error);

    }

  };



  const deleteReservation = async(id)=>{

    try{

      await API.delete(
        `/admin/reservations/${id}`
      );


      fetchReservations();

    }
    catch(error){

      console.log(error);

    }

  };



  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">


      <h1 className="text-4xl font-bold mb-8">
        All Reservations
      </h1>



      <div className="grid md:grid-cols-3 gap-6">


      {
        reservations.map((reservation)=>(


          <div

          key={reservation._id}

          className="bg-slate-900 p-6 rounded-2xl border border-slate-700"

          >


          <h2 className="font-bold text-xl">
            Customer
          </h2>

          <p>
            {reservation.user?.name}
          </p>



          <h2 className="font-bold mt-4">
            Date
          </h2>

          <p>
            {
              new Date(
                reservation.reservationDate
              ).toDateString()
            }
          </p>



          <h2 className="font-bold mt-4">
            Time
          </h2>

          <p>
            {reservation.startTime}
            -
            {reservation.endTime}
          </p>



          <h2 className="font-bold mt-4">
            Status
          </h2>

          <p>
            {reservation.status}
          </p>



          <div className="flex gap-3 mt-6">


            <button

            onClick={()=>updateStatus(
              reservation._id,
              "Completed"
            )}

            className="bg-green-500 text-black px-3 py-2 rounded"

            >
              Complete
            </button>



            <button

            onClick={()=>updateStatus(
              reservation._id,
              "Cancelled"
            )}

            className="bg-yellow-500 text-black px-3 py-2 rounded"

            >
              Cancel
            </button>



            <button

            onClick={()=>deleteReservation(
              reservation._id
            )}

            className="bg-red-500 px-3 py-2 rounded"

            >
              Delete
            </button>


          </div>


          </div>


        ))
      }


      </div>


    </div>

  );

};


export default Reservations;