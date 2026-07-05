import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger('ChatGateway');
  server: Server;

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat:join')
  handleJoinRoom(@MessageBody() data: { conversationId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.join(`conversation:${data.conversationId}`);
    this.logger.log(`User ${data.userId} joined conversation ${data.conversationId}`);
  }

  @SubscribeMessage('chat:send')
  handleSendMessage(
    @MessageBody()
    data: {
      conversationId: string;
      senderId: string;
      content: string;
      messageType: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    // TODO: Save message to database
    // TODO: Emit message to all users in conversation
    this.server.to(`conversation:${data.conversationId}`).emit('chat:receive', {
      senderId: data.senderId,
      content: data.content,
      messageType: data.messageType,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('chat:typing')
  handleTyping(
    @MessageBody() data: { conversationId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`conversation:${data.conversationId}`).emit('chat:user_typing', {
      userId: data.userId,
    });
  }

  @SubscribeMessage('chat:stop_typing')
  handleStopTyping(
    @MessageBody() data: { conversationId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`conversation:${data.conversationId}`).emit('chat:user_stop_typing', {
      userId: data.userId,
    });
  }

  @SubscribeMessage('notification:subscribe')
  handleNotificationSubscribe(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`user:${data.userId}`);
    this.logger.log(`User ${data.userId} subscribed to notifications`);
  }

  sendNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification:receive', notification);
  }

  sendMessage(conversationId: string, message: any) {
    this.server.to(`conversation:${conversationId}`).emit('chat:receive', message);
  }
}
