"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
class PackageGenerator {
    generate() {
        let inputPackagePath = path.join(process.cwd(), "package.json");
        let outputPackagePath = path.join(process.cwd(), "dist/module", "package.json");
        console.log("Copying ", inputPackagePath, outputPackagePath);
        if (!fs.existsSync(inputPackagePath))
            throw "unable to find package.json, check your running in the correct working directory";
        if (!fs.existsSync(outputPackagePath))
            throw "unable to create package as package.json does not exist. Try calling prepublish first";
        let inputFile = fs.readFileSync(inputPackagePath);
        let outputFile = fs.readFileSync(outputPackagePath);
        let inputPackageJSON = JSON.parse(inputFile.toString());
        let outputPackageJSON = JSON.parse(outputFile.toString());
        this.addProperties(inputPackageJSON, outputPackageJSON);
        let inputFileOut = JSON.stringify(inputPackageJSON, null, 2);
        let outputFileOut = JSON.stringify(outputPackageJSON, null, 2);
        fs.writeFileSync(outputPackagePath, outputFileOut);
        console.log("Copying completed successfully");
    }
    addProperties(inputPackageJSON, outputPackageJSON) {
        outputPackageJSON.name = inputPackageJSON.name;
        outputPackageJSON.author = inputPackageJSON.author;
        outputPackageJSON.keywords = inputPackageJSON.keywords;
        outputPackageJSON.repository = inputPackageJSON.repository;
        outputPackageJSON.license = inputPackageJSON.license;
        outputPackageJSON.peerDependencies = inputPackageJSON.dependencies;
        delete outputPackageJSON["dependencies"];
        delete outputPackageJSON["devDependencies"];
    }
}
exports.PackageGenerator = PackageGenerator;
//# sourceMappingURL=package.generator.js.map