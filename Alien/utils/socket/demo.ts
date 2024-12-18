import { Socket } from "./index";

const MySocket = new Socket({
  Url: "xxxxx",
  onMessage: () => {
    console.log(999);
  },
});
MySocket.close();
