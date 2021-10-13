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
import { FatherService } from './FatherService';
import { StockService } from './StockService';

/**
 * Server will check information about ticker.
 * Something like gateway.
 */
export abstract class ReminderService extends FatherService {
  timerId?: NodeJS.Timeout;
  timeout: number = 2000;
  ticker: string;

  abstract getStock(): StockService;

  constructor(ticker: string) {
    super();
    this.ticker = ticker;
  }

  /**
   * @description Method to start watching by ticker
   * @param ticker {string} - Ticker name
   */
  startWatching = async (): Promise<void> => {
    try {
      console.log(this.ticker, await this.getStock().getPrice(this.ticker));
    } catch (err) {
      console.log(err);
      this.error(err as Error);
    } finally {
      this.timerId = setTimeout(this.startWatching, this.timeout);
    }
  }

  getTicker(): string {
    return this.ticker;
  }
}
