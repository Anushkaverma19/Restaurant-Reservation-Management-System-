import { Link, useNavigate } from "react-router-dom";
import { FaCalendarPlus, FaListAlt, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">


      {/* Header */}

      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Customer Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome {user?.name || "Customer"} 👋
          </p>
        </div>


        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold"
        >
          <FaSignOutAlt />
          Logout
        </button>


      </div>



      {/* Cards */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">


        {/* Create Reservation */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">


          <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center mb-6">

            <FaCalendarPlus size={28}/>

          </div>


          <h2 className="text-2xl font-bold mb-3">
            Reserve a Table
          </h2>


          <p className="text-gray-400 mb-6">
            Book your favorite table by selecting date, time and number of guests.
          </p>


          <Link
            to="/create-reservation"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400"
          >
            Book Now
          </Link>


        </div>




        {/* My Reservations */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">


          <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center mb-6">

            <FaListAlt size={28}/>

          </div>


          <h2 className="text-2xl font-bold mb-3">
            My Reservations
          </h2>


          <p className="text-gray-400 mb-6">
            View your bookings and cancel reservations when needed.
          </p>


          <Link
            to="/my-reservations"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200"
          >
            View Reservations
          </Link>


        </div>


      </div>



      {/* Info */}

      <div className="max-w-6xl mx-auto mt-10 bg-slate-900 border border-slate-700 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          How it works?
        </h2>


        <ul className="text-gray-300 space-y-3">

          <li>
            ✅ Select date and time slot
          </li>

          <li>
            ✅ System automatically finds an available table
          </li>

          <li>
            ✅ Capacity and double booking checks are handled automatically
          </li>

          <li>
            ✅ Manage your reservations anytime
          </li>

        </ul>


      </div>


    </div>
  );
};


export default Dashboard;