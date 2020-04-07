import { exec, execSync } from "child_process";
import * as fs from "fs";
import path = require("path");

export class GitProcessor
{
    /**
     * This method gets a project that has changed
     * This assumes that any pr will only apply changes to one module. An error
     * will be reported otherwise
     */
    public getProject(commitCommand: string, param1: string, param2: string): string 
    {

        let projects = [];

        let command = "";

        switch (commitCommand)
        {
            case "-b": // use branches
                command = `${param1}..${param2}`;
                break;

            case "-c": // use specific commits 
                command = `${param1} ${param2}`;
                break;

            default: // default to last two commits
                {
                    let commits = execSync(`git log -2 --pretty=format:"%H"`).toString().split(/\r?\n/);

                    if (!commits || 0 == commits.length)
                    {
                        throw "No module changes were identified."; 

                        return null;
                    }

                    command = `${commits[0]} ${commits[1]}`;
                }
                break;
        }

        let output = execSync(`git diff --name-only ${command}`);

        let directories = output.toString().split(/\r?\n/);

        if (0 == directories.length)
            throw "No module changes were identified.";

        directories
            .filter(directory =>
            {
                //exclude vscode workspace files
                if (directory.toLowerCase().indexOf(".code-workspace") > 0)
                    return false;

                // Must exclude portal projects only modules are built this way 
                if (directory.toLowerCase().indexOf("portal") > 0)
                    return false;

                return true;
            })
            .forEach((directory: string) =>
            {
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
            throw `More than one module has been modified in this commit. You must only change one module at a time. \r\nProjects changed: \r\n\r\n${projects.join(',\r\n')}\r\n`;

        if (projects.length > 0)
            return projects[0];

        throw "No module changes were identified.";
    }

    // public stageFile(fileName: string)
    // {
    //     execSync(`git add ${fileName}`);
    // }

    // public commitChanges(message: string)
    // {
    //     execSync(`git commit -m ${message}`);
    // }

    // public getBranchType(): BranchType
    // {
    //     let details = execSync(`git log  -1 --format=%B`).toString().toLowerCase();

    //     if (details.indexOf("feature/") > -1)
    //     {
    //         return BranchType.Feature;
    //     }
    //     if (details.indexOf("bugfix/") > -1)
    //     {
    //         return BranchType.Bugfix;
    //     }

    //     if (details.indexOf("hotfix/") > -1)
    //     {
    //         return BranchType.Hotfix;
    //     }

    //     if (details.indexOf("release/") > -1)
    //     {
    //         return BranchType.Release;
    //     }

    //     if (details.indexOf("breaking/") > -1)
    //     {
    //         return BranchType.Breaking;
    //     }

    //     return BranchType.InvalidBranchType;
    // }
}

export enum BranchType
{
    Feature,
    Hotfix,
    Release,
    Bugfix,
    Breaking,
    InvalidBranchType,
}
