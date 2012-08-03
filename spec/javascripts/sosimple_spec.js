describe('So Simple Storage', function() {
  it('can store objects', function() {
    localStorage.setObj('greeting', ["Hello", "World"]);
    expect(localStorage.getObj('greeting')).toEqual(["Hello", "World"]);
  });

  it('can update objects with a function', function() {
    localStorage.setObj('greeting', ["Hello", "World"]);
    localStorage.setObj('greeting', function(greeting) {
      return greeting.concat("from SoSimple!");
    });
    expect(localStorage.getObj('greeting')).toEqual(["Hello", "World", "from SoSimple!"]);
  });
});
