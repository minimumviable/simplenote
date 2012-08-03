describe("SimpleNote", function() {
  beforeEach(function() {
    localStorage.clear();
    init();
  });

  it('displays all the saved notes', function() {
    addNote(1, "my note", "Hey, I'm a note!");

    init();
    var noteItem = $("#saved-notes li");
    expect(noteItem).toHaveClass("note-item");
    expect(noteItem).toHaveAttr("note-id", 1);
    expect(noteItem.text()).toEqual("my note");
  });

  describe('when notes are saved', function() {
    beforeEach(function() {
      $("#note-header input").val("My Note");
      $("#note-body textarea").val("my note contents");
      $("#note-header button").trigger('click');
    });

    it('writes to local storage', function() {
      expect(localStorage.length).toEqual(2);
      expect(localStorage.getObj("note-1")).toEqual({
        title: "My Note",
        body: "my note contents"
      });
      expect(localStorage.getObj("notes")).toEqual([1]);
    });

    it('adds the note to the view', function() {
      expect($(".note-item")).toHaveAttr('note-id', 1);
    });
  });

  // Highlights the selected note
  
  // Loads the note when clicked in the list
});
