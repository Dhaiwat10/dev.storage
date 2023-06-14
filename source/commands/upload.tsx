import React, {useEffect} from 'react';
import {Text} from 'ink';
import zod from 'zod';
import {fetchGithubRepo} from '../utils/cli.js';
import {addContent} from '../utils/estuary.js';

export const options = zod.object({
	url: zod.string().url().describe('Github Repository URL'),
});

type Props = {
	options: zod.infer<typeof options>;
};

export default function Upload({options}: Props) {
	const [file, setFile] = React.useState<string | null>('');
	const [cid, setCid] = React.useState<string>('');

	useEffect(() => {
		fetchGithubRepo(options.url).then(res => {
			setFile(res);
		});
	}, []);

	useEffect(() => {
		if (file) {
			addContent(file).then(res => {
				if (res && res.code && res.code === 401) {
					console.log('Plese add your Estuary API key');
					process.exit(1);
				}

				console.log(res);

				if (res && res.cid) {
					setCid(res.cid);
				}
			});
		}
	}, [file]);

	return (
		<Text>
			{cid ? (
				<Text>
					<Text>
						File url: {file}
						{'\n'}
					</Text>
					<Text color="green">Success!</Text> Uploaded{' '}
					<Text color="blue">{options.url}</Text> to Estuary node{' '}
					<Text color="blue">{cid}</Text>
				</Text>
			) : (
				<Text>
					<Text color="yellow">Uploading...</Text>
				</Text>
			)}
		</Text>
	);
}
