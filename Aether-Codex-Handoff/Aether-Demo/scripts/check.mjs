import {readFile,readdir,stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve('dist');
async function walk(dir){const out=[];for(const name of await readdir(dir)){const file=path.join(dir,name);if((await stat(file)).isDirectory())out.push(...await walk(file));else out.push(file);}return out;}
const files=await walk(root);
for(const file of files.filter(f=>f.endsWith('.js'))){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr);const source=await readFile(file,'utf8');for(const match of source.matchAll(/(?:from\s*|import\s*\()\s*['"](\.\.?\/[^'"]+)['"]/g)){const dependency=path.resolve(path.dirname(file),match[1]);await stat(dependency);}}
const html=await readFile(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g))await stat(path.resolve(root,match[1]));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)throw new Error('Duplicate HTML ids');
const app=await readFile(path.join(root,'app.js'),'utf8');for(const match of app.matchAll(/\$\('#([\w-]+)'\)/g))if(!ids.includes(match[1]))throw new Error('Missing DOM element: '+match[1]);
if(html.includes('codex-preview'))throw new Error('Preview metadata remains');
console.log(`Static checks passed: ${files.length} assets, all JS parses, local imports and UI ids resolve.`);
