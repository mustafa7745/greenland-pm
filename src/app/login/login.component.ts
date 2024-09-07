import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SharedMethod } from '../data/shared-method';
import { ResquestServer } from '../data/shared/requestServer';

@Component({
  standalone: true,
  selector: 'login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error = '';
  isLoading = false;
  isLogined = true;

  requestServer = new ResquestServer();
  apiFormData: any;
  constructor() {
    this.requestServer.sharedMethod.browserPlatform(() => {
      this.requestServer.checkLoginAndNavigate();
      this.isLogined = false;
    });
    //
  }

  phone: string = '';
  password: string = '';
  projectNumber = '';
  projectPassword = '';

  validateInput(): boolean {
    return true;
    if (
      this.phone.length == 9 &&
      this.isNumber(this.phone) &&
      this.password.length > 4 &&
      this.isNumber(this.projectNumber) &&
      this.projectPassword.length > 4 &&
      !this.isLoading
    ) {
      return true;
    } else {
      return false;
    }
  }
  getPhone() {
    const phone = this.phone;
    return phone;
  }

  login() {
    const data2 = {
      inputUserPhone: this.getPhone(),
      inputUserPassword: this.password,
      inputProjectNumber: this.projectNumber,
      inputProjectPassword: this.projectPassword,
    };
    this.requestServer.sharedMethod.jsEncrypt.setPublicKey(
      this.requestServer.getServerPublicKey()!
    );
    var dec = this.requestServer.sharedMethod.jsEncrypt.encrypt(
      JSON.stringify(data2)
    );
    const formData = this.requestServer.sharedMethod.apiFormData.getFormData1();
    formData.set('data2', JSON.stringify(dec));

    this.requestServer.request(
      formData,
      this.requestServer.sharedMethod.urls.loginUrl,
      (res) => {
        try {
          this.requestServer.sharedMethod.decryptAndSetLogin(res);

          // }
        } catch (e) {
          this.requestServer.setServerPublicKey();
          this.error = 'ERRRO KEY';
          this.isLoading = false;
        }
        console.log(res);
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  isNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
}
