describe("SimpleNote", function() {
  var fakeSync;

  beforeEach(function() {
    localStorage.clear();
    fakeSync = spyOn(mviable, 'sync');
    setFixtures($(readFixtures("index.html")));
    init();
  });

  it('shows the login bar if the user is not logged in', function() {
    expect().toEqual();
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
      expect(mviable.getObj("note-1")).toEqual({
        title: "My Note",
        body: "my note contents"
      });
      expect(mviable.getObj("notes")).toEqual([1]);
    });

    it('adds the note to the view', function() {
      expect($(".note-item")).toHaveAttr('note-id', 1);
    });
  });

  it('Adds the default note if the local storage is not initialized', function() {
    expect(mviable.getObj("notes")).toEqual([1]);
    expect(mviable.getObj("note-1").title).toEqual("What is SimpleNote?");
  });

  // Highlights the selected note
  
  // Loads the note when clicked in the list
});
