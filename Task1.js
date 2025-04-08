//Create an empty array for tasks.
let tasks = [];

//Add an onclick to buttons that calls functions.
document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("filterBtn").addEventListener("click", filterTasks);
document.getElementById("clearFilterBtn").addEventListener("click", resetFilter);

//Get the input value of a specific id, and remove space on each side from it.
function getInputValue(id) {
  return document.getElementById(id).value.trim();
}

//Create a task using the input from description and category.
function createTask(description, category) {
  taskObj = {description, category};
  return taskObj;
}

//Function that uses the input value from taskinput and categoryselect. It adds the new task to the array, then prints it in the html.
//If the text is too small, you get a message saying it is too short. 
// At last it clears all text from the input.
function addTask() {
  const description = getInputValue("taskInput");
  const category = getInputValue("categorySelect");

  if (description.length < 2) return alert("Task too short");

  const newTask = createTask(description, category);
  tasks.push(newTask);
  renderTasks(tasks);
  clearInputs();
}

//Function that takes a list/array as parameter. Then it empties the ul in html. After that, for each task in the array
// it creates a list element with the task category and task description before it applies this list to the ul in html.
function renderTasks(list) {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  list.forEach(task => {
    const li = document.createElement("li");
    li.textContent = '[' + task.category + '] ' + task.description;
    ul.appendChild(li);
  });
}

//Function that clears all text in the taskInput html element.
function clearInputs() {
  document.getElementById("taskInput").value = "";
}

//Function that uses the input value from categorySelect. Then it creates an empty array. At last it uses a for loop to
//check up to a number of times equal to the number of tasks. It then filters on tasks that matches the category value.
//As an improvement for users, I think using a different input value than the one used for task creation would make it more
//intuitive. Having a separate filter button or dropdown would maybe be a better solution.
function filterTasks() {
  const cat = getInputValue("categorySelect");
  let results = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].category === cat) {
      results.push(tasks[i]);
    }
  }

  //Prints two messages to console about what category you filter on and how many there are in that category.
  console.log("Filtering tasks for category:", cat);
  console.log("Found:", results.length);

  //Empties the ul named tasklist again in case there are things there that are not supposed to be there.
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  //For loop that for each element in the results array adds a li element to html and adds it to the ul with category and description.
  for (let i = 0; i < results.length; i++) {
    const li = document.createElement("li");
    li.textContent = '[' +results[i].category + '] ' + results[i].description;
    ul.appendChild(li);
  }

  //For loops that for each element in the results array checks if the description is a test, which it then prints in the console.
  for (let i = 0; i < results.length; i++) {
    if (results[i].description.includes("test")) {
      console.log("Task contains 'test':", results[i].description);
    }
  }

  //This adds a list element in the same ul as the other tasks are in. This shows how many tasks are in the chosen filter.
  const countInfo = document.createElement("li");
  countInfo.textContent = 'Total in ' + cat + ': ' + results.length;
  countInfo.style.fontWeight = "bold";
  ul.appendChild(countInfo);
}

//Function that removes the filter by calling the rendertasks function which empties the ul and then gives you all the 
//elements of the tasks array.
function resetFilter(){
    renderTasks(tasks);
}