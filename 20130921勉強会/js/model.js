var Model = (function(){
  function Model(){
    this.results = ko.observableArray();
    this.info = ko.observable();
  }

  Model.prototype.search = function(selectedType){
    this.info("ｷｮﾛ^(･д･｡)(｡･д･)^ｷｮﾛ");
    var url = "https://spreadsheets.google.com/feeds/list/0AtJQyP9hXW1mdDAxRVdUaVhLSXVlOW94bXB1Zk9MS1E/od6/public/values?alt=json";
    
    $.ajax({
      dataType:"jsonp",
      context : this,
      url: url,
      success:function(data){
        var dataCount = data.feed.entry.length;
        var results = Array();
        for(var i = 0; i < dataCount; i++){
          var row = {
            type   : data.feed.entry[i].gsx$type.$t,
            url    : data.feed.entry[i].gsx$url.$t,
            remarks: data.feed.entry[i].gsx$remarks.$t
          };
          // 絞込
          if(selectedType["value"] == 0){
            // 全指定
            results.push(row);
          }else{
            // 種類指定
            if(selectedType["value"] == row.type){
              results.push(row);
            }
          }
        }
        var resultCount = results.length;
        
        if(resultCount > 0){
          this.info(resultCount + "件見つかったよヾ(*´∀｀*)ﾉｷｬｯｷｬ");
        }else{
          this.info("データなかったよ(´・ω・｀)");
        }
        
        this.results(results);
      },
      error : function(response){
        this.info("なんかしらのエラー(´・ω・｀)");
      },
      complete : function(response){
      }
    });
  };
  return Model;
})();