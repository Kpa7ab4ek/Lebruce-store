import React, { useState } from 'react';
import './slider.css'

const ImageSlider = ({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((currentIndex + images.length - 1) % images.length);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    if (images.length === 0) {
        return <div>No images to display</div>;
    }

    return (
        <div className={"image-slider"}>
            <button onClick={prevImage}>{"<"}</button>
            <img
                src={images[currentIndex]}
                alt="Слайдер"
                onClick={() => {
                    if (onImageClick) {
                        onImageClick();
                    }
                }}
            />
            <button onClick={nextImage}>{">"}</button>
        </div>
    );

};

export default ImageSlider;
