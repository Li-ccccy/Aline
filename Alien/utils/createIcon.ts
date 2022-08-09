import Logo from "../public/alien.logo.svg";
export default () => {
  let link = document.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("type", "image/svg+xml");
  link.setAttribute("href", Logo);
  document.getElementsByTagName("head")[0].appendChild(link);
};
