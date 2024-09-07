import JSEncrypt from 'jsencrypt';
import { CRPT } from '../crpt';
import { DeviceInfo } from './device-info';

export class ApiFormData {
  deviceInfo: DeviceInfo;

  constructor() {
    this.deviceInfo = new DeviceInfo();
  }
  getFormData1(): FormData {
    const formData = new FormData();
    formData.append('data1', this.deviceInfo.getJsonString());
    return formData;
  }
  getFormData2(pk: string): FormData {
    var loginData = localStorage.getItem('islogin');
    const formData = this.getFormData1();
    if (loginData) {
      try {
        loginData = atob(loginData);
        const s = JSON.parse(loginData);
        if (!s.login_token) {
          formData.append('data2', '{}');
          return formData;
        }
        const a = JSON.parse(loginData);
        const b = {
          login_token: a.login_token,
          project_password: a.project_password,
          project_number: a.project_number,
        };
        console.log(b);
        var t = new CRPT();
        console.log('dffd');

        var enc = new JSEncrypt();
        enc.setPublicKey(pk);
        const q = enc.encrypt(JSON.stringify(b));
        // console.log(enc.encrypt(JSON.stringify(q)));
        // console.log(q);

        formData.append('data2', JSON.stringify(q));
        return formData;
      } catch (error) {
        formData.append('data2', '{}');
        return formData;
      }
    }
    formData.append('data2', '{}');
    return formData;
  }
  getLoginTokenData() {
    try {
      var loginData = localStorage.getItem('islogin');
      loginData;
      var t = new CRPT();
      const decrypt = t.decrypt(loginData!!);
      // console.log(decrypt);
      
      if (decrypt != false) {
        return JSON.parse(decrypt);
      }
      return false;
    } catch (error) {
      console.log(error);
      
      return false;
    }
  }
}
