"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
function generator(_options) {
    return schematics_1.chain([
        (tree, _context) => {
            const sourceTemplates = schematics_1.url('./files');
            if (null == tree)
                return;
            if (null == _options.product)
                throw new Error("The product name must be specified");
            if (null == _options.company)
                throw new Error("The company name must be specified");
            _options.test = _options.path ? core_1.normalize(_options.path) : _options.path;
            _options.name = _options.product.toLowerCase();
            _options.lowercasename = _options.product.toLowerCase();
            _options.lowercasecompany = _options.company.toLowerCase();
            _options.lowercaseproduct = _options.product.toLowerCase();
            _options.classname = strings_1.classify(_options.product.toLowerCase());
            _options.camelcasename = strings_1.camelize(_options.product.toLowerCase());
            _options.npmignore = "npmignore";
            _options.gitignore = "gitignore";
            try {
                const sourceParameterisedTemplates = schematics_1.apply(sourceTemplates, [
                    schematics_1.template(Object.assign({}, _options, core_1.strings))
                ]);
                var test = schematics_1.mergeWith(sourceParameterisedTemplates);
                return test;
            }
            catch (error) {
                console.log(error);
            }
        },
        (tree, _context) => {
            if (null == tree)
                return;
            //runNpmInstall();
        }
    ]);
}
exports.default = generator;
//# sourceMappingURL=index.js.map