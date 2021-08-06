import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit{

    private logger : Logger = new Logger("ChatGateway");

  afterInit(server: any) {
      this.logger.log("initialized");
  }
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message); // It broadcasts this message
  }
}