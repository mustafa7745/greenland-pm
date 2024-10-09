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
  getProductByName(name: string) {
    return this.getProducts().filter((product) => product.name.includes(name));
    // return this.getProducts().find((product) => {
    //   return product.name.includes(name);
    // });
  }
  getProductById(id: string) {
    return this.getProducts().find((product) => {
      return product.id == id;
    });
  }

  roundToNearestFifty(value: number): number {
    return Math.floor((value + 25) / 50) * 50;
  }
  formatPrice(number: number) {
    const convertedTo2Dicimal = number.toFixed(2);
    // console.log(convertedTo2Dicimal);
    return parseFloat(convertedTo2Dicimal); //remove trail 0
  }
}
