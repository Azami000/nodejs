"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [userDetail, setUserDetail] = useState({});
  const { push } = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get("http://localhost:8000/usersss");

    push("/login");
    console.log(response.data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col w-[300px] gap-2 ">
        <input
          className="border"
          type="text"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="border"
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
