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
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار ';

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
          loadingModal.close();
          this.requestServer.sharedMethod.decryptAndSetLogin(res);

          // }
        } catch (e) {
          this.requestServer.setServerPublicKey();
          loadingModal.close();
          const errorModal =
            this.requestServer.sharedMethod.customModal.errorModal();
          errorModal.componentInstance.result = e;
        }
        console.log(res);
      },
      (error) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = error;
      }
    );
  }

  isNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
}
