import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { Link } from 'react-router-dom';
// Link
export default function OrderUsers() {
    const [getid, setGetid] = useState()
    async function getId() {
          axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/665786e9c20c3e034447fdea`)
            .then(({ data }) => {
                console.log({ data }.data[0].user._id);
                setGetid(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // console.log(getid?._id);

    useEffect(() => {
        getId()
    }, [])

    return (<React.Fragment>
        <Helmet>
            <link rel="icon" href={iconimage} />
            <title>Check Out</title>
        </Helmet>
        <div className='md:w-2/4 w-3/4 mx-auto my-12 pt-6'>
            <h1 className='text-start my-12 text-gray-300 text-[1.7rem]'>Pay Now :</h1>
            <label className='text-start flex justify-start my-3 text-gray-300 text-[1.3rem] tracking-[0.3] ms-auto' htmlFor="details">details:</label>
            <input id='details' className="flex py-3 rounded-lg px-2 focus:border-green-500 border-green-500 border outline-none flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]" type="text" />

            <label className='text-start flex justify-start my-3 text-gray-300 text-[1.3rem] tracking-[0.3] ms-auto' htmlFor="phone">phone:</label>
            <input id='phone' className="flex py-2 rounded-lg px-2 focus:border-green-500 border-green-500 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem]" type="text" />

            <label className='text-start flex justify-start my-3 text-gray-300 text-[1.3rem] tracking-[0.3] ms-auto' htmlFor="city">Select a city:</label>
            <select id="city" className="flex py-2 rounded-lg px-2 focus:border-green-500 border-green-500 border outline-none  flex-wrap items-center mx-auto w-full placeholder text-[1.1rem] tracking-[0.1rem] form-select ng-pristine ng-valid ng-touched">
                <option value disabled>Select a city</option>
                <option value="New York" className="ng-star-inserted">New York</option>
                <option value="Los Angeles" className="ng-star-inserted">Los Angeles</option>
                <option value="Chicago" className="ng-star-inserted">Chicago</option>
                <option value="Houston" className="ng-star-inserted">Houston</option>
                <option value="Egypt" className="ng-star-inserted">Egypt</option>
            </select>

            <Link to={`/creditCard`}>
                <button className="bg-green-500 flex px-4 py-1 justify-start items-center my-5 rounded-md tracking-[0.1rem] text-white text-[1.1rem]">Pay With<i className="fa-brands ms-2 text-5xl fa-cc-visa"></i></button>
            </Link>


        </div>
    </React.Fragment>
    )
}
