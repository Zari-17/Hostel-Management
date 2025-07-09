export const getTimeAgo = (date, toDate) => {
  var seconds = Math.floor((toDate - date) / 1000);

  var interval = seconds / 86400;

  if (Math.floor(interval) < 0) {
    if (-Math.floor(interval) == 1) return -Math.floor(interval) + " day extra";
    return -Math.floor(interval) + " days extra";
  }
  if (Math.floor(interval) == 1) return Math.floor(interval) + " day left";
  return Math.floor(interval) + " days left";
};

export const getTimeLeft = (date, toDate) => {
  var seconds = Math.floor((toDate - date) / 1000);
  var interval = seconds / 86400;
  return Math.floor(interval);
};

export const getNextMonth = (monthNo) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[monthNo];
  if (month == "Jan") return "Feb";
  else if (month == "Feb") return "Mar";
  else if (month == "Mar") return "Apr";
  else if (month == "Apr") return "May";
  else if (month == "May") return "Jun";
  else if (month == "Jun") return "Jul";
  else if (month == "Jul") return "Aug";
  else if (month == "Aug") return "Sep";
  else if (month == "Sep") return "Oct";
  else if (month == "Oct") return "Nov";
  else if (month == "Nov") return "Dec";
  else if (month == "Dec") return "Jan";
};

export const getNextMonthDate = (date) => {
  const userDate = date;
  let dateMade;
  if (getNextMonth(userDate.getMonth()) == "Jan") {
    dateMade =
      getNextMonth(userDate.getMonth()) +
      " " +
      userDate.getDate() +
      " " +
      (userDate.getFullYear() + 1);
  } else {
    dateMade =
      getNextMonth(userDate.getMonth()) +
      " " +
      userDate.getDate() +
      " " +
      userDate.getFullYear();
  }
  const newDate = new Date(dateMade);
  return newDate;
};

export const isPaid = (date) => {
  if (new Date() > getNextMonthDate(date)) {
    return "UNPAID";
  }
  return "PAID";
};

export const getDays = (member) => {
  const lastPaid =
    member.feesHistory.length > 0
      ? new Date(member.feesHistory[member.feesHistory.length - 1])
      : new Date(member.checkInDate);
  return getTimeLeft(
    new Date(),
    member.feesHistory.length > 0 ? getNextMonthDate(lastPaid) : lastPaid
  );
};
export const arrange = (members) => {
  let memberArranged = [];
  members.forEach((item) => memberArranged.push(item));
  for (let i = 0; i < memberArranged.length; i++) {
    for (let j = 0; j < memberArranged.length - 1; j++) {
      if (getDays(memberArranged[j]) > getDays(memberArranged[j + 1])) {
        let temp = memberArranged[j];
        memberArranged[j] = memberArranged[j + 1];
        memberArranged[j + 1] = temp;
      }
    }
  }
  return memberArranged;
};
