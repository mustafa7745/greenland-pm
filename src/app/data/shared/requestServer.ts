import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CustomModal } from './modal';
import { SharedMethod } from '../shared-method';
import JSEncrypt from 'jsencrypt';
import { rejects } from 'assert';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

export class ResquestServer {
  customModal = new CustomModal();
  sharedMethod = new SharedMethod();

  server_public_key_in_storage = 'p_k';
  public http = inject(HttpClient);

  request(
    formData: any,
    url: string,
    onSuccess: (e: any) => void,
    onFail: (e: any) => void
  ) {
    const requestOptions: Object = {
      responseType: 'text',
    };
    const req = this.http.post<any>(url, formData, requestOptions);
    req.subscribe({
      next: (response) => {
        console.log(response);
        console.log(JSON.parse(response));

        try {
          const a = JSON.parse(response);
          onSuccess(response);
        } catch (error) {
          onFail('NOT JSON');
        }
      },
      error: (err) => {
        console.log(err);

        if (err.status == 400) {
          try {
            const a = JSON.parse(err.error);
            console.log(a.message.ar);

            onFail(this.errorMessage(a));
          } catch (error) {
            onFail('NOT JSON ERROR');
          }
        } else if (err.status == 0) {
          onFail('الصفحة التي تطلبها غير موجودة');
        } else {
          onFail('UN Error');
        }
      },
    });
  }
  request2(
    data3: any,
    url: string,
    onSuccess: (e: any) => void,
    onFail: (e: any) => void
  ) {
    const data2 = this.encryptData2();
    if (data2.length > 0) {
      const formData = this.sharedMethod.apiFormData.getFormData1();
      formData.set('data2', data2);
      formData.set('data3', JSON.stringify(data3));
      console.log(data2);
      
      const requestOptions: Object = {
        responseType: 'text',
      };
      const req = this.http.post<any>(url, formData, requestOptions);
      req.subscribe({
        next: (response) => {
          console.log(response);
          console.log(JSON.parse(response));

          try {
            const a = JSON.parse(response);
            onSuccess(response);
          } catch (error) {
            onFail('NOT JSON');
          }
        },
        error: (err) => {
          console.log(err);

          if (err.status == 400) {
            try {
              const a = JSON.parse(err.error);
              console.log(a.message.ar);

              onFail(this.errorMessage(a));
            } catch (error) {
              onFail('NOT JSON ERROR');
            }
          } else if (err.status == 0) {
            onFail('الصفحة التي تطلبها غير موجودة');
          } else {
            onFail('UN Error');
          }
        },
      });
    }
  }
  async requestPromised(formData: any, url: string): Promise<Observable<any>> {
    const requestOptions: Object = {
      responseType: 'text',
    };
    const req = this.http.post<any>(url, formData, requestOptions);
    return await firstValueFrom(req);
  }
  errorMessage(error: any) {
    // if (error.code == 5001) {
    //   this.refresh_token();

    // }
    // else
    if (error.code == 5002) {
      console.log('login');
      this.sharedMethod.removeLogin();
      this.sharedMethod.sharedNavigate.navigateToLogin();
    } else if (error.code == 1022) {
      alert(error.message.ar);

      // this.init()
    } else if (error.code == 1111) {
      this.setServerPublicKey();
      return 'ERROR PUKEY';
      // this.init()
    } else return error.message.ar;
  }

  async refresh_token() {
    const data2 = this.encryptData2();
    console.log(data2);
    
    if (data2.length > 0) {
      const formData = this.sharedMethod.apiFormData.getFormData1();
      const loadingModal = this.customModal.loadingModal();
      loadingModal.componentInstance.title = 'جاري تحديث الجلسه يرجى الانتظار ';
      formData.set('data2', data2);
      console.log(data2);
      
      this.request(
        formData,
        this.sharedMethod.urls.refreshLoginToken,
        (res) => {
          this.sharedMethod.decryptAndSetLogin(res);
          loadingModal.close();
          window.location.reload();
          return true;
        },
        (e) => {
          this.customModal.errorModal().componentInstance.result = e;
          loadingModal.close();
        }
      );
    }
    // return false
  }
  refresh_token2(onSuccess: (e: any) => void, onFail: (e: any) => void) {
    const data2 = this.encryptData2();
    if (data2.length > 0) {
      const formData = this.sharedMethod.apiFormData.getFormData1();
      const loadingModal = this.customModal.loadingModal();
      loadingModal.componentInstance.title = 'جاري تحديث الجلسه يرجى الانتظار ';
      formData.set('data2', data2);
      this.request(
        formData,
        this.sharedMethod.urls.refreshLoginToken,
        (res) => {
          this.sharedMethod.decryptAndSetLogin(res);
          loadingModal.close();
          window.location.reload();
          onSuccess(true);
        },
        (e) => {
          this.customModal.errorModal().componentInstance.result = e;
          loadingModal.close();
          onFail(false);
        }
      );
    }
  }

  encryptData2() {
    var loginTokenData = this.sharedMethod.getLoginData();
    if (loginTokenData != false) {
      var loginTokenData2 = JSON.parse(loginTokenData);
      const b = {
        inputManagerLoginToken: loginTokenData2.token,
      };
      var e = new JSEncrypt();
      e.setPublicKey(this.getServerPublicKey()!);
      var dec = e.encrypt(JSON.stringify(b));
      return JSON.stringify(dec);
    } else {
      this.sharedMethod.sharedNavigate.navigateToLogin();
      return '';
    }
  }
  setServerPublicKey() {
    if (localStorage.getItem(this.server_public_key_in_storage) == null) {
      const loadingModal = this.customModal.loadingModal();
      loadingModal.componentInstance.title = 'جاري تحديث البيانات الخاصة';
      const req = this.http.get(
        'https://greenland-rest.com//v1/get_public_key.php'
      );
      // console.log(req.s);
      req.subscribe({
        next: (res: any) => {
          localStorage.setItem(this.server_public_key_in_storage, res);
          loadingModal.close();
          window.location.reload();
        },
        error: (err: any) => {
          this.customModal.errorModal().componentInstance.result =
            'حدث خطأ عند تحديث البيانات الخاصة';
          loadingModal.close();
        },
      });
    }
  }
  getServerPublicKey() {
    var s = localStorage.getItem(this.server_public_key_in_storage);
    if (s == null) {
      this.setServerPublicKey();
      return localStorage.getItem(this.server_public_key_in_storage);
    } else {
      return s;
    }
  }
  async checkLoginWithoutNavigate() {
    var loginTokenData = this.sharedMethod.getLoginData();
    if (loginTokenData == false) {
      console.log('fffdfdf');

      this.sharedMethod.sharedNavigate.navigateToLogin();
    } else {
      const loginTokenData2 = JSON.parse(loginTokenData);
      console.log(loginTokenData);

      const date = new Date();
      if (date.getTime() > Date.parse(loginTokenData2.expire_at)) {
        // await this.refresh_token();
        this.customModal.errorModal().componentInstance.result =
          'يجب تحديث الجلسة';
      }
    }
  }
  checkLoginAndNavigate() {
    this.sharedMethod.browserPlatform(() => {
      var loginTokenData = this.sharedMethod.getLoginData();
      if (loginTokenData == false) {
        this.sharedMethod.sharedNavigate.navigateToLogin();
      } else {
        const loginTokenData2 = JSON.parse(loginTokenData);
        const date = new Date();
        if (date.getTime() > Date.parse(loginTokenData2.expire_at)) {
          this.refresh_token();
        } else {
          this.sharedMethod.sharedNavigate.navigateToHome();
        }
        console.log(loginTokenData);
      }
    });
  }
}
