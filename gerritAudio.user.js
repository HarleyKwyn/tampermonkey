// ==UserScript==
// @name         Gerrit Audio Notifications
// @namespace    http://harleykwyn.com/
// @version      1.4.3
// @description  Audio Notifications for Gerrit
// @author       Kwyn Meagher
// @include      https://gerrit.nexgen.neustar.biz/*
// @grant        none
// @downloadURL  https://github.com/AK-Scripts/tampermonkey/raw/master/gerritAudio.user.js
// ==/UserScript==

var tf2SoundMap = {
    success:'http://cdn.frustra.org/sounds/sound_tf2/vo/heavy_thanksfortheteleporter03.ogg',
    failure:'http://cdn.frustra.org/sounds/sound_tf2/vo/demoman_specialcompleted11.ogg',
    buildStarted:'http://cdn.frustra.org/sounds/sound_tf2/vo/engineer_autobuildingsentry02.ogg',
    uploadedPatch:'http://cdn.frustra.org/sounds/sound_tf2/vo/SandwichEat09.ogg',
    comment:'http://cdn.frustra.org/sounds/sound_tf2/vo/scout_stunballhit14.ogg',
    plusOne:'http://cdn.frustra.org/sounds/sound_tf2/vo/heavy_goodjob01.ogg',
    minusOne:'http://cdn.frustra.org/sounds/sound_tf2/vo/heavy_negativevocalization04.ogg',
    minusTwo:'http://cdn.frustra.org/sounds/sound_tf2/vo/heavy_negativevocalization06.ogg'
};

var warcraftSoundMap = {
    success:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/work-complete.wav',
    failure:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/help2.wav',
    buildStarted:'http://www.thanatosrealms.com/war2/sounds/orcs/peon/ready.wav',
    uploadedPatch:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/acknowledge1.wav',
    comment:'http://www.thanatosrealms.com/war2/sounds/humans/elven-archer/annoyed1.wav',
    plusOne:'http://www.thanatosrealms.com/war2/sounds/humans/knight/acknowledge4.wav',
    minusOne:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/annoyed5.wav',
    minusTwo:'http://www.thanatosrealms.com/war2/sounds/humans/dwarven-demolition-squad/annoyed1.wav'
};

// ...( or add your own custom soundmap here... )
var customSoundMapTemplate = {
    success:'',
    failure:'',
    buildStarted:'',
    uploadedPatch:'',
    comment:'',
    plusOne:'',
    minusOne:'',
    minusTwo:''
};
var settings, audioMap;
// Settings, merge notifications and soundmap
var defaultSettings = {
  soundMap: warcraftSoundMap,
  // HACK: SPA adds things after document load. 
  // Might have to be increased on slower computers.
  timeout:1750,
  // Or place star if you want notifications for any open gerrit
  // Note: capitilzation matters
  watchedAuthors: '*',
  mergeNotification: false,
  openJenkinsBuilds: false
};

var authorNodeContains = function (arr) {
    var authorHit = 0;
    for(var c=0,len=arr.length;c<len;c++){
      // TODO: Perhaps use the getElementById using change_infoTable
      authorHit += document.querySelectorAll('a[title="'+arr[c]+'"]').length;  
    }
    return authorHit;
};

var setNewMessageObserver = function () {
  var config = { subtree: true, childList: true };
  var observer = new MutationObserver(function(mutations){
    for(var j = 0; j < mutations.length; j++){
      var mutation = mutations[j];
      if(mutation.addedNodes.length){
        for(var i = 0; i < mutation.addedNodes.length; i++){
          if(mutation.addedNodes[i].innerHTML.indexOf('UpdateAvailableBar') > -1){
            document.location.reload();
          }
        }
      }
    }
  });
  // Yellow notification is added to the last screen element when comments are submitted
  var watchElement = document.getElementsByClassName("screen")[0].lastChild;
  observer.observe(watchElement, config);
};

var findLatestEvent = function () {
  var emptyDefault = { htmlIndex: -1, url: ''};
  // reduce to find which index is greatest
  var htmlText = document.documentElement.innerHTML;
  var firstPatch = htmlText.lastIndexOf('Uploaded patch set 1');
  var merged = htmlText.lastIndexOf('succesfully merged') || -1;
  if(!settings.mergeNotification && merged > -1){
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
};

var playUrl = function (url) {
  var audio = document.createElement('audio');
  audio.src = url;
  audio.play();
};

var lookForUpdate = function (event) {
  var urlMatch = window.location.href.toString().match(/\/\d+\/?\d+\/?$/);
  if (urlMatch && urlMatch.length === 1) {
    setTimeout(function(event){
      if(settings.watchedAuthors === '*' || authorNodeContains(settings.watchedAuthors)){
        setNewMessageObserver();
        var latestEvent = findLatestEvent();
        playUrl(latestEvent.url);
      }
    }, settings.timeout);
  }
};

var initializeScript = function () {
  settings = localStorage.getItem("gerritAudioSettings");
  if(!settings){
    settings = defaultSettings;
    console.log("Using Defailt settings. Run Bookmarklet to set custom settings");
  } else {
    settings = JSON.parse(settings);
  }
  audioMap = [
    {
      name: 'Build Success',
      url:settings.soundMap.success,
      search: 'SUCCESS'
    },
    {
      name: 'Build Failure',
      url: settings.soundMap.failure,
      search: 'FAILURE'
    },
    {
      name: 'Build Started', 
      url: settings.soundMap.buildStarted,
      search: 'Build Started'
    },
    {
      name: 'Uploaded Patch',
      url: settings.soundMap.uploadedPatch,
      search: 'Uploaded patch set'
    },
    {
      name: 'Comment',
      url: settings.soundMap.comment,
      search: 'comment'
    },
    {
      name: 'Code Review +1',
        url: settings.soundMap.plusOne,
      search: 'Code-Review+1'
    },
    {
      name: 'Code Review -1',
      url: settings.soundMap.minusOne,
      search: 'Code-Review-1'
    },
    {
      name: 'Code Review -2',
      url: settings.soundMap.minusTwo,
      search: 'Code-Review-2'
    }
  ];
};

initializeScript();
lookForUpdate();
window.addEventListener("hashchange", lookForUpdate);
