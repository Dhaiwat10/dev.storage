import {Web3Storage, getFilesFromPath} from 'web3.storage';

export const initWeb3Storage = async () => {
	const client = new Web3Storage({
		token: process.env['WEB3STORAGE_TOKEN'],
	});

	return client;
};

export const upload = async (filepath: string) => {
	const client = await initWeb3Storage();

	const files = await getFilesFromPath(filepath);
	const cid = await client.put(files);

	return cid;
};
