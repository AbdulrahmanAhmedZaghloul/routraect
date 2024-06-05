import React, { useContext } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useFormik } from "formik";
import {  useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
    let { setUserLogin } = useContext(UserContext)
    let navigate = useNavigate("")
    const [api, setApi] = useState('');
    const [lodeing, setLodeing] = useState(false);

    async function handleLogin(values) {
        setLodeing(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .then((apiResponse) => {
                console.log(apiResponse)                
        if (apiResponse?.data?.message === 'success') {
            localStorage.setItem("userToken" , apiResponse?.data?.token)
            setUserLogin(apiResponse?.data?.token)

            navigate('/home');
                setLodeing(false);
                console.log(apiResponse);}
            })
            .catch((apiResponse) => {
                setLodeing(false);
                setApi(apiResponse?.response?.data?.message);
            })
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email("email is invalid").required("email is required"),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "password must start with an uppercase letter and be 6-14 characters long").required("password is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Login</title>
            </Helmet>
            <div className="bg-[#fff] container flex flex-col justify-start items-center py-6 mt-5 pt-11 w-full mx-auto">
                <div className="container">

                    <h2 className="text-[#2C3E50] font-bold text-4xl">Login</h2>
                    <div className="flex justify-center items-center py-5">
                        <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
                        <i className="text-[#2C3E50] fa-solid fa-star"></i>
                        <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
                    </div>
                    <div className="container py-1">

                        <form onSubmit={formik.handleSubmit} className="container relative py-1 mt-1">

                            {api ? <div className="absolute top-[50%] right-0  p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                <span className="font-extrabold mx-2">x</span>{api} <span className="mx-2 font-extrabold">x</span></div> : null}
                            <div className="relative z-0 w-1/2 mx-auto py-7 group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email:
                                </label>
                                {formik.errors.email && formik.touched.email ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.email}</span>
                                    </div>
                                ) : null}
                            </div>

                            <div className="relative z-0 w-1/2 mx-auto py-7 group">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
                                    placeholder=""
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <label
                                    htmlFor="password"
                                    className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Password:
                                </label>
                                {formik.errors.password && formik.touched.password ? (
                                    <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
                                        <span className="font-semibold text-start flex justify-start">{formik.errors.password}</span>
                                    </div>
                                ) : null}
                                <div className="flex  items-center">

                                {lodeing ? <button className="bg-[#1ABC9C] font-normal text-white flex justify-center items-center my-5  px-4">
                                    <i className="fas fa-spinner fa-spin mx-3"></i> <span className="font-bold">Plase wait</span>
                                </button> : <button type="submit" className="bg-[#1ABC9C] font-normal text-white flex justify-end my-5 ">
                                    Login
                                </button>}
                                <p className="mx-5">didnt have account yet ?<span className="font-semibold"> <Link to={'/Register'} className="text-black">Register Now </Link></span> </p>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
