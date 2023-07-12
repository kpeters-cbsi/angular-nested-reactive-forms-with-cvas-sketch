import { Component, VERSION } from '@angular/core';
// Thanks to @eric-coker for helping me get this working nicely
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
