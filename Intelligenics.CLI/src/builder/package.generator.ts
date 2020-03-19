import path = require("path");
import fs = require("fs");

import { BranchType } from "./git.processor";

export class PackageGenerator
{
    public generate(projectPath: string, branchType: BranchType): void
    {
        let inputPackagePath = path.join(projectPath, "package.json");
        let outputPackagePath = path.join(projectPath, "dist/module", "package.json");

        if (!fs.existsSync(outputPackagePath))
            throw "unable to create package as package.json does not exist. Try calling prepublish first";

        let inputFile = fs.readFileSync(inputPackagePath);
        let outputFile = fs.readFileSync(outputPackagePath);
        let inputPackageJSON = JSON.parse(inputFile.toString());
        let outputPackageJSON = JSON.parse(outputFile.toString());
        this.setversion(inputPackageJSON, outputPackageJSON, branchType);
        this.addProperties(inputPackageJSON, outputPackageJSON);
        let inputFileOut = JSON.stringify(inputPackageJSON, null, 2);
        let outputFileOut = JSON.stringify(outputPackageJSON, null, 2);
        fs.writeFileSync(inputPackagePath, inputFileOut);
        fs.writeFileSync(outputPackagePath, outputFileOut);
    }
    private addProperties(inputPackageJSON: any, outputPackageJSON: any): void
    {
        outputPackageJSON.name = inputPackageJSON.name;
        outputPackageJSON.author = inputPackageJSON.author;
        outputPackageJSON.keywords = inputPackageJSON.keywords;
        outputPackageJSON.repository = inputPackageJSON.repository;
        outputPackageJSON.license = inputPackageJSON.license;
        outputPackageJSON.peerDependencies = inputPackageJSON.dependencies;
        delete outputPackageJSON["dependencies"];
        delete outputPackageJSON["devDependencies"];
    }


    
    private setversion(inputPackageJSON: any, outputPackageJSON: any, branchType: BranchType): void
    {
        let version: Array<string> = inputPackageJSON.version.split(".");

        // Update minor number only
        let major: number = parseInt(version[0]);
        let minor: number = parseInt(version[1]);
        let patch: number = parseInt(version[2]);

        switch (branchType)
        {
            case BranchType.Hotfix:
            case BranchType.Bugfix:
                patch++;
                break;
            case BranchType.Feature:
                minor++;
            case BranchType.Breaking:
                major++;
                minor = 0;
                patch = 0;
                break;
            case BranchType.Release:
                major++;
                minor = 0;
                patch = 0;
                break;
            case BranchType.InvalidBranchType:
                throw "invalid branch type specified. The description of the commit  for the pullrequest, must include the branchname \
                using gitflow branch naming conventions. e.g. feature/x, bugfix/x, hotfix/x,  release/x, breaking/x";
            default:
                break;
        }

        let finalversion: string = `${major}.${minor}.${patch}`;
        outputPackageJSON.version = finalversion;
        inputPackageJSON.version = finalversion;
    }
}
