beforeEach(function() {

  // To get this to work you need to let Chrome 
  // fetch files from the file system. There's a commmand line switch 
  // for this, which you can use on OS X like so:
  //
  // open -a "Google Chrome" --args --allow-file-access-from-files
  var appBody = $(readFixtures("index.html"));
  setFixtures(appBody);
});
