// ==UserScript==
// @name         Warcraft CI
// @namespace    http://your.homepage/
// @version      1.1
// @description  enter something useful
// @author       Kwyn Meagher
// @include      https://gerrit.nexgen.neustar.biz/*
// @grant        none
// ==/UserScript==

// HACK: SPA adds things after document load. 
// Might have to be increased on slower computers.
var timeout = 1500;

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
    name: 'Code Review',
    url: 'http://www.thanatosrealms.com/war2/sounds/humans/knight/acknowledge4.wav',
    search: 'Code-Review'
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
  // reduce to find which index is greatest

  var htmlText = document.documentElement.innerHTML;
  var firstPatch = htmlText.indexOf('Uploaded patch set 1');

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
  }, { htmlIndex: -1, url: ''});
}

var playUrl = function (url) {
  var audio = document.createElement('audio');
  audio.src = url;
  audio.play();
}


var lookForUpdate = function(){
  var urlMatch = window.location.href.toString().match(/\/\d+?\/?\d+$/);
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

