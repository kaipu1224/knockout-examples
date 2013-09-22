// table data
var ListViewModel = (function(){
    function ListViewModel(row){
      this.type = row.type;
      this.url = row.url;
      this.remarks = row.remarks;
    }

    return ListViewModel;
})();