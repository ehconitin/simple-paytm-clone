import { DBUserComponent } from "./dbUserComponent";
import authService from "../services/authService";
import { useCallback, useEffect, useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import UpdateProfileModal from "./updateprofileModal";

export function DashboardComponent() {
  const [amount, setAmount] = useState();
  const [filter, setFilter] = useState("");
  const [bulkUsers, setbulkUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currUserFirstName, setCurrUserFirstName] = useState("");

  const navigate = useNavigate();
  async function getAmount(e) {
    try {
      await authService.balance().then(
        (response) => {
          setAmount(Math.floor(response.balance * 100) / 100);
        },
        (error) => {
          console.log("error");
        }
      );
    } catch (err) {
      console.log("error");
    }
  }

  async function getCurrUser(e) {
    try {
      await authService.currentUser().then(
        (response) => {
          setCurrentUser(response);
          setCurrUserFirstName(response.firstName);
        },
        (error) => {
          console.log("error1");
          navigate("/signup");
        }
      );
    } catch (err) {
      console.log("error2");
    }
  }

  const getUsers = useCallback(async () => {
    try {
      await authService.filterUsers(filter).then(
        (response) => {
          setbulkUsers(response.user);
        },
        (error) => {
          console.log("error");
        }
      );
    } catch (err) {
      console.log("error");
    }
  }, [filter]);

  function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("hidden");
  }

  function logout() {
    localStorage.removeItem("user");
    navigate("/signin");
  }
  useEffect(() => {
    getCurrUser();
  }, []);

  useEffect(() => {
    getUsers();
  }, [filter]);
  useEffect(() => {
    getAmount();
  }, []);

  return (
    <div className=" p-4 relative bg-red-400 bg-opacity-25 flex justify-center  min-h-screen">
      <div className="bg-white mt-10 rounded-md shadow-md  w-3/4 h-1/4">
        <div className="flex justify-between shadow-md p-6">
          <div className="flex items-center justify-center">Payments App</div>
          <div className="flex">
            <div className="flex items-center justify-center mr-3">
              Hello, {currUserFirstName}
            </div>
            <div className="relative">
              <button
                className=" w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                onClick={toggleDropdown}
              >
                <span className="text-gray-600 text-sm font-semibold">
                  {currUserFirstName.charAt(0).toUpperCase()}
                </span>
              </button>
              <div>
                <div
                  id="dropdown"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden"
                >
                  <div className="py-1">
                    <UpdateProfileModal
                      firstName={currentUser.firstName}
                      lastName={currentUser.lastName}
                      password={currentUser.password}
                    />
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex">
          <div>Your Balance</div>
          <div className="ml-4">₹ {amount}</div>
        </div>
        <div className="p-6 pt-0 pb-4">Users</div>
        <div>
          <div className="relative px-6 py-2 pt-0 ">
            <input
              type="text"
              name="filter"
              id="filter"
              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-500"
              placeholder="Search users..."
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        {bulkUsers.map((user) => {
          return (
            <div key={user._id}>
              <DBUserComponent
                firstName={user.firstName}
                lastName={user.lastName}
                id={user._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
