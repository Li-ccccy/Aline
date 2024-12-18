export class Socket {
  private PINGMSG: any;
  readonly Url: string; //websocket 链接Url地址
  private activeClose: boolean = false; // 是否主动关闭
  private NewLink: any;
  private HEATERBEATOFTIMER: any;
  private heartBeatTimer: number; // 心跳检测事件 默认10秒
  private websocket: WebSocket; // socket实例。
  private IsRecoent: boolean = false;
  private onMessage: (data: WebSocket["onmessage"]) => any;
  constructor(data: {
    Url: string;
    onMessage: (T: WebSocket["onmessage"]) => any;
    heartBeatTimer?: number;
    PINGMSG?: any;
  }) {
    this.Url = data.Url;
    this.heartBeatTimer = data.heartBeatTimer || 10000;
    this.websocket = new WebSocket(this.Url);
    this.onMessage = data.onMessage;
    this.PINGMSG = data.PINGMSG || "heartBeat";
    this.init();
  }
  public init() {
    // ws连接成功
    this.websocket.onopen = (data) => {
      this.heartBeat();
      this.IsRecoent = false;
      this.NewLink ? clearTimeout(this.NewLink) : null;
      console.log(`ws:${this.Url}已链接`, data);
    };
    // ws接收到消息
    this.websocket.onmessage = ({ data }) => {
      this.onMessage(data);
    };
    // ws 关闭
    this.websocket.onclose = () => {
      clearInterval(this.HEATERBEATOFTIMER);
      if (this.activeClose) {
        console.log("手动关闭");
      } else {
        this.reconnect();
      }
    };
    // ws 报错
    this.websocket.onerror = (data) => {
      clearInterval(this.HEATERBEATOFTIMER);
      this.reconnect();
    };
  }
  // 发送消息
  public onSend(data: any) {
    this.websocket.send(data);
  }
  // 心跳检测
  private heartBeat() {
    console.log("执行心跳检测");
    if (this.HEATERBEATOFTIMER) {
      clearInterval(this.HEATERBEATOFTIMER);
    }
    this.HEATERBEATOFTIMER = setInterval(() => {
      this.websocket.send(this.PINGMSG);
    }, this.heartBeatTimer);
  }
  // 重链
  public reconnect() {
    if (this.IsRecoent) return console.log("新的ws链接已经在路上");
    console.log("ws会在5秒后重连");
    this.IsRecoent = true;
    this.NewLink = setTimeout(() => {
      this.websocket = new WebSocket(this.Url);
      this.IsRecoent = false;
      this.init();
    }, 5000);
  }
  // 手动关闭ws
  public close() {
    console.log("手动关闭，无需重连");
    clearInterval(this.HEATERBEATOFTIMER);
    this.activeClose = true;
    this.websocket.close();
  }
}
