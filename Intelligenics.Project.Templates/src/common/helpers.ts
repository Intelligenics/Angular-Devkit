import { Tree } from "@angular-devkit/schematics"; 

export class Helpers
{
    /**
     * Reads the current tree for the package.json file and gets the company,
     * product and module names;
     **/
    public static setHeaderOptions(_options: any, tree: Tree): void
    {
        let file = tree.get("package.json"); 

        if (!file)
            throw "unable to find the package.json file";

        let packageJSON = JSON.parse(file.content.toString())

        let fragments = packageJSON.name.split("/");

        if (fragments.length != 2)
            throw "name format of package is invalid expected @company/product-module format";

        let subfragments = fragments[1].split("-");

        if (subfragments.length != 2)
            throw "name format of package is invalid expected @company/product-module format";

        _options.company = fragments[0].replace("@", "");
        _options.product = subfragments[0];
        _options.name = subfragments[1];

    }

    public static splitName(name: string): ProductName
    {
        let fragments = name.split("/");

        if (fragments.length != 2)
            throw "name format of package is invalid expected @company/product-module format";

        let subfragments = fragments[1].split("-");

        if (subfragments.length != 2)
            throw "name format of package is invalid expected @company/product-module format";


        let product = new ProductName;
        product.company = fragments[0].replace("@", "");
        product.product = subfragments[0];
        product.module = subfragments[1];
        return product;
    }

    public static capitalise(name: string)
    {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
}

export class ProductName
{
    company: string;
    product: string;
    module: string;
}


export interface PackageType
{
    name: string;
    path: string;
    moduleName: string;
    currentversion: string;
    upgradepolicy: string;
    load: string;
}
