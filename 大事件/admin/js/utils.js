(function (w) {
  var utils = {
    // 'id=12&namt=tom&age=20'
    covertToObj: function (str) {
      var arr = str.split('&') // ["id=12", "name=tom", "age=20"]
      var obj = {}
      for (var i = 0;i < arr.length;i++) {
        var temp = arr[i].split('=') // ['id','12']
        obj[temp[0]] = temp[1]
        // console.log(obj);
      }
      return obj
    }
  }
  w.utils = utils
})(window)


// (function(){})()

// (function(){}())