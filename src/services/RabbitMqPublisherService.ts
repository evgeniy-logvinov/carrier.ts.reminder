/**
 * Copyright (c) evgeniy.logvinov.k
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import amqplib, {Connection, Channel} from 'amqplib';
import { Range } from './DataContainerService';

export interface TelegramMessage {
  channelName: string;
  message: string;
  topic: string;
}

export interface ValueChangedMessage {
  range: Range;
  ticker: string;
}

export class RabbitMqPublisherService {
  static connection: Connection;
  static channel: Channel;

  static getInstance = async () => {
    if (!(process.env.RABBIT_MQ_URL))
      throw new Error('Please fill RabbitMqUrl');

    if (!RabbitMqPublisherService.connection)
      RabbitMqPublisherService.connection = await amqplib.connect(process.env.RABBIT_MQ_URL, 'heartbeat=60');

    return RabbitMqPublisherService.connection;
  }

  static closeConnection = () => {
    RabbitMqPublisherService.connection.close();
  }

  static closeChannel = () => {
    RabbitMqPublisherService.channel.close();
  }

  static sendMessageValueChanged = async (message: ValueChangedMessage) => {
    await RabbitMqPublisherService.sendMessage(RabbitMqPublisherService.getValueChangedMessage(message));
  }

  static getValueChangedMessage(message: ValueChangedMessage) {
    return `${message.ticker}: ${message.range.left} ${message.range.right}`;
  }

  static async sendMessage(message: string) {
    const exchange = 'mainexchange';
    const channelName = process.env.CHANNEL_NAME;
    if (channelName) {
      const telegramMessage: TelegramMessage = {
        channelName: process.env.CHANNEL_NAME || '',
        topic: 'Value changed',
        message,
      };
      const channel = await (await RabbitMqPublisherService.getInstance()).createChannel();
      channel.publish(exchange, 'generateRoutingKey', Buffer.from(JSON.stringify(JSON.parse(JSON.stringify(telegramMessage)))));
    }
  }
}
