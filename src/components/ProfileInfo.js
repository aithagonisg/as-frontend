import React, { useContext, useEffect, useState } from "react";
import { ProductData } from "../Context";
import Input from "./commonComponents/Input";
import UploadProfileComponent from "./UploadProfileComponent";
import { END_POINT } from "../constants";
import Button from "./commonComponents/Button";
import { trashIcon } from "../assets/svgIcons";
import { deleteImage, updateUserInfo } from "../services/userServices";

export default function ProfileInfo() {
  const { userInfo, getUserInfoData } = useContext(ProductData);
  const [isEditable, setIsEditable] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});

  const handleUserProfileDelete = () => {
    deleteImage().then((res) => {
      console.log(res);
      getUserInfoData();
    });
  };

  useEffect(() => {
    setEditedUserInfo(userInfo);
  }, [userInfo]);

  const handleUpdateUserInfo = () => {
    // to send data to db
    setIsEditable(false);
    updateUserInfo(editedUserInfo)
      .then((res) => {
        getUserInfoData();
      })
      .catch((err) => console.log(err));
    //hit the API END point
  };

  const handleDataChange = (event) => {
    setEditedUserInfo({
      ...editedUserInfo,
      [event.target.id]: event.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col  items-center">
        <div class="w-[120px] h-[120px]">
          {userInfo.profileImage ? (
            <>
              <img
                alt="ecommerce"
                class="w-full object-cover object-center rounded-[100%] border border-gray-200 h-full"
                src={`${END_POINT}${userInfo.profileImage}`}
              />
            </>
          ) : (
            <UploadProfileComponent />
          )}
        </div>
        {userInfo.profileImage && (
          <Button
            leadingIcon={trashIcon}
            handleClick={handleUserProfileDelete}
            textColor="text-error"
          />
        )}
      </div>

      <div>
        <Input
          placeholder="Enter FirstName"
          type="text"
          id="firstName"
          onChange={handleDataChange}
          disabled={!isEditable}
          value={editedUserInfo.firstName}
        />
      </div>
      <div>
        <Input
          placeholder="Enter LastName"
          type="text"
          id="lastName"
          onChange={handleDataChange}
          disabled={!isEditable}
          value={editedUserInfo.lastName}
        />
      </div>
      <div>
        <Input
          placeholder="Enter Mobile"
          type="number"
          id="mobile"
          onChange={handleDataChange}
          disabled={!isEditable}
          value={editedUserInfo.mobile}
        />
      </div>
      <Button
        handleClick={
          isEditable
            ? () => {
                handleUpdateUserInfo();
              }
            : () => handleEdit()
        }
        text={isEditable ? "Update User Info" : "Edit"}
        bgColor="bg-primary"
      />
    </div>
  );
}
