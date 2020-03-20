// import { GitProcessor } from "./git.processor";
// import { PackageGenerator } from "./package.generator";
// import { spawnSync, spawn } from "child_process";

// import path = require( "path" );
// import { existsSync } from "fs";
// import { rejects } from "assert";
// import { Common } from "../common/common";

// export class Builder
// {
//     public async run ( commitCommand: string, script: string, branch1: string, branch2: string )
//     {
//         const git = new GitProcessor();
//         const packageGen = new PackageGenerator();

//         const projects = git.getProjects( commitCommand, branch1, branch2 );

//         console.log( "The following projects will be affected" );
//         console.log( "==================================================================" );
//         console.log( projects.join( "\r\n" ) );
//         console.log( "\r\n" );
//         console.log( "command is " + script );

//         let errorCount = 0;

//         for ( let index = 0; index < projects.length; index++ ) 
//         {
//             const project = projects[index];

//             const cwd = path.join( process.cwd(), project );

//             try
//             {
//                 switch ( script )
//                 {
//                     case "publish package public":
//                         {
//                             const publishDir = path.join( process.cwd(), project, "dist/module" );
//                             await Common.doCommandAsync( "npm publish --access public", publishDir );
//                         }
//                         break;
//                     case "publish package private":
//                         {
//                             const publishDir = path.join( process.cwd(), project, "dist/module" );
//                             await Common.doCommandAsync( "npm publish", publishDir );
//                         }
//                         break;
//                     case "generate package":
//                         packageGen.generate( cwd );
//                         break;
//                     case "stage package":
//                         git.stageFile( path.join( process.cwd(), project, "package.json" ) );
//                         git.stageFile( path.join( process.cwd(), project, "package-lock.json" ) );
//                         break;
//                     default:
//                         await Common.doCommandAsync(script, cwd );
//                         break;
//                 }
//             }
//             catch ( error )
//             {
//                 errorCount++;
//                 console.log( error );
//             }
//         };

//         if ( errorCount > 0 )
//         {
//             process.exit( 1 );
//         }
//     }
 
// }
