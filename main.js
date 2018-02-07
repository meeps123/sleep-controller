console.log("started");

var alarmName = "sleepControllerAlarm";

chrome.alarms.create(alarmName, {delayInMinutes: 0.01, periodInMinutes: 0.01});

chrome.alarms.onAlarm.addListener(function(alarm) {
	var d = new Date(),
		hour = d.getHours(),
		minute = d.getMinutes(),
		second = d.getSeconds();

	var score = hour*3600 + minute*60 + second;

	// min score: 00:00:00 = 0
	// max score: 23:59:59 = 86399

	var lateLimit = 86399, earlyLimit = 21600;

	var isSnooze = "DNS", snoozeCounter = 0;
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("lateLimit") != null) lateLimit = localStorage.getItem("lateLimit");
		if (localStorage.getItem("earlyLimit") != null) earlyLimit = localStorage.getItem("earlyLimit");
		if (sessionStorage.getItem("isSnooze") != null) isSnooze = sessionStorage.getItem("isSnooze");
		if (localStorage.getItem("snoozeCounter") != null) snoozeCounter = localStorage.getItem("snoozeCounter");
	}

	if (score == 0) {
		isSnooze = "DNS";
	}

	console.log(isSnooze);

	if (score > lateLimit) {
		if (isSnooze == "DNS") {
			if (confirm("Do you want to snooze this round?")) {
				isSnooze = "TRUE";
				snoozeCounter++;
			} else isSnooze = "FALSE";
		}
		if (isSnooze == "FALSE") {
			alert("You are too late; go to sleep!");
			chrome.windows.getCurrent(function(win) {
			    chrome.tabs.getAllInWindow(win.id, function(tabs) {
			        for (i = 0; i < tabs.length; i++) {
			        	chrome.tabs.remove(tabs[i].id, function(){});
			        }
			    });
			});
		}
	} else if (score < earlyLimit) {
		if (isSnooze == "DNS") {
			if (confirm("Do you want to snooze this round?")) {
				isSnooze = "TRUE";
				snoozeCounter++;
			} else isSnooze = "FALSE";
		}

		if (isSnooze == "FALSE") {
			alert("You are too late; go to sleep!");
			chrome.windows.getCurrent(function(win) {
			    chrome.tabs.getAllInWindow(win.id, function(tabs) {
			        for (i = 0; i < tabs.length; i++) {
			        	chrome.tabs.remove(tabs[i].id, function(){});
			        }
			    });
			});
		}
	}
	console.log("Time: " + hour.toString() + ":" + minute.toString() + ":" + second.toString() + ", score = " + score.toString() + ", limits = [" + earlyLimit + " - " + lateLimit + "]");

	sessionStorage.setItem("isSnooze", isSnooze);
	localStorage.setItem("snoozeCounter", snoozeCounter);
});

