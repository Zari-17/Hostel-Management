import React, { useEffect, useState } from "react";
import Client from "../../../components/clients/Client";
import InputField from "../../../components/InputField";
import { auth, database } from "../../../firebase";
import { get, ref } from "firebase/database";
import ClientShimmer from "../../../components/Shimmers/ClientShimmer";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { getDays } from "../../../utils/time";
const Clients = () => {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [load, setLoad] = useState(false);

  // time

  // api hit
  const _getClients = () => {
    get(ref(database, "clients"))
      .then((res) => {
        const arr = [];
        for (const key in res.toJSON()) {
          const dataEx = {
            id: key,
            name: res.toJSON()[key]?.name,
            contact: res.toJSON()[key]?.contact,
            cnic: res.toJSON()[key]?.cnic,
            checkInDate: res.toJSON()[key]?.checkInDate,
            feesHistory: res.toJSON()[key]?.feesHistory
              ? Object.values(res.toJSON()[key].feesHistory)
              : [],
          };
          arr.push(dataEx);
        }
        setState(arr.sort((a, b) => getDays(a) - getDays(b)));
        setLoad(true);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const _signOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("/login");
      })
      .catch((er) => console.log(er));
  };
  useEffect(_getClients, []);

  const addPressed = () => {
    router.push("/hostel/clients/form/create");
  };

  return (
    <>
      <div className="bg-black h-14 w-full flex items-center justify-between px-4">
        <div className="text-white text-lg">Hostel Management System</div>
        <div className="flex space-x-1">
          <div
            className="p-2 bg-blue-500 text-white w-fit rounded cursor-pointer"
            onClick={addPressed}
          >
            Add
          </div>
          <div
            className="p-2 bg-red-500 text-white w-fit rounded cursor-pointer"
            onClick={_signOut}
          >
            Sign out
          </div>
        </div>
      </div>
      <div className="bg-black pb-1 w-full px-4 text-white justify-between flex items-center">
        <div className="text-3xl">{`Total : ${state.length}`}</div>
        <div>
          <div>{`Paid : ${
            state.filter((item) => getDays(item) >= 0).length
          }`}</div>
          <div>{`Due : ${
            state.length - state.filter((item) => getDays(item) >= 0).length
          }`}</div>
        </div>
      </div>

      <div className="flex flex-col px-4 pt-4 pb-10">
        <InputField
          placeholder={"Search"}
          onChange={(e) => setSearch(e.target.value)}
        />
        {load
          ? state
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => <Client member={item} key={index} />)
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1].map((item, index) => (
              <ClientShimmer key={index} />
            ))}
      </div>
    </>
  );
};

export default Clients;
