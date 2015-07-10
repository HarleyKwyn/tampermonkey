  // HACK: SPA adds things after document load. 
  // Might have to be increased on slower computers.
  // Or place star if you want notifications for any open gerrit
  // Note: capitilzation matters
var soundMap = {
  success:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/work-complete.wav',
  failure:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/help2.wav',
  buildStarted:'http://www.thanatosrealms.com/war2/sounds/orcs/peon/ready.wav',
  uploadedPatch:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/acknowledge1.wav',
  comment:'http://www.thanatosrealms.com/war2/sounds/humans/elven-archer/annoyed1.wav',
  plusOne:'http://www.thanatosrealms.com/war2/sounds/humans/knight/acknowledge4.wav',
  minusOne:'http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/annoyed5.wav',
  minusTwo:'http://www.thanatosrealms.com/war2/sounds/humans/dwarven-demolition-squad/annoyed1.wav'
};
localStorage.setItem("gerritAudioSettings", {
  soundMap: soundMap,
  timeout:1750,
  watchedAuthors: ["Kwyn.Meaher@neustar.biz","Emma.Tang@neustar.biz","Shinsaku.Uesugi@neustar.biz", "Wei.Huang@neustar.biz"],
  mergeNotification: false,
  openJenkinsBuilds: false
});