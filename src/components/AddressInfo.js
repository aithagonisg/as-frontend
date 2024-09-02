import React, { useEffect, useState } from "react";
import Input from "./commonComponents/Input";
import Checkbox from "./commonComponents/Checkbox";
import Button from "./commonComponents/Button";
import { addAddress, getAddressList } from "../services/addressServices";

// hno: { type: String, required: true },
// street: { type: String, required: true },
// city: { type: String, required: true },
// state: { type: String, required: true },
// zip: { type: String, required: true },
// country: { type: String, required: true },
// active: { type: Boolean, default: false },
// mobile: { type: String, required: true },

export default function AddressInfo() {
  const [address, setAddress] = useState({});
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const handleAddress = (event) => {
    setAddress({ ...address, [event.target.id]: event.target.value });
  };
  const getAddressListData = () => {
    getAddressList().then((res) => setAddressList(res.addressList));
  };

  useEffect(() => {
    getAddressListData();
  }, []);

  const handleUpdateAddressInfo = () => {
    // hit the API
    if (Object.keys(address).length > 7) {
      setAddress({});
      addAddress(address).then((res) => getAddressListData());
      setShowAddressFields(false);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {addressList.map((item) => (
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 w-2/4">
          <div class="flex items-start">
            <div class="ms-4 text-sm">
              <label
                for="dhl"
                class="font-medium leading-none text-gray-900 dark:text-white"
              >
                {item.hno} - {item.street}
              </label>
              <p
                id="dhl-text"
                class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                {item.city} , {item.state}
              </p>
              <p
                id="dhl-text"
                class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
              >
                {item.country} , {item.zip} , {item.mobile}
              </p>
            </div>
          </div>
        </div>
      ))}
      {addressList.length < 3 && showAddressFields && (
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2">
            <Input
              placeholder="Enter H No"
              id="hno"
              customClass="w-[50%]"
              onChange={handleAddress}
            />
            <Input
              placeholder="Enter street"
              id="street"
              customClass="w-[50%]"
              onChange={handleAddress}
            />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter city"
              id="city"
              customClass="w-[50%]"
              onChange={handleAddress}
            />
            <Input
              placeholder="Enter state"
              id="state"
              customClass="w-[50%]"
              onChange={handleAddress}
            />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter zip code"
              id="zip"
              customClass="w-[50%]"
              onChange={handleAddress}
            />
            <Input
              placeholder="Enter country"
              id="country"
              customClass="w-[50%]"
              onChange={handleAddress}
            />
          </div>
          <Input
            placeholder="Enter Mobile"
            id="mobile"
            onChange={handleAddress}
          />
          <Checkbox
            labelText="make Address as Default"
            id="active"
            checked={address["active"] ? address["active"] : false}
            handleCheckbox={handleAddress}
          />
          <Button
            handleClick={handleUpdateAddressInfo}
            text="Add Address"
            bgColor="bg-primary"
          />
        </div>
      )}
      {!showAddressFields && addressList.length < 3 && (
        <button
          className="text-primary underline"
          onClick={() => setShowAddressFields(true)}
        >
          +Add Address
        </button>
      )}
    </div>
  );
}
