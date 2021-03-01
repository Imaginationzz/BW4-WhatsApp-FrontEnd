//INITIAL LOGIN STATE
export const loginState = {
  username: "",
  password: "",
};

//HANDLE SUBMIT
export const checkValidity = (e) => {
  e.preventDefault();
  const input = e.currentTarget;
  if (input.checkValidity() === false) {
    e.stopPropagation();
  }
};
