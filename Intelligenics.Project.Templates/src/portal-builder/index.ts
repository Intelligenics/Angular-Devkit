import { Rule, SchematicContext, Tree, url, template, mergeWith, apply, chain, MergeStrategy } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify, camelize } from '@angular-devkit/core/src/utils/strings';
import * as path from "path";
import { Helpers } from '../common/helpers';
import { FileManager } from '../common/filemanager';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function generator(_options: any): Rule
{
  _options.path = process.cwd();

  return chain(
    [
      // Read package information
      (tree: Tree, _context: SchematicContext) =>
      {
        if (!tree)
          return;

        Helpers.setHeaderOptions(_options, tree);

        _options.name = "portal";
        _options.lowercasename = _options.name.toLowerCase();
        _options.lowercasecompany = _options.company.toLowerCase();
        _options.lowercaseproduct = _options.product.toLowerCase();
        _options.classname = classify(_options.name.toLowerCase());
        _options.camelcasename = camelize(_options.name.toLowerCase());
        _options.gitignore = "gitignore";

        if (!_options.name)
          throw "unable to find package information";
      },
      /// Reset the original workspace
      (tree: Tree, _context: SchematicContext) =>
      {
        let localPath = ".";
        FileManager.deleteFiles(localPath, tree, ["package.json", "DockerFile", "README.md", "settings.json", "package-lock.json"]);

        FileManager.deleteDirectories(".", tree, ["node_modules", "src", "e2e"]);

        FileManager.deleteFiles("src", tree, ["favicon.ico", "index.html"]);

        localPath = path.join("src", "environments");
        FileManager.deleteDirectory(localPath, tree);

        localPath = path.join("src", "app");
        FileManager.deleteFiles(localPath, tree, ["app.routing.ts","app.module.ts"]);
        localPath = path.join("e2e");
        FileManager.deleteFiles(localPath, tree);


        return tree;
      },

      //  Add modules builder files
      (tree: Tree, _context: SchematicContext) =>
      {
        const sourceTemplates = url('./files');

        if (null == tree)
          return;

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

          return mergeWith(sourceParameterisedTemplates, MergeStrategy.Overwrite);
        }
        catch (error)
        {
          console.log(error);
        }
      }
    ]
  );
}
