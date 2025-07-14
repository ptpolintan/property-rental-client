'use client';

import Slider from 'react-slick';
import style from './carousel.module.css';

type CarouselProps = {
  images: string[];
};

export default function Carousel({ images }: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true,
    className: "text-black"
  };

  return (
    <div className="max-w-md mx-auto">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}