'use strict';

module.exports = function(deps) {
    const fs = deps.fs;
    const path = deps.path;

    return importMachines;

    function importMachines(dockerMachinesDir, data) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        const machines = data.machines;
        machines.forEach(machine => importMachine(dockerMachinesDir, machine));
        data.certs.forEach(cert => fs.writeFileSync(path.join(dockerMachinesDir, '../certs', cert.name), cert.contents));
    }

    function importMachine(dockerMachinesDir, machine) {
        const dockerMachineDir = path.join(dockerMachinesDir, machine.name);

        createDirIfMissing(dockerMachinesDir);

        machine.contents.forEach(file => {
            fs.writeFileSync(path.join(dockerMachineDir, file.name), file.contents);
        });

        fs.chmodSync(path.join(dockerMachineDir, 'id_rsa'), parseInt('600', 8));
    }

    function createDirIfMissing(dirPath) {
        if (fs.existsSync(dirPath)) {
            return;
        }
        fs.mkdirSync(dirPath);
    }

};
