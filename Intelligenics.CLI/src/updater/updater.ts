import { spawnSync } from "child_process";
import path = require("path");
import { readdirSync, lstatSync, existsSync } from "fs";

export class Updater
{
    /**
     * Update all projects in a solution or a specific module
     */
    public static update()
    {
        if (!existsSync(process.cwd()))
            throw "The path does not exist " + process.cwd();

        if (Updater.isPortal())
        {
            console.log("\r\nUpdating portal", path.basename(process.cwd()));
            Updater.doCommand('schematics @intelligenics/schematics:portal-builder', process.cwd());
            return;
        }
        if (Updater.isModule())
        {
            console.log("\r\nUpdating module", path.basename(process.cwd()));
            Updater.doCommand('schematics @intelligenics/schematics:module-builder', process.cwd());
            return;
        }

        if (process.cwd().indexOf("Web") < 0)
            throw "This is not a valid solution folder. Folders should have the Company.Product.Web naming convention";

        console.log("Updating solution ", path.basename(process.cwd()));

        readdirSync(process.cwd())
            .filter(item =>
            {
                return lstatSync(item).isDirectory();
            })
            .map(directory =>
            {
                return path.join(process.cwd(), directory);
            })
            .filter(directory =>
            {
                // Only update folders that have a package.json
                return readdirSync(directory)
                    .filter(item =>
                    {
                        let localPath = path.join(directory, item);
                        if (lstatSync(localPath).isFile())
                        {
                            return item == "package.json";
                        }
                    }).length > 0;
            })
            .forEach(directory =>
            {

                if (directory.toLowerCase().indexOf("portal") > -1)
                {
                    console.log("\r\nUpdating", path.basename(directory));

                    Updater.doCommand('schematics @intelligenics/schematics:portal-builder', directory);
                    return;
                }

                console.log("\r\nUpdating", path.basename(directory));
                Updater.doCommand('schematics @intelligenics/schematics:module-builder', directory);

            });
    }

    private static doCommand(command: string, cwd: string)
    {
        let result = spawnSync(command, {
            shell: true,
            cwd: cwd
        });

        if (result.stderr && result.stderr.length > 0)
        {
            console.log(result.stderr.toString());
            throw "errors reported";
        }

        console.log(result.stdout.toString());
    }



    private static isPortal(): boolean
    {
        return (process.cwd().toLowerCase().indexOf("portal") > -1);
    }

    private static isModule(): boolean
    {
        return readdirSync(process.cwd())
            .filter(item =>
            {
                if (item.toLowerCase().indexOf("portal") > -1)
                    return false;
                    
                return item == "package.json";
            }).length > 0;
    }

}
