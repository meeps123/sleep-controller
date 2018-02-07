document.getElementById("earlyLimitBtn").addEventListener("click", function() {
	setLimit(document.getElementById("earlyLimitInput"), 0);
});
document.getElementById("lateLimitBtn").addEventListener("click", function() {
	setLimit(document.getElementById("lateLimitInput"), 1);
});

if (typeof(Storage) !== "undefined") {
	document.getElementById("snoozeCounterElem").innerHTML = localStorage.getItem("snoozeCounter");
}


function setLimit(input, mode) {
	var value = input.value;
	var timing = value.split(":"), powers = [3600, 60];
	var resultantScore = 0;
	for (i = 0; i < timing.length; i++) {
		resultantScore += powers[i] * parseInt(timing[i]);
	}
	if (mode == 1) {
		// late limit
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("lateLimit", resultantScore);
		}
		alert("late limit score: " + resultantScore); 
	} else {
		// early limit
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("earlyLimit", resultantScore);
		}
		alert("early limit score: " + resultantScore);
	}
}