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


	changeTask: function() {

		//var taskPosition = document.getElementById('changeTaskPosition');
		//var taskText = document.getElementById('changeTaskText');
		//todoList.changeTaskText(taskPosition.valueAsNumber, taskText.value);
		//taskPosition.value = '';
		//taskText.value = '';
		var taskInput = document.createElement('input');
		taskInput.type = "text";
		var taskOl = document.querySelector('ol');
		taskOl.appendChild(taskInput);
		taskInput.textContent = "abc";
		view.displayTasks();
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
			taskInput.className = "toggle";
			taskInput.type = "checkbox";
			taskLi.className = " ";	
			taskInput.checked = false;
			taskLabel.setAttribute('ondblclick', "handlers.changeTask()");

			if (task.done) {
				taskLi.className = "completed";
				taskInput.checked = true;
				//taskLi.textContent = "   " +  "(x) " + task.text + " " ;
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
		//var elementClicked = event.target;
		//var taskInput = document.querySelector('input');
		//todoList.todoArr[parseInt(elementClicked.parentNode.id)].done = false;
		//if(taskInput.checked) {
		//	todoList.todoArr[parseInt(elementClicked.parentNode.id)].done = true;
		//}
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
	}
};

view.eventListeners();
