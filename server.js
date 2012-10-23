var GitHubApi = require("github");
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
  /*
  var milestones = res.map(function(el) {
    return {
      number: el.number,
      title: el.title,
      created: el.created_at
    };
  });
  console.log(milestones);
  */
  var latestMilestone = res[0];

});

/*
github.events.getFromRepoIssues({
  user: config.user,
  repo: config.repo
}, function(err, res) {
  console.log(res);
});
*/
