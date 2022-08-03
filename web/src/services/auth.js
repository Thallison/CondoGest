import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const TOKEN_KEY = "@condogest-Token";
export const USER_NAME = "@condogest-UserName";
export const USER_ID = "@condogest-UserId";
export const PERMISSIONS_KEY = "@condogest-permissions";
export const isAuthenticated = () => {
  return typeof cookies.get(TOKEN_KEY) !== 'undefined';
}
export const getToken = () => cookies.get(TOKEN_KEY);
export const login = data => {
  cookies.set(TOKEN_KEY, data.token, { path: '/' });
};
export const logout = () => {
  cookies.remove(TOKEN_KEY);
  cookies.remove(PERMISSIONS_KEY);
  cookies.remove(USER_NAME);
  cookies.remove(USER_ID);
};
export const setPermissions = data => {
  cookies.set(USER_ID, data.id, { path: '/' });
  cookies.set(USER_NAME, data.name, { path: '/' });
  cookies.set(PERMISSIONS_KEY, data.role, { path: '/' });
}
export const userGetPermission = () => cookies.get(PERMISSIONS_KEY);
export const getName = () => cookies.get(USER_NAME);
export const getId = () => cookies.get(USER_ID);