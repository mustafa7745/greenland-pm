export class ProductController {
  nameProductsInStorage = 'products';

  getProducts(): any[] {
    const localdata = localStorage.getItem(this.nameProductsInStorage);
    if (localdata == null) {
      var data: any = [];
      localStorage.setItem(this.nameProductsInStorage, JSON.stringify(data));
      return data;
    }
    return JSON.parse(localdata);
  }
 
  setProducts(item: any) {
    localStorage.setItem(this.nameProductsInStorage, JSON.stringify(item));
  }
  
  //
  getProductByNumber(number: string) {
    return this.getProducts().find((product) => {
      return product.number == number;
    });
  }
  getProductById(id: string) {
    return this.getProducts().find((product) => {
      return product.id == id;
    });
  }
  

}
