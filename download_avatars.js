var request = require('request');
var fs = require('fs');


var GITHUB_USER = "joshcoles";
var GITHUB_TOKEN = "5a1b2ef5aa7146b3f8a13beec33b03ad88dc9eeb";


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


//assign examples to repoOwner and repoName
//call downloadImageByURL on each user using their avatar_url and login
getRepoContributors("jensen", "gitfun", function(err, result) {
  if(err) {
    console.error(err);
    process.exit(1);                                                        //vasili???
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
      console.log("There's an error!: " + err)
    }
  })
  .on('response', function (response) {
    console.log("Response status code is: " + response.statusCode);
    console.log("Response message is: " + response.statusMessage);
    console.log("Content Type is: " + response.headers['content-type']);
    console.log("Content downloading...")
  })
  .pipe(fs.createWriteStream(`./avatars/${filePath}.jpeg`));
}












