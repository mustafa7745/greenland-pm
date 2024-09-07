import { DataProperties } from './data-properties';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export class Properties extends DataProperties {
  constructor(
    public urlRead: string,
    public urlSearch: string,
   
  ) {
    super();
  }

  // isDisabledSearchButton() {
  //   return !(this.searchText.length > 0);
  // }
  // changeSearchMode(event: any) {
  //   this.list = [];
  //   this.isHaveSearchMore = false;
  //   this.searchMode = event.target.checked;
  //   if (event.target.checked) {
  //     this.searchText = '';
  //     this.list = [];
  //   } else {
  //     this.read();
  //   }
  // }

  // changeOrderType(type: string): boolean {
  //   if (this.orderType != type){
  //     this.orderType = type
  //     return true;
  //   }
  //   return false;
  // }
  // onChangeOrderType(dataRead: string, dataSearch: string) {
  //   if (this.searchMode) {
  //     this.onChangeOrderTypeSearchMode(dataSearch);
  //   } else {
  //     this.data3Read = dataRead;
  //     this.read();
  //   }
  // }
  // onChangeOrderTypeSearchMode(dataSearch: string) {
  //     if (this.searchText.length > 0) {
  //       this.setData3Search(dataSearch);
  //       this.search();
  //     }
  // }
  // changeOrderBy(by:string):boolean{
  //   if (this.orderBy != by) {
  //     this.orderBy = by
  //     return true;
  //   }
  //   return false
  // }
  // onChangeOrderBy( dataRead: string, dataSearch: string) {
  //   if (this.searchMode) {
  //     this.onChangeOrderByOnSearchMode( dataSearch);
  //   } else {
  //     this.setData3Read(dataRead);
  //     this.read();
  //   }
  // }
  // onChangeOrderByOnSearchMode( dataSearch: string) {
  //     if (this.searchText.length > 0) {
  //       this.setData3Search(dataSearch);
  //       this.search();
  //     }
  // }
  // //
  // selectItem(id: string) {

  //   const index = this.selectedItems.findIndex((el) => el === id);
  //   if (index > -1) {
  //     this.selectedItems.splice(index, 1);
  //   } else this.selectedItems.push(id);
  // }


  // setData3Read(data: string) {
  //   this.data3Read = data;
  // }
  // setData3Search(data: string) {
  //   this.data3Search = data;
  // }

  // read(onSuccess: (e:any) => void = ()=>{}) {
  //   this.readError = '';
  //   this.loadingRead = true;
  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   // console.log(formData.get("data2"));
    
  //   formData.set('data3', this.data3Read);
  //   //
  //   this.sharedMethod.request(formData, this.urlRead).subscribe({
  //     next: (response) => {
  //       this.list = response;
  //       this.loadingRead = false;
  //       this.statusRead = true;
  //       if (response.length == 3) {
  //         this.isHaveReadMore = true;
  //       } else {
  //         this.isHaveReadMore = false;
  //       }
  //       this.loadingReadMore = false;
  //       onSuccess(response)
  //     },
  //     error: (err) => {
  //       this.readError = this.sharedMethod.errorMessage(err);
  //       this.loadingRead = false;
  //       this.statusRead = false;
  //     },
  //   });
  // }
 
  // readMore() {
  //   this.readMoreError = '';
  //   this.loadingReadMore = true;
  //   //

  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   formData.set('data3', this.data3ReadMore);
  //   //
  //   this.sharedMethod.request(formData, this.urlRead).subscribe({
  //     next: (response) => {
  //       this.list = this.list.concat(response);
  //       this.loadingReadMore = false;
  //       this.statusReadMore = true;
  //       if (response.length == 3) {
  //         this.isHaveReadMore = true;
  //       } else {
  //         this.isHaveReadMore = false;
  //       }
  //       this.loadingReadMore = false;
  //     },
  //     error: (err) => {
  //       this.readMoreError = this.sharedMethod.errorMessage(err);
  //       this.loadingReadMore = false;
  //       this.statusReadMore = false;
  //     },
  //   });
  // }
  // search() {
  //   this.list = [];
  //   this.emptySearchData = '';
  //   this.searchError = '';
  //   this.loadingSearch = true;
  //   this.isHaveSearchMore = false;

  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   formData.append('data3', this.data3Search);
  //   //
  //   this.sharedMethod.request(formData, this.urlSearch).subscribe({
  //     next: (response) => {
  //       if (response.length === 0) {
  //         this.emptySearchData = 'No Data Found';
  //       } else {
  //         this.list = response;

  //         if (response.length == 3) {
  //           this.isHaveSearchMore = true;
  //         } else {
  //           this.isHaveSearchMore = false;
  //         }
  //       }
  //       this.loadingSearch = false;
  //     },
  //     error: (err) => {
  //       this.searchError = this.sharedMethod.errorMessage(err);
  //       this.loadingSearch = false;
  //     },
  //   });
  // }
  // searchMore() {
  //   this.searchMoreError = '';
  //   this.loadingSearchMore = true;
  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   formData.set('data3', this.data3SearchMore);
  //   //
  //   this.sharedMethod.request(formData, this.urlSearch).subscribe({
  //     next: (response) => {
  //       this.list = this.list.concat(response);
  //       this.loadingSearchMore = false;
  //       if (response.length == 3) {
  //         this.isHaveSearchMore = true;
  //       } else {
  //         this.isHaveSearchMore = false;
  //       }
  //       this.loadingSearchMore = false;
  //     },
  //     error: (err) => {
  //       this.searchMoreError = this.sharedMethod.errorMessage(err);
  //       this.loadingSearchMore = false;
  //     },
  //   });
  // }
  // add(url: string, data: string,activeModal:NgbActiveModal,onSuccess: () => void = ()=>{}) {
  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);
  //   formData.set('data3', data);
  //   //
  //   const loadingModal = this.sharedMethod.loadingModal();
  //   //
  //   this.sharedMethod.request(formData, url).subscribe({
  //     next: (response) => {
  //       console.log(response);
        
  //       loadingModal.close();
  //       this.sharedMethod.successModal().componentInstance.result =
  //         this.sharedMethod.globalString.getSuccessAdd();
  //       //
  //       onSuccess();
  //       activeModal.close(response);
  //     },
  //     error: (err) => {
  //       this.sharedMethod.errorModal().componentInstance.result =
  //         this.sharedMethod.errorMessage(err);
  //       loadingModal.close();
  //     },
  //   });
  // }
  // addWithOutExit(url: string, data: string,onSuccess: (e:any) => void = ()=>{}) {
  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   formData.set('data3', data);
  //   //
  //   const loadingModal = this.sharedMethod.loadingModal();
  //   //
  //   this.sharedMethod.request(formData, url).subscribe({
  //     next: (response) => {
  //       console.log(response);
        
  //       loadingModal.close();
  //       this.sharedMethod.successModal().componentInstance.result =
  //         this.sharedMethod.globalString.getSuccessAdd();
  //       //
  //       onSuccess(response);
  //       // activeModal.close(response);
  //     },
  //     error: (err) => {
  //       this.sharedMethod.errorModal().componentInstance.result =
  //         this.sharedMethod.errorMessage(err);
  //       loadingModal.close();
  //     },
  //   });
  // }
 
  // update(url: string, data: string,activeModal:NgbActiveModal) {
  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   formData.set('data3', data);
  //   //
  //   const loadingModal = this.sharedMethod.loadingModal();
  //   //
  //   this.sharedMethod.request(formData, url).subscribe({
  //     next: (response) => {
  //       loadingModal.close();
  //       this.sharedMethod.successModal().componentInstance.result =
  //         this.sharedMethod.globalString.getSuccessUpdate();
  //       //
  //       activeModal.close(response);
  //     },
  //     error: (err) => {
  //       this.sharedMethod.errorModal().componentInstance.result =
  //         this.sharedMethod.errorMessage(err);
  //       loadingModal.close();
  //     },
  //   });
  // }
  // delete(url: string, data: string,activeModal:NgbActiveModal) {
  //   var formData = this.apiFormData.getFormData2(this.sharedMethod.getServerPublicKey()!);;
  //   formData.set('data3', data);
  //   //
  //   const loadingModal = this.sharedMethod.loadingModal();
  //   //
  //   this.sharedMethod.request(formData, url).subscribe({
  //     next: (response) => {
  //       loadingModal.close();
  //       this.sharedMethod.successModal().componentInstance.result =
  //         this.sharedMethod.globalString.getSuccessDelete();
  //       //
  //       activeModal.close(response);
  //     },
  //     error: (err) => {
  //       this.sharedMethod.errorModal().componentInstance.result =
  //       this.sharedMethod.errorMessage(err);

  //       loadingModal.close();
  //       activeModal.dismiss();
  //     },
  //   });
  // }
}
