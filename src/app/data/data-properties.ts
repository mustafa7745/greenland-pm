import { SharedMethod } from './shared-method';
import { ApiFormData } from './form-data';
import { Urls } from './urls';

export class DataProperties {

  public sharedMethod = new SharedMethod()
  public apiFormData = new ApiFormData()
  urls = new Urls();
  list: any[] = [];
  data: any;
  //
  selectedItems: string[] = [];
  orderByList = ['Created Date'];
  orderType = 'DESC';
  orderBy = this.orderByList[0];
  //
  loadingRead = false;
  loadingReadMore = false;
  loadingSearch = false;
  loadingSearchMore = false;
  //
  readError = '';
  readMoreError = '';
  searchMoreError = '';
  searchError = '';
  //
  isHaveReadMore = false;
  isHaveSearchMore = false;
  //
  statusRead = false;
  statusReadMore = false;
  //
  searchMode = false;
  searchText = '';
  emptySearchData = '';
  // 
  data3Read = '';
  data3ReadMore = '';
  data3Search = '';
  data3SearchMore = '';
  
}
