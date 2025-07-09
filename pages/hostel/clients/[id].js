import { get, ref, remove, set } from "firebase/database";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Alert from "../../../components/Alert";
import ScreenShimmer from "../../../components/Shimmers/ScreenShimmer";
import { database } from "../../../firebase";
import { getNextMonthDate, isPaid } from "../../../utils/time";

const Member = () => {
  const router = useRouter();
  const query = router.query.id;
  const [load, setLoad] = useState(false);
  const [showAlert, setShowAlert] = useState();
  const [state, setState] = useState({});
  const [copy, setCopy] = useState(false);

  const isFeesPaid = () =>
    state.feesHistory.length > 0
      ? isPaid(new Date(state.feesHistory[state.feesHistory.length - 1]))
      : "UNPAID";

  const getMemberData = () => {
    return [
      { key: "Name", value: state.name },
      { key: "Phone", value: state.contact },
      { key: "CNIC", value: state.cnic },
      { key: "Check-in", value: state.checkInDate },
      {
        key: "Paid till",
        value: getNextMonthDate(
          new Date(state.feesHistory[state.feesHistory.length - 1])
        )
          .toDateString()
          .substring(4),
      },
    ];
  };
  const editClient = () => {
    router.push(`/hostel/clients/form/${query}`);
  };

  const updateUser = (data) => {
    setLoad(false);
    set(ref(database, `clients/${query}`), data)
      .then((res) => {
        _getClient();
      })
      .catch((er) => {
        setLoad(true);
        console.log(er);
      });
  };

  const getDate = () => {
    if (state?.feesHistory?.length > 0) {
      return getNextMonthDate(
        new Date(state.feesHistory[state.feesHistory.length - 1])
      );
    } else {
      return new Date(state.checkInDate);
    }
  };
  const date = getDate();
  const _updateFees = () => {
    updateUser({
      checkInDate: state.checkInDate,
      cnic: state.cnic,
      contact: state.contact,
      feesHistory: [...state.feesHistory, date.toDateString().substring(4)],
      name: state.name,
    });
  };

  const updateFees = () => {
    const feesFrom = (() => {
      if (state.feesHistory.length > 0) {
        return getNextMonthDate(
          new Date(state.feesHistory[state.feesHistory.length - 1])
        );
      } else {
        return new Date(state.checkInDate);
      }
    })()
      .toDateString()
      .substring(4);

    const feesTo = getNextMonthDate(new Date(feesFrom))
      .toDateString()
      .substring(4);

    setShowAlert({
      message: `Fees paid from ${feesFrom} to ${feesTo}.`,
      onYesPress: () => {
        //updating fees
        _updateFees();
        setShowAlert({});
      },
      onNoPress: () => {
        setShowAlert({});
      },
      show: true,
    });
  };

  const _deleteFees = (fees) => {
    updateUser({
      checkInDate: state.checkInDate,
      cnic: state.cnic,
      contact: state.contact,
      feesHistory: state?.feesHistory?.filter((item) => item !== fees),
      name: state.name,
    });
  };

  const removeFees = (fees) => {
    setShowAlert({
      message: `Are you sure you want to delete fees ${fees}?`,
      onYesPress: () => {
        _deleteFees(fees);
        setShowAlert({});
      },
      onNoPress: () => {
        setShowAlert({});
      },
      show: true,
    });
  };

  const deleteClient = () => {
    setShowAlert({
      message: `Are you sure you want to delete ${state.name}?`,
      onYesPress: () => {
        remove(ref(database, `/clients/${query}`))
          .then((res) => {
            router.replace("/hostel/clients");
          })
          .catch((er) => {
            console.log(er);
          });
        setShowAlert({});
      },
      onNoPress: () => {
        setShowAlert({});
      },
      show: true,
    });
  };

  const copyNotification = () => {
    let message = String(
      `As-salamu alaykum, ${state.name.trim()}. I hope you’re well. This is just to remind you that your fees is paid till ${date.toDateString()}.I’m sure you’re busy, but I’d appreciate if you could take a moment and look over the payment when you get a chance. Feel free to contact on 0315-2761023 if you have any questions regarding payment or you can pay the fees by online bank transfer and then send screenshot of the TRX ID to the provided number. Bank Account details: Bank name: Bank Al-Habib Account no. 1119-0981-007157-01-1 Account holder name: Tayyab Hassan Chaudhry Thank you! Regards: Harmain Boys Hostel Management`
    );
    navigator.clipboard.writeText(message);
    setCopy(true);
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
  useEffect(_getClient, []);

  return (
    <>
      {load ? (
        <div className="min-h-screen w-screen font-raleway  justify-between flex flex-col">
          <div className="flex flex-col px-4 pt-4">
            {getMemberData().map((item, index) => (
              <div className="flex items-center" key={index}>
                <div className="w-2/6 ">{`${item.key}`}</div>
                <div>{`: ${item.value}`}</div>
              </div>
            ))}
            <div className="flex items-center">
              <div className="w-2/6 ">{`Status`}</div>
              <div>{`:`}</div>
              <div
                className={`text-white rounded p-1 ml-1 ${
                  isFeesPaid() == "PAID" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {isFeesPaid()}
              </div>
            </div>
            <div className="flex justify-between">
              <div
                className="p-2 bg-white shadow-md w-full rounded self-center  mt-5 cursor-pointer flex justify-center"
                onClick={deleteClient}
              >
                Delete client
              </div>
              <div
                className="p-2 bg-white shadow-md w-full ml-2 rounded self-center mt-5 cursor-pointer flex justify-center"
                onClick={editClient}
              >
                Edit client
              </div>
            </div>
            <div className="flex flex-col items-center w-full my-5 ">
              <div>Fees History</div>
            </div>
            <div className="h-3/6 overflow-scroll">
              {state.feesHistory
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    className="h-10 bg-white mb-1 rounded shadow flex items-center px-4  text-sm"
                    key={index}
                  >
                    <div className="w-5/12 flex">
                      <div className="text-green-500 mr-1">{"From :"}</div>
                      {item}
                    </div>
                    <div className="w-5/12 flex">
                      <div className="text-red-500 mr-1 ml-3">{"To : "}</div>
                      {getNextMonthDate(new Date(item))
                        .toDateString()
                        .substring(4)}
                    </div>
                    <div className="flex-1" />
                    <div
                      className="bg-red-500 text-white h-6 items-center flex w-6 justify-center rounded-full cursor-pointer"
                      onClick={() => removeFees(item)}
                    >
                      x
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex w-full justify-between mb-4 px-4">
            <div
              className="h-10 flex items-center justify-center shadow-md rounded bg-white w-[48%] cursor-pointer "
              onClick={updateFees}
            >
              Update Fees
            </div>
            <div
              className={`h-10 flex items-center justify-center rounded shadow-md bg-white w-[48%] cursor-pointer ${
                copy ? "text-white bg-black" : ""
              }`}
              onClick={copyNotification}
            >
              {copy ? "Copied" : "Copy Notification"}
            </div>
          </div>
          <Alert {...showAlert} />
        </div>
      ) : (
        <ScreenShimmer />
      )}
    </>
  );
};

export default Member;
