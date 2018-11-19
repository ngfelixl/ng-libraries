# ng-docu

Documentation helper components for angular.

## Installation

Add the package to your angular project using

```bash
npm install ng-docu
# or
yarn add ng-docu
# or
ng add ng-docu
```

Since math requires katex for rendering proper LaTeX expressions, one
need to include the katex styles in the **angular.json** file manually.

```json
"projects": {
  "libraries": {
    "architect": {
      "build": {
        "options": {
          "styles": [
            "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
            "./node_modules/katex/dist/katex.min.css"
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