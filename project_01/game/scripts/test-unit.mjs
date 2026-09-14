import {readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const files=readdirSync('tests').filter(n=>n.endsWith('.test.mjs')).sort().map(n=>`tests/${n}`);
const result=spawnSync(process.execPath,['--test',...process.argv.slice(2),...files],{stdio:'inherit'});
if(result.error)throw result.error;
process.exit(result.status??1);
