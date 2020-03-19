"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
class FileManager {
    static deleteDirectories(directory, tree, exceptions = []) {
        tree.getDir(directory).subdirs.forEach(dir => {
            if (exceptions && exceptions.length > 0) {
                let result = exceptions.find(item => item.toLowerCase() == dir.toLowerCase());
                if (result)
                    return;
            }
            let localPath = path.join(directory, dir);
            FileManager.deleteFiles(localPath, tree);
            tree.getDir(localPath).subdirs.forEach(subDir => {
                let innerPath = path.join(directory, dir, subDir);
                FileManager.deleteDirectory(innerPath, tree);
            });
            if (fs.existsSync(localPath))
                tree.delete(localPath);
        });
    }
    static deleteDirectory(directory, tree, exceptions = []) {
        tree.getDir(directory).subfiles.forEach(file => {
            let localPath = path.join(directory, file);
            tree.delete(localPath);
        });
        tree.getDir(directory).subdirs.forEach(dir => {
            if (exceptions && exceptions.length > 0) {
                let result = exceptions.find(item => item.toLowerCase() == dir.toLowerCase());
                if (result)
                    return;
            }
            let localPath = path.join(directory, dir);
            FileManager.deleteFiles(localPath, tree);
            tree.getDir(localPath).subdirs.forEach(subDir => {
                let innerPath = path.join(directory, dir, subDir);
                FileManager.deleteDirectory(innerPath, tree);
            });
            if (fs.existsSync(localPath))
                tree.delete(localPath);
        });
        if (fs.existsSync(directory))
            tree.delete(directory);
    }
    static deleteFiles(directory, tree, exceptions = []) {
        tree.getDir(directory).subfiles.forEach(file => {
            if (exceptions && exceptions.length > 0) {
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
exports.FileManager = FileManager;
//# sourceMappingURL=filemanager.js.map