import { useEffect, useState } from "react";
import API from "../../api/axios";


const ManageTables = () => {

  const [tables,setTables] = useState([]);

  const [form,setForm] = useState({
    tableNumber:"",
    capacity:""
  });


  const [editId,setEditId] = useState(null);



  const fetchTables = async()=>{

    try{

      const {data}= await API.get("/tables");

      setTables(data);

    }
    catch(error){
      console.log(error);
    }

  };



  useEffect(()=>{
    fetchTables();
  },[]);



  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      if(editId){

        await API.put(
          `/tables/${editId}`,
          form
        );

      }
      else{

        await API.post(
          "/tables",
          form
        );

      }


      setForm({
        tableNumber:"",
        capacity:""
      });

      setEditId(null);

      fetchTables();


    }
    catch(error){
      console.log(error);
    }

  };




  const deleteTable = async(id)=>{

    try{

      await API.delete(`/tables/${id}`);

      fetchTables();

    }
    catch(error){
      alert(
        error.response?.data?.message
      );
    }

  };




  const toggleStatus = async(id)=>{

    await API.patch(
      `/tables/${id}/status`
    );

    fetchTables();

  };




  const editTable=(table)=>{

    setEditId(table._id);

    setForm({
      tableNumber:table.tableNumber,
      capacity:table.capacity
    });

  };




return (

<div className="min-h-screen bg-slate-950 text-white p-10">


<h1 className="text-4xl font-bold mb-8">
Manage Restaurant Tables
</h1>



{/* ADD FORM */}

<div className="bg-slate-900 p-6 rounded-xl mb-8">

<h2 className="text-xl mb-4">
{editId ? "Edit Table":"Add Table"}
</h2>


<form 
onSubmit={handleSubmit}
className="flex gap-4"
>


<input
className="p-3 bg-slate-800 rounded"
placeholder="Table Number"
value={form.tableNumber}
onChange={(e)=>
setForm({
...form,
tableNumber:e.target.value
})
}
/>



<input
className="p-3 bg-slate-800 rounded"
placeholder="Capacity"
value={form.capacity}
onChange={(e)=>
setForm({
...form,
capacity:e.target.value
})
}
/>


<button className="bg-green-600 px-5 rounded">

{editId ? "Update":"Add"}

</button>


</form>

</div>




<div className="grid md:grid-cols-3 gap-6">


{
tables.map((table)=>(


<div
key={table._id}
className="bg-slate-900 p-6 rounded-2xl border border-slate-700"
>


<h2 className="text-2xl font-bold">
Table {table.tableNumber}
</h2>


<p className="text-gray-400 mt-3">
Capacity: {table.capacity} Guests
</p>


<p className="mt-3">
Status:
{" "}
{table.isActive ? "Active":"Inactive"}
</p>



<div className="flex gap-3 mt-5">


<button
onClick={()=>editTable(table)}
className="bg-blue-600 px-4 py-2 rounded"
>
Edit
</button>



<button
onClick={()=>toggleStatus(table._id)}
className="bg-yellow-600 px-4 py-2 rounded"
>
Toggle
</button>



<button
onClick={()=>deleteTable(table._id)}
className="bg-red-600 px-4 py-2 rounded"
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


export default ManageTables;