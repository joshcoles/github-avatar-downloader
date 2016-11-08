
var request = require('request');



var GITHUB_USER = "joshcoles";
var GITHUB_TOKEN = "5a1b2ef5aa7146b3f8a13beec33b03ad88dc9eeb";



function github_url (url) {
  return {
    url: url,
    headers: {'User-Agent': 'my-awesome-downloader/1.0'},
    json: true
  };
};


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);


  request(github_url(requestURL), function(err, response, body) {
    if (err) {
     return cb(err);
    } if (response.statusCode !== 200) {
      return cb(new Error(response.body.toString()));                       //vasili???
    }
    console.log('Response Status Code: ' + response.statusCode);
    console.log('Content Type: ' + response.headers['content-type']);
    console.log('Response Status Message: ' + response.statusMessage);
    cb(null, body);
  });
}

getRepoContributors("jensen", "gitfun", function(err, result) {
  if(err) {
    console.error(err);
    process.exit(1);                                                        //vasili???
  }
  console.log("Result:", result);
});









