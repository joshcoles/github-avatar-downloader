var request = require('request');
var fs = require('fs');

var GITHUB_USER = "joshcoles";
var GITHUB_TOKEN = "5a1b2ef5aa7146b3f8a13beec33b03ad88dc9eeb";
var repoOwnerFromCommandLine = process.argv[2];
var repoNameFromCommandLine = process.argv[3];

console.log("Welcome to Github Avatar Downloader! Your avatars will download shortly!");

//assign user agent header property to bypass 403 error
function github_url (url) {
  return {
    url: url,
    headers: {'User-Agent': 'my-awesome-downloader/1.0'},
    json: true
  };
};

//build api path with user/token and repoOwner/repoName inputs
//make api request and log response(body) using callback
function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoName || !repoOwner) {
    console.log("Whoops, please provide a valid Github Username and Repository.");
    return;
  }
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request(github_url(requestURL), function(err, response, body) {
    if (err) {
     return cb(err);
    }
    console.log("Response status code: " + response.statusCode);
    console.log("Response status message: " + response.statusMessage);
    cb(null, body);
  });
}

//assign examples to repoOwner and repoName
//call downloadImageByURL on each user using their avatar_url and login
getRepoContributors(repoOwnerFromCommandLine, repoNameFromCommandLine, function(err, result) {
  if(err) {
    console.error(err);
    process.exit(1);
  }
  result.forEach(function(user) {
    downloadImageByURL(user.avatar_url, user.login);
  })
});

//on response, print status codes, etc. and pipe photos to ${filePath}, which is named using
//user.login
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    if (err) {
      console.log("There's an error!: " + err);
    }
  })
  .on('response', function (response) {
  })
  .on('end', function() {
    console.log("Avatar downloaded!");
  })
  .pipe(fs.createWriteStream(`./avatars/${filePath}.jpeg`));
}












