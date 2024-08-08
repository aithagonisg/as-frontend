import React from "react";
import { toUpper } from "../../utils/common";
import Separator from "../../components/commonComponents/Separator";

export default function HomePage() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
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
