import React from 'react';
import imageSilder1 from '../../assets/images/slider-image-1.jpeg';
import imageSilder2 from '../../assets/images/slider-image-2.jpeg';
import imageSilder3 from '../../assets/images/slider-image-3.jpeg';
import Slider from "react-slick";
export default function MainSilder() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: true,
        arrows:true,
    };
    return (<React.Fragment>
        <div className='py-2 mx-auto px-0'>
            <div className='flex justify-center py-5  px-0 flex-wrap mx-auto'>
                <div className='w-full '>
                    <Slider className='rounded-none p-0 w-full' {...settings}>
                        <img className='object-center w-full h-[80vh] rounded-none' src={imageSilder3} alt="imageSilder3" />
                        <img className='object-center w-full h-[80vh] rounded-none' src={imageSilder2} alt="imageSilder3" />
                        <img className='object-center w-full h-[80vh] rounded-none' src={imageSilder1} alt="imageSilder3" />
                    </Slider>
                </div>
      
            </div>
        </div>
    </React.Fragment>
    )
}
