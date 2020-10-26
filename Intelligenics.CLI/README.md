# Intelligenics Command Line Interface

This CLI is provided as part of the Angular developer kit and provides support for the Modular developer as part of Intelligenics development processes used to build angular based projects. 

The CLI supports several commands for productivity and CI/CD optimisation

To see a list of commands type the following

```
igx --help
``` 

# Available Commands 
## Updating Projects
To update all projects in the current solution run the command in the root solution folder. Alternatively to update a single module, run the command in the modules root folder

```            
igx update
```

## Project Management

These commands are used to support CI/CD process and should not be used in local environments.

This command calculates the changed module based on the commit information and returns the project path. The command errors if more no modules changes are found or more than one module is found to have been changed as the process relies on only one and exactly one module being changed per PR submission.

This command will run and check the last two commits applied
```
igx get-changed-module
```       

### Options
          
Gets the module that has been changed based on the branch information.

```
-b branchname branchname
```   
```
e.g   igx get-changed-module -b develop feature/test   // returns "mymodulepath"
```
Gets the module that has been changed based on the commit information   
```
-c commitno1 commitno2 command
```
```            
e.g   igx get-changed-module -c 934383434399ddfdc 83934738838ddfc8d // returns "mymodulepath"
```  

## Whitelisting
Whitelisting ensures 3rd party libraries dont leak into the projects without authorisation. By using a whitelist file in your CI/CD pipeline you can make sure only packages authorised by the company are allowed to be used. 

This command checks the package.json has references to packages that are allowed in the specified whitelist. The whitelist must a be simple JSON file with the following format. As long as the dev dependencies and dependencies inside the package.json exist in the whitelist file no errors will be reported. 

```
{
  "@angular/animations":"",
  "@angular/cdk":"",
  "@angular/common":"",
  "@angular/compiler":""
}
```
```
igx check-whitelist -whitelist-file='filepath'
```

## Project generation
The system supports project generation of portal, module and styles module artifacts. 


```
igx g solution --company=companyname --product=productname --module=modulename     
```
Generates a solution with styles a portal, and one module 
```
igx g standalone-portal --company=companyname --product=productname --module=modulename     
```
Generates a standalone portal with embedded modules and styles
```
igx g module   --company=companyname --product=productname --module=modulename     
```
Generates a feature module inside a solution folder.
```
igx g styles   --company=companyname --product=productname
```
Generates a styles module inside a solution folder
```            
igx g portal   --company=companyname --product=productname
```
Generates a portal inside a solution folder


## Package Version
This command outputs the current binaries version information

```
igx version
```
# Contributing
All contributions are welcome, you must commit pull requests to do so. For major changes, please open an issue first to discuss what you would like to change.

# Contact Information

Feel free to contact me using the following details

- Name: Matthew Parton M.Sc.
- LinkedIn Profile: https://www.linkedin.com/in/intelligenics/
- Website: http://www.intelligenics.co.uk
- Email: matthewparton@intelligenics.co.uk

## Licence
Copyright 2019  Intelligenics Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
