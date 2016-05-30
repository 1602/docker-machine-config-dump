
module.exports = function(deps) {
    const fs = deps.fs;
    const path = deps.path;
    const serializeDirectory = require('./serialize-directory')({ fs, path });

    return exportMachines;

    function exportMachines(dockerMachineDirectory, names) {

        const machines = serializeDirectory([dockerMachineDirectory, 'machines'], {
            filter(filename) {
                return names.indexOf(filename) > -1;
            },
            preprocess(filename, contents) {
                if (filename !== 'config.json') {
                    return contents;
                }
                return contents.replace(
                    new RegExp(process.env.HOME, 'gi'), '$HOME'
                );
            }
        });

        const certs = serializeDirectory([dockerMachineDirectory, 'certs']);

        return JSON.stringify({ machines, certs });
    }

};

