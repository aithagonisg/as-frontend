import React, { useContext } from "react";
import { profile } from "../assets/svgIcons";
import { uploadImage } from "../services/userServices";
import { ProductData } from "../Context";

export default function UploadProfileComponent() {
  const { getUserInfoData } = useContext(ProductData);
  const handleChange = (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    console.log(formData);
    uploadImage(formData).then((res) => {
      console.log(res);
      getUserInfoData();
    });
  };
  return (
    <form className="h-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col h-full items-center justify-center border-2 border-gray-300 border-dashed rounded-[100%] cursor-pointer bg-[#ffffff] hover:bg-[#f9f9f9]"
      >
        <div className="profile-image flex flex-col items-center justify-center">
          {profile}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          required
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
