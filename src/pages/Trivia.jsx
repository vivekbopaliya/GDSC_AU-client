import React from "react";
import Navbar from "../components/Navbar";
import Question from "../components/Question";
import Response from "../components/Response";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Trivia = () => {
  const [question, setQuestion] = React.useState(true);
  const [response, setResponse] = React.useState(false);
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  const cookie = localStorage.getItem("userID");

  React.useEffect(() => {
    if (!cookie) {
      navigate("/");
    }
<<<<<<< HEAD
    (async () => {
      const res = await axios.get(
        `https://gdsc-au-server.onrender.com/users/currentUser/${cookie}`
      );
      setUser(res.data);
    })();
=======
   
>>>>>>> 5ba5771d001809a52639b0ba7e902a3affba2e7d
  }, []);

  return (
    <div className="w-screen overflow-y-auto bg-gray-200  h-screen">
      <Navbar />

      <div className="flex  gap-3 pt-20   items-start justify-center   ">
        <button
          onClick={() => {
            setResponse(false);
            setQuestion(true);
          }}
          className="focus:underline  focus:text-blue-500 focus:border-b-2-black py-2 px-3 "
        >
          Questions
        </button>
<<<<<<< HEAD
        {user?.role === "Admin" && (
=======
        
>>>>>>> 5ba5771d001809a52639b0ba7e902a3affba2e7d
          <button
            onClick={() => {
              setQuestion(false);
              setResponse(true);
            }}
            className="focus:underline focus:text-blue-500 focus:border-b-2-black py-2 px-3"
          >
            Responses
          </button>
<<<<<<< HEAD
        )}
=======
   
>>>>>>> 5ba5771d001809a52639b0ba7e902a3affba2e7d
      </div>

      {question && (
        <div className="flex my-2   w-full  justify-center  h-full">
          <Question />
        </div>
      )}

      {response && (
        <div className="flex my-2   w-full  justify-center  h-full">
          <Response />
        </div>
      )}
    </div>
  );
};

export default Trivia;
