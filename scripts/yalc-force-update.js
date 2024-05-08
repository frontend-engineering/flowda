#!/usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')

console.log('\x1b[33m%s\x1b[0m', 'find .yalc and rm...');
execSync('find ./node_modules/.pnpm -type d -name "file+.yalc+*" -print -exec rm -r {} +', {
    cwd: path.join(__dirname, '../source'),
    stdio: 'inherit'
})
execSync('pnpm dlx pnpm@7.33.7 i --frozen-lockfile --ignore-scripts', {
    cwd: path.join(__dirname, '../source'),
    stdio: 'inherit'
})
console.log('\x1b[32m%s\x1b[0m', 'done');
