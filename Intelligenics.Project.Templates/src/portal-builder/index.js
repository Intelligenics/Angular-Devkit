"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const path = require("path");
const helpers_1 = require("../common/helpers");
const filemanager_1 = require("../common/filemanager");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function generator(_options) {
    _options.path = process.cwd();
    return schematics_1.chain([
        // Read package information
        (tree, _context) => {
            if (!tree)
                return;
            helpers_1.Helpers.setHeaderOptions(_options, tree);
            _options.name = "portal";
            _options.lowercasename = _options.name.toLowerCase();
            _options.lowercasecompany = _options.company.toLowerCase();
            _options.lowercaseproduct = _options.product.toLowerCase();
            _options.classname = strings_1.classify(_options.name.toLowerCase());
            _options.camelcasename = strings_1.camelize(_options.name.toLowerCase());
            _options.gitignore = "gitignore";
            if (!_options.name)
                throw "unable to find package information";
        },
        /// Reset the original workspace
        (tree, _context) => {
            let localPath = ".";
            filemanager_1.FileManager.deleteFiles(localPath, tree, ["package.json", "DockerFile", "README.md", "settings.json", "package-lock.json"]);
            filemanager_1.FileManager.deleteDirectories(".", tree, ["node_modules", "src", "e2e"]);
            filemanager_1.FileManager.deleteFiles("src", tree, ["favicon.ico", "index.html"]);
            localPath = path.join("src", "environments");
            filemanager_1.FileManager.deleteDirectory(localPath, tree);
            localPath = path.join("src", "app");
            filemanager_1.FileManager.deleteFiles(localPath, tree, ["app.routing.ts", "app.module.ts"]);
            localPath = path.join("e2e");
            filemanager_1.FileManager.deleteFiles(localPath, tree);
            return tree;
        },
        //  Add modules builder files
        (tree, _context) => {
            const sourceTemplates = schematics_1.url('./files');
            if (null == tree)
                return;
            try {
                const sourceParameterisedTemplates = schematics_1.apply(sourceTemplates, [
                    schematics_1.template(Object.assign({}, _options, core_1.strings))
                ]);
                return schematics_1.mergeWith(sourceParameterisedTemplates, schematics_1.MergeStrategy.Overwrite);
            }
            catch (error) {
                console.log(error);
            }
        }
    ]);
}
exports.default = generator;
//# sourceMappingURL=index.js.map