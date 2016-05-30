'use strict';

module.exports = function(deps) {

    const fs = deps.fs;
    const path = deps.path;

    return {
        readMachines
    };

    function readMachines(dockerMachinesDir) {
        return fs.readdirSync(dockerMachinesDir)
            .map(dir => readMachine(dockerMachinesDir, dir))
            .filter(m => isRemoteMachine(m));
    }

    function readMachine(dockerMachinesDir, dir) {
        const machineDir = path.join(dockerMachinesDir, dir);
        return {
            name: dir,
            config: JSON.parse(read('config.json').contents),
            files: ['ca.pem', 'cert.pem', 'id_rsa', 'id_rsa.pub', 'key.pem',
                'server-key.pem', 'server.pem'].map(read)
        };

        function read(name) {
            return {
                name,
                contents: fs.readFileSync(path.join(machineDir, name)).toString()
            };
        }
    }

    function isRemoteMachine(m) {
        return m.config.DriverName !== 'virtualbox';
    }

};

