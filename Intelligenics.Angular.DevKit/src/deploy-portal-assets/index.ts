import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { Observable, of } from 'rxjs';
import { readdirSync } from 'fs';
import * as fs from 'fs';
import * as path from 'path';
var cpx = require( "cpx" );


interface Options extends JsonObject 
{
    company: string;
    dest: string
}

export default createBuilder( deploy );

export function deploy ( options: Options, context: BuilderContext ): Observable<BuilderOutput>
{
    try
    {
        // Assertions 
        if ( null == context ) throw "the context was null";
        if ( null == options ) throw "no options were provided";

        if ( null == options.company )
            throw "No company provided";


        let directoryPath = path.join( process.cwd(), "node_modules", "@" + options.company );

        if ( !fs.existsSync( directoryPath ) )
            throw "directory path not found " + directoryPath;

        console.log( "Deploying assets" );
        console.log( "---------------------------------------------------------" );

        let directories = readdirSync( directoryPath );

        let outputPath = path.join( process.cwd(), options.dest )

        directories.forEach( directory =>
        {
            let assetsPath = path.join( directoryPath, directory, "assets", "*" );
            console.log("copying from", assetsPath );

            cpx.copySync( assetsPath, outputPath );

        } );
        
        console.log("Copying to", outputPath);

        console.log( "---------------------------------------------------------" );
        console.log( "Deployment completed" );

        return of( { success: true } );

    }
    catch ( error )
    {

        if ( typeof ( error ) !== "string" )
        {
            console.log( ( <any> error ).message );
            return of( { success: false } );
        }

        return of( { success: false, error: error } );
    }
}
