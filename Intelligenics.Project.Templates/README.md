# Intelligenics Schematics

These templates provide core structure for building angular applications and represent part of Intelligenics Development process for building large scale front end applications. These templates in this schematics library provide three main types:

- Module template - creates a test harness and a publishable module
- Styles template - creates a styles template that allows for creating of an ITCSS based styles module. 
- Portal template - creates a portal project for building portals that can consume both modules and styles. 

The templates follow a standard naming convention for each project type. These obey the following naming conventions.

- Modules - "CompanyName.ProductName.ModuleName"
- Portals - "CompanyName.ProductName.Portal"
- Styles - "CompanyName.ProductName.Styles" 


Each published module will also follow the naming convention of 

* @mycompanyname/productname-modulename 

Each template has been based on the standard Angular CLI templates templates and will allow you to create modules, components etc using the same commands you know already.

# Installation

To run the commands you will need to install both this and the angular cli schematics libraries.

```cmd
npm i @angular-devkit/schematics-cli @intelligenics/schematics -g
```


# Commands
All the templates use one or more of the following parameters

- --company - this is your company name
- --product - this is your product name

You will need to create a solution folder to hold all your sub projects. This will group all your projects into a related folder for easy grouping. It is suggested that you follow the same naming convention as the modules which is:

- "MyCompanyName.MyProductName.Web"

```
 md MyCompanyName.MyProductName.Web
 cd MyCompanyName.MyProductName.Web
```

In a typical SPA application you will have one or more modules and typically one portal application and one styles module. This is a typical structure for creating your applications. 

- MyCompanyName.MyProductName.Web
   - MyCompanyName.MyProductName.Navigation
   - MyCompanyName.MyProductName.Header
   - MyCompanyName.MyProductName.Footer
   - MyCompanyName.MyProductName.Portal   
   - MyCompanyName.MyProductName.Styles


## Portal templates
To create a portal template use the following command
```
schematics @intelligenics/schematics:portal-template --company=mycompanyname --product=myproductname
```

## Module Templates

To create a module template use the following command
```
schematics @intelligenics/schematics:module-template --name=mymodulename --company=mycompanyname --product=myproductname
```


## Internal Module Templates

To create an internal module template use the following command
```
schematics @intelligenics/schematics:module --name=mymodulename --company=mycompanyname --product=myproductname
```


## Styles Template
To create a styles template use the following command

```
schematics @intelligenics/schematics:styles-template --company=mycompanyname --product=myproductname
```

## Final step
Once you have run each temple process you will need to go into your project folder and run the following command

```
npm i
```
Once you have done this you can then run your module or application or styles module using the standard angular cli commands
``` 
ng serve
```

# Test commands
To run CI tests for the module both unit tests and e2e tests, use the following commands


```
ng test module --watch=false --progress=false --browsers=ChromeHeadlessCI
```

```
ng e2e --protractor-config=projects/module/e2e/protractor-ci.conf.js
```


# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 

# Need help with your Software development processes?

If you would like help improving your front end software development processes then get in touch. We can help your business in several areas of software development including the following:

- Team Training
- Coding standards and documentation
- Software Development
- DevOps ( Developer Operations)
- Business Process improvement


Feel free to contact me directly using the following details

- Name: Matthew Parton M.Sc.
- LinkedIn Profile: https://www.linkedin.com/in/intelligenics/
- Website: http://www.intelligenics.co.uk
- Email: matthewparton@intelligenics.co.uk


## Licence
Copyright 2019  Intelligenics Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
