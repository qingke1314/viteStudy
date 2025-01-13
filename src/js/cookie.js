import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get('access_token');
}

export const setToken = (token) => {
  Cookies.set('access_token', token);
}