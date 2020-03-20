import { Rule, SchematicContext, Tree, url, template, mergeWith, apply, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify, camelize } from '@angular-devkit/core/src/utils/strings';
import * as path from "path";
import { FileManager } from '../common/filemanager';
import { Helpers } from '../common/helpers';
var pjson = require( '../../package.json' );

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function generator ( _options: any ): Rule
{
  _options.path = process.cwd();
  
  console.log("using ", pjson.name, pjson.version );
  return chain(
    [
      ( tree: Tree, _context: SchematicContext ) =>
      {


        if ( !tree )
          return;

        Helpers.setHeaderOptions( _options, tree );

        _options.lowercasename = _options.name.toLowerCase();
        _options.lowercasecompany = _options.company.toLowerCase();
        _options.lowercaseproduct = _options.product.toLowerCase();
        _options.classname = classify( _options.name.toLowerCase() );
        _options.camelcasename = camelize( _options.name.toLowerCase() );
        _options.gitignore = "gitignore";
        //console.log(_options);

        if ( !_options.name )
          throw "unable to find package information";
      },
      /// Reset the original workspace so that only src files exist
      ( tree: Tree, _context: SchematicContext ) =>
      {
        FileManager.deleteFiles( ".", tree, ["package.json", "README.md", "package-lock.json"] );

        FileManager.deleteDirectories( ".", tree, ["node_modules", "projects"] );

        let localPath = path.join( "projects", "test-harness" );
        FileManager.deleteDirectory( localPath, tree );

        localPath = path.join( "projects", "module" );
        FileManager.deleteFiles( localPath, tree, ["package.json"] );

        localPath = path.join( "projects", "module", "e2e" );
        FileManager.deleteFiles( localPath, tree );

        return tree;
      },

      //  Add modules builder files
      ( tree: Tree, _context: SchematicContext ) =>
      {
        const sourceTemplates = url( './files' );

        if ( null == tree )
          return;

        try
        {

          const sourceParameterisedTemplates = apply( sourceTemplates,
            [
              template(
                {
                  ..._options,
                  ...strings
                } )
            ] );

          return mergeWith( sourceParameterisedTemplates );
        }
        catch ( error )
        {
          console.log( error );
        }

      },
    ]
  );
}


