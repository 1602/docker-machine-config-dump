'use strict';

module.exports = function(deps) {
    const fs = deps.fs;
    const path = deps.path;

    return serializeDirectory;

    function serializeDirectory(dir, opts) {
        if (dir instanceof Array) {
            dir = path.join.apply(path, dir);
        }

        return fs.readdirSync(dir)
            .filter(name => filter(name))
            .map(name => ({
                name,
                contents: process(
                    name,
                    fs.lstatSync(path.join(dir, name)).isDirectory()
                    ? serializeDirectory(path.join(dir, name))
                    : fs.readFileSync(path.join(dir, name)).toString()
                )
            }));

        function process(name, contents) {
            if (opts && opts.preprocess) {
                return opts.preprocess(name, contents);
            }
            return contents;
        }

        function filter(name) {
            if (opts && opts.filter) {
                return opts.filter(name);
            }
            return true;
        }
    }

};
