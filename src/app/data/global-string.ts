
export class GlobalString {

  getSuccessAdd(){
    return "Success Added"
  }
  getSuccessUpdate(){
    return "Success Updated"
  }
  getConfirmDeleteQuestion(length:number){
    return 'Are You Sure to Delete (' + length + ') Items ?';
  }
  getDeleting(){
    return "Deleteing..."
  }
  getSuccessDelete(){
    return "Deleted"
  }
  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDut88Gxj32bs+D3uSXgtxbG5LiQzi0UlIHTTzzmiNuuQqQk9r5r8pPnp7vnrhdKvfrj6Nar7bFjS8g79++VIvmp6YTpB/1QFEj6RxlJ92KBpfsBkXR+I0lKKFoZNh3InyTBBvCluPt0J7B83yfX85ENsGT6+Pns/PWsmVd/oRKVwIDAQAB
  -----END PUBLIC KEY-----`;
}
