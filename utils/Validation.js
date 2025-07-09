export default (value = "", { type = "", payload, required = false }) => {
  // converting if we have a number in value
  value = String(value);
  // checking if required
  if (required && value.length == 0) {
    return "*Required";
  }

  // log
  if (false) {
    console.log("validating :", {
      type: type,
      value: value,
      payload: payload,
      required: required,
    });
  }
  // checking by type
  switch (type) {
    // max
    case "max":
      if (value.length <= payload) {
        return "";
      }
      return `max length should be ${payload}`;
    // min
    case "min":
      if (value.length >= payload) {
        return "";
      }
      return `min length should be ${payload}`;

    // range
    case "range":
      if (value?.length >= payload?.min && value.length <= payload?.max) {
        return "";
      } else if (!(value?.length >= payload?.min)) {
        return `min length should be ${payload}`;
      }
      return `max length should be ${payload}`;

    // email
    case "email":
      const emailSchema =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (value.match(emailSchema)) {
        return "";
      }
      return "Invalid email ";

    // phone
    case "phone":
      if (value.match(/^[0-9]*$/)) {
        return "";
      }
      return "Invalid phone number";
    // number
    case "number":
      if (value.match(/^[0-9]*$/)) {
        return "";
      }
      return "Should be number";
    default:
      return "";
  }
};
