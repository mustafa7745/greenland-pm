export class StateController {
  isLoadingInnerSearch = false;
  errorInnerSearch = '';
  //
  selected: any[] = [];
  addToSelected(item: any) {
    this.selected.push(item);
    console.log(this.selected);
    
  }
  removeFromSelected(item: any) {
    // this.selected.includes()
    const index = this.selected.indexOf(item);
    console.log(index); // 👉️ 1

    if (index !== -1) {
      this.selected.splice(index, 1);
    }
  }
}
