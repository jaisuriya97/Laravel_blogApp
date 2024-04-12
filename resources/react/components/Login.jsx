import React,{useState} from 'react'
import  Axios  from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email,setEmail] = useState('');
    const [password,SetPassword] = useState('');

    const apiClient = Axios.create({
        baseURL: `http://localhost:8000`,
        withCredentials: true,
    });
    
    let config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const handleLogin = (event)=>{
        event.preventDefault();
        apiClient.get('sanctum/csrf-cookie', config).then(response=>{
            console.log(response);
            Axios.post('api/login',{
                email:email,
                pass:password
            }).then(response=>{
                console.log(response);
                sessionStorage.setItem('token', response.data.token);


                const user = {email:email};
                dispatch(loginSuccess(user));

                
                navigate('/dashboard')
            }).catch(error=>{
                console.log(error);
            })
        })
    }
  return (
    <div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="p-5 shadow-md rounded-xl">
            <h2 className="mt-10 m-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            onChange={(e) => SetPassword(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login
