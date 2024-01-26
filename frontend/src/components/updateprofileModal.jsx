import React, { useEffect, useState } from "react";
import authService from "../services/authService";
import Successful from "./successful";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileModal({ firstName, lastName, password }) {
  const [showModal, setShowModal] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newPassword, setNewPassword] = useState(password);
  const navigate = useNavigate();

  async function update(e) {
    try {
      await authService.update(newFirstName, newLastName, newPassword).then(
        (response) => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          console.log("error");
        }
      );
    } catch (err) {
      console.log("error");
    }
  }

  return (
    <>
      <a
        className="  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        Update Profile
      </a>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5  rounded-t">
                  <h3 className="text-3xl font-semibold">Update Details</h3>
                </div>
                {/*body*/}
                <div className="p-8">
                  <div className="flex justify-between pb-4">
                    <div className="py-1.5 pl-4">First Name</div>
                    <input
                      type="text"
                      className="block w-4/6 rounded-md border-0 py-1.5 pl-4 pr-20 ml-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-black-500"
                      placeholder={firstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between pb-4">
                    <div className="py-1.5 pl-4">Last Name</div>
                    <input
                      className="block w-4/6 rounded-md border-0 py-1.5 pl-4 pr-20 ml-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-black-500"
                      placeholder={lastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between pb-4">
                    <div className="py-1.5 pl-4 ">Password</div>
                    <input
                      className="block w-4/6 rounded-md border-0 py-1.5 pl-4 pr-20 ml-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-black-500"
                      placeholder={password}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
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
                    onClick={update}
                  >
                    Update !
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
