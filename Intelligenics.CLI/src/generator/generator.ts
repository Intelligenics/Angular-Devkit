import { GitProcessor } from "../builder/git.processor";
import { spawnSync } from "child_process";
import { pathToFileURL } from "url";
import path = require("path");
import { readdirSync, lstatSync, existsSync } from "fs";

export class Generator
{
    public static generate(args: string[]): void
    {
        Generator.checkParameters(args);

        let company = args[1].replace("--company=", "");
        let product = args[2].replace("--product=", "");

        let moduleName = "";
        if (args[0] == ("solution") || args[0] == ("module"))
            moduleName = args[3].replace("--module=", "");

        let solutionPath = path.join(process.cwd(), `${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web`);

        if (args[0] == "solution")  // Adds a new solution
        {
            if (existsSync(solutionPath))
                throw "A solution with the same path already exists";

            Generator.doCommand(`md ${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web`, process.cwd());
            Generator.doCommand(`schematics @intelligenics/schematics:module-template  --company=${company}  --product=${product} --name=${moduleName}  `, solutionPath);
            Generator.doCommand(`schematics @intelligenics/schematics:portal-template  --company=${company}  --product=${product}`, solutionPath);
            Generator.doCommand(`schematics @intelligenics/schematics:styles-template  --company=${company}  --product=${product}`, solutionPath);
            Generator.doCommand(`igx update`, solutionPath);
            console.log("Solution generated successfully");
            return;
        }

        let localpath = process.cwd();
        let basePath = `${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web`;

        if (path.basename(localpath) != basePath)
            throw "this command must be run from a solution folder of the format Mycompany.MyProduct.Web";


        switch (args[0])
        {
            case "module": // Adds a new solution  
                Generator.doCommand(`schematics @intelligenics/schematics:module-template --company=${company}  --product=${product} --name=${moduleName}`, localpath);
                Generator.doCommand(`igx update`, localpath);
                console.log("Module generated successfully");
                break;
            case "styles": // Adds a new solution 
                Generator.doCommand(`schematics @intelligenics/schematics:styles-template --company=${company}  --product=${product}`, localpath);
                Generator.doCommand(`igx update`, localpath);
                console.log("Module generated successfully");
                break;
            case "portal": // Adds a new solution 
                Generator.doCommand(`schematics @intelligenics/schematics:portal-template --company=${company}  --product=${product}`, localpath);
                Generator.doCommand(`igx update`, localpath);
                console.log("Module generated successfully");
                break;
            default:
                break;
        }
    }

    private static checkParameters(args: string[])
    {
        if (args.length < 3)
            throw "the generate command expects at least 3 arguments. Use igx --help to see available options";

        if (args[0] != ("solution") && args[0] != ("module") && args[0] != ("styles") && args[0] != ("portal"))
            throw `${args[0]} is not an available generation command`;
        if (args[1].indexOf("--company=") < 0)
            throw "--company parameter was not in correct format user --help to see options";
        if (args[2].indexOf("--product=") < 0)
            throw "--product parameter was not in correct format user --help to see options";

        if (args[0] == ("solution") || args[0] == ("module"))
        {
            if (args.length < 4)
                throw "--module parameter was not provided";

            if (args[3].indexOf("--module=") < 0)
                throw "--module parameter was not in correct format user --help to see options";
        }
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
        if (result.error && result.error.message)
        {
            console.log(result.error.message);
            throw "errors reported";
        }

        if (result.stdout)
            console.log(result.stdout.toString());
    }

    private static capitalise(name: string)
    {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
}
