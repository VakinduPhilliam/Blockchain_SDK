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

const blockVersion = require('../../../../../../src/modules/chain/blocks/block_version');

describe('block_version', () => {
	let exceptions;

	beforeEach(async () => {
		exceptions = {
			blockVersion: {},
		};
	});

	describe('isValid', () => {
		describe('when no exceptions present', () => {
			// When no exceptions are present current version (1) should be always valid for all heights,
			// and all other versions should be rejected

			it('should return false for version = 1, height = undefined', async () => {
				const height = undefined;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 1, height = 1', async () => {
				const height = 1;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 1, height = 101', async () => {
				const height = 101;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return false for version = 0, height = undefined', async () => {
				const height = undefined;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 0, height = 1', async () => {
				const height = 1;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 0, height = 101', async () => {
				const height = 101;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 3, height = undefined', async () => {
				const height = undefined;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 3, height = 1', async () => {
				const height = 1;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 3, height = 101', async () => {
				const height = 101;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});
		});

		describe('when 1 exception present', () => {
			// When 1 exception is present current version (1) should be valid only if height is not
			// in exception's range, exception's version should be valid for its height range
			beforeEach(async () => {
				exceptions = {
					blockVersions: {
						0: { start: 0, end: 101 },
					},
				};
			});

			it('should return false for version = 0, height = undefined', async () => {
				const height = undefined;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return true for version = 0, height = 1', async () => {
				const height = 1;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 0, height = 101', async () => {
				const height = 101;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return false for version = 1, height = 101', async () => {
				const height = 101;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return true for version = 1, height = 102', async () => {
				const height = 102;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 1, height = 202', async () => {
				const height = 202;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return false for version = 2, height = 1', async () => {
				const height = 1;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 2, height = 101', async () => {
				const height = 101;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 2, height = 102', async () => {
				const height = 102;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});
		});

		describe('when more than 1 exceptions present', () => {
			beforeEach(async () => {
				exceptions.blockVersions = {
					0: { start: 0, end: 101 },
					1: { start: 102, end: 202 },
					2: { start: 203, end: 303 },
				};
			});

			it('should return false for version = 0, height = undefined', async () => {
				const height = undefined;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return true for version = 0, height = 1', async () => {
				const height = 1;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 0, height = 101', async () => {
				const height = 101;
				const version = 0;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return false for version = 1, height = 101', async () => {
				const height = 101;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return true for version = 1, height = 102', async () => {
				const height = 102;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 1, height = 202', async () => {
				const height = 202;
				const version = 1;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return false for version = 2, height = 1', async () => {
				const height = 1;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 2, height = 101', async () => {
				const height = 101;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 2, height = 202', async () => {
				const height = 202;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return true for version = 2, height = 203', async () => {
				const height = 203;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return true for version = 2, height > 203', async () => {
				const height = 203;
				const version = 2;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(true);
			});

			it('should return false for version = 3, height = 1', async () => {
				const height = 1;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 3, height = 101', async () => {
				const height = 101;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 3, height = 202', async () => {
				const height = 202;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});

			it('should return false for version = 3, height > 202', async () => {
				const height = 203;
				const version = 3;

				return expect(
					blockVersion.isValid(version, height, exceptions),
				).to.equal(false);
			});
		});
	});
});
