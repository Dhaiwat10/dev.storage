import React, {useEffect} from 'react';
import {Text} from 'ink';
import zod from 'zod';
import {fetchGithubRepo} from '../utils/cli.js';
import {upload} from '../utils/web3storage.js';

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
			upload(file).then(res => {
				setCid(res);
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
					<Text color="blue">{options.url}</Text> to web3storage node{' '}
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
