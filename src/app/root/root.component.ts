import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedMethod } from '../data/shared-method';
import { ResquestServer } from '../data/shared/requestServer';
import { interval, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
})
export class RootComponent {
  data: any;
  reqestServer: ResquestServer;

  // sharedNavigate: SharedNavigate
  constructor() {
    this.reqestServer = new ResquestServer();
    this.reqestServer.sharedMethod.browserPlatform(async () => {
      this.reqestServer.sharedMethod.crpt.initData();
      this.reqestServer.setServerPublicKey();
      await this.reqestServer.checkLoginWithoutNavigate();
    });
  }
}
