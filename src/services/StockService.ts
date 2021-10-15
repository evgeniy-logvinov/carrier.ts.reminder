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
/**
 * Service which helps to working with market and
 * get some information about tickers
 */
export type Depth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 20;

export interface Orderbook {
  bids: Array<[number, number]>; // Buy
  asks: Array<[number, number]>; // Sell
}

export interface Candle {
  o: number; // Open price
  c: number; // Close price
  h: number; // Max price
  l: number; // Min price
  v: number; // Market Volume
  time: string; // Time in RFC3339Nano
}
export interface Price {
  sell: number;
  buy: number;
}
export interface StockService {

  /**
   * @description Get price by ticker
   * @property {string} ticker - Ticker name
   * @deprecated
   */
  getPrice(ticker: string): Promise<Price>

  /**
   * Candle subscribe
   * @param {string} ticker - ticker name
   */
  candle(ticker: string, cb: (orderbook: Candle) => void): void;

  /**
   * Orderbook subscribe
   * @param {string} ticker - ticker name
   */
  orderbook(ticker: string, cb: (orderbook: Orderbook) => void, depth: Depth): void;
}
