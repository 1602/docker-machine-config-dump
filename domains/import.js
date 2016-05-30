'use strict';

module.exports = function(deps) {
    const fs = deps.fs;
    const path = deps.path;

    return importMachines;

    function importMachines(dockerMachinesDir, data) {
        const machines = JSON.parse(data);
        machines.forEach(machine => importMachine(dockerMachinesDir, machine));
    }

    function importMachine(dockerMachinesDir, machine) {
        const dockerMachineDir = path.join(dockerMachinesDir, machine.name);
        if (!fs.existsSync(dockerMachineDir)) {
            fs.mkdirSync(dockerMachineDir);
        }
        machine.files.forEach(file => {
            fs.writeFileSync(path.join(dockerMachineDir, file.name), file.contents);
        });
    }

};
