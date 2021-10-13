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
import { DataContainerService, TickerInfo } from '../DataContainerService';
import { ReminderService } from '../ReminderService';
import { StockService } from '../StockService';
import { TinkoffStockService } from './TinkoffStockService';

/**
 * Tinkoff reminder service
 */
export class TinkoffReminderService extends ReminderService {
  dataContainer: DataContainerService;
  stock: StockService;

  constructor(ticker: TickerInfo) {
    super(ticker);
    this.dataContainer = new DataContainerService();
    this.stock = new TinkoffStockService();
  }

  getDataContainer(): DataContainerService {
    return this.dataContainer;
  }

  getStock(): StockService {
    return this.stock;
  }
}
