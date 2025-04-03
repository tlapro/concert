"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageGalery() {
  const images = [
    "/1.avif",
    "/2.png",
    "/3.avif",
    "/4.jpg",
    "/5.webp",
    "/6.jpg",
    "/7.avif",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (selectedImage === null) return;

    if (event.key === "ArrowRight") {
      setSelectedImage((prevIndex) =>
        prevIndex !== null && prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowLeft") {
      setSelectedImage((prevIndex) =>
        prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : images.length - 1
      );
    } else if (event.key === "Escape") {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-[80%] mx-auto">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={src}
              alt={`Imagen ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={images[selectedImage]}
            alt="Ampliada"
            className="max-w-4xl max-h-[80vh] rounded-lg shadow-lg"
            width={1000}
            height={1000}
          />
        </div>
      )}
    </div>
  );
}
