import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // تأكد من تثبيت مكتبة react-spinners

export default function CategorieDetails() {
    let { id } = useParams();
    const [getid, setGetid] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);

    function getProduct(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .then(({ data }) => {
                setGetid(data?.data);
                setLoading(false);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // حتى في حالة حدوث خطأ، قم بإيقاف التحميل
            });
    }

    useEffect(() => {
        setLoading(true); // بدء التحميل
        getProduct(id);
    }, [id]);

    return (
        <React.Fragment>
            <div className='container p-7 my-9 flex flex-col justify-center'>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <ClipLoader size={50} color={"#123abc"} loadinger={imageLoading.toString()} />
                    </div>
                ) : (
                    <>
                        <div className='w-full mx-auto h-3/2 my-4 relative'>
                            {imageLoading && (
                                <div className='absolute inset-0 flex justify-center items-center'>
                                    <ClipLoader size={50} color={"#123abc"} loadinger={imageLoading.toString()} />
                                </div>
                            )}
                            <img
                                className={`object-cover md:h-screen h-[50vh] md-w-1/2 w-11/12 mx-auto ${imageLoading ? 'hidden' : 'block'}`}
                                src={getid?.image}
                                alt={getid?.name}
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)} // لإخفاء التحميل في حالة حدوث خطأ في تحميل الصورة
                            />
                        </div>
                        <p className='text-red-600 font-semibold tracking-[0.2rem]'>{getid?.name}</p>
                    </>
                )}
            </div>
        </React.Fragment>
    );
}




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ClipLoader from 'react-spinners/ClipLoader'; // تأكد من تثبيت مكتبة react-spinners

// export default function CategorieDetails() {
//     let { id } = useParams();
//     const [getid, setGetid] = useState({});
//     const [loading, setLoading] = useState(true);

//     function getProduct(id) {
//         return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
//             .then(({ data }) => {
//                 setGetid(data?.data);
//                 setLoading(false);
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setLoading(false); // حتى في حالة حدوث خطأ، قم بإيقاف التحميل
//             });
//     }

//     useEffect(() => {
//         setLoading(true); // بدء التحميل
//         getProduct(id);
//     }, [id]);

//     return (
//         <React.Fragment>
//             <div className='container p-7 my-9 flex flex-col justify-center'>
//                 {loading ? (
//                     <div className='flex justify-center items-center'>
//                         <ClipLoader size={50} color={"#123abc"} loading={loading} />
//                     </div>
//                 ) : (
//                     <>
//                         <img className='w-1/3 mx-auto h-3/2 my-4 object-contain' src={getid?.image} alt={getid?.name} />
//                         <p className='text-red-600 font-semibold tracking-[0.2rem]'>{getid?.name}</p>
//                     </>
//                 )}
//             </div>
//         </React.Fragment>
//     );
// }




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// export default function CategorieDetails() {
//     let { id } = useParams();
//     const [getid, setGetid] = useState({});

//     function getProduct(id) {
//         return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
//             .then(({ data }) => {
//                 setGetid(data?.data);
//                 console.log(data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }

//     useEffect(() => {
//         getProduct(id);
//     }, [id]);

//     return (
//         <React.Fragment>
//             <div className='container p-7 my-9 flex flex-col justify-center'>
//                 <img className='w-1/3 mx-auto h-3/2 my-4 object-contain' src={getid?.image} alt={getid?.name} />
//                 <p className='text-red-600 font-semibold tracking-[0.2rem]'>{getid?.name}</p>
//             </div>
//         </React.Fragment>
//     );
// }
