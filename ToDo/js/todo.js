
var todoList = {

	todoArr: [],


	addTask: function(task) {

		this.todoArr.push({
			text: task,
			done: false
		});
	},

	changeTaskText: function(index, text) {

		this.todoArr[index].text = text;
	},

	removeTask: function(index) {

		this.todoArr.splice(index, 1);
	},


	toggleTask: function(index) {

		this.todoArr[index].done = !this.todoArr[index].done;
	},


	checkAllDone: function() {

		var numberOfDone = 0;
		this.todoArr.forEach( function(task) {
			if (task.done) {
				numberOfDone++;
			}
		});

		return numberOfDone;
	},


	completeAllTasks: function() {
		var totalTasks = this.todoArr.length;
		var allTasks = this.checkAllDone();
		this.todoArr.forEach( function(task) {
			if (totalTasks === allTasks) {
				task.done = false;
			}
			else {
				task.done = true;
			}
		});
	}

};		


var handlers = {

	addTask: function() {

		var addTaskText = document.getElementById('addTask');
		if (addTaskText.value !== "") {
			todoList.addTask(addTaskText.value);	
		}
		addTaskText.value = '';
		view.displayTasks();
	},


	changeTask: function(index) {

		var taskLi = document.getElementById(index);
		var taskLabel = taskLi.getElementsByTagName('label')[1];
		var taskInput = document.createElement('input');
		var taskOl = document.querySelector('ol');
		console.log(taskLabel);
		taskInput.value = taskLabel.innerHTML;
		taskInput.type = "text";
		taskLi.classList.add('edit');
		taskLi.appendChild(taskInput);
		taskInput.className = "editingInput";
		taskInput.focus();	

		taskInput.onkeydown = function() {

			if (event.keyCode === 13) {
				
				if (taskInput.value !== null) {
					taskLabel.innerHTML = taskInput.value;
					todoList.todoArr[index].text = taskInput.value;
				}
				else {		
					taskOl.removeChild(taskLi);
				}
				taskLi.classList.remove("edit");
				taskLi.removeChild(taskInput);
			}	
		};

		taskInput.onblur = function() {

	        
	        if (taskInput.value !== "") {
				taskLabel.innerHTML = taskInput.value;
				todoList.todoArr[index].text = taskInput.value;
			}
			else {	
				taskOl.removeChild(taskLi);
				todoList.removeTask(index);
				view.displayTasks();
			}
			taskLi.removeChild(taskInput);    

			taskLi.classList.remove("edit");
	    };

	    
	},


	deleteTask: function(index) {

		todoList.removeTask(index);
		view.displayTasks();
	},


	toggleTask: function(index) {
		todoList.toggleTask(index);
		view.displayTasks();
	},


	toggleAll: function() {

		todoList.completeAllTasks();
		view.displayTasks();
	}
};


var view = {

	displayTasks: function() {

		var taskOl = document.querySelector('ol');
		taskOl.textContent = '';
		todoList.todoArr.forEach( function(task, index) {
			var taskLi = document.createElement('li');
			var taskInput = document.createElement('input');
			var taskLabel = document.createElement('label');
			var taskSpan = document.createElement('span');
			var checkLabel = document.createElement('label');
			var checkDiv = document.createElement('div');

			checkLabel.className = "switch";
			checkDiv.className = "slider round";
			
			taskSpan.className = "addon";
			taskLabel.textContent = task.text;
			taskLabel.className = "label-text";
			taskInput.className = "toggle smooth";
			taskInput.type = "checkbox";
			taskLi.className = "li";	
			taskInput.checked = false;
			taskSpan.appendChild(taskInput);

			if (task.done) {
				taskLi.className = "completed";
				taskInput.checked = true;
				taskLabel.setAttribute("style", "text-decoration: line-through");
			}			

			taskLi.id = index;
			checkLabel.appendChild(taskInput);
			checkLabel.appendChild(checkDiv);
			taskLi.appendChild(checkLabel);
			taskLi.appendChild(taskSpan);
			taskLi.appendChild(taskLabel);
			taskLi.appendChild(view.deleteButton());
			taskOl.appendChild(taskLi);
		});		
	},


	deleteButton: function() {

		var button = document.createElement('button');
		button.textContent = 'Delete';
		button.className = 'del-btn btn btn-b smooth';
		
		return button;
	},

	eventListeners: function() {

		var taskOl = document.querySelector('ol');
		var taskInput = document.getElementById('addTask');

		taskOl.addEventListener('click', function(event) {

			var elementClicked = event.target;
			if (elementClicked.className === 'del-btn btn btn-b smooth') {
				handlers.deleteTask(parseInt(elementClicked.parentNode.id));
			}
			else if (elementClicked.className === 'toggle smooth') {
				handlers.toggleTask(parseInt(elementClicked.parentNode.parentNode.id));
			}
		});


		taskOl.addEventListener('dblclick', function(event) {

			var elementClicked = event.target;
			if (elementClicked.className === 'label-text' 
				&& todoList.todoArr[elementClicked.parentNode.id].done === false) {
				handlers.changeTask(parseInt(elementClicked.parentNode.id));
			}
		});


		taskInput.addEventListener('keypress', function(event) {

			var elementClicked = event.target;
			if (event.keyCode === 13) {
				handlers.addTask(elementClicked.value);
			}
		});

	}
};

view.eventListeners();
