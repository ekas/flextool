import { Carousel } from "antd";
import React from "react";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

interface CarouselBlockProps {
  carouselItems: string[];
}

const CarouselBlock: React.FC<CarouselBlockProps> = ({ carouselItems }) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      {carouselItems.map((item) => (
        <div>
          <h3 style={contentStyle}>{item}</h3>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselBlock;
