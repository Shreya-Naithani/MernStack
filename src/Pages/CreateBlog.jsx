import React from 'react';
import {useNavigate} from 'react-router-dom';
import toast ,{Toaster} from 'react-hot-toast';
import{useState,useEffect} from 'react';

const CreateBlog = () => {
const Navigate = useNavigate();
  const postData = async (event)=>{
    event.preventDefault();
    const title = event.target.title.value;
    const desciption = event.target.desciption.value;
   const blog ={
    title : title,
    desciption :desciption
   }
   // below code is to send data to backend server

   const response = await fetch('http://localhost:5000/post-blogs',{
    method :"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(blog)
   });
   if(response.status === 200){
    toast.success("Blog posted successfully");
    event.target.title.value="";
    event.target.desciption.value="";
    setTimeout(()=>{
      Navigate("/home");
    },2000)
  
   }
   else{
    toast.error("Something went wrong");
   }
  }
  return (
  <>
  <Toaster position='top-center' reverseOrder={false}/>
  <div className='w-[90vw] lg:w-[60vw] mt-10 mx-auto '>
      <h1 className='text-center font-bold text-2xl'>Create Blogs</h1>
      <form className='flex flex-col gap-3'onSubmit={postData}>
        <label className='font-semibold text-lg' htmlFor="title">Title :</label>
        <input className='px-3 py-2 outline-none border-2 rounded-md border-gray-300' type="text" name="title" placeholder="Enter the blog title"/>
        <label className='font-semibold text-lg' htmlFor="desciption">Description :</label>
        <textarea name="desciption"className='p-3  outline-none border-2 rounded-md border-gray-300' rows={10}/>
        <button type="submit" className='bg-purple-300 hover:bg-purple-500 py-3 rounded-md text-xl text-white font-bold'>Post</button>
      </form>
    </div>
  </> 
  )
}

export default CreateBlog
