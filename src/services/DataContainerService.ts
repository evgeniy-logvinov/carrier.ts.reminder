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
  checkedValues: number[];
  range: Range;
}

export interface Range {
  left?: number;
  right?: number;
}

export class DataContainerService {

  /**
   * @description Get all tickers which need to be watched
   * @returns void
   */
  getTickers = async (): Promise<TickerInfo[]> => {
    return [
      {
        ticker: 'BAC',
        checkedValues: [100, 143.03, 145],
        range: { left: undefined, right: undefined },
      },
      {
        ticker: 'AAPL',
        checkedValues: [100, 143.03, 145],
        range: { left: 145, right: undefined },
      },
      {
        ticker: 'TSLA',
        checkedValues: [1, 817.16, 1000],
        range: { left: 1, right: 817.16 },
      },
    ];
  }
}
