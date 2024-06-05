import React, { useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import { ClimbingBoxLoader } from 'react-spinners';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import useProducts from "../../Hooks/useProducts";
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import iconimage from "../../image/avataaars.svg";

export default function Products() {
  let { addCart } = useContext(create);

  async function addProductCart(productId) {
    toast.promise(
      addCart(productId),
      {
        loading: 'Adding product to your cart...',
        success: (response) => {
          if (response.data.status === "success") {
            console.log("success");
            return 'Product added successfully to your cart.';
          } else {
            console.log("error");
            throw new Error("This didn't work.");
          }
        },
        error: () => `Error: This didn't work`,
      }
    );
  }

  let { data, isError, isLoading } = useProducts();

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
      <Helmet>
        <link rel="icon" href={iconimage} />
        <title>Products</title>
      </Helmet>
      <div className='flex flex-wrap items-center mx-auto w-full pt-12'>
        <div className="mx-auto w-full pt-9">
          <input className="flex py-3 px-2 focus:border-green-500 border outline-none flex-wrap items-center mx-auto w-11/12 md:w-1/2 placeholder text-[1.1rem] tracking-[0.1rem]" type="search" placeholder="Search Products" />
        </div>
      </div>
      <div className='flex flex-wrap mx-auto container py-8'>
        {data.map((product) => (
          <div key={product.id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
            <div className='product overflow-hidden'>
              <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
              {loadingImages[product.id] !== false && (
                  <div className='flex justify-center items-center h-full'>
                    <ClipLoader size={15} color='black' />
                  </div>
                )}
                <img
                  className={`object-contain w-full ${loadingImages[product.id] === false ? 'block' : 'hidden'}`}
                  src={product?.imageCover}
                  alt={product?.title}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => handleImageError(product.id)}
                />
                <span className='flex justify-start text-green-600'>{product?.category?.name}</span>
                <h3 className='text-start my-2 text-gray-600'>{product?.title?.split(' ')?.slice(0, 2)?.join(' ')}</h3>
                <div className='flex justify-between items-center'>
                  <span className='text-black font-semibold'>{product?.price} EGP</span>
                  <span className='text-black font-semibold'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                </div>
              </Link>
              <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0  md:hidden  flex justify-center items-center w-10/12 my-5 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
              <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0  md:flex hidden justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}