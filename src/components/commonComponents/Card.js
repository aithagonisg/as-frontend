import React, { useState, useEffect } from "react";
import SpinLoader from "./SpinLoader";

export default function Card({ img, children }) {
  const [loading, setLoading] = useState(true);
  const [loadedImg, setLoadedImg] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imgObj = new Image();
        imgObj.src = img;
        imgObj.onload = () => {
          setLoadedImg(imgObj.src);
          setLoading(false);
        };
      } catch (error) {
        console.error("Image failed to load:", error);
        setLoading(false); // Hide loader even if the image fails
      }
    };

    loadImage();
  }, [img]);

  return (
    <div className="bg-background border w-[320px] h-[320px] border-borderColor rounded-md shadow ">
      <div className="h-[190px] w-[318.5px] flex-shrink-0 overflow-hidden rounded-t-md flex items-center justify-center bg-gray-200">
        {loading ? (
          <SpinLoader />
        ) : (
          <img
            src={loadedImg}
            alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      <hr />
      <div className="px-2 py-0.5">{children}</div>
    </div>
  );
}
