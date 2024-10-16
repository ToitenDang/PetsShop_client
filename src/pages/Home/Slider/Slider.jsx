import BtnSlider from './BtnSlider';
import myStyle from './Slider.module.scss';
import { useState } from 'react';

const publicUrl = import.meta.env.VITE_PUBLIC_URL;
const slideData = [
    {
        id: "1",
        name: 'Bet shob cung cấp thức ăn',
        title: 'Đa dạng về các loại thức ăn cho thú cưng, thức ăn hạt, pate, dinh dưỡng,...',
        // url: "https://www.aafco.org/wp-content/uploads/2023/01/iStock-1361708626.jpg"
        url: `${publicUrl}/images/slider_1.jpg`
    },
    {
        id: "2",
        name: 'Bet shob cung cấp dịch vụ',
        title: 'Hỗ trợ về các dịch vụ cho thú cưng, cắt tỉa, chăm sóc, y tế, spa,...',
        // url: 'https://afamilycdn.com/150157425591193600/2023/1/13/rni-films-img-609874a8-1de4-4961-bbbc-98b52efaeb15-1673497561046990811075-1673608178215-16736081783942036348662.jpg'
        url: `${publicUrl}/images/slider_2.webp`
    },
    {
        id: "3",
        name: 'Bet shob cung cấp các phụ kiện',
        title: 'Cung cấp chuồng xinh, dây đeo, phụ kiện, đồ chơi,...',
        // url: 'https://img.lazcdn.com/g/p/320de7a8ae2578e086656bc8d1d3e116.png_720x720q80.png'
        url: `${publicUrl}/images/slider_3.png`
    }
]

const Slider = () => {
    // console.log('Re-render: Slider')
    const [slideIndex, setSLideIndex] = useState(1);
    const nextSlide = () => {
        const dataLength = slideData.length;
        if (slideIndex != dataLength) {
            setSLideIndex(slideIndex + 1);
        }
        else if (slideIndex === dataLength) {
            setSLideIndex(1);
        }
    }
    const prevSlide = () => {
        const dataLength = slideData.length;
        if (slideIndex != 1) {
            setSLideIndex(slideIndex - 1);
        }
        else if (slideIndex === 1) {
            setSLideIndex(dataLength);
        }
    }
    const moveDot = (index) => {
        setSLideIndex(index)
    }
    return (
        <div className={myStyle.containerSlider}>
            {
                slideData.map((data, index) => {
                    return (
                        <div key={index} className={slideIndex === index + 1 ? `${myStyle.slide} ${myStyle.activeAnim}` : myStyle.slide}>
                            <div className={myStyle.contentContainer}>
                                <h1 className={myStyle.contentHeader}>{data.name}</h1>
                                <p className={myStyle.contentContext}>{data.title}</p>

                            </div>
                            <img src={data.url} />
                        </div>)
                })
            }

            <BtnSlider moveSlide={nextSlide} direction="next" />
            <BtnSlider moveSlide={prevSlide} direction="prev" />

            <div className={myStyle.containerDots}>
                {
                    Array.from({ length: 3 }).map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => moveDot(index + 1)}
                                className={
                                    slideIndex === index + 1 ? `${myStyle.dot} ${myStyle.active}` : myStyle.dot
                                }>
                                
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slider