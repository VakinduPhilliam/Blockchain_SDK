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

describe('integration test (type 2) - double delegate registrations', () => {
	describe('executing 30 times', () => {
		describe('with two different accounts using different username', () => {
			it.todo('should be ok adding to the pool a delegate registration');

			it.todo(
				'should be ok adding to the pool a delegate registration from different account and same username',
			);

			describe('after forging one block', () => {
				it.todo('should include both transactions');

				it.todo(
					'should fail adding to the pool a delegate registration with an already registered username',
				);
			});
		});
	});
});
