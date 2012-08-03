"use strict";

function getNotes() {
  return localStorage.getObj("notes") || [];
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
  localStorage.setObj("note-" + noteId, note);

  localStorage.setObj("notes", function(notes) { return (notes || []).concat(nextId()); });
}

function appendNote(noteId) {
  var note = localStorage.getObj("note-" + noteId)
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

function init() {
  $("#note-header button").click(newNote);
  loadNotes();
}

// Initializes our application when the page is loaded
$(init);
