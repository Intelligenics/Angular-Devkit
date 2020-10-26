import { Rule, SchematicContext, Tree, apply, chain, mergeWith, template, url } from '@angular-devkit/schematics';
import { camelize, classify } from '@angular-devkit/core/src/utils/strings';
import { normalize, strings } from '@angular-devkit/core';

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
        _options.name = _options.product.toLowerCase();
        _options.lowercasename = _options.product.toLowerCase();
        _options.lowercasecompany = _options.company.toLowerCase();
        _options.lowercaseproduct = _options.product.toLowerCase();
        _options.classname = classify(_options.product.toLowerCase());
        _options.camelcasename = camelize(_options.product.toLowerCase());
        _options.capitalisecompany = strings.capitalize(_options.company.toLowerCase());
        _options.capitaliseproduct = strings.capitalize(_options.product.toLowerCase());
        _options.capitalisename = strings.capitalize(_options.name.toLowerCase());
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