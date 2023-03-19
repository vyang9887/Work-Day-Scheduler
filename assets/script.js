var setHours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
var planner = JSON.parse(localStorage.getItem("schedule")) || []
var blockBody = document.getElementById('timeBlocks');
var date = moment().format('ddd MMM Do, YYYY');
var confirm = document.querySelector('#saveConfirm');
var counter = 0;
var taskCounter = 0;

//sets empty array to store if localstorage is empty
if (planner.length === 0) { 
    for (let i = 0; i < 10; i++) {
        planner.push({ time: counter, task: "" });
        counter++;
    }
}

// displays the date in the jumbotron
$("#currentDate").text(date);

//updates the time every second
setInterval(realTime, 1000);

// displays the time in the jumbotron
function realTime() {
    var currentTime = moment().format('hh:mm:ss');
    $("#currentTime").text(`Current time ${currentTime}`);
};

//creates rows with time, task and save button for each time
for (var i = 0; i < 10; i++) {
    var stored = localStorage.getItem("workDay");
    var parentBlock = document.createElement('div');
    var timeBlock = document.createElement('div');
    var hour = document.createElement('div');
    var taskBlock = document.createElement('textarea');
    var saveBlock = document.createElement('button');
    parentBlock.classList.add('row');
    timeBlock.classList.add('time', 'col-1');
    taskBlock.classList.add('input', 'col-10', i);
    saveBlock.classList.add('save', 'col-1');
    hour.appendChild(document.createTextNode(setHours[i]));
    taskBlock.value = planner[taskCounter].task;
    taskCounter++;
    //decides bg color of taskBlock based on real time hour
    if (i + 8 < moment().format('HH')) {
        taskBlock.classList.add('past');
    } else if (i + 8  == moment().format('HH')) {
        taskBlock.classList.add('present');
    } else {
        taskBlock.classList.add('future');
    }
    saveBlock.innerHTML = '&#128427';
    timeBlock.appendChild(hour);
    parentBlock.appendChild(timeBlock);
    parentBlock.appendChild(taskBlock);
    parentBlock.appendChild(saveBlock);
    blockBody.appendChild(parentBlock)
    saveBlock.addEventListener('click', saveTask);
};

//saves textarea content to localstorage
function saveTask() { 
    //shows confirmation for save and disappears after 5 seconds
    confirm.classList.remove("hide");
    setTimeout(() =>{
        confirm.classList.add("hide");
    }, 5000)
    var taskBlockNum = parseInt(this.previousElementSibling.classList[2]);
    var saveTaskBlock = {
        time: taskBlockNum,
        task: this.previousElementSibling.value,
    };
    for (let i = 0; i < planner.length; i++) {
        if (planner[i].time == taskBlockNum) {
            planner[i] = saveTaskBlock
        }
    }
    localStorage.setItem("schedule", JSON.stringify(planner))
};