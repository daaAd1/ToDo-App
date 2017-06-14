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
		todoList.addTask(addTaskText.value);
		addTaskText.value = '';
		view.displayTasks();
	},


	changeTask: function(index) {

		var taskLi = document.getElementById(index);
		var taskLabel = taskLi.getElementsByTagName('label')[0];
		var taskInput = document.createElement('input');

		taskInput.text = taskLabel;
		taskLabel.className += " edit";
		taskInput.type = "text";
		taskLi.appendChild(taskInput);
		taskInput.focus();	

		taskInput.onkeydown = function() {
			if (event.keyCode === 13) {
				taskLi.removeChild(taskInput);
	        	taskLabel.innerHTML = taskInput.value;
	        	taskLabel.classList.remove("edit");
			}	
		};

		taskInput.onblur = function() {

	        taskLi.removeChild(taskInput);
	        taskLabel.innerHTML = taskInput.value;
	        taskLabel.classList.remove("edit");   
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

			taskLabel.textContent = task.text;
			taskLabel.className = "label-text";
			taskInput.className = "toggle";
			taskInput.type = "checkbox";
			taskLi.className = " ";	
			taskInput.checked = false;

			if (task.done) {
				taskLi.className = "completed";
				taskInput.checked = true;
			}			

			taskLi.id = index;
			taskLi.appendChild(taskInput);
			taskLi.appendChild(taskLabel);
			taskLi.appendChild(view.deleteButton());
			taskOl.appendChild(taskLi);
		});		
	},


	deleteButton: function() {

		var button = document.createElement('button');
		button.textContent = 'Delete';
		button.className = 'del-btn';
		
		return button;
	},

	eventListeners: function() {

		var taskOl = document.querySelector('ol');
		taskOl.addEventListener('click', function(event) {
			var elementClicked = event.target;
			if (elementClicked.className === 'del-btn') {
				handlers.deleteTask(parseInt(elementClicked.parentNode.id));
			}
			else if (elementClicked.className === 'toggle') {
				handlers.toggleTask(parseInt(elementClicked.parentNode.id));
			}
		});


		taskOl.addEventListener('dblclick', function(event) {
			var elementClicked = event.target;
			if (elementClicked.className === 'label-text' 
				&& todoList.todoArr[elementClicked.parentNode.id].done === false) {
				handlers.changeTask(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

view.eventListeners();
