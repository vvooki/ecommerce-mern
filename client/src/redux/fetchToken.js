export const getTOKEN = () => {
  const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
  const currentUser = user && JSON.parse(user)?.currentUser;
  const TOKEN = currentUser?.accessToken;
  console.log('fetchowany token:', TOKEN);
  return TOKEN;
};

export const BASE_URL = 'http://localhost:5000/api/';
