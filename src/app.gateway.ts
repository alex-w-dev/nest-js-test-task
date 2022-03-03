import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { CurrencyPairPriceDto } from './currency/dto/currency-pair-price.dto';
import { ICurrencyPair } from './common/interfaces';
import { CurrencyPairPriceService } from './currency/services/currency-pair-price.service';
import { CurrencyPairConfigService } from './currency/services/currency-pair-config.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  currencyPairToConnections = new Map<ICurrencyPair, Set<Socket>>();

  private logger: Logger = new Logger('AppGateway');

  constructor(private currencyPairConfigService: CurrencyPairConfigService) {}

  @SubscribeMessage('currency-pair.subscribe')
  handleCurrencyPairSubscribe(client: Socket, payload: string): void {
    const currencyPairs: ICurrencyPair[] = payload && JSON.parse(payload);

    if (!currencyPairs?.length) {
      client.emit(
        'message',
        JSON.stringify({
          success: false,
          errorMsg: 'no currency pairs passed',
        }),
      );

      return;
    }

    if (
      !this.currencyPairConfigService.isAllCurrencyPairsAvailable(currencyPairs)
    ) {
      client.emit(
        'message',
        JSON.stringify({
          success: false,
          errorMsg:
            'Some currency pairs are not available, check available pairs using API',
        }),
      );

      return;
    }

    this.subscribeClientToCurrencyPairs(client, currencyPairs);

    client.emit(
      'message',
      JSON.stringify({
        success: true,
      }),
    );
  }

  @SubscribeMessage('currency-pair.unsubscribe')
  handleCurrencyPairUnsubscribe(client: Socket, payload: string): void {
    const currencyPairs: ICurrencyPair[] = payload && JSON.parse(payload);

    this.removeClientFromSubscription(client, currencyPairs);
    client.emit(
      'message',
      JSON.stringify({
        success: true,
      }),
    );
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @OnEvent('currency-pair.update')
  handleUpdateCurrencyPairUpdatedEvent(payload: CurrencyPairPriceDto) {
    const subscribersToPairSockets = this.currencyPairToConnections.get(
      `${payload.fsym}-${payload.tsym}`,
    );
    subscribersToPairSockets &&
      subscribersToPairSockets.forEach((client) => {
        client.emit(
          'message',
          JSON.stringify({
            cryptocompare:
              CurrencyPairPriceService.convertCurrencyPairPricesToCryptocomareResponce(
                [payload],
              ),
          }),
        );
      });
  }

  handleDisconnect(client: Socket) {
    this.removeClientFromSubscription(client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit(
      'message',
      JSON.stringify({
        message: 'Successfully connected!',
      }),
    );
  }

  private subscribeClientToCurrencyPairs(
    client: Socket,
    currencyPairs: ICurrencyPair[],
  ) {
    for (const currencyPair of currencyPairs) {
      let currencySubscription =
        this.currencyPairToConnections.get(currencyPair);

      if (!currencySubscription) {
        currencySubscription = new Set();
        this.currencyPairToConnections.set(currencyPair, currencySubscription);
      }

      currencySubscription.add(client);
    }
  }

  private removeClientFromSubscription(
    client: Socket,
    currencyPairs?: ICurrencyPair[],
  ) {
    this.currencyPairToConnections.forEach((connectionSet, key) => {
      if (!currencyPairs || currencyPairs.includes(key)) {
        connectionSet.delete(client);
      }
    });
  }
}
