var Trello = require("node-trello");
var t = new Trello("4c95dbf00e7d0684bca5c127e245d0f8", "96d6a5a795841d19af0b6aa17168705c8c064bbc6255a80e03469b9118351a13");

t.post( "/1/cards", {
  name: "test name",
  idList:"5086f355c87793ab57000a86"
}, function(err, data) {
  if (err) console.log(JSON.stringify(err));
  console.log(data);
});


// this gets the lists in a board
/*
t.get( "/1/boards/4fcf5e4876d290e53983ab87/lists", {
}, function(err, data) {
  if (err) throw err;
  console.log(data);
});
*/

/*
t.get("/1/members/me", { cards: "open" }, function(err, data) {
  if (err) throw err;
  console.log(data);
});
*/
