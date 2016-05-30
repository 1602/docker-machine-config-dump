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
            .map(name => {
                const itemPath = path.join(dir, name);
                const isDir = fs.lstatSync(itemPath).isDirectory();
                if (isDir) {
                    if (filter(name)) {
                        return {
                            name,
                            files: serializeDirectory(itemPath, opts)
                        };
                    }
                } else {
                    return {
                        name,
                        contents: fs.readFileSync(itemPath).toString()
                    };
                }
            })
            .filter(Boolean);

        function process(name, contents) {
            if (opts && opts.preprocessFiles) {
                return opts.preprocessFiles(name, contents);
            }
            return contents;
        }

        function filter(name) {
            if (opts && opts.filterDirsByName) {
                return opts.filterDirsByName(name);
            }
            return true;
        }
    }

};
