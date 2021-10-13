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
import { MarketInstrument, OrderResponse } from '@tinkoff/invest-openapi-js-sdk';
import { StockService } from '../StockService';
import { TinkoffApiService } from './TinkoffApiService';

/**
 * Tinkoff stock service implementation
 */
export class TinkoffStockService implements StockService {
  instrument: MarketInstrument | null = null;

  fillMarketInstrument = async (ticker: string): Promise<void> => {
    this.instrument = await TinkoffApiService.getInstance().searchOne({ ticker });
  }

  getPrice = async (ticker: string): Promise<{sell: number, buy: number}> => {
    if (!this.instrument)
      await this.fillMarketInstrument(ticker);

    if (this.instrument) {
      const orderbook = await TinkoffApiService.getInstance().orderbookGet({figi: this.instrument.figi, depth: 1});
      return {sell: orderbook.asks[0].price, buy: orderbook.bids[0].price};
    } else {
      throw new Error('Some problems with instrument');
    }
  }

  getSumm(orders: OrderResponse[]) {
    return orders.map(el => el.quantity).reduce((partial_sum, a) => partial_sum + a, 0);
  }

}
