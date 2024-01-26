import { DBUserComponent } from "./dbUserComponent";
import authService from "../services/authService";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function DashboardComponent() {
  const [amount, setAmount] = useState();
  const [filter, setFilter] = useState("");
  const [bulkUsers, setbulkUsers] = useState([]);
  const navigate = useNavigate();
  async function getAmount(e) {
    try {
      await authService.balance().then(
        (response) => {
          console.log(response.balance);
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

  function logout() {
    localStorage.removeItem("user");
    navigate("/signin");
  }
  useEffect(() => {
    getUsers();
  }, [filter]);
  useEffect(() => {
    getAmount();
  });

  return (
    <div className=" p-4 relative bg-red-400 bg-opacity-25 flex justify-center  min-h-screen">
      <div className="bg-white mt-10 rounded-md shadow-md  w-3/4 h-1/4">
        <div className="flex justify-between shadow-md p-6">
          <div>Payments App</div>
          <div className="flex">
            <div>Hello, (User)</div>
            <div className="ml-1 mr-2">img</div>
            <button onClick={logout}>logout</button>
          </div>
        </div>
        <div className="p-6 flex">
          <div>Your Balance</div>
          <div className="ml-4">{amount}</div>
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

        {}
      </div>
    </div>
  );
}
