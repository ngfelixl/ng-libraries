# Import only used material (and custom) icons in Angular

[![Build Status](https://travis-ci.org/ngfelixl/ng-libraries.svg?branch=master)](https://travis-ci.org/ngfelixl/ng-libraries)

## Installation

```sh
npm i mat-icon-import
#or
yarn add mat-icon-import
```

## Usage

At first download the icons you need from [here](https://material.io/tools/icons?style=baseline) in SVG 24px format (default). The icon names are of type `baseline-[key]-24px.svg`. You will have to use the `key` when importing this lib.

Import the `IconImportModule` in your application module and call the `forRoot()` function with two parameters. At first the array of icon *keys*, e.g. (account_circle, add or whatever you want). The secont parameter is the path where you store the icons in your assets folder.

```typescript
import { IconImportModule } from 'mat-icon-import';

@NgModule({
  imports: [ IconsModule.forRoot(['account_circle'], './assets/mat-icons') ]
})
export class AppModule {}
```

Register the icons where you need them. E.g. in the `AppComponent` to make it available in the complete application.

```typescript
import { IconImportService } from 'mat-icon-import';

@Component({
  ...
})
export class AppComponent {
  constructor (private iconService: IconImportService) {
    this.iconService.register();
  }
}
```

Use the registered icons with

```html
<mat-icon svgIcon="account_circle"></mat-icon>
```

Don't forget to include the `MatIconModule` from `@angular/material`.

## Get in contact

- Check the [authors website](https://felixlemke.com)
- Get in touch via [twitter](https://twitter.com/ngfelixl) or [facebook](https://www.facebook.com/ngfelixlemke/)