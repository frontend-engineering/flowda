#!/usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')

const argv = process.argv.slice(2)
if (argv.indexOf('--yalc') > -1 && argv[argv.indexOf('--yalc') + 1] !== 'n') {
    execSync('node ./scripts/yalc-force-update.js', {
        cwd: path.join(__dirname, '../source'),
        stdio: 'inherit'
    })
} else {
    console.log('\x1b[33m%s\x1b[0m', 'pnpm i...');
    execSync('pnpm dlx pnpm@7.33.7 i --frozen-lockfile --ignore-scripts', {
        cwd: path.join(__dirname, '../source'),
        stdio: 'inherit'
    })
    console.log('\x1b[32m%s\x1b[0m', 'done');
}

execSync('node ./scripts/ci-part2.js' + (argv.length === 0 ? '' : ' ' + argv.join(' ')), {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
})