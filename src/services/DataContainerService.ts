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
 * Data container will get ticker information from  the database
 */
export interface TickerInfo {
  ticker: string;
  sellPrice: number;
  buyPrice: number;
}
export class DataContainerService {

  /**
   * @description Get all tickers which need to be watched
   * @returns void
   */
  getTickers = async (): Promise<TickerInfo[]> => {
    return [
      {ticker: 'AAPL', buyPrice: 100, sellPrice: 200},
      {ticker: 'BAC', buyPrice: 20, sellPrice: 30},
    ];
  }
}
