//GET PROFILE
export const getProfile = async (userId) => {
  let response = await fetch(
    `${process.env.REACT_APP_URL_DEV}/users/${userId}`
  );
  let result = await response.json();
  return result;
};
