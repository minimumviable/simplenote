(function() {
  var clean = {};

  function storedKeys() {
    return ["notes", "note-1", "note-2", "note-3", "note-4"];
  }

  function sync() {
    // FIXME Need to be smarter about what properies are synced
    var payload = {};
    for(k in localStorage) {
      if(! clean[k]) {
        payload[k] = localStorage[k];
      }
    };
    var request = new XMLHttpRequest();

    var host = localStorage.sosimplehost || 'cloud.sosimplestorage.com:8080'
    request.open('POST', 'http://' + host + '/store/sync');
    request.setRequestHeader("Content-Type", "text/plain");
    request.withCredentials = "true";
    
    // FIXME need to handle many more error states here
    // request.onerror = function() {
    //   console.log("error syncing");
    // }
    request.onload = function (e) {
      var newData = JSON.parse(e.target.response);
      for (k in payload) { clean[k] = payload[k]; }
      for (k in newData) { 
        clean[k] = newData[k]; 
        localStorage[k] = newData[k];
      }
    };
    request.send(JSON.stringify(payload)); 
  }

  function getObj(name) {
    var item = localStorage.getItem(name);
    if (item !== null)
      return JSON.parse(item);
  }

  function setObj(name, obj) {
    // FIXME This may throw QUOTA_EXCEEDED_ERR
    if (typeof(obj) == 'function') {
      obj = obj.apply(localStorage, [getObj(name)]);
    } 
    localStorage.setItem(name, JSON.stringify(obj));
  }

  var ss = {
    sync: sync,
    getObj: getObj,
    setObj: setObj
  }
  Object.defineProperty(Storage.prototype, "ss", {value: ss});
})();

