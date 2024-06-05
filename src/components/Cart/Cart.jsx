import React, { useEffect, useState, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import { create } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import imageEmpty from "../../image/empty-cart-flat-illustration-concept-vector.jpg";
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners"; // مكون مؤشر التحميل

export default function Cart() {
    let [cartData, setCartData] = useState(null);
    let [loadinger, setLoadinger] = useState(true); // حالة التحميل

    let { getItem, removeItem, updataItem, cartCount, deleteItem, cartCountNumber } = useContext(create);

    async function getcarte() {
        setLoadinger(true); // بدء التحميل
        let response = await getItem();
        setCartData(response.data);
        setLoadinger(false); // إنهاء التحميل
    }

    async function deletecarte() {
        toast.promise(
            deleteItem().then(response => {
                setCartData(response.data);
                return response;
            }),
            {
                loading: 'Removing all items from your cart...',
                success: 'All items have been removed from your cart.',
                error: 'Error: This didn\'t work.',
            }
        );
    }

    async function removecarte(productId) {
        toast.promise(
            removeItem(productId).then(response => {
                setCartData(response.data);
                return response;
            }),
            {
                loading: 'Removing items from your cart...',
                success: 'Items have been removed from your cart.',
                error: 'Error: This didn\'t work.',
            }
        );
    }

    async function updatacarte(productId, count) {
        if (count < 1) return;
        toast.promise(
            updataItem(productId, count).then(response => {
                setCartData(response.data);
                return response;
            }),
            {
                loading: 'Updating items in your cart...',
                success: 'Items have been updated in your cart.',
                error: 'Error: This didn\'t work.',
            }
        );
    }

    useEffect(() => {
        getcarte();
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={iconimage} />
                <title>Cart</title>
            </Helmet>
            {loadinger ? (
                <div className="h-screen flex items-center justify-center">
                    <ClipLoader size={50} color={"#123abc"}  loadinger={loadinger.toString()} />
                </div>
            ) : !cartCount ? (
                <div className="h-screen flex items-center mx-auto">
                    <div className="w-3/4 flex flex-col items-center mx-auto px-2">
                        <img className="w-1/3" src={imageEmpty} alt="imageEmpty" />
                        <Link to={'/home'} className="mx-auto">
                            <button className="bg-green-600 w mt-5 rounded-md tracking-wide text-white">Continue shopping</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto p-4 lg:w-3/4 w-full py-8 mx-auto my-4">
                    <h2 className="p-5 text-start text-5xl font-semibold tracking-wide text-slate-200">Shop Cart</h2>
                    <p className="text-start p-2 font-mono text-2xl text-green-400">Total Price: {cartCountNumber} EGP</p>
                    <button onClick={deletecarte} className="bg-red-500 md:w-1/3 w-full my-5 rounded-md tracking-wide text-white">Delete All Cart <i className="ms-3 fa-solid fa-trash"></i></button>
                    {cartData?.data?.products.map((prot) => (
                        <div key={prot.product.id} className="bg-white flex items-center justify-between flex-wrap border-b hover:bg-gray-50">
                            <div className="p-4 w-1/2 md:w-1/5">
                                <img src={prot.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                            </div>
                            <div className="px-6 w-1/2 md:w-1/5 py-4 font-semibold text-gray-900">
                                {prot.product.title}
                            </div>
                            <div className="px-6 w-1/2 md:w-1/5 py-4">
                                <div className="flex items-center">
                                    <button onClick={() => updatacarte(prot.product.id, prot.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <div>
                                        <span>{prot.count}</span>
                                    </div>
                                    <button onClick={() => updatacarte(prot.product.id, prot.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="px-6 w-1/2 md:w-1/5 py-4 font-semibold text-gray-900">
                                {prot.price} EGP
                            </div>
                            <div className="px-6 w-1/2 md:w-1/5 py-4 mx-auto">
                                <span onClick={() => removecarte(prot.product.id)} className="font-semibold text-red-600 cursor-pointer">Remove <i className="ms-3 fa-solid fa-trash"></i></span>
                            </div>
                        </div>
                    ))}
                    <Link to={`/orderUsers`}>
                        <button className="bg-green-500 flex justify-start items-center my-5 rounded-md tracking-wide text-white text-[1.1rem]">Check Out<i className="ms-3 text-2xl fa-solid fa-money-check-dollar"></i></button>
                    </Link>
                </div>
            )}
        </React.Fragment>
    );
}













// import React, { useEffect, useState, useContext } from "react";
// import { Helmet } from 'react-helmet-async';
// import iconimage from "../../image/avataaars.svg";
// import { create } from "../../Context/CartContext";
// import { Link } from "react-router-dom";
// import imageEmpty from "../../image/empty-cart-flat-illustration-concept-vector.jpg";
// import toast from 'react-hot-toast';

// export default function Cart() {

//     let [cartData, setCartData] = useState(null);

//     let { getItem, removeItem, updataItem, cartCount, deleteItem, cartCountNumber } = useContext(create);

//     async function getcarte() {
//         let response = await getItem();
//         setCartData(response.data);
        
//     }

//     async function deletecarte() {
//         // let response = await deleteItem();
//         // setCartData(response.data);

//         toast.promise(
//             deleteItem().then(response => {
//                 setCartData(response.data);
//                 return response;
//             }),
//             {
//                 loading: 'Removing all items from your cart...',
//                 // pending: 'Removing all items from your cart...',
//                 success: 'All items have been removed from your cart.',
//                 error: 'Error: This didn\'t work.',
//             }
//         );
//     }

//     async function removecarte(productId) {
//         // let response = await removeItem(productId);
//         // setCartData(response.data);
//         toast.promise(
//             removeItem(productId).then(response => {
//                 setCartData(response.data);
//                 return response;
//             }),
//             {
//                 loading: 'Removing items from your cart...',
//                 success: 'is items have been removed from your cart.',
//                 error: 'Error: This didn\'t work.',
//             }
//         );
//     }

//     async function updatacarte(productId, count) {
//         if (count < 1) return;
//         // let response = await updataItem(productId, count);
//         // setCartData(response.data);
//         toast.promise(
//             updataItem(productId, count).then(response => {
//                 setCartData(response.data);
//                 return response;
//             }),
//             {
//                 loading: 'Plass with items Update from your cart...',
//                 success: 'is items have been Update from your cart.',
//                 error: 'Error: This didn\'t work.',
//             }
//         );
//     }
   

//     useEffect(() => {
//         getcarte();
//         // deletecarte();
//     }, [cartCount]);

//     return (
//         <React.Fragment>
//             <Helmet>
//                 <link rel="icon" href={iconimage} />
//                 <title>Cart</title>
//             </Helmet>
//             {!cartCount ? (
//                 <div className="h-screen flex items-center mx-auto">
//                     <div className="w-3/4 flex flex-col items-center mx-auto px-2">
//                         <img className="w-1/3" src={imageEmpty} alt="imageEmpty" />
//                         <Link to={'/home'} className="mx-auto">
//                             <button className=" bg-green-600  mt-5 rounded-md tracking-wide text-white">Continue shopping</button>
//                         </Link>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="overflow-x-auto p-4 lg:w-3/4 w-full py-8 mx-auto my-4">
//                     <h2 className="p-5 text-start text-5xl font-semibold tracking-wide text-slate-200">Shop Cart</h2>
//                     <p className="text-start p-2 font-mono text-2xl text-green-400">Total Price: {cartCountNumber} EGP</p>
//                     <button onClick={deletecarte} className="bg-red-500 w-1/3 my-5 rounded-md tracking-wide text-white">Delete All Cart <i className="ms-3 fa-solid fa-trash"></i></button>
//                     {cartData?.data?.products.map((prot) => (
//                         <div key={prot.product.id} className="bg-white flex items-center justify-between flex-wrap border-b hover:bg-gray-50">
//                             <div className="p-4 w-1/2 md:w-1/5">
//                                 <img src={prot.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
//                             </div>
//                             <div className="px-6 w-1/2 md:w-1/5 py-4 font-semibold text-gray-900">
//                                 {prot.product.title}
//                             </div>
//                             <div className="px-6 w-1/2 md:w-1/5 py-4">
//                                 <div className="flex items-center">
//                                     <button onClick={() => updatacarte(prot.product.id, prot.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4" type="button">
//                                         <span className="sr-only">Quantity button</span>
//                                         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
//                                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
//                                         </svg>
//                                     </button>
//                                     <div>
//                                         <span>{prot.count}</span>
//                                     </div>
//                                     <button onClick={() => updatacarte(prot.product.id, prot.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
//                                         <span className="sr-only">Quantity button</span>
//                                         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="px-6 w-1/2 md:w-1/5 py-4 font-semibold text-gray-900">
//                                 {prot.price} EGP
//                             </div>
//                             <div className="px-6 w-1/2 md:w-1/5 py-4 mx-auto">
//                                 <span onClick={() => removecarte(prot.product.id)} className="font-semibold text-red-600 cursor-pointer">Remove <i className="ms-3 fa-solid fa-trash"></i></span>
//                             </div>
//                         </div>
//                     ))}
//                     <Link to={`/orderUsers`}>
//                         <button className="bg-green-500 flex justify-start items-center my-5 rounded-md tracking-wide text-white text-[1.1rem]">Check Out<i className="ms-3 text-2xl fa-solid fa-money-check-dollar"></i></button>
//                     </Link>
//                 </div>
//             )}
//         </React.Fragment>
//     );
// }


