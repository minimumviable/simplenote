(function() {
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

  Storage.prototype.getObj = getObj;
  Storage.prototype.setObj = setObj;
})();

