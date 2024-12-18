import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";
const REGRESH_TOKEN_KEY = "refresh_token";
const BLACKTUISONGID = "black_tuisong_id"; //推送黑名单编辑id

export const getToken = () => Cookies.get(TOKEN_KEY);
export const getRefreshToken = () => Cookies.get(REGRESH_TOKEN_KEY);
export const getBlackTuiSongId = () => Cookies.get(BLACKTUISONGID); //推送黑名单编辑id

export const setToken = (token: string, params = {}) => {
  Cookies.set(TOKEN_KEY, token, params);
};

export const setRefreshToken = (token: string) => {
  Cookies.set(REGRESH_TOKEN_KEY, token);
};

export const setBlackTuiSongId = (token: string) => {
  //推送黑名单编辑id
  Cookies.set(BLACKTUISONGID, token);
};
export const clearToken = () => {
  Cookies.remove("access_token");
};
