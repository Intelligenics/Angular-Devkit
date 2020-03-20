"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const fs_1 = require("fs");
class Updater {
    /**
     * Update all projects in a solution or a specific module
     */
    static update() {
        if (!fs_1.existsSync(process.cwd()))
            throw "The path does not exist " + process.cwd();
        if (Updater.isPortal()) {
            console.log("\r\nUpdating portal", path.basename(process.cwd()));
            Updater.doCommand('schematics @intelligenics/schematics:portal-builder', process.cwd());
            return;
        }
        if (Updater.isModule()) {
            console.log("\r\nUpdating module", path.basename(process.cwd()));
            Updater.doCommand('schematics @intelligenics/schematics:module-builder', process.cwd());
            return;
        }
        if (process.cwd().indexOf("Web") < 0)
            throw "This is not a valid solution folder. Folders should have the Company.Product.Web naming convention";
        console.log("Updating solution ", path.basename(process.cwd()));
        fs_1.readdirSync(process.cwd())
            .filter(item => {
            return fs_1.lstatSync(item).isDirectory();
        })
            .map(directory => {
            return path.join(process.cwd(), directory);
        })
            .filter(directory => {
            // Only update folders that have a package.json
            return fs_1.readdirSync(directory)
                .filter(item => {
                let localPath = path.join(directory, item);
                if (fs_1.lstatSync(localPath).isFile()) {
                    return item == "package.json";
                }
            }).length > 0;
        })
            .forEach(directory => {
            if (directory.toLowerCase().indexOf("portal") > -1) {
                console.log("\r\nUpdating", path.basename(directory));
                Updater.doCommand('schematics @intelligenics/schematics:portal-builder', directory);
                return;
            }
            console.log("\r\nUpdating", path.basename(directory));
            Updater.doCommand('schematics @intelligenics/schematics:module-builder', directory);
        });
    }
    static doCommand(command, cwd) {
        let result = child_process_1.spawnSync(command, {
            shell: true,
            cwd: cwd
        });
        if (result.stderr && result.stderr.length > 0) {
            console.log(result.stderr.toString());
            throw "errors reported";
        }
        console.log(result.stdout.toString());
    }
    static isPortal() {
        return (process.cwd().toLowerCase().indexOf("portal") > -1);
    }
    static isModule() {
        return fs_1.readdirSync(process.cwd())
            .filter(item => {
            if (item.toLowerCase().indexOf("portal") > -1)
                return false;
            return item == "package.json";
        }).length > 0;
    }
    static isSolution() {
        return fs_1.readdirSync(process.cwd())
            .filter(item => {
            return item == "angular.json";
        }).length > 0;
    }
}
exports.Updater = Updater;
//# sourceMappingURL=updater.js.map