/*
 * Copyright © 2019 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

'use strict';

const defaultConfig = {
	type: 'object',
	properties: {
		fileLogLevel: {
			type: 'string',
			enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'none'],
			env: 'LISK_FILE_LOG_LEVEL',
			arg: '--log,-l',
		},
		logFileName: {
			type: 'string',
			env: 'LISK_REDIS_HOST',
		},
		consoleLogLevel: {
			type: 'string',
			enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'none'],
			env: 'LISK_CONSOLE_LOG_LEVEL',
		},
		module: {
			type: 'string',
		},
	},
	required: ['fileLogLevel', 'logFileName', 'consoleLogLevel'],
	default: {
		fileLogLevel: 'info',
		consoleLogLevel: 'none',
		logFileName: 'logs/lisk.log',
	},
};

module.exports = defaultConfig;
