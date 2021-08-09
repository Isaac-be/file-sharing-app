import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

const options = {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
}

@WebSocketGateway(options)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger("ChatGateway");

  afterInit(server: any) {
    this.logger.log("initialized");
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("send message")
  handleMessage(@MessageBody() message: Object): void {
    this.server.emit('message', message); 
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('My Id', client.id);
  }
  handleDisconnect() {

  }
}