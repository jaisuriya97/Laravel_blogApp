import React,{useEffect,useState} from 'react'
import Axios  from 'axios'
function Posts() {
    const [Post,SetPost] = useState([]);
    useEffect(()=>{
        Axios.get('api/allpost').then((res)=>{
            console.log(res.data)
            SetPost(res.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
  return (
    <div className='container mx-auto p-5'>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    Post.map((post, index) => (
                        <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 text-dark">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                {post.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {post.content}
                            </p>
                        </div>
                    ))
                }
            </div>
    </div>
  )
}

export default Posts
