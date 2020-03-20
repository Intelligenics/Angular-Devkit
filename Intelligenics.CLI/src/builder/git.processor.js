"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class GitProcessor {
    /**
     * This method gets a project that has changed
     * This assumes that any pr will only apply changes to one module. An error
     * will be reported otherwise
     */
    getProject(commitCommand, param1, param2) {
        let projects = [];
        let command = "";
        switch (commitCommand) {
            case "-b": // use branches
                command = `${param1}..${param2}`;
                break;
            case "-c": // use specific commits 
                command = `${param1} ${param2}`;
                break;
            default: // default to last two commits
                {
                    let commits = child_process_1.execSync(`git log -2 --pretty=format:"%H"`).toString().split(/\r?\n/);
                    if (!commits || 0 == commits.length) {
                        throw "No module changes were identified.";
                        return null;
                    }
                    command = `${commits[0]} ${commits[1]}`;
                }
                break;
        }
        let output = child_process_1.execSync(`git diff --name-only ${command}`);
        let directories = output.toString().split(/\r?\n/);
        if (0 == directories.length)
            throw "No module changes were identified.";
        directories
            .filter(directory => {
            //exclude vscode workspace files
            if (directory.toLowerCase().indexOf(".code-workspace") > 0)
                return false;
            // Must exclude portal projects only modules are built this way 
            if (directory.toLowerCase().indexOf("portal") > 0)
                return false;
            return true;
        })
            .forEach((directory) => {
            let subdirs = directory.split(/\//);
            if (subdirs.length < 2)
                return;
            let index = 0;
            // Check if we are at the solution path,if so move right
            if (subdirs[0].indexOf("Web") > -1)
                index = 1;
            if (subdirs[index].indexOf(".") == -1)
                return;
            if (subdirs[index].split(".").length != 3)
                return;
            // See if the project already exists
            let project = projects.find((item) => item == subdirs[index]);
            if (!project)
                projects.push(subdirs[index]);
        });
        if (projects.length > 1)
            throw "More than one module has been modified in this commit. You must only change one module at a time";
        if (projects.length > 0)
            return projects[0];
        throw "No module changes were identified.";
    }
}
exports.GitProcessor = GitProcessor;
var BranchType;
(function (BranchType) {
    BranchType[BranchType["Feature"] = 0] = "Feature";
    BranchType[BranchType["Hotfix"] = 1] = "Hotfix";
    BranchType[BranchType["Release"] = 2] = "Release";
    BranchType[BranchType["Bugfix"] = 3] = "Bugfix";
    BranchType[BranchType["Breaking"] = 4] = "Breaking";
    BranchType[BranchType["InvalidBranchType"] = 5] = "InvalidBranchType";
})(BranchType = exports.BranchType || (exports.BranchType = {}));
//# sourceMappingURL=git.processor.js.map