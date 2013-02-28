//
var GitHubApi = require("github");
var Trello = require("node-trello");
var config = require('./config/config.json');
var trello = new Trello(config.trelloKey, config.trelloToken);

var config = require("./config/config.json");

var github = new GitHubApi({
    version: "3.0.0"
});

github.authenticate({
    type: "oauth",
    token: config.apiToken
});

var unsortedMilestonesListId = "5086f355c87793ab57000a86";
var dailyBoardId = "4fec8b3c5854e0f91f017a5e";

/*
 * Gets the lists from a specific board
 */
function getListsFromBoard(boardId, filter, cb) {
  trello.get("/1/boards/" + boardId + "/lists" + (filter ? ("/"+filter) : "" ), cb);
}

function getCardsFromBoard(boardId, filter, cb) {
  trello.get("/1/boards/" + boardId + "/cards" + (filter ? ("/"+filter) : "" ), cb);
}

function getCardsFromList(listId, cb) {
  trello.get("/1/lists/" + listId + "/cards",cb);
}

function getActionsFromCard(cardId, options, cb) {
  trello.get("/1/cards/" + cardId + "/actions", options, cb);
}

getListsFromBoard(dailyBoardId,null,function(err,res) {
  //console.log(res);
  res.forEach(function(list) {
    //console.log(list.name + " - " + list.id);
    getCardsFromList(list.id, function(err, res) {
      //console.log(res);
      res.forEach(function(card) {
        //console.log("Card id: " + res);
        getActionsFromCard(card.id, {
          'actions': 'updateCard'
          },
          function(err, res) {
            console.log(res);
          }
        );
      });
    });
  });
});
