#!/usr/bin/env node
 
import { Generator } from "./src/generator/generator";
import { Updater } from "./src/updater/updater";
import { GitProcessor } from "./src/builder/git.processor";

export interface ITask
{
    run(...args: any[]);
}
try
{

    if (process.argv.length < 4)
    {
        if (process.argv[2] != "--help" && process.argv[2] != "update")
            throw "a command must be specified. use : igx --help - to see available commands";
    }


    // Remove path and dir params 
    process.argv.shift();
    process.argv.shift();




    switch (process.argv[0])
    {
        case "--help":
            console.log("\r\n\r\n=====================================================================");
            console.log("Intelligenics - command line interface help menu");
            console.log("=====================================================================\r\n");
            console.log("\r\n");
            console.log("Project updates\r\n");
            console.log("=====================================================================\r\n");
            console.log("\r\n");
            console.log("igx update - updates all projects in the current solution. must be run from the root solution folder");
            console.log("             or it updates the current module. Must be root module folder");
            console.log("\r\n");            
            console.log("Project building\r\n");
            console.log("=====================================================================\r\n");
            console.log("\r\n");
            console.log("igx module - calculated the changed module based on the commit information and returns the project path. Errors if more than one module is found");
            console.log("\r\n");
            console.log("            -b branchname branchname command      - gets the changed module based on branch differences ");
            console.log("\r\n");
            console.log("      e.g   -b develop feature/test ");
            console.log(" ");
            console.log("            -c commitno1 commitno2 command        - runs the specified command on each project based on commit differences ");
            console.log("\r\n");
            console.log("      e.g   -c 934383434399ddfdc 83934738838ddfc8d npm install   ");
            console.log(" ");
            console.log("\r\n");
            console.log("Project generation\r\n");
            console.log("=====================================================================\r\n"); 
            console.log("\r\n");
            console.log("igx g solution --company=companyname --product=productname --module=modulename     - generates a solution with styles a portal, and one module");
            console.log("igx g module   --company=companyname --product=productname --module=modulename     - generates a feature module inside a solution folder");
            console.log("igx g styles   --company=companyname --product=productname                         - generates a styles module inside a solution folder");
            console.log("igx g portal   --company=companyname --product=productname                         - generates a portal inside a solution folder");

            break;
        case "update":
            Updater.update();
            console.log("Updating completed");
            break;
        case "g":
            {
                process.argv.shift(); 
                Generator.generate(process.argv);
            }
            break;
        case "projects":

            let commitCommand = process.argv[1];
            let param1 = process.argv[2];
            let param2 = process.argv[3];

            if (process.argv[1] == "-b" || process.argv[1] == "-c")
            {
                param1 = process.argv[2];
                param2 = process.argv[3];
                process.argv.shift();
                process.argv.shift();
                process.argv.shift();
                process.argv.shift();
            }
            else
                process.argv.shift(); 

            let git = new GitProcessor();
            console.log(git.getProject(commitCommand, param1, param2)); 

        default:
            throw "unrecognised command format. Use --help to see available options"
            break;
    }
}
catch (error)
{
    if (error.stderr && error.stderr.length > 0)
        console.log(error.stderr.toString());
    else
        console.log(error);

    process.exit(-1);
}


