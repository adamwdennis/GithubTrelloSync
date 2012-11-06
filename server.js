var server = exports;

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

server.unsortedMilestonesListId = "5086f355c87793ab57000a86";
server.dailyBoardId = "4fec8b3c5854e0f91f017a5e";
server.prodListId= '5097ff419fb5bc1d44001133';

/*
 * Gets the lists from a specific board
 */
server.getListsFromBoard = function(boardId, filter, cb) {
  trello.get("/1/boards/" + boardId + "/lists" + (filter ? ("/"+filter) : "" ), cb);
};

server.getCardsFromBoard = function(boardId, filter, cb) {
  trello.get("/1/boards/" + boardId + "/cards" + (filter ? ("/"+filter) : "" ), cb);
};

server.getCardsFromList = function(listId, filter, cb) {
  trello.get("/1/lists/" + listId + "/cards" + (filter ? ("/"+filter) : ""), cb);
};
