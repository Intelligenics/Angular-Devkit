
import { spawnSync, spawn } from "child_process";
import { existsSync } from "fs";

export class Common
{
    public static doCommand ( command: string, cwd: string )
    {

        if ( !existsSync( cwd ) )
            throw `Cannot run command '${command}', the directory does not exist: '${cwd}'`;


        let result = spawnSync( command, {
            shell: true,
            cwd: cwd
        } );

        if ( result.stderr && result.stderr.length > 0 )
        {
            console.log( result.stderr.toString() );
            throw "errors reported";
        }
        if ( result.error && result.error.message )
        {
            console.log( result.error.message );
            throw "errors reported";
        }

        if ( result.stdout )
            console.log( result.stdout.toString() );
    }

    
    public static async doCommandAsync ( command: string, cwd: string ) 
    {
        if ( !existsSync( cwd ) )
            throw `Cannot run command '${command}', the directory does not exist: '${cwd}'`;

        return new Promise<void>( ( resolve, reject ) =>
        {
            let shell = spawn( command, {
                shell: true,
                cwd: cwd
            } );

            shell.stdout.on( 'data', ( data ) =>
            {
                console.log( `${data}` );
            } );

            shell.stderr.on( 'data', ( data ) =>
            {
                console.log( `${data}` );
            } );

            shell.on( 'close', ( code ) =>
            {
                console.log( `child process exited with code ${code}` );

                if ( code == 0 )
                    resolve();
                else
                    reject();
            } );
        } );

    }
}