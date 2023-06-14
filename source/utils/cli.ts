import axios from 'axios';
import fs from 'fs';

export const fetchGithubRepo = async (repoUrl: string) => {
	try {
		const [username, repoName] = repoUrl.split('/').slice(-2);

		const apiUrl = `https://api.github.com/repos/${username}/${repoName}/zipball`;

		const response = await axios.get(apiUrl, {
			responseType: 'stream',
		});

		fs.mkdirSync(`data/${username}`, {recursive: true});

		const filePath = `data/${username}/${repoName}.zip`;
		const writeStream = fs.createWriteStream(filePath);

		// Pipe the response stream into the write stream
		response.data.pipe(writeStream);

		// Wait for the write stream to finish writing the tarball
		await new Promise((resolve, reject) => {
			writeStream.on('finish', resolve);
			writeStream.on('error', reject);
		});

		console.log(`Tarball saved at ${filePath}`);
		return filePath;
	} catch (error) {
		console.error(error);
		return null;
	}
};
