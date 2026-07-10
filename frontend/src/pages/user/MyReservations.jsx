import { useEffect, useState } from "react";
import API from "../../api/axios";


const MyReservations = () => {

  const [reservations,setReservations] = useState([]);


  const fetchReservations = async()=>{

    try{

      const {data}=await API.get(
        "/reservations/my"
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



  const cancelReservation = async(id)=>{

    try{

      await API.delete(
        `/reservations/${id}`
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
        My Reservations
      </h1>



      {
        reservations.length === 0 ?


        <div className="bg-slate-900 p-8 rounded-2xl">
          No reservations found
        </div>


        :


        <div className="grid md:grid-cols-3 gap-6">


        {
          reservations.map((reservation)=>(


            <div

              key={reservation._id}

              className="bg-slate-900 p-6 rounded-2xl border border-slate-700"

            >


              <h2 className="text-xl font-bold">
                Date
              </h2>


              <p>
                {
                  new Date(
                    reservation.reservationDate
                  ).toDateString()
                }
              </p>



              <h2 className="text-xl font-bold mt-4">
                Time
              </h2>


              <p>
                {reservation.startTime}
                {" - "}
                {reservation.endTime}
              </p>



              <h2 className="text-xl font-bold mt-4">
                Guests
              </h2>


              <p>
                {reservation.guests}
              </p>



              <h2 className="text-xl font-bold mt-4">
                Table
              </h2>


              <p>
                Table {reservation.table?.tableNumber}
              </p>



              <h2 className="text-xl font-bold mt-4">
                Status
              </h2>


              <p>
                {reservation.status}
              </p>



              {
                reservation.status === "Booked" &&

                <button

                  onClick={()=>cancelReservation(reservation._id)}

                  className="mt-6 bg-red-500 px-5 py-2 rounded-lg font-bold"

                >
                  Cancel Reservation
                </button>

              }


            </div>


          ))
        }


        </div>

      }


    </div>

  );

};


export default MyReservations;