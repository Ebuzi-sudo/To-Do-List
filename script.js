// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const quoteElement = document.getElementById("quote");
const themeToggle = document.getElementById("themeToggle");
// Load theme preference
if (localStorage.getItem("theme") === "dark") {
document.body.classList.add("dark-theme");
themeToggle.textContent = "☀ Light Mode";

}
// Load tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// Render tasks
function renderTasks() {
taskList.innerHTML = "";
tasks.forEach((task, index) => {
const li = document.createElement("li");
li.className = task.completed ? "completed" : "";
li.innerHTML = `
${task.text}
<div>
<button class="complete-btn" data-index="${index}" aria-label="Mark
complete">✔</button>
<button class="delete-btn" data-index="${index}" aria-label="Delete
task">✖</button>
</div>
`;
taskList.appendChild(li);
});
}
// Save tasks
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Add task
function addTask() {
const text = taskInput.value.trim();
if (text) {
tasks.push({ text, completed: false });
taskInput.value = "";
saveTasks();
renderTasks();
} else {
alert("Please enter a task!");
}
}
// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", (e) => {
const index = e.target.dataset.index;
if (e.target.classList.contains("complete-btn")) {
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}
if (e.target.classList.contains("delete-btn")) {
tasks.splice(index, 1);

saveTasks();
renderTasks();
}
});
// Theme toggle
themeToggle.addEventListener("click", () => {
document.body.classList.toggle("dark-theme");
const isDark = document.body.classList.contains("dark-theme");
themeToggle.textContent = isDark ? "☀ Light Mode" : "🌙 Dark Mode";
localStorage.setItem("theme", isDark ? "dark" : "light");
});
// Fetch motivational quote
async function loadQuote() {
try {
const res = await fetch("https://api.quotable.io/random");
const data = await res.json();
quoteElement.textContent = `"${data.content}" — ${data.author}`;
} catch {
quoteElement.textContent = "Stay motivated!";
}
}
// Init
renderTasks();
loadQuote();