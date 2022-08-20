import Request from "./axios";

export const Test = () => {
  return Request.get({
    url: "/toutiao/index?type=top&key=a08680de9e99dcc933432f5e6c83351c",
  });
};
