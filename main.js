console.log("started");

var alarmName = "sleepControllerAlarm";

chrome.alarms.create(alarmName, {delayInMinutes: 0.01, periodInMinutes: 0.01});

chrome.alarms.onAlarm.addListener(function(alarm) {
	var d = new Date(),
		hour = d.getHours(),
		minute = d.getMinutes(),
		second = d.getSeconds();

	if (hour == 23) {
		alert("YOU IS LATE. GUDBAI");
		chrome.windows.getCurrent(function(win) {
		    chrome.tabs.getAllInWindow(win.id, function(tabs) {
		        for (i = 0; i < tabs.length; i++) {
		        	chrome.tabs.remove(tabs[i].id, function(){});
		        }
		    });
		});
	} else if (hour < 6) {
		alert("YOU IS TOO EARLEE. GO TO SHLEP");
		chrome.windows.getCurrent(function(win) {
		    chrome.tabs.getAllInWindow(win.id, function(tabs) {
		        for (i = 0; i < tabs.length; i++) {
		        	chrome.tabs.remove(tabs[i].id, function(){});
		        }
		    });
		});
	} else {
		console.log("Goodies!!!");
	}
});

