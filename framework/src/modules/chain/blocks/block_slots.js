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

class BlockSlots {
	constructor({ epochTime, interval, blocksPerRound }) {
		this.epochTime = epochTime;
		this.interval = interval;
		this.blocksPerRound = blocksPerRound;
	}

	/**
	 * Description of the module.
	 *
	 * @module
	 * @property {number} interval - Slot time interval in seconds
	 * @property {number} delegates - Active delegates from constants
	 * @see Parent: {@link blocks}
	 * @todo Add description for the module
	 */
	getEpochTime(time) {
		if (time === undefined) {
			time = Date.now();
		}
		return Math.floor((time - new Date(this.epochTime).getTime()) / 1000);
	}

	/**
	 * Description of the function.
	 *
	 * @param {number} time
	 * @returns {number} Lisk epoch time
	 * @todo Add description for the function and the params
	 */
	getTime(time) {
		return this.getEpochTime(time);
	}

	/**
	 * Description of the function.
	 *
	 * @param {number} [epochTime]
	 * @returns {number} Constant time from Lisk epoch + input time
	 * @todo Add description for the function and the params
	 */
	getRealTime(epochTime) {
		if (epochTime === undefined) {
			epochTime = this.getTime();
		}

		return (
			Math.floor(new Date(this.epochTime).getTime() / 1000) * 1000 +
			epochTime * 1000
		);
	}

	/**
	 * Description of the function.
	 *
	 * @param {number} [epochTime] - Time or
	 * @returns {number} Input time / slot interval
	 * @todo Add description for the function and the params
	 */
	getSlotNumber(epochTime) {
		if (epochTime === undefined) {
			epochTime = this.getTime();
		}

		return Math.floor(epochTime / this.interval);
	}

	/**
	 * Description of the function.
	 *
	 * @param {number} slot - Slot number
	 * @returns {number} Input slot * slot interval
	 * @todo Add description for the function and the params
	 */
	getSlotTime(slot) {
		return slot * this.interval;
	}

	/**
	 * Description of the function.
	 *
	 * @returns {number} Current slot number + 1
	 * @todo Add description for the function and the params
	 */
	getNextSlot() {
		const slot = this.getSlotNumber();

		return slot + 1;
	}

	/**
	 * Description of the function.
	 *
	 * @param {number} nextSlot
	 * @returns {number} Input next slot + delegates
	 * @todo Add description for the function and the params
	 */
	getLastSlot(nextSlot) {
		return nextSlot + this.blocksPerRound;
	}

	/**
	 * Calculates round number from the given height.
	 *
	 * @param {number} height - Height from which round is calculated
	 * @returns {number} Round number
	 * @todo Add description for the params
	 *
	 */
	calcRound(height) {
		return Math.ceil(height / this.blocksPerRound);
	}

	/**
	 * Calculate starting height of the round
	 *
	 * @param round
	 * @return {number}
	 */
	calcRoundStartHeight(round) {
		return (round < 1 ? 0 : round - 1) * this.blocksPerRound + 1;
	}

	/**
	 * Calculating end height of the round
	 *
	 * @param round
	 * @return {number}
	 */
	calcRoundEndHeight(round) {
		return (round < 1 ? 1 : round) * this.blocksPerRound;
	}
}

module.exports = {
	BlockSlots,
};
