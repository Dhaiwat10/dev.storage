#!/usr/bin/env node
import Pastel from 'pastel';
import dotenv from 'dotenv';

dotenv.config();

const app = new Pastel({
	importMeta: import.meta,
});

await app.run();
