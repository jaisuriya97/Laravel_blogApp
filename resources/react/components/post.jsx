import React, { useState,useEffect   } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
function Post() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const user = useSelector((state) => state.auth.user);
    const [id, Id] = useState("");
    useEffect(() => {
        Axios.get("api/dashboard", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({ user }),
        })
            .then((response) => {
                if (response.data.data.email) {
                    Id(response.data.data.id);
                } else {
                    setEmail("User Not Found");
                }
            })
            .catch((error) => {
                if (error) {
                    if (error.response.status === 401) {
                        alert("Unauthenticated user");
                        navigate("/login");
                    }
                }
            });
    }, []);
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(sessionStorage.getItem("token"));
        // 
        Axios.post('api/post', {
          id: id,
          title: title,
          content: content
      }, {
          withCredentials: true,
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
      }).then((res)=>{
            console.log(res);
            window.location.reload();
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-full mb-4 mt-5 border border-gray-200 rounded-lg ">
                    <div className="px-4 py-2 bg-white rounded-t-lg ">
                        <input
                            placeholder="Title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            type="text"
                            name=""
                            id=""
                            className=" w-1/2 m-5 p-3 text-sm text-gray-900 bg-white border"
                        />
                        <textarea
                            id="comment"
                            rows="4"
                            className="w-1/2 m-5 p-3 text-sm text-gray-900 bg-white border"
                            placeholder="Write a comment..."
                            required
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2  dark:border-gray-600">
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Publish 
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Post;