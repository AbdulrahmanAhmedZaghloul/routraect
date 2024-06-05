import React from "react";
import { ClimbingBoxLoader } from 'react-spinners';

import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export default function Brands() {

    async function getApi() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }

    let { data, isError, isLoading } = useQuery({
        queryKey: ["productQuery"],
        queryFn: getApi,
        staleTime: 20000,
    })

    if (isLoading) {
        return <>
            <div className='flex justify-center items-center'>
                <ClimbingBoxLoader color='black' />
            </div>
        </>
    }

    if (isError) {
        return
    }


    return (<React.Fragment>
                <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Brands</title></Helmet>
                {isLoading ? <div className='flex justify-center items-center'>
                <ClimbingBoxLoader color='black' /></div> :
                <div className='flex flex-wrap mx-auto container py-8'>
                    {data?.data?.data.map((product) => <div key={product._id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                        <div className='product hover:shadow hover:shadow-gray-500 p-4'>
                            <img className='object-contain w-full py-6' src={product?.image} alt={product?.name} />
                            <h3 className='text-[1.1rem] my-2 font-bold tracking-[0.3rem] text-center text-gray-600 py-6'>{product?.name}</h3>
                        </div>
                    </div>
                    )}
                </div>
                }
            </React.Fragment>)
}
