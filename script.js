
var objectsArrayBackup = localStorage.getItem('notes');
if (objectsArrayBackup) {
	var notes = JSON.parse(objectsArrayBackup);
} else {
	var notes = [
	{
		noteText: 'do nothing',
		date: "2018-05-05",
		time: "17:15"
	}, 
	{
		noteText: 'Study, study and again study!',
		date: "2017-07-02",
		time: "03:21"
	}	

	];
}

var parent = document.createElement('div'); 
document.body.append(parent);
parent.id = "notes-perent";

function createNote (oneNote) {

	var child = document.createElement('div');
	child.classList.add("one-note");
	parent.appendChild(child);

	var spanElementClose = document.createElement('span');
	spanElementClose.classList.add("close-note");
	spanElementClose.textContent = "✖";
	spanElementClose.addEventListener ("click", deleteNote);
	child.appendChild(spanElementClose);


	var noteContent = document.createElement('p');
	noteContent.classList.add("content");
	noteContent.textContent = oneNote.noteText;
	child.appendChild(noteContent);

	var spanElementDate = document.createElement('span');
	spanElementDate.classList.add("date-input");
	var splitDate = oneNote.date.split("-");
	spanElementDate.textContent = splitDate[2] + "/" + splitDate[1] + "/" +splitDate[0];
	child.appendChild(spanElementDate);


	var spanElementTime = document.createElement('span');  
	spanElementTime.classList.add("time-input");
	spanElementTime.textContent = oneNote.time;
	child.appendChild(spanElementTime);
}

function deleteNote (event) {
	var singleCreatedNote = event.target.parentNode;
	var allCreatedNotes = document.querySelectorAll(".one-note")
	var i = Array.from(allCreatedNotes).indexOf(singleCreatedNote);
	notes.splice(i, 1);
	singleCreatedNote.remove(); 
	updateBackup(notes);
}


for (var i = 0; i < notes.length; i++) {
	createNote(notes[i]);
}

document.querySelector("form").addEventListener ("submit", function (event){
	event.preventDefault(); 
	var textArea = document.querySelector("[name=inputText]");
	var dateAndTime = document.querySelector("[name=dateTime]").value;

	var getHourMinutes = dateAndTime.slice(11, 16);
	var getDate = dateAndTime.slice(0, 10);

	var newNoteObject = {
		noteText: textArea.value,
		date:getDate,
		time: getHourMinutes,
	}

	if (!FutureCheck(dateAndTime)) {
		document.querySelector("[name=dateTime]").style.color = "red";
	} else {
		document.querySelector("[name=dateTime]").style.color = "black";
		createNote(newNoteObject);
		notes.push(newNoteObject);
		updateBackup(notes);
		document.querySelector("form").reset(); 
	}

})

function updateBackup (array) {
	localStorage.setItem('notes', JSON.stringify(array));
}


function FutureCheck (specificDateValue) {
	var selectedDate = new Date(specificDateValue);
		var now = new Date();
	if (selectedDate.getTime() > now.getTime()) {
		return true;
	} else {
		return false;
	}
}
