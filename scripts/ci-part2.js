#!/usr/bin/env node
const { execSync } = require('child_process')
const path = require('path')

const argv = process.argv.slice(2)
if (argv.indexOf('--reset') > -1 && argv[argv.indexOf('--reset') + 1] !== 'n') {
    console.log('\x1b[33m%s\x1b[0m', 'nx reset...');
    execSync('./node_modules/.bin/nx reset', {
        cwd: path.join(__dirname, '../source'),
        stdio: 'inherit'
    })
    console.log('\x1b[32m%s\x1b[0m', 'done');
}

console.log('\x1b[33m%s\x1b[0m', 'lint all...');
console.time('lint')
execSync('./node_modules/.bin/nx run-many --target lint', {
    cwd: path.join(__dirname, '../source'),
    stdio: 'inherit'
})
console.timeEnd('lint')
console.log('\x1b[32m%s\x1b[0m', 'done');

console.log('\x1b[33m%s\x1b[0m', 'build all...');
console.time('build')
execSync('./node_modules/.bin/nx run-many --target build --configuration production', {
    cwd: path.join(__dirname, '../source'),
    stdio: 'inherit'
})
console.timeEnd('build')
console.log('\x1b[32m%s\x1b[0m', 'done');

console.log('\x1b[33m%s\x1b[0m', 'test all...');
console.time('test')
execSync('./node_modules/.bin/nx run-many --target test', {
    cwd: path.join(__dirname, '../source'),
    stdio: 'inherit'
})
console.timeEnd('test')
console.log('\x1b[32m%s\x1b[0m', 'done');