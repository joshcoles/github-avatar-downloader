
var request = require('request');



var GITHUB_USER = "joshcoles";
var GITHUB_TOKEN = "5a1b2ef5aa7146b3f8a13beec33b03ad88dc9eeb";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL)
}



getRepoContributors("jensen", "gitfun", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
















