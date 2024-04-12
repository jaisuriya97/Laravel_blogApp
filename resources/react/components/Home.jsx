import React from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts";
function Home() {
    return (
        <div>
            <section className="bg-gray-50 ">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Linking Minds
                            <strong className="font-extrabold text-blue-700 sm:block">
                                {" "}
                                Sharing Ideas {" "}
                            </strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                        </p>
                        <Link to='/register'>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                                href="#"
                            >
                                Lets get starts
                            </a>

                        </div>
                        </Link>
                    </div>
                </div>
            </section>
            <div className="conatiner">
                <Posts/>
            </div>
        </div>
    );
}

export default Home;
