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
import { TickerInfo } from '../../DataContainerService';
import { TinkoffReminderService } from '../TinkoffReminderService';

describe('ReminderService', () => {
  describe('getRange', () => {
    it('should return undefined left and right for empty array', () => {
      const tickerInfo: TickerInfo = {
        checkedValues: [],
        range: {},
        ticker: 'AAPL'
      };

      const reminder = new TinkoffReminderService(tickerInfo);
      const actualForEmpty = reminder.getRange(10, tickerInfo.checkedValues);
      expect(reminder).toBeDefined();
      expect(reminder.getRange).toBeDefined();
      expect(actualForEmpty.left).toBeUndefined();
      expect(actualForEmpty.right).toBeUndefined();
    });

    it('should return for left undefined and not undefined right when only one element and bigger', () => {
      const tickerInfo: TickerInfo = {
        checkedValues: [20],
        range: {},
        ticker: 'AAPL'
      };

      const reminder = new TinkoffReminderService(tickerInfo);
      const actualForEmpty = reminder.getRange(10, tickerInfo.checkedValues);
      expect(reminder).toBeDefined();
      expect(reminder.getRange).toBeDefined();
      expect(actualForEmpty.left).toBeUndefined();
      expect(actualForEmpty.right).toBe(20);
    });

    it('should return for left undefined and not undefined right when only one element and less', () => {
      const tickerInfo: TickerInfo = {
        checkedValues: [20],
        range: {},
        ticker: 'AAPL'
      };

      const reminder = new TinkoffReminderService(tickerInfo);
      const actualForEmpty = reminder.getRange(30, tickerInfo.checkedValues);
      expect(reminder).toBeDefined();
      expect(reminder.getRange).toBeDefined();
      expect(actualForEmpty.left).toBe(20);
      expect(actualForEmpty.right).toBeUndefined();
    });

    it('should return range from array', () => {
      const tickerInfo: TickerInfo = {
        checkedValues: [20, 30, 40],
        range: {},
        ticker: 'AAPL'
      };

      const reminder = new TinkoffReminderService(tickerInfo);
      const actualForEmpty = reminder.getRange(25, tickerInfo.checkedValues);
      expect(reminder).toBeDefined();
      expect(reminder.getRange).toBeDefined();
      expect(actualForEmpty.left).toBe(20);
      expect(actualForEmpty.right).toBe(30);
    });
  });
});
