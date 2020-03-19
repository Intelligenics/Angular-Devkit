import { Rule, SchematicContext, Tree, url, template, mergeWith, apply, chain } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { classify, camelize } from '@angular-devkit/core/src/utils/strings';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function generator(_options: any): Rule
{
  return chain(
    [
      (tree: Tree, _context: SchematicContext) =>
      {
        const sourceTemplates = url('./files');

        if (null == tree)
          return;

        if (null == _options.product)
          throw new Error("The product name must be specified");

        if (null == _options.company)
          throw new Error("The company name must be specified");
 
        _options.test = _options.path ? normalize(_options.path) : _options.path;
        _options.lowercasename = _options.name.toLowerCase();
        _options.lowercasecompany = _options.company.toLowerCase();
        _options.lowercaseproduct = _options.product.toLowerCase();
        _options.classname = classify(_options.name.toLowerCase());
        _options.camelcasename = camelize(_options.name.toLowerCase());
        _options.npmignore = "npmignore";
        _options.gitignore = "gitignore";


        try
        {

          const sourceParameterisedTemplates = apply(sourceTemplates,
            [
              template(
                {
                  ..._options,
                  ...strings
                })
            ]);

          var test = mergeWith(sourceParameterisedTemplates);

          return test;
        }
        catch (error)
        {
          console.log(error);
        }


      },
      (tree: Tree, _context: SchematicContext) =>
      {
        if (null == tree)
          return;

        //runNpmInstall();
      }
    ]);
}

// function runNpmInstall(): void
// {
//   const { spawn } = require('child_process');
//   const bat = spawn('cmd.exe', ['npm', 'install']);

//   bat.stdout.on('data', (data:any) =>
//   {
//     console.log(data.toString());
//   });

//   bat.stderr.on('data', (data:any) =>
//   {
//     console.error(data.toString());
//   });

//   bat.on('exit', (code:any) =>
//   {
//     console.log(`Child exited with code ${code}`);
//   });
// }
