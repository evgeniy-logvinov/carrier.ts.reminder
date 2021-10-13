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

import { logger } from '../logger/logger';

/**
 * The main service which contains logic about logs
 */
export abstract class FatherService {
  abstract getTicker(): string;

  info(message: string | number = '', data: Array<any> | string | number = [], ...args: any[]): void {
    logger.info(message.toString(), {name: this.getTicker(), data});
  }

  debug(message: string | number = '', data: Array<any> | string | number = [], ...args: any[]): void {
    logger.debug(message.toString(), {name: this.getTicker(), data});
  }

  warn(message: string | number = '', data: Array<any> | string | number = [], ...args: any[]): void {
    logger.warn(message.toString(), {name: this.getTicker(), data});
  }

  error(message: string | number | Error = '', data: Array<any> | string | number = [], ...args: any[]) {
    logger.error(message.toString(), {name: this.getTicker(), data});
  }
}
