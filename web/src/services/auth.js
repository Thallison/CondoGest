import Cookies from 'universal-cookie';
import { 
  encryptObjectAES, 
  decryptObjectAES, 
  encryptTextAES, 
  decryptTextAES 
} from '../utils/security';
const cookies = new Cookies();

export const TOKEN_KEY = "@condogest-Token";
export const PERMISSIONS_KEY = "@condogest-permissions";
export const isAuthenticated = () => {
  return typeof cookies.get(TOKEN_KEY) !== 'undefined';
}
export const getToken = () => cookies.get(TOKEN_KEY);
export const login = data => {
  cookies.set(TOKEN_KEY, data.token, { path: '/' });
};
export const setUserData = data => {
  localStorage.setItem('userData', encryptObjectAES(data));
};
export const logout = () => {
  cookies.remove(TOKEN_KEY);
  cookies.remove(PERMISSIONS_KEY);
};
export const setPermissions = data => {
  cookies.set(PERMISSIONS_KEY, encryptTextAES(data.role), { path: '/' });
}
export const userGetPermission = () => decryptTextAES(cookies.get(PERMISSIONS_KEY));
export const getUserData = localStorage.getItem('userData') ? decryptObjectAES(localStorage.getItem('userData')) : [];
export const isAdmin = getUserData?.role === 'Administrador';