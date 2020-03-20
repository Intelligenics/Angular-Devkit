#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const git_processor_1 = require("./src/builder/git.processor");
const generator_1 = require("./src/generator/generator");
const updater_1 = require("./src/updater/updater");
const package_generator_1 = require("./src/builder/package.generator");
const whitelist_validator_1 = require("./src/builder/whitelist.validator");
var pjson = require('./package.json');
function doProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Remove path and dir params 
            process.argv.shift();
            process.argv.shift();
            switch (process.argv[0]) {
                case "--help":
                    console.log("\r\n\r\n=====================================================================");
                    console.log("Intelligenics - command line interface help menu");
                    console.log("=====================================================================\r\n");
                    console.log("\r\n");
                    console.log("Project updates\r\n");
                    console.log("=====================================================================\r\n");
                    console.log("\r\n");
                    console.log("igx update - updates all projects in the current solution. must be run from the root solution folder");
                    console.log("             or it updates the current module. Must be root module folder");
                    console.log("\r\n");
                    console.log("Project Management\r\n");
                    console.log("=====================================================================\r\n");
                    console.log("\r\n");
                    console.log("igx get-changed-module - calculates the changed module based on the commit information and returns the project path. Errors if more than one module is found");
                    console.log("\r\n");
                    console.log("            -b branchname branchname command      - gets the changed module based on branch differences ");
                    console.log("\r\n");
                    console.log("      e.g   -b develop feature/test ");
                    console.log(" ");
                    console.log("            -c commitno1 commitno2 command        - runs the specified command on each project based on commit differences ");
                    console.log("\r\n");
                    console.log("      e.g   -c 934383434399ddfdc 83934738838ddfc8d npm install   ");
                    console.log(" ");
                    console.log("\r\n");
                    console.log("igx package-copy - Copies all the package dependencies over to the deployed package.json prior to deployment.");
                    console.log("\r\n");
                    console.log("\r\n");
                    console.log("igx version - outputs this binaries version information");
                    console.log("\r\n");
                    console.log("igx check-whitelist -whitelist-file='filepath' - Checks the package.json file contains references only to references defined in the whitelist");
                    console.log("\r\n");
                    console.log("Project generation\r\n");
                    console.log("=====================================================================\r\n");
                    console.log("\r\n");
                    console.log("igx g solution --company=companyname --product=productname --module=modulename     - generates a solution with styles a portal, and one module");
                    console.log("igx g module   --company=companyname --product=productname --module=modulename     - generates a feature module inside a solution folder");
                    console.log("igx g styles   --company=companyname --product=productname                         - generates a styles module inside a solution folder");
                    console.log("igx g portal   --company=companyname --product=productname                         - generates a portal inside a solution folder");
                    break;
                case "update":
                    updater_1.Updater.update();
                    console.log("Updating completed");
                    break;
                case "g":
                    process.argv.shift();
                    generator_1.Generator.generate(process.argv);
                    break;
                case "get-changed-module":
                    let commitCommand = process.argv[1];
                    let param1 = process.argv[2];
                    let param2 = process.argv[3];
                    if (process.argv[1] == "-b" || process.argv[1] == "-c") {
                        param1 = process.argv[2];
                        param2 = process.argv[3];
                        process.argv.shift();
                        process.argv.shift();
                        process.argv.shift();
                        process.argv.shift();
                    }
                    else
                        process.argv.shift();
                    let git = new git_processor_1.GitProcessor();
                    console.log(git.getProject(commitCommand, param1, param2));
                    break;
                case "package-copy":
                    const packageGen = new package_generator_1.PackageGenerator();
                    packageGen.generate();
                    break;
                case "check-whitelist":
                    const validator = new whitelist_validator_1.WhitelistValidator();
                    validator.validate(process.argv[1]);
                    break;
                case "version":
                    console.log("using ", pjson.name, pjson.version);
                    break;
                default:
                    throw "unrecognised command format. Use --help to see available options";
                    break;
            }
        }
        catch (error) {
            if (error.stderr && error.stderr.length > 0)
                console.log(error.stderr.toString());
            else
                console.log(error);
            process.exitCode = 1;
        }
    });
}
doProcess();
//# sourceMappingURL=cli.js.map