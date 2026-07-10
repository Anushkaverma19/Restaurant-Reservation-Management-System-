import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const [message,setMessage] = useState("");


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
        "http://localhost:5000/api/auth/login",
        formData
      );


      login(res.data.user,res.data.token);

      setMessage("Login Successful ✓");


      setTimeout(()=>{

        if(res.data.user.role==="admin"){
          navigate("/admin");
        }
        else{
          navigate("/dashboard");
        }

      },1000);


    }
    catch(error){

      setMessage(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };



return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">


<div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">


<h1 className="text-4xl font-bold text-white text-center mb-2">
🍽️ DineEase
</h1>

<p className="text-gray-300 text-center mb-8">
Welcome back! Login to reserve your table
</p>



<form onSubmit={handleSubmit}>


<input
type="email"
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
className="w-full mb-5 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
required
/>



<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
className="w-full mb-6 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
required
/>



<button
className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
>
Login
</button>


</form>



{
message &&
<p className="text-center mt-5 text-orange-400">
{message}
</p>
}



</div>

</div>

);

};


export default Login;