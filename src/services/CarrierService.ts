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
import { DataContainerService, TickerInfo } from './DataContainerService';
import { ReminderService } from './ReminderService';

/**
 * Main service where we collect all information.
 * Something like gateway.
 */
export abstract class CarrierService {
  /**
   * @description Main method to start monitoring
   */
  start = async (): Promise<void> => {
    console.log('start');
    const tickersInfo = await this.getDataContainer().getTickers();
    tickersInfo?.forEach(tickerInfo => {
      const reminder = this.getReminder(tickerInfo);
      reminder.startWatching();
    });
  }

  /**
   * Get reminder implementation
   * @param ticker - ticker name
   */
  abstract getReminder(ticker: TickerInfo): ReminderService;

  /**
   * Get data container implementation
   */
  abstract getDataContainer(): DataContainerService;
}
