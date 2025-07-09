import { get, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../../../../components/InputField";
import ScreenShimmer from "../../../../components/Shimmers/ScreenShimmer";
import { database } from "../../../../firebase";
import { v4 as uuidv4 } from "uuid";

import Validation from "../../../../utils/Validation";
const Form = () => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({
    checkInDate: "",
    cnic: "",
    contact: "",
    name: "",
  });
  const router = useRouter();
  const query = router.query.id;
  const [load, setLoad] = useState({});

  const handleChange = (
    propertyName,
    change,
    validate = {
      type: "",
      payload: "",
      required: false,
    }
  ) => {
    // validating
    if (validate?.type?.length > 0) {
      setErrors({
        ...errors,
        [propertyName]: Validation(change.target.value, validate),
      });
    }
    setState({ ...state, [propertyName]: change.target.value });
  };

  // validation
  const validate = () => {
    const errorsChecked = {
      checkInDate: Validation(state.checkInDate, {
        required: true,
      }),
      cnic: Validation(state.cnic, {
        required: true,
      }),
      contact: Validation(state.contact, {
        type: "number",
        required: true,
      }),
      name: Validation(state.name, {
        required: true,
      }),
    };
    setErrors(errorsChecked);
    let foundErrors =
      Object.values(errorsChecked)?.filter((item) => item != "")?.length > 0
        ? true
        : false;
    // will return true if no errors
    return !foundErrors;
  };

  // getting data from api
  const _getClient = () => {
    get(ref(database, `clients/${query}`))
      .then((res) => {
        setState({
          ...res.toJSON(),
          feesHistory: res.toJSON()?.feesHistory
            ? Object.values(res.toJSON().feesHistory)
            : [],
        });
        setLoad(true);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const _addClient = () => {
    set(ref(database, `clients/${state.id}`), {
      checkInDate: state.checkInDate,
      cnic: state.cnic,
      contact: state.contact,
      feesHistory: [state.checkInDate],
      name: state.name,
    })
      .then((res) => {
        router.replace("/hostel/clients");
      })
      .catch((er) => {
        setLoad(true);
        console.log(er);
      });
  };

  const _updateClient = () => {
    set(ref(database, `clients/${query}`), {
      checkInDate: state.checkInDate,
      cnic: state.cnic,
      contact: state.contact,
      feesHistory: state.feesHistory,
      name: state.name,
    })
      .then((res) => {
        router.replace(`/hostel/clients/${query}`);
      })
      .catch((er) => {
        setLoad(true);
        console.log(er);
      });
  };

  const addPressed = () => {
    if (validate()) {
      setLoad(false);
      if (query !== "create") {
        _updateClient();
      } else {
        _addClient();
      }
    }
  };

  useEffect(() => {
    if (query !== "create") {
      _getClient();
    } else {
      setState({
        id: uuidv4(),
        checkInDate: new Date().toDateString().substring(4),
        cnic: "",
        contact: "",
        name: "",
      });
    }
  }, []);
  return (
    <>
      {load ? (
        <div className="min-h-screen w-screen font-raleway px-2 pt-10 flex flex-col items-center">
          <InputField
            onChange={(e) =>
              handleChange("name", e, {
                type: "max",
                payload: 30,
                required: true,
              })
            }
            placeholder={"Ali"}
            label="Name"
            value={state.name}
            error={errors.name}
          />
          <InputField
            onChange={(e) =>
              handleChange("contact", e, {
                type: "number",
                required: true,
              })
            }
            placeholder={"03000000000"}
            error={errors.contact}
            label="Contact"
            value={state.contact}
          />
          <InputField
            onChange={(e) =>
              handleChange("cnic", e, {
                type: "required",
                required: true,
              })
            }
            placeholder={"4000-000000-0"}
            label="CNIC"
            value={state.cnic}
            error={errors.cnic}
          />
          <InputField
            onChange={(e) =>
              handleChange("checkInDate", e, {
                type: "date",
                required: true,
              })
            }
            placeholder={"may 29 2022"}
            label="Check-in date"
            value={state.checkInDate}
            error={errors.checkInDate}
          />
          <div
            className="p-2 bg-black text-white shadow-md rounded self-center  mt-5 cursor-pointer flex justify-center w-fit"
            onClick={addPressed}
          >
            {query == "create" ? "Add" : "Update"} Client
          </div>
        </div>
      ) : (
        <ScreenShimmer />
      )}
    </>
  );
};

export default Form;
