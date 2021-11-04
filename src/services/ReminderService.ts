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
import { Range, TickerInfo } from './DataContainerService';
import { FatherService } from './FatherService';
import { RabbitMqPublisherService } from './RabbitMqPublisherService';
import { Candle, Orderbook, StockService } from './StockService';

/**
 * Server will check information about ticker.
 * Something like gateway.
 */
export abstract class ReminderService extends FatherService {
  timerId?: NodeJS.Timeout;
  tickerInfo: TickerInfo;

  abstract getStock(): StockService;

  constructor(tickerInfo: TickerInfo) {
    super();
    this.tickerInfo = tickerInfo;
  }

  /**
   * @description Method to start watching by ticker
   * @param ticker {string} - Ticker name
   */
  startWatching = async (): Promise<void> => {
    try {
      this.orderbookWatcher();
      // this.candleWatcher();
    } catch (err) {
      console.log(err);
      this.error(err as Error);
      this.startWatching();
    }
  }

  /**
   * @description Method Watch changes using candle
   */
  candleWatcher = async (): Promise<void> => {
    const candleCheck = (candle: Candle) => {
      const checkedValuesBuy = this.tickerInfo.checkedValues;
      checkedValuesBuy.sort((a, b) => a - b);
      this.debug('candle', JSON.stringify(candle));
    };
    this.getStock().candle(this.tickerInfo.ticker, candleCheck);
  }

  /**
   * @description Method Watch changes using orderbook
   */
  orderbookWatcher = async (): Promise<void> => {
    const checkedValuesBuy = this.tickerInfo.checkedValues;
    checkedValuesBuy.sort((a, b) => a - b);
    const orderbookCheck = async (orderbook: Orderbook) => {
      await this.checkValue(orderbook.bids[0][0], checkedValuesBuy);
    };
    this.getStock().orderbook(this.tickerInfo.ticker, orderbookCheck, 1);
  }

  /**
   * @description Check value if it is need to send message or not. If range changed, than we need to send message
   * @param value {number} - value which need to be checked
   * @param valuesForCheck {number[]} - list of values which need to be checked
   */
  checkValue = async (value: number, valuesForCheck: number[]): Promise<void> => {
    const range = this.getRange(value, valuesForCheck);
    if (range.left !== this.tickerInfo.range.left || range.right !== this.tickerInfo.range.right) {
      this.debug('value', value);
      this.debug('previous range', JSON.stringify(this.tickerInfo.range));
      this.debug('new range', JSON.stringify(range));
      this.tickerInfo.range = range;
      this.debug('send message');
      await RabbitMqPublisherService.sendMessageValueChanged(this.tickerInfo);
    }
  }

  /**
   * @description Get range between two numbers
   * @param value {number} - checked value
   * @param values {number[]} - array for check
   * @returns {Range} - range contains left and right values in array where value contains
   */
  getRange = (value: number, values: number[]): Range => {
    const index = values.findIndex(el => el > value);

    if (index >= 0)
      return {left: values[index - 1], right: values[index]};
    else
      return {left: values[values.length - 1], right: undefined};
  }

  getTicker(): string {
    return this.tickerInfo.ticker;
  }
}
