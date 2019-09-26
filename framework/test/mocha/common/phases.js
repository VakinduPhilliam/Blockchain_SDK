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

require('../functional/functional');
const Promise = require('bluebird');
const apiHelpers = require('./helpers/api');
const waitFor = require('./utils/wait_for');

function confirmation(
	goodTransactions,
	badTransactions,
	pendingMultisignatures,
) {
	describe('after transactions get confirmed', () => {
		before(() => waitFor.confirmations(_.map(goodTransactions, 'id')));

		it('bad transactions should not be confirmed', async () =>
			Promise.map(badTransactions, transaction => {
				const params = [`id=${transaction.id}`];
				return apiHelpers.getTransactionsPromise(params).then(res => {
					expect(res.body.data).to.have.length(0);
				});
			}));

		it('good transactions should not be unconfirmed', async () =>
			Promise.map(goodTransactions, transaction =>
				apiHelpers
					.getUnconfirmedTransactionPromise(transaction.id)
					.then(res => {
						expect(res.body.data).to.be.empty;
					}),
			));

		it('good transactions should be confirmed', async () =>
			Promise.map(goodTransactions, transaction => {
				const params = [`id=${transaction.id}`];
				return apiHelpers.getTransactionsPromise(params).then(res => {
					expect(res.body.data).to.have.length(1);
				});
			}));

		if (pendingMultisignatures) {
			it('pendingMultisignatures should remain in the pending queue', async () =>
				Promise.map(pendingMultisignatures, transaction => {
					const params = [`id=${transaction.id}`];

					return apiHelpers
						.getPendingMultisignaturesPromise(params)
						.then(res => {
							expect(res.body.data).to.have.length(1);
							expect(res.body.data[0].id).to.be.equal(transaction.id);
						});
				}));

			it('pendingMultisignatures should not be confirmed', async () =>
				Promise.map(pendingMultisignatures, transaction => {
					const params = [`id=${transaction.id}`];
					return apiHelpers.getTransactionsPromise(params).then(res => {
						expect(res.body.data).to.have.length(0);
					});
				}));
		}
	});
}

module.exports = {
	confirmation,
};
