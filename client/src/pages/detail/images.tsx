import React, { type FC } from "react";

interface Props {
  images: string[];
}

const Images: FC<Props> = ({ images }) => {
  return (
    <div className="grid grid-cols-2  gap-6 h-fit">
      {images.map((image, key) => (
        <img
          src={image}
          alt={image}
          key={key}
          className="w-full h-full object-cover"
        />
      ))}
    </div>
  );
};

export default Images;
