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
import { CarrierService } from '../CarrierService';
import { DataContainerService, TickerInfo } from '../DataContainerService';
import { TinkoffReminderService } from './TinkoffReminderService';

/**
 * Tinkoff carrier service realization.
 */
export class TinkoffCarrierService extends CarrierService {
  getReminder(ticker: TickerInfo) {
    return new TinkoffReminderService(ticker);
  }

  getDataContainer(): DataContainerService {
    return new DataContainerService();
  }
}
