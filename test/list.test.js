'use strict';

const fs = require('fs');
const path = require('path');

describe('machines list', () => {

    const list = require('../domains/list-machines')({fs, path});

    it('should read directory of docker machines', () => {
        console.log(list.readMachines(path.join(process.env.HOME, '.docker', 'machine', 'machines')).map(m => {
            return {
                name: m.config.Name,
                driver: m.config.DriverName,
                ip: m.config.Driver.IPAddress,
                files: m.files
            };
        })[0]);
    });

});

