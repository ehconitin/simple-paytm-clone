import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export function SigninComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();
    try {
      await authService.signin(username, password).then(
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
  async function getUser() {
    try {
      await authService.currentUser().then(
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
  useEffect(() => {
    getUser();
  });
  return (
    <div>
      <div className="relative p-4 bg-red-400 bg-opacity-25 flex items-center justify-center  min-h-screen">
        <div className="bg-white p-6 rounded-md shadow-md inline-block mx-auto w-max ">
          <div className="flex justify-center font-bold text-2xl ">Sign In</div>
          <div className="text-gray-500 mt-2">
            Enter your credentials to access your acount
          </div>

          <div>
            <label className="block text-sm mt-2 font-bold leading-6 text-gray-900">
              Email
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="Email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500"
                placeholder="johndoe@example.com"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mt-2 font-bold leading-6 text-gray-900">
              Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="Password"
                id="password"
                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center mt-4 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSignin}
          >
            Sign in
          </button>
          <div className="flex justify-center mr-1 mt-2">
            <div>Dont have an account?</div>
            <a className="ml-1 underline" href="/signup">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
