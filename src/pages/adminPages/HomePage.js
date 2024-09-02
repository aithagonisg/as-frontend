import React, { useContext } from "react";
import { toUpper } from "../../utils/common";
import Separator from "../../components/commonComponents/Separator";
import { ProductData } from "../../Context";

export default function HomePage() {
  const { userInfo } = useContext(ProductData);
  const firstName = userInfo.firstName;
  const lastName = userInfo.lastName;
  return (
    <div>
      <div className="flex font-bold text-textPrimary text-3xl gap-2">
        <div>{toUpper(firstName)}</div>
        <div>{toUpper(lastName)}</div>!
      </div>
      <div className="mt-2">
        <Separator />
      </div>
    </div>
  );
}
