import { createContext, useState } from 'react';
import axios from 'axios';

export let create = createContext();

export default function CartContextProvider(props) {
    const [cartCount, setCartCount] = useState(0); // حالة لتخزين عدد المنتجات في السلة
    const [cartCountNumber, setCartCountNumber] = useState(0); // حالة لتخزين عدد المنتجات في السلة

    let headers = {
        token: localStorage.getItem("userToken")
    }

    function getItem() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => error);
    }
    
    function deleteItem() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
        .then((response) => {
            setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
            setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
            return response;
        })
        .catch((error) => error);
    }

    function removeItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((response) => {
                setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => error);
    }

    function updataItem(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
            .then((response) => {
                setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((error) => error);
    }

    function addCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((response) => {
                setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
                setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
                return response;
            })
            .catch((errors) => errors);
    }

    return (
        <create.Provider value={{ addCart, getItem, removeItem, updataItem, cartCount, deleteItem, cartCountNumber }}>
            {props.children}
        </create.Provider>
    );

}






























// import { createContext, useState } from 'react';
// import axios from 'axios';

// export let create = createContext();

// export default function CartContextProvider(props) {
//     const [cartCount, setCartCount] = useState(0); // حالة لتخزين عدد المنتجات في السلة
//     const [cartCountNumber, setCartCountNumber] = useState(0); // حالة لتخزين عدد المنتجات في السلة

//     let headers = {
//         token: localStorage.getItem("userToken")
//     }

//     function getItem() {
//         return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//             .then((response) => {
//                 setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((error) => error);
//     }
//     function deleteItem() {
//         return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//         .then((response) => {
//             setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
//             setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
//             return response;
//         })
//         .catch((error) => error);
//     }

//     function removeItem(productId) {
//         return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
//             .then((response) => {
//                 setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((error) => error);
//     }

//     function updataItem(productId, count) {
//         return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
//             .then((response) => {
//                 setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((error) => error);
//     }

//     function addCart(productId) {
//         return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
//             .then((response) => {
//                 setCartCount(response.data.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 setCartCountNumber(response?.data?.data?.totalCartPrice); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((errors) => errors);
//     }

//     return (
//         <create.Provider value={{ addCart, getItem, removeItem, updataItem, cartCount,deleteItem  ,cartCountNumber}}>
//             {props.children}
//         </create.Provider>
//     );
// }


// import { createContext, useState } from 'react';
// import axios from 'axios';

// export let create = createContext();

// export default function CartContextProvider(props) {
//     const [cartCount, setCartCount] = useState(0); // حالة لتخزين عدد المنتجات في السلة

//     let headers = {
//         token: localStorage.getItem("userToken")
//     }

//     function getItem() {
//         return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//             .then((response) => {
//                 setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((error) => error);
//     }

//     function removeItem() {
//         return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//             .then((response) => {
//                 setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 console.log(response);
//                 return response;
//             })
//             .catch((error) => error);
//     }
//     // function deleteAllItem() {
//     //     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
//     //         .then((response) => {
//     //             setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
//     //             console.log(response);
//     //             return response;
                
//     //         })
//     //         .catch((error) => error);
//     // }

//     // function deleteAllItem(productId) {
//     //     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
//     //         .then((response) => {
//     //             setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
//     //             return response;
//     //         })
//     //         .catch((error) => error);
//     // }

//     function updataItem(productId, count) {
//         return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
//             .then((response) => {
//                 setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((error) => error);
//     }

//     function addCart(productId) {
//         return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
//             .then((response) => {
//                 setCartCount(response?.data?.numOfCartItems); // تحديث عدد المنتجات في السلة
//                 return response;
//             })
//             .catch((errors) => errors);
//     }

//     return (
//         <create.Provider value={{ addCart, getItem, removeItem, updataItem, cartCount }}>
//             {props.children}
//         </create.Provider>
//     );

// }