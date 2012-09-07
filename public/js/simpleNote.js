"use strict";

function getNotes() {
  return mviable.getObj("notes") || [];
}

function nextId() {
  var noteIndex = getNotes();
  noteIndex.sort();
  noteIndex.reverse();
  return 1 + (noteIndex.shift() || 0);
}

function addNote(noteId, title, body) {
  var note = {
    title: title,
    body: body
  };

  // We store each note as a seperate key so that So Simple
  // can synchronize them independently.
  mviable.setObj("note-" + noteId, note);

  mviable.setObj("notes", function(notes) { return (notes || []).concat(nextId()); });
}

function appendNote(noteId) {
  var note = mviable.getObj("note-" + noteId)
  var newItem = $("#templates .note-item").clone();
  newItem.text(note.title);
  newItem.attr("note-id", noteId);
  $("#saved-notes").append(newItem);
}

function newNote() {
  var noteId = nextId();
  addNote(noteId, $("#note-header input").val(), $("#note-body textarea").val());
  appendNote(noteId);

  $("#note-header input").focus();
}

function loadNotes() {
  getNotes().forEach(function(noteId) {
    appendNote(noteId);
  });
}

// Called when we need to prompt the user to log in
function requireLogin() {
  $("#login-bar").show();
}

// Called when the application is run for the first time on a device
function addDefaultNote() {
  addNote(nextId(), "What is SimpleNote?", 
    "SimpleNote is an example of the kind of HTML5 app you can build with MinimumViable\n\nIt was built using: MinimumViable, JQuery, Underscore.js and HTML5. It is hosted entirely on Amazon S3.\n\nTry adding a new note, and then go to http://simplenote.minimumviable.com on your phone!");
}

function init() {
  $("#note-header button").click(newNote);
  mviable.events({
    loginRequired: requireLogin
  });
  if (mviable.getObj("notes") === undefined) {
    addDefaultNote();
  }
  mviable.sync();
  loadNotes();
}

// Initializes our application when the page is loaded
$(init);
