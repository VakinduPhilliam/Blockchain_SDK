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

const { transfer } = require('@liskhq/lisk-transactions');
const Scenarios = require('../../../common/scenarios');
const localCommon = require('../../common');

const { TRANSACTION_TYPES } = global.constants;

describe('integration test (type 4) - sending transactions on top of unconfirmed multisignature registration', () => {
	let library;

	const scenarios = {
		regular: new Scenarios.Multisig(),
	};

	const randomTransfer = transfer({
		amount: '1',
		passphrase: scenarios.regular.account.passphrase,
		recipientId: '123L',
	});

	localCommon.beforeBlock('4_X_multisig_unconfirmed', lib => {
		library = lib;
	});

	before(done => {
		localCommon.addTransactionsAndForge(
			library,
			[scenarios.regular.creditTransaction],
			async () => {
				localCommon.addTransactionsAndForge(
					library,
					[randomTransfer],
					async () => {
						done();
					},
				);
			},
		);
	});

	it('adding to pool multisig registration should be ok', done => {
		localCommon.addTransaction(
			library,
			scenarios.regular.multiSigTransaction,
			(err, res) => {
				expect(res).to.equal(scenarios.regular.multiSigTransaction.id);
				done();
			},
		);
	});

	describe('adding to pool other transactions from same account', () => {
		Object.keys(TRANSACTION_TYPES).forEach((key, index) => {
			if (key === 'DAPP' || key === 'IN_TRANSFER' || key === 'OUT_TRANSFER') {
				return true;
			}
			if (key !== 'MULTI') {
				it(`type ${index}: ${key} should be ok`, done => {
					localCommon.loadTransactionType(
						key,
						scenarios.regular.account,
						randomTransfer,
						true,
						transaction => {
							localCommon.addTransaction(library, transaction, (err, res) => {
								expect(res).to.equal(transaction.id);
								done();
							});
						},
					);
				});
			}
			return true;
		});
	});
});
