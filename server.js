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
  state: "open",
  sort: "completeness"
}, function(err, res) {
  if(err) throw err;
  console.log(res);
});
