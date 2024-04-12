import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "./post";
function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [email, setEmail] = useState("");
    const [posts, setPosts] = useState([]); // Initialize posts as an empty array
    useEffect(() => {
        console.log(user);
        Axios.get("api/dashboard", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({ user }),
        })
            .then((response) => {
                console.log(response);
                if (response.data.data.email) {
                    setEmail(response.data.data.email);
                    setPosts(response.data.post);
                    console.log(response.data.post);
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
    const handleDelete = (id) => {
        Axios.delete(`api/post/${id}`,{
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="container mx-auto p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map(
                    (
                        post,
                        index 
                    ) => (
                        <div
                            key={index}
                            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 text-dark"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                {post.title}
                            </h5>
                            <div className="m-5">
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {post.content}
                            </p>
                            </div>
                            <p className="font-normal text-red-700 cursor-pointer" onClick={()=>{handleDelete(post.id)}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </p>
                        </div>
                    )
                )}
            </div>
            <Post />
        </div>
    );
}

export default Dashboard;
