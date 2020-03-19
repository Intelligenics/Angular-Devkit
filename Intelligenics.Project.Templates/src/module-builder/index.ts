import { Rule, SchematicContext, Tree, url, template, mergeWith, apply, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify, camelize } from '@angular-devkit/core/src/utils/strings';
import * as path from "path";
import { FileManager } from '../common/filemanager';
import { Helpers } from '../common/helpers';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function generator(_options: any): Rule
{
  _options.path = process.cwd();
  return chain(
    [
      (tree: Tree, _context: SchematicContext) =>
      {
        if (!tree)
          return;

        Helpers.setHeaderOptions(_options, tree);

        _options.lowercasename = _options.name.toLowerCase();
        _options.lowercasecompany = _options.company.toLowerCase();
        _options.lowercaseproduct = _options.product.toLowerCase();
        _options.classname = classify(_options.name.toLowerCase());
        _options.camelcasename = camelize(_options.name.toLowerCase());
        _options.gitignore = "gitignore";
        //console.log(_options);

        if (!_options.name)
          throw "unable to find package information";
      },
      /// Reset the original workspace so that only src files exist
      (tree: Tree, _context: SchematicContext) =>
      { 
        FileManager.deleteFiles(".", tree, ["package.json", "README.md", "package-lock.json"]);

        FileManager.deleteDirectories(".", tree, ["node_modules", "projects"]);

        let localPath = path.join("projects", "test-harness");
        FileManager.deleteFiles(localPath, tree);

        localPath = path.join("projects", "test-harness", "src");
        FileManager.deleteDirectory(localPath, tree);

        localPath = path.join("projects", "test-harness", "e2e");
        FileManager.deleteFiles(localPath, tree);

        localPath = path.join("projects", "module");
        FileManager.deleteFiles(localPath, tree); 
        
        localPath = path.join("projects", "module", "e2e");
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

          return mergeWith(sourceParameterisedTemplates);
        }
        catch (error)
        {
          console.log(error);
        }

      },
      //       /// Read the package json and replace all core libraries
      //       (tree: Tree, _context: SchematicContext) => 
      //       {
      //         tree.getDir(process.cwd())
      //           .subfiles
      //           .forEach(file =>
      //           {


      //           });

      //           .visit(filePath =>
      //           {
      //             if (!filePath.endsWith('.ts'))
      //             {
      //               return;
      //             }
      //             const content = tree.read(filePath);
      //             if (!content)
      //             {
      //               return;
      //             }

      //             // Prevent from writing license to files that already have one.
      //             if (content.indexOf(licenseText) == -1)
      //             {
      //               tree.overwrite(filePath, licenseText + content);
      //             }
      //           });
      //   return tree;
      // },
    ]
  );
}


