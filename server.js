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

github.issues.getAllMilestones({
  user: config.user,
  repo: config.repo,
  state: "open"
}, function(err, res) {
  if(err) throw err;
  res.sort(function(a,b) {
    return b.number - a.number;
  });

  var latestMilestone = res[0];
  var description = latestMilestone.url + '\n\n' + latestMilestone.description;
  trello.post("/1/cards", {
    name: latestMilestone.title,
    desc: description,
    idList:"5086f355c87793ab57000a86"
  }, function(err, res) {
    if(err) throw(err);
    var id = res.id;
    trello.post("/1/cards/" + id + "/checklists/", {
      name: 'testlist'
    }, function(err, res) {
      if(err) throw err;
      var checklistId = res.id;

    });
  });
});

/*
github.events.getFromRepoIssues({
  user: config.user,
  repo: config.repo
}, function(err, res) {
  console.log(res);
});
*/
