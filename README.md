# ngLibraries

[![Build Status](https://travis-ci.org/ngfelixl/ng-libraries.svg?branch=master)](https://travis-ci.org/ngfelixl/ng-libraries)

The library bundle contains multiple npm modules.

## Modules

### [mat-icon-import](https://github.com/ngfelixl/ng-libraries/tree/master/projects/mat-icon-import) ([npm](https://www.npmjs.com/package/mat-icon-import))

Import only used material icons. Requires a little bit of setup but you don't have to
include the full material icons font.

```
npm install mat-icon-import
```

### [ng-d3plot](https://github.com/ngfelixl/ng-libraries/tree/master/projects/ng-d3plot) ([npm](https://www.npmjs.com/package/ng-d3plot))

Provides easy to use, responsive plots on top of D3js. Currently it supports time series, line charts
and histograms. Planning to add simple maps (countrycode: value pairs) and pie charts.

```
npm install ng-d3plot
```

### [ng-docu](https://github.com/ngfelixl/ng-libraries/tree/master/projects/ng-docu) ([npm](https://www.npmjs.com/package/ng-docu))

Angular components for easily writing interactive documentations. Currently supporting **text**, **title**, **math**, **code** and **citations**. The
package is divided into two modules `DocuModule` and `DocuEditorModule`.

```
npm install ng-docu
```

## Build with

Modules are located in `projects` folder. Build them using

```sh
ng build mat-icon-import
ng build ng-d3plot
ng build ng-docu
```

## Get into contact

- Check the [authors website](https://felixlemke.com)
- Get in touch via [twitter](https://twitter.com/ngfelixl) or [facebook](https://www.facebook.com/ngfelixlemke/)