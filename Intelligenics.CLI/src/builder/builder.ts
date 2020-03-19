import { GitProcessor } from "./git.processor";
import { PackageGenerator } from "./package.generator";
import { spawnSync } from "child_process";

import path = require("path");

export class Builder
{
    public run(commitCommand: string, script: string, branch1: string, branch2: string): void
    {
        const git = new GitProcessor();
        const packageGen = new PackageGenerator();

        const projects = git.getProjects(commitCommand, branch1, branch2);

        console.log("The following projects will be affected");
        console.log("==================================================================");
        console.log(projects.join("\r\n"));
        console.log("\r\n");
        console.log("command is " + script);

        let errorCount = 0;

        projects.forEach((project) =>
        {
            const cwd = path.join(process.cwd(), project);

            console.log("cwd: ", cwd, "project: ", project, "command: ", script);

            try
            {
                switch (script)
                {
                    case "publish package public":
                        {
                            const publishDir = path.join(process.cwd(), project, "dist/module");
                            this.doCommand("npm publish --access public", publishDir);
                        }
                        break;
                    case "publish package private":
                        {
                            const publishDir = path.join(process.cwd(), project, "dist/module");
                            this.doCommand("npm publish", publishDir);
                        }
                        break;
                    case "generate package":
                        packageGen.generate(cwd, git.getBranchType());
                        break;
                    case "stage package":
                        git.stageFile(path.join(process.cwd(), project, "package.json"));
                        git.stageFile(path.join(process.cwd(), project, "package-lock.json"));
                        break;
                    default:
                        this.doCommand(script, cwd);
                        break;
                }
            }
            catch (error)
            {
                errorCount++;
                console.log(error);
            }
        });

        if (errorCount > 0)
        {
            process.exit(1);
        }
    }

    private doCommand(command: string, cwd: string)
    {
        let result = spawnSync(command, {
            shell: true,
            cwd: cwd
        });

        if (result.stderr && result.stderr.length > 0)
        {
            console.log(result.stderr.toString());

            if (result.status > 0)
                throw "errors reported";
        }

        if (result.stdout && result.stdout.length > 0)
            console.log(result.stdout.toString());
    }
}
