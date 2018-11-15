# ng-docu

Documentation helper components for angular.

## Installation

```
npm install ng-docu
# or 
yarn add ng-docu
# or
ng add ng-docu
```

## Usage

There are two modules to use. The `DocuModule` and the `DocuEditorModule`. The
`DocuModule` has got predefined components for displaying the documentation generated
using the `DocuEditorModule`.

At first import one of these modules in your application module.

```typescript
@NgModule({
  imports: [ DocuModule, DocuEditorModule ]
})
export class ApplicationModule{}
```

### The documentation editor

Make sure to have the `DocuEditorModule` imported. The module provides a complete form with and
live rendering. It should integrate with your **@angular/material** configuration.

## Get in contact

- Check the [authors website](https://felixlemke.com)
- Get in touch via [twitter](https://twitter.com/ngfelixl) or [facebook](https://www.facebook.com/ngfelixlemke/)