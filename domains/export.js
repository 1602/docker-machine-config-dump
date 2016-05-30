
module.exports = function(deps) {
    const list = deps.list;

    return exportMachines;

    function exportMachines(dockerMachinesDir) {
        const serializable = list.readMachines(dockerMachinesDir)
            .map(m => presentForSerialization(m));
        return JSON.stringify(serializable);
    }

    function presentForSerialization(machine) {
        return {
            name: machine.name,
            files: machine.files.concat({
                name: 'config.json',
                contents: JSON.stringify(machine.config)
            })
        };
    }

};

