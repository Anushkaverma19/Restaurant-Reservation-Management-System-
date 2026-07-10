import { Link } from "react-router-dom";

const AdminDashboard = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>


      <div className="grid md:grid-cols-2 gap-6">


        <Link
          to="/admin/reservations"
          className="bg-slate-900 p-8 rounded-xl border border-slate-700"
        >
          <h2 className="text-2xl font-bold">
            View Reservations
          </h2>

          <p className="mt-2">
            Manage customer bookings
          </p>

        </Link>



        <Link
          to="/admin/tables"
          className="bg-slate-900 p-8 rounded-xl border border-slate-700"
        >

          <h2 className="text-2xl font-bold">
            Manage Tables
          </h2>

          <p className="mt-2">
            View restaurant tables
          </p>

        </Link>


      </div>


    </div>
  );
};


export default AdminDashboard;