import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bplo-web-front';

  getUrl() {
    return "url('assets/img/background.png')";
  }
}
