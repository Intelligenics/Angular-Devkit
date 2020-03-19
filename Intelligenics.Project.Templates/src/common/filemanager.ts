import { Tree } from '@angular-devkit/schematics';
import path = require('path');
import * as fs from "fs";

export class FileManager
{
    public static deleteDirectories(directory: string, tree: Tree, exceptions: Array<string> = []): void
    {
        tree.getDir(directory).subdirs.forEach(dir =>
        {
            if (exceptions && exceptions.length > 0)
            {
                let result = exceptions.find(item => item.toLowerCase() == dir.toLowerCase());
                if (result)
                    return;
            }

            let localPath = path.join(directory, dir);
            FileManager.deleteFiles(localPath, tree);

            tree.getDir(localPath).subdirs.forEach(subDir =>
            {
                let innerPath = path.join(directory, dir, subDir);
                FileManager.deleteDirectory(innerPath, tree);
            });

            if (fs.existsSync(localPath))
                tree.delete(localPath);
        });
    }

    public static deleteDirectory(directory: string, tree: Tree, exceptions: Array<string> = []): void
    {
        tree.getDir(directory).subfiles.forEach(file =>
        {
            let localPath = path.join(directory, file);
            tree.delete(localPath);
        });
        tree.getDir(directory).subdirs.forEach(dir =>
        {
            if (exceptions && exceptions.length > 0)
            {
                let result = exceptions.find(item => item.toLowerCase() == dir.toLowerCase());
                if (result)
                    return;
            }

            let localPath = path.join(directory, dir);
            FileManager.deleteFiles(localPath, tree);
            tree.getDir(localPath).subdirs.forEach(subDir =>
            {
                let innerPath = path.join(directory, dir, subDir);
                FileManager.deleteDirectory(innerPath, tree);
            });
            if (fs.existsSync(localPath))
                tree.delete(localPath);
        });
        if (fs.existsSync(directory))
            tree.delete(directory);
    }
    public static deleteFiles(directory: string, tree: Tree, exceptions: Array<string> = []): void
    {
        tree.getDir(directory).subfiles.forEach(file =>
        {
            if (exceptions && exceptions.length > 0)
            {
                let result = exceptions.find(item => item.toLowerCase() == file.toLowerCase());
                if (result)
                    return;
            }

            let localPath = path.join(directory, file);
            if (fs.existsSync(localPath))
                tree.delete(localPath);
        });
    }
}
