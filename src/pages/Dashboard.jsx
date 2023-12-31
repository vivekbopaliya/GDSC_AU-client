import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../index.css";
import { AiFillSetting, AiTwotoneStar } from "react-icons/ai/";
import { GrCircleInformation } from "react-icons/gr";
import Popup from "reactjs-popup";
import EditUser from "../components/EditUser";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const userID = localStorage.getItem("userID");
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userID) {
      return navigate("/");
    }
    (async () => {
      const res = await axios.get(
        "https://gdsc-au-server.onrender.com/users/getAllUsers"
      );
      setUsers(res.data);
    })();

    (async () => {
      const user = await axios.get(
        `https://gdsc-au-server.onrender.com/users/currentUser/${userID}`
      );
      setCurrentUser(user.data);
      setLoading(true);
    })();
  }, []);

  return (
    <div className="flex bg-gray-100 w-screen flex-col h-screen  items-center ">
      <div className="w-screen">
        <Navbar />
      </div>

      <div className="mt-28  justify-center items-center  lg:w-4/6 sm:w-screen  flex  flex-col   ">
        <p
          className={`press sm:px-4 lg:text-6xl sm:text-5xl ${
            currentUser.role !== "Admin" ? "mb-14" : ""
          } text-center text-gray-800 `}
        >
          <span className="text-green-500 ">C</span>urrent{" "}
          <span className="text-yellow-400">D</span>ashboard
        </p>
        {currentUser.role === "Admin" && (
          <p className="flex gap-2 mb-10 mt-10 rounded-md text-sm px-5 py-2 bg-red-500 ring ring-white text-white">
            <GrCircleInformation size={20} /> You're admin, only you are
            eligible to edit!
          </p>
        )}
      </div>

      {isLoading && (
        <div className="lg:px-14 sm:px-4  h-auto py-1 rounded-lg lg:w-7/12 sm:w-full flex overflow-y-auto  flex-col">
          {users
            .filter((user) => user.role !== "Admin")
            .map((user, index) => {
              return (
                <div className="flex lg:gap-20 sm:gap-7 rounded-xl box-shadow  lg:justify-between justify-around   bg-white text-xl font-medium  hover:bg-blue-100 translate duration-100 ease-in-out cursor-pointer my-4 px-16  py-4  items-center">
                  <div className="flex lg:gap-10 sm:gap-5 items-center justify-center text-2xl">
                    <p
                      className={`${
                        index === 0
                          ? "text-blue-500   lg:text-6xl sm:text-2xl "
                          : index === 1
                          ? "text-green-500 lg:text-6xl sm:text-2xl"
                          : index === 2
                          ? "text-yellow-500 lg:text-6xl sm:text-2xl"
                          : "text-black py-1 lg:text-4xl sm:text-xl"
                      }`}
                    >
                      #{index + 1}
                    </p>
                  </div>
                  <p
                    className={`${
                      index === 0
                        ? "py-2 lg:text-3xl sm:text-lg"
                        : index === 1
                        ? " py-2 lg:text-3xl sm:text-lg"
                        : index === 2
                        ? "  py-2 lg:text-3xl sm:text-lg"
                        : "text-black lg:text-2xl sm:text-lg"
                    } lg:w-2/6 sm:w-5/6 font-bold`}
                  >
                    {user.name}
                  </p>
                  {/* <p className="w-2/3  truncate">{user.email}</p> */}
                  <p className=" flex justify-center gap-1 items-center">
                    <span className="text-blue-600 flex justify-center items-center gap-2 lg:text-5xl sm:text-3xl press">
                      {user.points}
                    </span>{" "}
                    <AiTwotoneStar size={38} />
                    {currentUser.role === "Admin" && (
                      <Popup
                        trigger={
                          <button className="mx-5 outline-none">
                            <AiOutlineSetting size={26} />
                          </button>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="  px-20 w-auto flex justify-center items-center flex-col  py-8 rounded-md">
                            <EditUser close={close} user={user} index={index} />
                          </div>
                        )}
                      </Popup>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      )}

      {!isLoading && (
        <div className="px-10 py-10 h-screen text-4xl  shadow rounded-lg w-5/6 flex overflow-y-auto  flex-col">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
