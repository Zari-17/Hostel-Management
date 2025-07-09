import React from "react";

const Alert = ({ show = false, onYesPress, onNoPress, message }) => {
  return (
    <>
      {show && (
        <div className="w-screen h-screen absolute flex flex-col items-center justify-center">
          <div className="bg-black opacity-60 w-screen h-screen absolute" />
          <div className="min-h-[150px] w-7/12 bg-white z-40 rounded-lg flex flex-col items-center text-center justify-between">
            <div className="h-3/6 flex items-center justify-center">
              <div className="mx-4">{message}</div>
            </div>
            <div className="flex w-full border-t-[1px] border-gray-200">
              <div
                className="h-[50px] items-center justify-center flex w-3/6  rounded-bl-lg text-sky-600"
                onClick={onNoPress}
              >
                No
              </div>
              <div
                className="h-[50px] items-center justify-center flex w-3/6 rounded-br-lg text-sky-600"
                onClick={onYesPress}
              >
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
