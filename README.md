[![npm version](https://badge.fury.io/js/ngx-ttitan-color-picker.svg)](https://badge.fury.io/js/ngx-ttitan-color-picker)
# ngx-ttitan-color-picker
A simple color picker for angular versions 4 - 6.
### Features
- Simple and intuitive interface.
- High performance.
- Minimum of dependencies.
- Color palettes.

##Demo
[Demo playground](https://stackblitz.com/edit/ngx-ttitan-color-picker-demo?embed=1&file=src/app/app.component.ts "Demo playground")

##Installing and usage
You can get it on npm.
####NPM
`$ npm install --save ngx-ttitan-color-picker`

#### Add `NgxTTitanColorPickerModule` to your application module.
```typescript
import {NgxTTitanColorPickerModule} from "ngx-ttitan-color-picker";
@NgModule({
  imports: [
    ...,
   NgxTTitanColorPickerModule
  ],
})
export class AppModule { }
```

#### Use it in your HTML template:
```html
<lib-ngx-ttitan-color-picker
        [options]="{
          outFormat: 'hex8',
          inputFormat: 'hex8'
        }"
        [color]="color"
        (change)="colorChange($event)"
      ></lib-ngx-ttitan-color-picker>
```
#### Component inputs
|Param | Type                     | Default |Description |
| ------------- | ------------------------------ | ------------------------------ |------------------------------ |
| `color`      | **string**  | `'#ffffff'`     | Input color. Two-way binding param    |
| `title`   | **string**    | `''`   | Picker input label   |
| `options`   | **PickerOptions**    | `'{}'`   | Picker configuration   |

#### Component options object
|Param | Type                     | Default |Description |
| ------------- | ------------------------------ | ------------------------------ |------------------------------ |
| `pickerShow`      | **boolean**      | `false`     | Display color picker on start     |
| `noHide`   | **boolean**    | `false`   | Do not hide the picker  |
| `debug`   | **boolean**    | `false`   | Debug output   |
| `outFormat`   | **string**    | `'hex6'`   | Output color format   |
| `inputFormat`   | **string**    | `'hex6'`   | Expected color format in input field   |
| `availPallets`   | **string[]**    | `['polaris', 'material']`   | List of color palettes. Set empty array for hide color pallets  |
| `customPallets`   | **Palette[]**    | `'[]'`   | Custom pallets list   |

#### Options palette object
|Param | Type                     | Default |Description |
| ------------- | ------------------------------ | ------------------------------ |------------------------------ |
| `name`      | **string**      | `false`     | Display palette name     |
| `id`   | **string**    | `false`   | Palette id. Must be unique.  |
| `colors`   | **string[]**    | `false` | List of colors   |

#### Component outputs
|Param | Type                     | Description |
| ------------- | ------------------------------|------------------------------ |
| `colorChange`      | **`EventEmmiter<string>`**      |  Output color    |

### P.S.:
This is my first public module for Angular. So do not judge strictly ;)

Version changes
----

#### v2.0.4
 - Fixed rgba && hsla alpha bug
#### v2.0.5
 - Added style for color pallets
#### v2.0.6
 - Fixed hex8 alpha