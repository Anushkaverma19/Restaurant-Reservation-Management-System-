import { useState } from "react";
import axios from "axios";

const AdminRegister = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  });


  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/register-admin",
        formData
      );

      alert(res.data.message);

    }
    catch(error){
      alert(
        error.response?.data?.message ||
        "Error creating admin"
      );
    }

  };


  return(
    <div>

      <h1>Create Admin Account</h1>


      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />


        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />


        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />


        <button>
          Create Admin
        </button>


      </form>

    </div>
  );
};


export default AdminRegister;