import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext.jsx";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const {fetchPosts} = PostData()

  const { registerUser, loading } = UserData();
  const navigate = useNavigate();

  const changeFileHandler = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };

  return (
    <>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:[mt-40px]">
            <div className="w-full md:w-3/4">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
                  Register to social media
                </h1>
              </div>

              <form onSubmit={onSubmitHandler}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  {filePrev && (
                    <img
                      src={filePrev}
                      className="w-[180px] h-[180px] rounded-full"
                      alt=""
                    />
                  )}
                  <input
                    onChange={changeFileHandler}
                    type="file"
                    className="custom-input"
                    required
                    accept="image/*"
                  />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="custom-input"
                    placeholder="username"
                    required
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="custom-input"
                    placeholder="Email"
                    required
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="custom-input"
                    placeholder="Password"
                    required
                  />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="text-center mt-7">
                  <button className="auth-btn" type="submit ">
                    Register
                  </button>
                </div>
              </form>
            </div>

            <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-500 to-green-400 items-center justify-center flex">
              <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                <h1 className="text-5xl">Have Account?</h1>
                <h1 className="py-3">Login to Social Media</h1>
                <Link
                  to="/login"
                  className="bg-white rounded-2xl px-4 text-emerald-400 p-1"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
