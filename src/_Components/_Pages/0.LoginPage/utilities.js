//INITIAL LOGIN STATE
export const loginState = {
  username: "",
  password: "",
};

//INITIAL SIGN IN STATE
export const signInState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
};

//HANDLE SUBMIT
export const checkValidity = (e) => {
  e.preventDefault();
  const input = e.currentTarget;
  if (input.checkValidity() === false) {
    e.stopPropagation();
  }
};

//HANDLE ONCHANGE
export const handleOnChange = (e, state) => {
  let filledForm = { ...state };
  let currentId = e.currentTarget.id;
  filledForm[currentId] = e.currentTarget.value;
  return filledForm;
};

//POST NEW USER
export const createUser = async (user) => {
  const response = await fetch(`${process.env.REACT_APP_URL_DEV}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  const result = await response.json();
  // console.log("Success Post", result);
  //GET ACCESS_TOKEN
  const tokenResponse = await fetch(
    `${process.env.REACT_APP_URL_DEV}/users/authorize`,
    {
      method: "POST",
      body: JSON.stringify({
        username: result.username,
        password: user.password,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }
  );
  const tokenResult = await tokenResponse.json();
  // console.log("Success Get Token", tokenResult);
  return { access_token: tokenResult, user: result };
};

//AUTHORIZE USER
export const authorizeUser = async (user) => {
  const response = await fetch(
    `${process.env.REACT_APP_URL_DEV}/users/authorize`,
    {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    }
  );
  const result = await response.json();
  // console.log("Success Get Token", result.access_token);
  const userResponse = await fetch(
    `${process.env.REACT_APP_URL_DEV}/users/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    }
  );
  const userResult = await userResponse.json();
  return { access_token: result, user: userResult };
};
