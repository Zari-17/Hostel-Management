import React, { useState } from "react";

// layout for page

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import ScreenShimmer from "../components/Shimmers/ScreenShimmer";

export default function Login({}) {
  const [state, setState] = useState({ email: "", password: "" });
  const [load, setLoad] = useState(true);

  const _login = () => {
    setLoad(false);
    signInWithEmailAndPassword(auth, state.email, state.password).catch(
      (er) => {
        setLoad(true);
        console.log(er);
      }
    );
  };
  const handleChange = (propertyName, change) => {
    // TODO: we will use this type property later for validating if the input is correct
    setState({ ...state, [propertyName]: change.target.value });
  };

  return (
    <>
      {load ? (
        <div className="container mx-auto px-4  h-screen">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg  border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-slate-400 text-center mb-3 font-bold h-5"></div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-black bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        required
                        onChange={(e) => handleChange("email", e)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-slate-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-slate-300 text-black  bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        required
                        onChange={(e) => handleChange("password", e)}
                      />
                    </div>
                    <div className="text-center mt-6" onClick={() => _login()}>
                      <button
                        className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        // type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ScreenShimmer />
      )}
    </>
  );
}
