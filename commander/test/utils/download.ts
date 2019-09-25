import { expect } from 'chai';
import fs from 'fs-extra';
import * as axios from 'axios';
import * as commons from '../../src/utils/core/commons';
import * as downloadUtil from '../../src/utils/download';
import { SinonStub } from 'sinon';

describe('download utils', () => {
	const url =
		'https://downloads.lisk.io/lisk/mainnet/1.6.0/lisk-1.6.0-Darwin-x86_64.tar.gz.SHA256';
	const outDir = '~/.cache/lisk-commander';

	describe('#download', () => {
		let existsSyncStub: SinonStub;
		let statSyncStub: SinonStub;

		beforeEach(() => {
			sandbox.stub(axios, 'default');
			existsSyncStub = sandbox.stub(fs, 'existsSync');
			statSyncStub = sandbox.stub(fs, 'statSync');
			sandbox.stub(fs, 'unlinkSync').returns();
		});

		it('should return true if downloaded file is less than equal to two days', () => {
			existsSyncStub.returns(true);
			statSyncStub.returns({ birthtime: new Date() });

			return expect(downloadUtil.download(url, outDir)).returned;
		});
	});

	describe('#downloadLiskAndValidate', () => {
		let readFileSyncStub: SinonStub;
		let verifyChecksumStub: SinonStub;

		beforeEach(() => {
			sandbox.stub(downloadUtil, 'download');
			verifyChecksumStub = sandbox.stub(downloadUtil, 'verifyChecksum');
			sandbox
				.stub(commons, 'getDownloadedFileInfo')
				.returns({ fileDir: '', fileName: '', filePath: '' });
			readFileSyncStub = sandbox.stub(fs, 'readFileSync');
		});

		it('should download lisk and validate release', async () => {
			readFileSyncStub
				.onCall(0)
				.returns(
					'7607d6792843d6003c12495b54e34517a508d2a8622526aff1884422c5478971 tar filename here',
				);

			await downloadUtil.downloadAndValidate(url, outDir);
			expect(downloadUtil.download).to.be.calledTwice;
			return expect(commons.getDownloadedFileInfo).to.be.calledOnce;
		});

		it('should throw error when validation fails', async () => {
			readFileSyncStub
				.onCall(0)
				.returns(
					'9897d6792843d6003c12495b54e34517a508d2a8622526aff1884422c5478971 tar filename here',
				);
			verifyChecksumStub.rejects(new Error('Checksum did not match'));

			return expect(
				downloadUtil.downloadAndValidate(url, outDir),
			).to.rejectedWith('Checksum did not match');
		});
	});
});
