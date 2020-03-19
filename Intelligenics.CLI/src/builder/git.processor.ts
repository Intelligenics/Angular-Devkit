import { exec, execSync } from "child_process";
import * as fs from "fs";
import path = require("path");

export class GitProcessor
{
    /**
     * This method gets all the projects that have been changed
     */
    public getProjects(commitCommand: string, param1: string, param2: string): Array<string>
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
                        console.log("no commits found");

                        return [];
                    }

                    command = `${commits[0]} ${commits[1]}`;
                }
                break;
        }

        let output = execSync(`git diff --name-only ${command}`);

        let directories = output.toString().split(/\r?\n/);

        if (0 == directories.length)
        {
            console.log("no differences identified in commit");
            return;
        }


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


        return projects;
    }

    public stageFile(fileName: string)
    {
        execSync(`git add ${fileName}`);
    }

    public commitChanges(message: string)
    {
        execSync(`git commit -m ${message}`);
    }

    public getBranchType(): BranchType
    {
        let details = execSync(`git log  -1 --format=%B`).toString().toLowerCase();

        if (details.indexOf("feature/") > -1)
        {
            return BranchType.Feature;
        }
        if (details.indexOf("bugfix/") > -1)
        {
            return BranchType.Bugfix;
        }

        if (details.indexOf("hotfix/") > -1)
        {
            return BranchType.Hotfix;
        }

        if (details.indexOf("release/") > -1)
        {
            return BranchType.Release;
        }

        if (details.indexOf("breaking/") > -1)
        {
            return BranchType.Breaking;
        }

        return BranchType.InvalidBranchType;
    }
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
