import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { ClipLoader } from 'react-spinners';
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function RecentProduct() {

    let { addCart } = useContext(create);

    async function addProductCart(productId) {
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your cart.';
                    } else {
                        throw new Error("This didn't work.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    async function getApi() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { data, isError, isLoading } = useQuery({
        queryKey: ["productQuery"],
        queryFn: getApi,
        staleTime: 20000,
    });

    const [loadingImages, setLoadingImages] = useState({});

    const handleImageLoad = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    const handleImageError = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    if (isLoading) {
        return (
            <div className='flex justify-center items-center'>
                <ClimbingBoxLoader color='black' />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex justify-center items-center'>
                <p>Error loading data</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className='flex flex-wrap mx-auto container py-8'>
                {data?.data?.data.map((product) => (
                    <div key={product.id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                        <div className='product overflow-hidden'>
                            <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                {loadingImages[product.id] !== false && (
                                    <div className='flex justify-center items-center h-full bg-slate-100'>
                                        <ClipLoader size={50} color={"gary"} className='bg-slate-100' />
                                    </div>
                                )}
                                <img
                                    className={`relative object-contain w-full ${loadingImages[product.id] === false ? 'block' : 'hidden'}`}
                                    src={product?.imageCover}
                                    alt={product?.title}
                                    onLoad={() => handleImageLoad(product.id)}
                                    onError={() => handleImageError(product.id)}
                                />
                                 {/* <span className='bg-emerald-500 p-2 text-white mx-auto flex justify-center items-center'>loi</span> */}
                                <span className='flex justify-start text-green-600'>{product?.category?.name}</span>
                                <h3 className='text-start my-2 text-gray-600'>{product?.title?.split(' ')?.slice(0, 2)?.join(' ')}</h3>
                                <div className='flex justify-between items-center'>
                                    <span className='text-black font-semibold'>{product?.price} EGP</span>
                                    <span className='text-black font-semibold'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                                </div>
                            </Link>
                            <button onClick={() => addProductCart(product.id)} className='bg-green-700  md:hidden  flex text-center justify-center items-center p-0 my-5 w-10/12 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                            <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:flex hidden text-center justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}