import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { useStore } from "./store/store";

const formError = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  age: "",
};

function App() {
  const [err, seterr] = useState(formError);
  const getAllUser = useStore((state) => state.getAllUser);
  const data = useStore((state) => state.users);
  const removeUser = useStore((state) => state.removeUser);
  const addUser = useStore((state) => state.addUser);

  // state-for-form-field-start
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string | number>("");
  const [age, setAge] = useState<string | number>("");
  // state-for-form-field-end
  useEffect(() => {
    getAllUser();
  }, []);

  const handleFormSubmission = (
    e: EventTarget & {
      firstName: { value: string };
      lastName: { value: string };
      phoneNumber: { value: number };
      age: { value: number };
    }
  ) => {
    if (!e.firstName.value.trim()) {
      seterr((prevState) => ({
        ...prevState,
        ...{ firstName: "Field Should not be empty" },
      }));
      return;
    }
    if (!e.lastName.value.trim()) {
      seterr((prevState) => ({
        ...prevState,
        ...{ lastName: "Field Should not be empty" },
      }));
      return;
    }
    if (!e.phoneNumber.value) {
      seterr((prevState) => ({
        ...prevState,
        ...{ phoneNumber: "Field Should not be empty" },
      }));
      return;
    }
    if (!e.age.value) {
      seterr((prevState) => ({
        ...prevState,
        ...{ age: "Field Should not be empty" },
      }));
      return;
    }
    addUser({
      firstName: e.firstName.value,
      lastName: e.lastName.value,
      phoneNumber: e.phoneNumber.value,
      age: e.age.value,
    });
    setFirstName("");
    setLastName("");
    setAge("");
    setPhoneNumber("");
  };

  if (data) {
    return (
      <div className="min-h-screen min-w-full bg-[#FFD4D4]  flex items-center justify-center flex-row  flex-wrap gap-20 ">
        {/* Form-div-start-here */}
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              firstName: { value: string };
              lastName: { value: string };
              phoneNumber: { value: number };
              age: { value: number };
            };
            handleFormSubmission(target);
          }}
          className="flex bg-[#CDE990] flex-col justify-center items-center p-10 gap-4 shadow px-20  sm:h-[450px] sm:w-auto w-[100vw]"
        >
          <h1 className="font-sans text-4xl mb-6 text-[#80806c]">UserForm</h1>
          <input
            type="text"
            name="firstName"
            id=""
            placeholder="FirstName"
            className="bg-[#FFFFE8] border w-72 h-10 p-5 rounded"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
          <h1
            className={`${
              err.firstName ? "flex" : "hidden"
            } self-start text-[12px] text-red-500 font-mono`}
          >
            {err.firstName}
          </h1>
          <input
            type="text"
            name="lastName"
            id=""
            placeholder="LastName"
            className="bg-[#FFFFE8] border w-72 h-10 p-5 rounded"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
          <h1
            className={`${
              err.lastName ? "flex" : "hidden"
            } self-start text-[12px] text-red-500 font-mono`}
          >
            {err.lastName}
          </h1>
          <input
            type="number"
            name="phoneNumber"
            id=""
            placeholder="PhoneNumber"
            className="bg-[#FFFFE8] border w-72 h-10 p-5 rounded"
            onChange={(e) => {
              setPhoneNumber(Number(e.target.value));
            }}
            value={phoneNumber}
          />
          <h1
            className={`${
              err.phoneNumber ? "flex" : "hidden"
            } self-start text-[12px] text-red-500 font-mono`}
          >
            {err.phoneNumber}
          </h1>
          <input
            type="number"
            name="age"
            id=""
            placeholder="Age"
            className="bg-[#FFFFE8] border w-72 h-10 p-5 rounded"
            onChange={(e) => {
              setAge(Number(e.target.value));
            }}
            value={age}
          />
          <h1
            className={`${
              err.age ? "flex" : "hidden"
            } self-start text-[12px] text-red-500 font-mono`}
          >
            {err.age}
          </h1>
          <button
            type="submit"
            className="bg-[#FFFFE8] text-[#7f8565] p-2 px-9 rounded mt-6 border shadow font-bold "
          >
            Submit
          </button>
        </form>
        {/* Form-div-end-here */}

        {/* Data-list-start-here */}
        <div className="">
          {/* List-heading-start */}
          <div className="bg-[#AACB73] w-[100vw] sm:w-auto sm:px-[200px] text-white p-2 shadow-2xl text-center ">
            <h1 className="text-xl">Data</h1>
          </div>
          {/* List-heading-end */}

          {/* List-div-start-here */}
          <div className="bg-[#CDE990] flex flex-col gap-2 p-2 overflow-scroll w-[100vw] sm:w-auto h-[400px]">
            {data.map((e, i) => (
              <>
                {/* card-start */}
                <div
                  className="bg-[#FFFFE8] p-5 rounded flex flex-row items-center justify-between"
                  key={i}
                >
                  <details>
                    <summary>
                      <span className="font-serif text-[19px]">Name:</span>{" "}
                      <span className="text-[#5a5a4e]">
                        {e.firstName + " " + e.lastName}
                      </span>
                    </summary>
                    <h1>
                      <span className="font-serif text-xl">PhoneNumber:</span>{" "}
                      <span className="text-[#5a5a4e]">{e.phoneNumber}</span>
                    </h1>
                    <h1>
                      <span className="font-serif text-xl">Age:</span>{" "}
                      <span className="text-[#5a5a4e]">{e.age}</span>
                    </h1>
                  </details>
                  <div className="flex flex-row gap-2">
                    <button
                      className="bg-red-600 text-white rounded p-1 px-2"
                      onClick={() => {
                        removeUser(String(e._id));
                      }}
                    >
                      delete
                    </button>
                    <button className="bg-blue-600 text-white rounded p-1 px-2">
                      edit
                    </button>
                  </div>
                </div>
                {/* card-end */}
              </>
            ))}
          </div>
          {/* List-div-end-here */}
        </div>
        {/* Data-list-end-here */}
      </div>
    );
  }
  return (
    <div>
      <h1>No data found</h1>
    </div>
  );
}

export default App;
