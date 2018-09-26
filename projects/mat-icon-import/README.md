# Import only used material (and custom) icons in Angular

## Installation

```sh
npm i mat-icon-import
#or
yarn add mat-icon-import
```

## Usage

Import the `IconImportModule` in your application module.

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