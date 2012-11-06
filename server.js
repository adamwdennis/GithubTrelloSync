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
function getListsFromBoard(listId, cb) {
  trello.get("/1/boards/" + listId + "/lists", {
  }, function(err, res) {
    console.log(res);
  });
}

/*
 * This function creates a new card in the "Unsorted Milestones" list
 * for the milestone object passed to it.
 */
function createUnsortedMilestoneCard(milestone, cb) {
  var milestoneUrl = "https://github.com/" + config.user + "/" + config.repo + "/issues?milestone=" + milestone.number;
  var description = milestoneUrl + '\n\n' + milestone.description;
  trello.post("/1/cards", {
    name: milestone.title,
    desc: description,
    idList: unsortedMilestonesListId
  }, function(err, res) {
    if(err) throw(err);
    var id = res.id;
    trello.post("/1/cards/" + id + "/checklists/", {
      name: 'Issues'
    }, function(err, res) {
      if(err) throw err;
      var checklistId = res.id;
    });
  });
}

github.issues.getAllMilestones({
  user: config.user,
  repo: config.repo,
  state: "open"
}, function(err, res) {
  if(err) throw err;
  res.sort(function(a,b) {
    return b.number - a.number;
  });

  //createUnsortedMilestoneCard(res[0]);
  for(var i = 0; i < res.length; ++i) {
    console.log("#" + res[i].number + " - " + res[i].title);
  }

});

/*
github.events.getFromRepoIssues({
  user: config.user,
  repo: config.repo
}, function(err, res) {
  console.log(res);
});
*/
