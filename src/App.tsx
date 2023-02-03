import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { useStore } from "./store/store";

function App() {
  const getAllUser = useStore((state) => state.getAllUser);
  const data = useStore((state) => state.users);
  const removeUser = useStore((state) => state.removeUser);

  useEffect(() => {
    getAllUser();
  }, []);

  if (data) {
    return (
      <div>
        {data.map((e, i) => (
          <h1
            key={i}
            className="bg-blue-800 m-5 p-5 text-white"
            // onClick={() => {
            //   removeUser(e._id);
            //   // console.log(e._id);
            // }}
          >
            {e.firstName}
          </h1>
        ))}
      </div>
    );
  }
  return (
    <div>
      <h1>No DATA FOUND</h1>
    </div>
  );
}

export default App;
