import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import { close } from "../../assets/svgIcons";

export default function ModalPopup({
  heading = "",
  handleClose,
  handleActionClick,
  children,
  actionText,
  closeText,
  isOpen = false,
}) {
  return (
    <>
      {isOpen && (
        <div
          id="small-modal"
          tabindex="-1"
          class="fixed inset-0 z-50 flex md:items-center justify-center  overflow-x-hidden overflow-y-auto h-full"
        >
          <div class="relative w-full md:max-w-[50%]  h-auto md:h-auto bg-white md:rounded-md rounded-none shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <Heading text={heading} level={2} boldClass="font-semibold" />
              <Button
                leadingIcon={close}
                bgNone={true}
                handleClick={handleClose}
                textColor="text-textPrimary hover:text-error"
              />
            </div>
            <div class="p-4 md:p-5 space-y-4">{children}</div>
            <div class="flex items-center justify-end gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 md:relative absolute right-0 bottom-0">
              {closeText && (
                <Button
                  text={closeText}
                  handleClick={handleClose}
                  textColor="text-textPrimary"
                  bgColor="bg-background border"
                />
              )}
              {actionText && (
                <Button
                  text={actionText}
                  handleClick={handleActionClick}
                  textColor="text-textSecondary"
                  bgColor="bg-primary"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
