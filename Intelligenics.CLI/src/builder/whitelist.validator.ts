// export class WhitelistValidator
// {
//     private check(packageJSON: any, whitelist: Array<string>): void
//     {
//         let errorcount = 0;

//         // keep local packages
//         Object.keys(packageJSON)
//             .forEach(outerKey =>
//             {
//                 let validKey = Object.keys(packageJSON)
//                     .find((innerKey) =>
//                     {
//                         return innerKey == outerKey;
//                     });
//                 if (null == validKey)
//                 {
//                     console.log(`${outerKey} is not in the company whitelist, you must remove this reference from the module`);
//                     errorcount++;
//                     return;
//                 }
//                 if (Whitelist[validKey] != sourceItems[validKey])
//                 {
//                     console.log(`${validKey} expected to see version ${Whitelist[validKey]} but saw version ${sourceItems[validKey]}. Versions must match`);
//                     errorcount++;
//                     return;
//                 }
//             });

//         if (errorcount > 0)
//             throw "Unable to build the package due to invalid module references";
//     }


//     private isValidVersion(packageItem:string, whitelistItem:  string 
// }
 