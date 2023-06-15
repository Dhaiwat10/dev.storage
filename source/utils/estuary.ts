import axios, {AxiosError} from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const BASE_URL = 'https://api.estuary.tech';

export const addContent = async (filePath: string) => {
	const data = new FormData();

	const filename = filePath.split('/').slice(-1)[0];

	const fileBuffer = fs.createReadStream(filePath);
	data.append('content', fileBuffer);

	data.append('filename', filename);

	try {
		const {data: res} = await axios({
			method: 'post',
			url: `${BASE_URL}/content/add`,
			data,
			headers: {
				Authorization: `Bearer ${process.env['ESTUARY_API_KEY']}`,
				Accept: 'application/json',
				...data.getHeaders(),
			},
		});

		return res;
	} catch (err) {
		if (err instanceof AxiosError) {
			return err.response?.data;
		}
	}
};
