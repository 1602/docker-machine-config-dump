#!/usr/bin/env node

const commander = require('commander');
const fs = require('fs');
const path = require('path');

commander
	.version(require('../package').version)
	.usage('[options]')
	.description('Import/Export docker-machines')
	.parse(process.argv);

const dockerMachinesDir = path.join(
    process.env.HOME, '.docker', 'machine', 'machines');

if (!process.stdin.isTTY) {
    performImport(process.stdin);
}

if (!process.stdout.isTTY) {
    performExport(process.stdout);
}

function performExport(stream) {
    const list = require('../domains/list-machines')({fs, path});
    const exportMachines = require('../domains/export')({list});
    stream.write(exportMachines(dockerMachinesDir) + '\n');
}

function performImport(stream) {
    const importMachines = require('../domains/import')({fs, path});
    stream.setEncoding('utf8');

    const data = [];
    stream.on('readable', () => data.push(stream.read()));
    stream.on('end', () => importMachines(dockerMachinesDir, data.join('')));
}


