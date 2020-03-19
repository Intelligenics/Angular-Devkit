import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { Observable, of } from 'rxjs';
var cpx = require( "cpx" );


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

        console.log( "Deploying assets" );
        console.log( "---------------------------------------------------------" );

        options.assets.forEach( assetDef =>
        {
            console.log( "asset definition" );
            console.log( assetDef.source );
            console.log( assetDef.dest );

            if ( !assetDef.source )
                context.reportStatus( "Asset definition is invalid source must be a valid glob pattern" );

            if ( !assetDef.dest )
                context.reportStatus( "Asset definition is invalid dest must be a valid folder path" );

            cpx.copySync( assetDef.source, assetDef.dest );

        } );

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
