//fetching data
const data = fetch('./data.json')
	.then((response) => response.json())
	.then((json) => { return json });

//id variable is used as a pointer to iterate through idArray
let id = 0;

//idArray array variable is used to store the id of all the reume objects and when searched for a job idArray includes only the ids of objects that have the same job
let idArray = [];

// identifiers
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const searchBox = document.getElementById("search-box");

//search functinality
searchBox.addEventListener("keypress", intermideateResponse);

//next fnctonality
nextButton.addEventListener('click', getNextResume);

//previous functionality
previousButton.addEventListener('click', getPreviousResume);

start();

function start() {
	data.then(function (result) {
		let objArray = result.resume;
		for (const element in objArray) {
			idArray.push(objArray[element].id - 1);
		}
		writeDataIntoIndexhtml(idArray[0]);
		hidePreviousButton();
	});
}

// button functions
function hideNextButton() {
	nextButton.style.display = "none";
}

function hidePreviousButton() {
	previousButton.style.display = "none";
	searchBox.style.marginLeft = "35%";
}

function showNextButton() {
	nextButton.style.display = "block";
}

function showPreviousButtton() {
	previousButton.style.display = "block";
	searchBox.style.marginLeft = "2%";
}

function getPreviousResume() {
	id--;
	writeDataIntoIndexhtml(idArray[id]);
	if (id == 0) hidePreviousButton();
	if (id < (idArray.length - 1)) showNextButton();
}

function getNextResume() {
	id++;
	writeDataIntoIndexhtml(idArray[id]);
	if (id == (idArray.length - 1)) hideNextButton();
	if (id > 0) showPreviousButtton();
}

//the data promise is resolved so we can use "then" method/function ? on it to manipulate data
function resetId() {
	console.log("reset id start");
	id = 0;
	console.log("reset id stop");
}

function resetIdArray() {
	console.log("reset idArray start")
	data.then(function (result) {
		let objArray = result.resume;
		idArray.length = 0;
		for (const element in objArray) {
			idArray.push(objArray[element].id - 1);
		}
		//console.log("idArray reseted");
		//console.log("this is idArray[0]: "+ idArray[0]);
	});
	console.log("reset idArray stop");
};

function hideResumeTemplate() {
	document.getElementById('resume-template').style.display = "none";
};

function showResumeTemplate() {
	document.getElementById('resume-template').style.display = "block";
}

function hideErrorMessage() {
	document.getElementById('error-container').style.display = "none";
}

function showErrorMessage() {
	document.getElementById('error-container').style.display = "block";
}

function intermideateResponse(e) {
	if (e.keyCode === 13) {
		inputResponse(searchBox.value);
	}
}

function inputResponse(e) {
	//console.log(e);
	//console.log(searchBox.value)
	if (searchBox.value == "") {
		hidePreviousButton();
		hideErrorMessage();
		showResumeTemplate();
		showNextButton();
		resetId();
		resetIdArray();
		writeDataIntoIndexhtml(id);
	}
	else {
		let input = searchBox.value;
		data.then(function (result) {
			let objArray = result.resume;
			idArray.length = 0;
			for (const element in objArray) {
				if (objArray[element].basics.AppliedFor.toLowerCase() === input.toLowerCase()) {
					idArray.push(objArray[element].id - 1);
				}
			}

			if (idArray.length == 0) {
				hideResumeTemplate();
				showErrorMessage();
				hideNextButton();
				hidePreviousButton();
			}
			else {
				console.log(idArray.length == 1)
				if (idArray.length == 1) {
					//hideErrorMessage();
					hideNextButton();
					hidePreviousButton();
					resetId();
					writeDataIntoIndexhtml(idArray[id]);
				}
				else {
					resetId();
					hideErrorMessage();
					writeDataIntoIndexhtml(idArray[id]);
					showNextButton();
				}
			}

		})
	}
};

function writeDataIntoIndexhtml(id) {
	console.log("upload started");
	data.then(function (result) {
		const objArray = result.resume;
		const obj = objArray[id];

		document.getElementById("name").innerText = obj.basics.name;
		document.getElementById("postion").innerText = obj.basics.AppliedFor;
		document.getElementById("phone-number").innerText = obj.basics.phone;
		document.getElementById("gmail").innerText = obj.basics.email;
		document.getElementById("linkedin").innerText = obj.basics.profiles.url;

		// Inserting technical skills array
		let skillsArray = obj.skills.keywords;
		let str = skillsArray.join('<br>');
		let templateString = `<p>  ${str} </p>`;
		document.getElementById("skills").innerHTML = templateString;

		// Now inserting hobbies the same way
		let hobbiesArray = obj.interests.hobbies;
		let hobbiesString = hobbiesArray.join('<br>');
		let hobbiesInnerHtml = `<p> ${hobbiesString} </p>`
		document.getElementById("hobbies").innerHTML = hobbiesInnerHtml;

		// Starting to fill part-2
		document.getElementById("company-name").innerText = obj.work["Company Name"];
		document.getElementById("position").innerText = obj.work.Position;
		document.getElementById("start-date").innerText = obj.work["Start Date"];
		document.getElementById("end-date").innerText = obj.work["End Date"];
		document.getElementById("summary").innerText = obj.work.Summary;

		// Filling Projects
		document.getElementById("project-name").innerText = obj.projects.name;
		document.getElementById("project-description").innerText = obj.projects.description;

		// Education
		let ugObject = obj.education.UG;
		let ugArray = Object.values(ugObject);
		let stringOfUgArray = ugArray.join(', ');
		document.getElementById("UG").innerText = stringOfUgArray;

		let ssObject = obj.education["Senior Secondary"];
		let ssArray = Object.values(ssObject);
		let stringOfSsArray = ssArray.join(', ');
		document.getElementById("SS").innerText = stringOfSsArray;

		let highSchoolObject = obj.education["High School"];
		let highSchoolArray = Object.values(highSchoolObject);
		let stringOfHighSchoolArray = highSchoolArray.join(', ');
		document.getElementById("HS").innerText = stringOfHighSchoolArray;

		document.getElementById("internship-company-name").innerText = obj.Internship["Company Name"];
		document.getElementById("internship-position").innerText = obj.Internship["Position"];
		document.getElementById("internship-start-date").innerText = obj.Internship["Start Date"];
		document.getElementById("internship-end-date").innerText = obj.Internship["End Date"];
		document.getElementById("internship-summary").innerText = obj.Internship["Summary"];

		// Achievements
		document.getElementById("achievement-summary").innerText = obj.achievements.Summary;

		console.log("upload finished");
	});
};