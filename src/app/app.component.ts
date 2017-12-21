import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Circle Wave in Angular</h1>
  <p>
    An implementation of <a href="https://bl.ocks.org/mbostock/2d466ec3417722e3568cd83fc35338e3" target="_blank">Circle Wave</a> in Angular
  </p>
  <circle-wave></circle-wave>    
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
