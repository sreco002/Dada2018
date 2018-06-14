/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
console.log("bot.js here");
var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
console.log(config);
var T = new Twit({
consumer_key:         'J5mTvTuBOBvClwvrv5KYf81le',
  consumer_secret:      'KWmEMNv5egVaJ4Y1cqfdzBUNVxxSy5K2Uc1HuEsr86SpupyWVK',
  access_token:         '968579280333656069-yoynNpndpwdADL2yJ75XSzM9IX0qAXT',
  access_token_secret:  'UZArNMnYczRBPZk0Bp8FblnYtgrpthBU8CO7tQRpRXuza'
  //timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.

});
