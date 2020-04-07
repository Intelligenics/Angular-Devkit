import path = require("path");
import fs = require("fs");
import { pathToFileURL } from "url";

export class WhitelistValidator
{
    public validate(whitelistPath: string): void
    {
        if (!whitelistPath)
            throw "A whitelist file path must be provided";

        if (whitelistPath.indexOf("-whitelist-file=") == -1)
            throw `A whitelist file path must be provided as: -whitelist-file='filepath'`;

        let paths = whitelistPath.split("=");

        if (paths.length != 2)
            throw "A whitelist file path must be provided as: -whitelist-file='filepath'";

        let inputPackagePath = path.join(process.cwd(), "package.json");

        if (!fs.existsSync(inputPackagePath))
            throw `unable to find package.json, check your running in the correct working directory. Path is ${inputPackagePath}`;

        if (!fs.existsSync(paths[1]))
            throw `unable to open the whitelist file. Check the path exists. Path is ${whitelistPath}`;

        let inputFile = fs.readFileSync(inputPackagePath);
        let whitelistFile = fs.readFileSync(paths[1]);
        let inputPackageJSON = JSON.parse(inputFile.toString());
        let whitelistJSON = JSON.parse(whitelistFile.toString());

        this.checkItems(inputPackageJSON.dependencies, whitelistJSON);
        this.checkItems(inputPackageJSON.devDependencies, whitelistJSON);

        console.log("All checks completed successfully");
    }


    private checkItems(items: any, whitelistJson: any): void
    {
        let errorcount = 0;

        let whitelistKeys = Object.keys(whitelistJson);

        // keep local packages
        Object.keys(items)
            .forEach(key =>
            {
                let validKey = whitelistKeys.find(whitelistKey =>
                {
                    //console.log("validating", key, whitelistKey);

                    return key == whitelistKey
                });

                if (!validKey)
                {
                    console.log(`The package reference ${key} is not in the company whitelist, you must remove this reference from the module`);
                    errorcount++;
                    return;
                }
            });

        if (errorcount > 0)
            throw "Items in the package.json file were found that are not allowed. Please see previous errors for details";
    }
}
