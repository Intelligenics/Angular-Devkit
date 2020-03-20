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
const child_process_1 = require("child_process");
const fs_1 = require("fs");
class Common {
    static doCommand(command, cwd) {
        if (!fs_1.existsSync(cwd))
            throw `Cannot run command '${command}', the directory does not exist: '${cwd}'`;
        let result = child_process_1.spawnSync(command, {
            shell: true,
            cwd: cwd
        });
        if (result.stderr && result.stderr.length > 0) {
            console.log(result.stderr.toString());
            throw "errors reported";
        }
        if (result.error && result.error.message) {
            console.log(result.error.message);
            throw "errors reported";
        }
        if (result.stdout)
            console.log(result.stdout.toString());
    }
    static doCommandAsync(command, cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.existsSync(cwd))
                throw `Cannot run command '${command}', the directory does not exist: '${cwd}'`;
            return new Promise((resolve, reject) => {
                let shell = child_process_1.spawn(command, {
                    shell: true,
                    cwd: cwd
                });
                shell.stdout.on('data', (data) => {
                    console.log(`${data}`);
                });
                shell.stderr.on('data', (data) => {
                    console.log(`${data}`);
                });
                shell.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                    if (code == 0)
                        resolve();
                    else
                        reject();
                });
            });
        });
    }
}
exports.Common = Common;
//# sourceMappingURL=common.js.map