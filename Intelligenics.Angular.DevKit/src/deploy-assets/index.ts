import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { Observable, of } from 'rxjs';
var cpx = require( "cpx" );
import * as fs from 'fs';
import * as path from 'path';


interface Options extends JsonObject 
{ 
    assets: Array<AssetDef>;
}

interface AssetDef extends JsonObject 
{
    source: string;
    dest: string;
}

export default createBuilder( deploy );

export function deploy ( options: Options, context: BuilderContext ): Observable<BuilderOutput>
{
    try
    {
        // Assertions 
        if ( null == context ) throw "the context was null";
        if ( null == options ) throw "no options were provided";

        if ( null == options.assets )
        {
            context.reportStatus( "No asset definitions provided. Nothing done." );
            return of( { success: true } );
        }

        console.log( "deploying assets" );   

        options.assets.forEach( assetDef =>
        {  
            if ( !assetDef.source )
                context.reportStatus( "Asset definition is invalid source must be a valid glob pattern" );

            if ( !assetDef.dest )
                context.reportStatus( "Asset definition is invalid dest must be a valid folder path" );

            cpx.copySync( assetDef.source, assetDef.dest );

        } ); 
 
        PackageGenerator.generate();
        console.log( "deployment completed" );

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



export class PackageGenerator
{
    public static generate(): void
    {
        let inputPackagePath = path.join(process.cwd(), "package.json");
        let outputPackagePath = path.join(process.cwd(), "dist/module", "package.json");
 
        if (!fs.existsSync(inputPackagePath))
            throw `unable to find package.json, check your running in the correct working directory: path used is ${inputPackagePath}`

        if (!fs.existsSync(outputPackagePath))
            throw `unable to create package as package.json does not exist. Try calling prepublish first: path used is ${outputPackagePath}`;

        let inputFile = fs.readFileSync(inputPackagePath);
        let outputFile = fs.readFileSync(outputPackagePath);
        let inputPackageJSON = JSON.parse(inputFile.toString());
        let outputPackageJSON = JSON.parse(outputFile.toString());
        this.addProperties(inputPackageJSON, outputPackageJSON); 
        let outputFileOut = JSON.stringify(outputPackageJSON, null, 2);
        fs.writeFileSync(outputPackagePath, outputFileOut); 
    }
    
    private static addProperties(inputPackageJSON: any, outputPackageJSON: any): void
    {
        outputPackageJSON.name = inputPackageJSON.name;
        outputPackageJSON.author = inputPackageJSON.author;
        outputPackageJSON.keywords = inputPackageJSON.keywords;
        outputPackageJSON.repository = inputPackageJSON.repository;
        outputPackageJSON.version = inputPackageJSON.version;
        outputPackageJSON.license = inputPackageJSON.license;
        outputPackageJSON.peerDependencies = inputPackageJSON.dependencies;
        delete outputPackageJSON["dependencies"];
        delete outputPackageJSON["devDependencies"];
    }
}
