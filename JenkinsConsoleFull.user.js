// ==UserScript==
// @name         Jenkins consoleFull Button
// @namespace    http://harleykwyn.com/
// @version      1.0.0
// @description  Add a button to full console output for Jenkins
// @author       Kwyn Meagher
// @include      https://neustar.ci.cloudbees.com/job/*
// @grant        none
// @downloadURL  https://github.com/AK-Scripts/tampermonkey/raw/master/jenkinsConsoleFull.user.js
// ==/UserScript==
jQuery(function() {
  var consoleTask, newTask;
  var tasks = jQuery('#tasks')[0].children;
  
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var title = task.innerText.toLowerCase();
    
    if(title.indexOf('console output') > -1){
      consoleTask = jQuery(task);
      newTask = consoleTask.clone();
      newTask.innerText = "Full Console Output";
      var newTaskLinks = newTask.find('a');
      
      for (var j = 0; j < newTaskLinks.length; j++) {
        var link = newTaskLinks[j]
        var oldHref = link.href;
        var newHref = oldHref+'Full'
        if(link.className === 'task-link'){
          link.innerText ='Full Console Output';
        }
        newTaskLinks[j].href = newHref;
      };  
    }
  };
  consoleTask.after(newTask);
});
