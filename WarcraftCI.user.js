// ==UserScript==
// @name         Warcraft CI
// @namespace    http://your.homepage/
// @version      1.2.1
// @description  enter something useful
// @author       Kwyn Meagher
// @include      https://gerrit.nexgen.neustar.biz/*
// @grant        none
// ==/UserScript==

// HACK: SPA adds things after document load. 
// Might have to be increased on slower computers.
var timeout = 1750;

/* TODO:  updates on your own tickets, and on your pair partners, 
so it would be good to have a "user" list for checking what reviews to trigger notifications on.
I believe the page contains a single link for the author with 'title="user@neustar.biz"
so you could have the page check for that string...
*/

var options = {
  mergeNotification: false
};

var audioMap = [
  {
    name: 'Build Success',
    url:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/work-complete.wav',
    search: 'SUCCESS'
  },
  {
    name: 'Build Failure',
    url: 'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/help2.wav',
    search: 'FAILURE'
  },
  {
    name: 'Build Started',
    url: 'http://www.thanatosrealms.com/war2/sounds/orcs/peon/ready.wav',
    search: 'Build Started'
  },
  {
    name: 'Uploaded Patch',
    url: 'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/acknowledge1.wav',
    search: 'Uploaded patch set'
  },
  {
    name: 'Comment',
    url: 'http://www.thanatosrealms.com/war2/sounds/humans/elven-archer/annoyed1.wav',
    search: 'comment'
  },
  {
    name: 'Code Review +1',
    url: 'http://www.thanatosrealms.com/war2/sounds/humans/knight/acknowledge4.wav',
    search: 'Code-Review+1'
  },
  {
    name: 'Code Review -1',
    url: 'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/annoyed5.wav',
    search: 'Code-Review-1'
  }
];


var setNewMessageObserver = function() {
  var config = { subtree: true, childList: true };
  var observer = new MutationObserver(function(mutations){
    document.location.reload();
  });
  // Yellow notification is added to the last screen element when comments are submitted
  var watchElement = document.getElementsByClassName("screen")[0].lastChild;
  observer.observe(watchElement, config);
}

var findLatestEvent = function() {
  var emptyDefault = { htmlIndex: -1, url: ''};
  // reduce to find which index is greatest
  var htmlText = document.documentElement.innerHTML;
  var firstPatch = htmlText.lastIndexOf('Uploaded patch set 1');
  var merged = htmlText.lastIndexOf('succesfully merged') || -1;
  console.log(firstPatch, merged);
  if(!options.mergeNotification && merged > -1){
    console.log('merged')
    return [emptyDefault];
  }

  return audioMap.reduce(function(latest, item, audioMapIndex){
    var lastOccurance = htmlText.lastIndexOf(item.search);
    if(lastOccurance > latest.htmlIndex && lastOccurance >= firstPatch){
      return {
        htmlIndex: lastOccurance,
        url: item.url
      };
    } else {
      return latest;
    }
  }, emptyDefault);
}

var playUrl = function (url) {
  var audio = document.createElement('audio');
  audio.src = url;
  audio.play();
}


var lookForUpdate = function(){
  var urlMatch = window.location.href.toString().match(/\/\d+\/?\d+\/?$/);
  console.log(urlMatch);
  if (urlMatch && urlMatch.length === 1) {
    setTimeout(function(event){
      setNewMessageObserver();
      var latestEvent = findLatestEvent();
      playUrl(latestEvent.url);
    }, timeout);
  }
}

lookForUpdate();
window.addEventListener("hashchange", lookForUpdate);

