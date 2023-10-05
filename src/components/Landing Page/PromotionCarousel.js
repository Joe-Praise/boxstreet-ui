import React from "react";
import '../../styles/promotionCarousel.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import promo1 from '../uploads/promo2.jpg'
import promo2 from '../uploads/promo1.jpg'
import promo3 from '../uploads/promo3.jpg'

const data = [
  {
    id: "1",
    imgSrc: promo1
  },
  {
    id: "2",
    imgSrc: promo2
  },
  {
    id: "3",
    imgSrc: promo3
  }
];

function PromotionCarousel() {
  return (
    <div className="CarouselSlider">
        <Carousel
            items={1}
            swipeable={true}
            draggable={true}
            autoPlay={true}
            infinite={true}
            responsive={{
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                slidesToSlide: 1
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1,
                slidesToSlide: 1
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1
            }
            }}
            customTransition="all 0.5s ease-in-out"
        >
            {data.map((item) => (
            <div key={item.id} className="carousel-item">
                <img src={item.imgSrc} alt={item.id} />
            </div>
            ))}
        </Carousel>
    </div>

  );
}

export default PromotionCarousel;
