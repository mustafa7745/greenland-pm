import { CRPT } from "../crpt";


export class DeviceInfo {
  deviceName: string | undefined;
  deviceVersion: string | undefined;
  deviceId: string | undefined;
  app_package_name = 'com.restaurant.greenland_su_3';
  sha = 'sha1';
  app_device_token = 'browserToken';
  device_type_name = 'browser';
  //
  constructor() {
   
   
  }

  private getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    // console.log(agent);
    switch (true) {
      case agent.indexOf('edge') > -1:
        return "edge";
      case agent.indexOf('edg') > -1:
        return "Edge";
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return "opera";
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return "chrome";
      case agent.indexOf('trident') > -1:
        return "ie";
      case agent.indexOf('firefox') > -1:
        return "firefox";
      case agent.indexOf('safari') > -1:
        return "safari";
      default:
        return "other";
    }
  }
  private getBrowserVersion() {
    var userAgent = navigator.userAgent,
      tem,
      matchTest =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    // console.log(userAgent);

    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === "Chrome") {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest = matchTest[2]
      ? [matchTest[1], matchTest[2]]
      : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null)
      matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }
  private getDeviceId() {
    const device_id = 'did';
    if (!localStorage.getItem(device_id)) {
      const id = this.getUniqueId(4);
      localStorage.setItem(device_id, id);
      return id;
    } else {
      return localStorage.getItem(device_id)!;
    }
  }
  getJsonString() {
   
    const info =  { name: this.getBrowserName(), version: this.getBrowserVersion() }
    const data = {
      packageName: this.app_package_name,
      appSha: this.sha,
      appVersion: 1,
      deviceId: this.getDeviceId(),
      devicePublicKey: new CRPT().getPUPRK().pu,
      deviceInfo:JSON.stringify(info),
      appDeviceToken: 'browserToken1',
    };
    // console.log(JSON.stringify(data) );
    
    
    return JSON.stringify(data) 
  }
  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a
   * @example getUniqueId(4) : 6a22-a5e6-3489-896b
   */
  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    console.log(stringArr);
    
    // stringArr.join('-')
    return stringArr.join('');
  }
}
