import {useState,useEffect} from 'react';
import toast ,{Toaster} from 'react-hot-toast';
import {AiFillDelete} from 'react-icons/ai';
import {MdOutlineEdit} from 'react-icons/md';



const Home = () => {
  const [posts ,setPosts] = useState([]);
  const[ editPost ,setEditPost] =useState(false);
  const[ selectedPost ,setSelectedPost] =useState("");
  const[title ,setTitle] = useState("");
  const[description ,setDescription]=useState('');
  useEffect(()=>{
    getPosts();
  },[posts])
  const getPosts = async()=>{
const response = await fetch('http://localhost:5000/get-blogs');
const data = await response.json();
setPosts(data.blog);
  }

  const deletePost = async(id)=>{
    console.log(id);
const response = await fetch(`http://localhost:5000/delete-blog/${id}`,{
  method :"DELETE",
});
if(response.status === 200){
toast.success("Post deleted successfully");
}
else{
  toast.error("Something went wrong");
}
}

const updatePost = async(id)=>{
  console.log(title,description,id);
   const response = await fetch(`http://localhost:5000/update-blog/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type" : "application/json",
    },
    body:JSON.stringify({title,description}),
   });
   if(response.status === 200){
    toast.success("Post updated sucessfully")
   }else{
    toast.error("Something went wrong");
  }
}
  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
     <div className='my-10 '>
    {posts.map((posts)=>{
        return(
          <div key={posts._id} className=' w-[80vw] lg:w-[40vw] shadow-md mx-auto rounded-md mb-5 p-3'>
       <div className='flex justify-end text-lg gap-3 m-3 '>
        <AiFillDelete onClick={()=> deletePost(posts._id)} className='text-gray-400 hover:text-red-400 cursor-pointer  hover:scale-110 transition-all' />
        <MdOutlineEdit onClick={()=>{
          setEditPost(!editPost)
          setSelectedPost(posts._id)
        }} 
          className={`${selectedPost === posts._id && editPost ? "text-red-400 scale-110":"text-gray-400"} text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transition-all`}/>
       </div>
       <h2 onInput={(e)=>setTitle(e.target.innerText)} contentEditable={editPost} className=' outline-none focus:bg-gray-200 my-1 text-lg font-bold'>{posts.title}</h2>
       <h3 onInput={(e)=>setDescription(e.target.innerText)} contentEditable={editPost} className=' selection:bg-purple-300 focus:bg-gray-100 outline-none font-semibold text-gray-500'>{posts.desciption}</h3>
       <button onClick={()=>updatePost(posts._id)} className={` ${selectedPost === posts._id && editPost ? "block":"hidden"} bg-purple-400 hover:bg-purple-600 px-3 py-1 my-1 rounded-md font-bold text-white`}>Save</button>
     </div>
        )
      })
    }
    </div>
    </>
   
  );
};

export default Home
