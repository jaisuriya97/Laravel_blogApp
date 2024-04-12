import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../actions/authActions'
import { useNavigate } from "react-router-dom";
function Navbar() {
    const [userAvailable,setuserAvailable] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        if(token){
            setuserAvailable(true);
        }
    },[])
    const handleLogout = ()=>{
        sessionStorage.removeItem('token');
        dispatch(logout);
        navigate('/');
    }
  return (
    <div>
      <nav className="block w-full max-w-screen-xl mt-5 px-6 py-3 mx-auto text-blue-gray-900 bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
        <div className="flex items-center justify-between">
          <a
            className="mr-4 block cursor-pointer py-1.5  font-sans text-xl font-semibold leading-relaxed tracking-normal text-inherit antialiased hover:text-blue-500"
          >
            <Link to='/'>noise</Link>
            
          </a>
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {userAvailable ? (<li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
                <Link to='/allpost' className='flex items-center transition-colors hover:text-blue-500'> post</Link>
              </li>):( <Link to='/allpost' className='flex items-center transition-colors hover:text-blue-500'> post</Link>)}
              
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
                <a href="#" className="flex items-center transition-colors hover:text-blue-500">
                  {userAvailable ? (<p onClick={handleLogout}>Logout</p>):(<Link to='/login'>Login</Link>)}
                </a>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal">
                <a href="#" className="flex items-center transition-colors hover:text-blue-500">
                {userAvailable ? (<Link to='/dashboard'>Dashboard</Link>):(<Link to='/register'>Signup</Link>)}
                </a>
              </li>
            </ul>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
