describe('So Simple Storage', function() {
  beforeEach(function() {
    localStorage.clear();
  });

  it('can store objects', function() {
    localStorage.ss.setObj('greeting', ["Hello", "World"]);
    expect(localStorage.ss.getObj('greeting')).toEqual(["Hello", "World"]);
  });

  it('can update objects with a function', function() {
    localStorage.ss.setObj('greeting', ["Hello", "World"]);
    localStorage.ss.setObj('greeting', function(greeting) {
      return greeting.concat("from SoSimple!");
    });
    expect(localStorage.ss.getObj('greeting')).toEqual(["Hello", "World", "from SoSimple!"]);
  });

  it('can still loop over the localStorage object', function() {
    localStorage.ss.setObj("item", {})
    items = [];
    for(k in localStorage) { items.push(k); }
    expect(items).toEqual(["item"]);
  });

  // Submits dirty fields for syncronization
  // Updates fields returned in the response
  // Invokes the callback to resolve conflicts
  // Detects when a field is deleted
});
