'use strict';

const path = require('path');
const fs = require('fs');

describe('export', () => {

    const list = require('../domains/list-machines')({fs, path});
    const exportMachines = require('../domains/export')({list});

    it.only('should serialize list of machines', () => {
        const dir = path.join(process.env.HOME, '.docker', 'machine', 'machines');
        console.log(exportMachines(dir));
    });
});


