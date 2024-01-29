import React, { useState } from "react";
import authService from "../services/authService";
import toast from "react-hot-toast";

export default function SendMoneyModal({ id, firstName, lastName }) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  async function transfer(e) {
    try {
      await authService.transfer(id, amount).then(
        (response) => {
          if (response) {
            toast.success(`₹ ${amount} paid`);
          }

          setInterval(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          console.log("error1");
          if (error) {
            toast.error(error.response.data.message);
          }
        }
      );
    } catch (err) {
      console.log("error2");
    }
  }

  return (
    <>
      <button
        type="button"
        className="  rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        onClick={() => setShowModal(true)}
      >
        Send Money
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5  rounded-t">
                  <h3 className="text-3xl font-semibold">Send Money</h3>
                </div>
                {/*body*/}
                <div className=" p-6 text-lg">
                  <div className="flex">
                    <div className="relative w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-semibold">
                        {firstName.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="ml-2 flex items-center justify-center">
                      {firstName}
                    </div>
                  </div>
                  <p className="my-4 text-blueGray-500 text-base leading-relaxed">
                    Amount in Rs
                  </p>
                  <div>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500"
                        placeholder="Enter Amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    type="button"
                    className="  rounded-md background-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-black "
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="  rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    onClick={() => transfer()}
                  >
                    Initiate Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
