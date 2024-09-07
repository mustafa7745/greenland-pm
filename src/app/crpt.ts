import JSEncrypt from 'jsencrypt';
export class CRPT {
  pskey = 'password';
  keyInStorage = 'c_t_p_k';
  async initData() {
    const item = localStorage.getItem(this.keyInStorage);
    if (item != null) {
      try {
        const decoded = window.atob(item);
        const keys = decoded.split(';');
        const pukey = keys[0];
        const prkey = keys[1];
        var s = new JSEncrypt();
        s.setPublicKey(pukey);
        var enc = s.encrypt(this.pskey);
        s.setPrivateKey(prkey);
        var pskeyVerify = s.decrypt(enc.toString());
        if (pskeyVerify === this.pskey) {
          // console.log('ppk', true);
        } else {
          await this.createNewKey();
        }
      } catch (error) {
        await this.createNewKey();
      }
    } else {
      await this.createNewKey();
    }
  }
  getPUPRK() {
    this.initData();
    const item = localStorage.getItem(this.keyInStorage);
    const decoded = window.atob(item!);
    const keys = decoded.split(';');
    return {
      pu: keys[0],
      pr: keys[1],
    };
  }
  decrypt(data: string) {
    var s = new JSEncrypt();
    s.setPrivateKey(this.formatAsPem(this.getPUPRK().pr));
    return s.decrypt(data);
  }
  private async createNewKey() {
    console.log("dfdf");
    
    const a = await this.getPrivPub();
    var prpu = a.publicKey + ';' + a.privateKey;
    localStorage.setItem(this.keyInStorage, window.btoa(prpu));
  }
  private async getPrivPub() {
    const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-256' }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ['encrypt', 'decrypt'] // can be any combination of "encrypt" and "decrypt"
    );
    const keydataPr = await window.crypto.subtle.exportKey('pkcs8', privateKey);
    const keydataPu = await window.crypto.subtle.exportKey('spki', publicKey);

    return {
      privateKey: this.spkiToPEM(keydataPr),
      publicKey: this.spkiToPEM(keydataPu),
    };
  }
  private spkiToPEM(keydata: any) {
    var keydataS = this.arrayBufferToString(keydata);
    var keydataB64 = window.btoa(keydataS);
    // var keydataB64Pem = this.formatAsPem(keydataB64);
    return keydataB64;
  }
  private arrayBufferToString(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
  private formatAsPem(str: string) {
    var finalString = '-----BEGIN PUBLIC KEY-----\n';
    while (str.length > 0) {
      finalString += str.substring(0, 64) + '\n';
      str = str.substring(64);
    }
    finalString = finalString + '-----END PUBLIC KEY-----';
    return finalString;
  }
}
