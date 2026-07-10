import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register =()=>{


const navigate=useNavigate();


const [formData,setFormData]=useState({
name:"",
email:"",
password:""
});


const [message,setMessage]=useState("");



const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
});

};



const handleSubmit=async(e)=>{

e.preventDefault();


try{

const res=await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
formData
);


setMessage(
res.data.message || "Registered Successfully ✓"
);



setTimeout(()=>{
navigate("/login");
},1000);


}
catch(error){

setMessage(
error.response?.data?.message ||
"Registration Failed"
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
Create your restaurant account
</p>



<form onSubmit={handleSubmit}>


<input
type="text"
name="name"
placeholder="Full Name"
value={formData.name}
onChange={handleChange}
className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
required
/>



<input
type="email"
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
Create Account
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


export default Register;