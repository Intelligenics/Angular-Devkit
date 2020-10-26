import path = require("path");

import { Common } from "../common/common";
import { existsSync } from "fs";

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

            Common.doCommand(`md ${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web`, process.cwd());
            Common.doCommand(`schematics @intelligenics/schematics:solution-template  --company=${company}  --product=${product} --name=${moduleName}`, solutionPath);
            Common.doCommand(`schematics @intelligenics/schematics:module-template  --company=${company}  --product=${product} --name=${moduleName}  `, solutionPath);
            Common.doCommand(`schematics @intelligenics/schematics:portal-template  --company=${company}  --product=${product}`, solutionPath);
            Common.doCommand(`schematics @intelligenics/schematics:styles-template  --company=${company}  --product=${product}`, solutionPath);
            Common.doCommand(`igx update`, solutionPath);
            Common.doCommand(`code ${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web.code-workspace`, solutionPath);
            console.log("Solution generated successfully");
            return;
        }

        if (args[0] == "standalone-portal")  // Adds a new solution
        {
            if (existsSync(solutionPath))
                throw "A solution with the same path already exists";

            Common.doCommand(`md ${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web`, process.cwd());
            Common.doCommand(`schematics @intelligenics/schematics:standalone-portal  --company=${company}  --product=${product}`, solutionPath);
            Common.doCommand(`code ${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web.code-workspace`, solutionPath);
            console.log("Solution generated successfully");
            return;
        }

        if (args[0] == "module") // Adds a new module  
        {
            let modulePath = path.join(process.cwd(), `${moduleName.toLowerCase()}`);

            Common.doCommand(`md ${moduleName.toLowerCase()}`, process.cwd());
            Common.doCommand(`schematics @intelligenics/schematics:module --company=${company}  --product=${product} --name=${moduleName}`, modulePath);
            console.log("Module generated successfully");
            return;
        } 

        let localpath = process.cwd();
        let basePath = `${Generator.capitalise(company)}.${Generator.capitalise(product)}.Web`;

        if (path.basename(localpath) != basePath)
            throw "this command must be run from a solution folder of the format Mycompany.MyProduct.Web";


        switch (args[0])
        {

            case "module-library": // Adds a feature module  
                {
                    let modulePath = path.join(localpath, `${Generator.capitalise(company)}.${Generator.capitalise(product)}.${Generator.capitalise(moduleName)}`);
                    console.log(modulePath);
                    if (existsSync(modulePath))
                        throw "A module with the same name already exists";

                    Common.doCommand(`schematics @intelligenics/schematics:module-template --company=${company}  --product=${product} --name=${moduleName}`, localpath);
                    Common.doCommand(`igx update`, modulePath);
                    console.log("Module generated successfully");
                }
                break;
            case "styles": // Adds a new styles module 
                {
                    let modulePath = path.join(localpath, `${Generator.capitalise(company)}.${Generator.capitalise(product)}.Styles`);

                    if (existsSync(modulePath))
                        throw "A module with the same name already exists";

                    Common.doCommand(`schematics @intelligenics/schematics:styles-template --company=${company}  --product=${product}`, localpath);
                    Common.doCommand(`igx update`, modulePath);
                    console.log("Module generated successfully");
                }
                break;
            case "portal": // Adds a new portal 
                {
                    let modulePath = path.join(localpath, `${Generator.capitalise(company)}.${Generator.capitalise(product)}.Portal`);

                    if (existsSync(modulePath))
                        throw "A module with the same name already exists";

                    Common.doCommand(`schematics @intelligenics/schematics:portal-template --company=${company}  --product=${product}`, localpath);
                    Common.doCommand(`igx update`, modulePath);
                    console.log("Module generated successfully");
                    break;
                }
            default:
                break;
        }
    }

    private static checkParameters(args: string[])
    {
        if (args.length < 3)
            throw "the generate command expects at least 3 arguments. Use igx --help to see available options";

        if (args[0] != ("solution") && args[0] != ("standalone-portal") &&
            args[0] != ("module") && args[0] != ("module-library") && args[0] != ("styles") && args[0] != ("portal"))
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

    private static capitalise(name: string)
    {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
}
