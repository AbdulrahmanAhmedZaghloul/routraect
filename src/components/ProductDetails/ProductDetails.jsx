import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { ClimbingBoxLoader } from 'react-spinners';
import useProducts from "../../Hooks/useProducts";
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    let { id, category } = useParams();
    const [getid, setGetid] = useState(null);
    const [onCategory, setOnCategory] = useState([]);

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
                error: () => 'Error: This didn\'t work'
            }
        );
    }

    let { isError, isLoading } = useProducts();

    useEffect(() => {
        async function getProduct() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                setGetid(data.data);
            } catch (error) {
                console.log(error);
            }
        }

        async function getCategory() {
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
                const filteredCategory = data.data.filter((product) => product.category.name === category);
                setOnCategory(filteredCategory);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
        getCategory();
    }, [id, category]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center'>
                <ClimbingBoxLoader color='black' />
            </div>
        );
    }

    if (isError) {
        console.log(isError);
        return null; 
    }

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Products Details</title>
            </Helmet>
            <div className='container p-7'>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='md:w-1/4 w-full mx-auto'>
                        <Slider className='p-5 container' {...settings}>
                            {getid?.images.map((src, index) => (
                                <img key={index} className='w-full my-6 h-[50vh] object-contain mx-auto' src={src} alt={getid?.title} />
                            ))}
                        </Slider>
                    </div>
                    <div className='md:w-3/4 w-full p-3 my-5 md:p-20'>
                        <h1 className='font-bold text-start my-4 text-lg text-gray-800'>{getid?.title}</h1>
                        <p className='font-bold text-start my-4 text-lg text-gray-800'>{getid?.description}</p>
                        <div className='flex justify-between items-center my-7'>
                            <span className='text-black font-semibold'>{getid?.price} EGP</span>
                            <span className='text-black font-semibold'>{getid?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                        </div>
                        <button onClick={() => addProductCart(getid.id)} className='bg-green-700 p-0 w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to Cart</button>
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {onCategory.map((product) => (
                        <div key={product.id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                            <div className='product overflow-hidden'>
                                <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                    <img className='object-contain w-full' src={product?.imageCover} alt={product?.title} />
                                    <span className='flex justify-start text-green-600'>{product?.category?.name}</span>
                                    <h3 className='text-start my-2 text-gray-600'>{product?.title.split(' ').slice(0, 2).join(' ')}</h3>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-black font-semibold'>{product?.price} EGP</span>
                                        <span className='text-black font-semibold'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                                    </div>
                                </Link>
                                <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:hidden flex justify-center items-center w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to Cart</button>
                                <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:flex hidden justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-[1] group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}
