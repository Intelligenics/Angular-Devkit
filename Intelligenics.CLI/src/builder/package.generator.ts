import path = require("path");
import fs = require("fs");

export class PackageGenerator
{
    public generate(): void
    {
        let inputPackagePath = path.join(process.cwd(), "package.json");
        let outputPackagePath = path.join(process.cwd(), "dist/module", "package.json");

        console.log("Copying ", inputPackagePath, outputPackagePath);

        if (!fs.existsSync(inputPackagePath))
            throw "unable to find package.json, check your running in the correct working directory";

        if (!fs.existsSync(outputPackagePath))
            throw "unable to create package as package.json does not exist. Try calling prepublish first";

        let inputFile = fs.readFileSync(inputPackagePath);
        let outputFile = fs.readFileSync(outputPackagePath);
        let inputPackageJSON = JSON.parse(inputFile.toString());
        let outputPackageJSON = JSON.parse(outputFile.toString());
        this.addProperties(inputPackageJSON, outputPackageJSON);
        let inputFileOut = JSON.stringify(inputPackageJSON, null, 2);
        let outputFileOut = JSON.stringify(outputPackageJSON, null, 2);
        fs.writeFileSync(outputPackagePath, outputFileOut); 

        console.log("Copying completed successfully");
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
