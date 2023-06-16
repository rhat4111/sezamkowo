import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Lightbox from "@/components/Lightbox";
import SliderNext from "@/assets/images/icons/slider-next.svg";

const LocationGallery = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const settings = {
    className: "w-full flex",
    infinite: false,
    slidesToShow: 4,
    arrows: false,
    afterChange: (i) => {
      console.log(i, props.photos.length);
      setIndex(i);
    },
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderRef = useRef();
  const handlePrev = () => sliderRef.current.slickPrev();
  const handleNext = () => sliderRef.current.slickNext();
  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <div className="mb-7">
        <p
          className="relative font-bold text-[27px] mb-6"
          style={{ color: props.color }}
        >
          {props.title}
          <span
            className="w-[236px] h-[1px] absolute top-[43px] left-0"
            style={{ background: props.color }}
          />
        </p>
        <div className="w-full lg:-mx-2 relative">
          {index !== 0 && (
            <button
              className="absolute top-1/2 -translate-y-1/2 -left-5 -translate-x-full hidden 2xl:flex transform rotate-180"
              onClick={handlePrev}
            >
              <Image src={SliderNext} />
            </button>
          )}
          {index !== props.photos.length - settings.slidesToShow && (
            <button
              className="absolute top-1/2 -translate-y-1/2 -right-5 translate-x-full hidden 2xl:flex"
              onClick={handleNext}
            >
              <Image src={SliderNext} />
            </button>
          )}
          <Slider {...settings} ref={sliderRef}>
            {props.photos.map((photo, index) => (
              <div className="lg:px-2" key={index} onClick={handleToggle}>
                <Image src={photo} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Lightbox isOpen={isOpen} onClose={handleToggle} />
    </>
  );
};

export default LocationGallery;
