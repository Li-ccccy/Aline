import Cookies from "js-cookie";
const getCookieDomain = () => {
  let host = window.location.hostname;
  const ip =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (ip.test(host) == true || host == "localhost") return host;
  const regex = /([^]*).*/;
  const match = host.match(regex);
  if (typeof match != "undefined" && null != match) host = match[1];
  if (typeof host != "undefined" && null != host) {
    const strAry = host.split(".");
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
    }
  }
  return "." + host;
};
const TokenKey = "Authorization-sys";

export const setToken = (token: string) => {
  return Cookies.set(TokenKey, token, {
    domain: getCookieDomain(),
  });
};
export const removeToken = () => {
  return Cookies.remove(TokenKey, {
    domain: getCookieDomain(),
  });
};
export const getToken = () => {
  return Cookies.get(TokenKey);
};
