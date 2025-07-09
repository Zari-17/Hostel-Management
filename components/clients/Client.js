import { useRouter } from "next/router";
import React from "react";
import { getTimeAgo, getNextMonthDate, isPaid } from "../../utils/time";

const Client = ({ member }) => {
  const router = useRouter();
  const getDays = () => {
    const lastPaid =
      member.feesHistory.length > 0
        ? new Date(member.feesHistory[member.feesHistory.length - 1])
        : new Date(member.checkInDate);
    return getTimeAgo(
      new Date(),
      member.feesHistory.length > 0 ? getNextMonthDate(lastPaid) : lastPaid
    );
  };

  const isFeesPaid =
    member.feesHistory.length > 0
      ? isPaid(new Date(member.feesHistory[member.feesHistory.length - 1]))
      : "UNPAID";
  const openMember = () => {
    router.push(`/hostel/clients/${member.id}`);
  };

  return (
    <div
      className="bg-slate-100 h-14 rounded px-2 font-raleway mb-1 items-center flex justify-between cursor-pointer w-full"
      onClick={openMember}
    >
      <div>
        <h1 className="text-sm">{member.name}</h1>
        <h2 className="text-xs">{member.checkInDate}</h2>
      </div>
      <div className="flex item-center">
        <h1 className="text-xs">{getDays()}</h1>
        <div
          className={`h-8 w-16 justify-center px-1 rounded text-white ml-2  flex items-center text-xs ${
            isFeesPaid == "PAID" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isFeesPaid}
        </div>
      </div>
    </div>
  );
};

export default Client;
