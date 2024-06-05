


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // مكون مؤشر التحميل

export default function RecentCategorie() {
    const [cate, setCate] = useState([]);
    const [loading, setLoading] = useState(true); // حالة التحميل العامة
    const [imageLoading, setImageLoading] = useState({}); // حالة التحميل لكل صورة

    async function getApi() {
        setLoading(true); // بدء التحميل
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCate(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        getApi();
    }, []);

    // دالة لتحديث حالة التحميل للصورة
    const handleImageLoad = (productId) => {
        setImageLoading(prevState => ({ ...prevState, [productId]: false }));
    };

    // دالة لمعالجة أخطاء تحميل الصورة
    const handleImageError = (productId) => {
        setImageLoading(prevState => ({ ...prevState, [productId]: false }));
    };

    return (
        <React.Fragment>
            <div className='flex flex-wrap mx-auto container py-8'>
                {loading ? (
                    <div className="w-full flex justify-center items-center">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : (
                    cate?.data?.map((product) => (
                        <div key={product.id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                            <div className='product overflow-hidden'>
                                <Link to={`/CategorieDetails/${product._id}/${product?.category?.name}`}>
                                    <div className='relative'>
                                        {imageLoading[product.id] && (
                                            <div className='absolute inset-0 flex justify-center items-center'>
                                                <ClipLoader size={30} color={"#123abc"} />
                                            </div>
                                        )}
                                        <img
                                            className={`object-cover md:h-screen h-[50vh] md-w-1/2 w-11/12 mx-auto ${imageLoading[product.id] ? 'hidden' : 'block'}`}
                                            src={product?.image}
                                            alt={product?.name}
                                            onLoad={() => handleImageLoad(product.id)}
                                            onError={() => handleImageError(product.id)}
                                        />
                                    </div>
                                    <span className='flex md:justify-start my-4 justify-center text-green-600'>{product?.name}</span>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </React.Fragment>
    );
}