import {Injectable} from '@angular/core';
import {WebSocketAPI} from "./websocket-api";
import {Data} from "../entity/data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // @ts-ignore
  webSocketAPI: WebSocketAPI;
  public data: Data = new Data();
  // @ts-ignore
  name: string;

  constructor() {
    this.webSocketAPI = new WebSocketAPI(this);
    this.connect();
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message: Data){
    this.data = message;
  }
}
