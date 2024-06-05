import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import Slider from "react-slick";
//Two Silder (Home Page) Shop Popular Categories 
export default function CategorieSilder() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
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
    const [silderCate, setSilderCate] = useState([]);
    function getPorductApi() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                // console.log(data.data);
                setSilderCate(data.data)
            })
            .catch((errors) => {
                console.log(errors);
            })
    }
    useEffect(() => {
        getPorductApi();
    }, []);
    return (<React.Fragment>
        <div className='p-4'>
            <h2 className='text-start font-bold my-4 text-2xl text-zinc-600'>Shop Popular Categories</h2>
            <Slider className=' p-5' {...settings}>
                {silderCate.map((src) => (<div key={src._id}>
                    <img className='w-full mx-auto h-[10rem]' src={src?.image} alt={src?.name} />
                    <p className='text-start font-semibold my-3'>{src?.name}</p>
                </div>

                ))}
            </Slider>
        </div>

    </React.Fragment>
    )
}
