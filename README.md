# tampermonkey
## Usage

### gerritAudio.user.js
This is used for generating audio notifications on the gerrit page.

Settings are set with the gerritAudioSettings.bookmark.js
Default settings are warcraft sound maps and notifications for all open gerrit pages

### gerritAudioSettings.bookmark.js

This is used for injecting custom settings. I sugges to name this bookmark as Set Gerrit Audio Settings.

1. Change settings to your hearts delight in gerritAudioSettings.bookmark.js
- Go to this [link](http://wundes.com/bookmarklets.html)
- "John's NEw and Improbed Bookmarklets Editor"
- Copy paste the body of gerritAudioSettings.bookmark.js into the popup window
- click compress
- copy past compressed snippet into a new book mark named Set Gerrit Audio Settings
- Click on the bookmark

You're all set!
*Note* You may have to run this occasionally if you settings aren't holding. localStorage is cleared periodically by the browser.

```
// DO NOT COPY WITH COMMENTS. IT WILL BREAK.
// Use the gerritAudioSettings.bookmarklet.js file directly instead.

// publicly hosted audio files to map to different events
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
  // Hack for single page webapps since the dom has to settle first.
  // Might need ot be increased for slower connections and computers
  timeout:1750,
  // Authors to watch. Use the e-mails they use for gerrit
  // CASE SENSITIVE!!!
  watchedAuthors: ["Kwyn.Meaher@neustar.biz","Emma.Tang@neustar.biz","Shinsaku.Uesugi@neustar.biz", "Wei.Huang@neustar.biz"],
  // Notifications for merged commits
  mergeNotification: false,
  // Not implimented yet.
  // Will open the most recent build file in new tab
  openJenkinsBuilds: false
});
```
## Updates

Be sure to allow updates in tampermonkey/greasemonkey settings.
TODO: Insert images here

## Contributing

When you make a change/pull request please incriment the version number. 