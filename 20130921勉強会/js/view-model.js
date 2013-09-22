/**
 * 画像検索画面のViewModel
 */
var ViewModel = (function(){
  function ViewModel(model){
    this.model  = model;
    this.info = ko.observable();
    this.results  = ko.observableArray();
    this.types = ko.observableArray(
      [
        {name:"種類選択",value:0    },
        {name:"猫"      ,value:"猫" },
        {name:"犬"      ,value:"犬" }
      ]
    );
    this.selectedType = ko.observable(this.types()[0]);

    this.model.results.subscribe(function(result){
      var data = $.map(result, function(result,index){
        return new ListViewModel(result);
      });
      this.results(data);
    }, this);
    this.model.info.subscribe(function(info){
      this.info(info);
    }, this);
  }

  ViewModel.prototype.search = function(){
    this.results.removeAll();
    // search
    this.model.search(this.selectedType());
  }
  ViewModel.prototype.clear = function(){
    this.results.removeAll();
    this.info("");
    this.selectedType(this.types()[0]);
  }

  return ViewModel;
})();