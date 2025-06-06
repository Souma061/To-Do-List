
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return 0;

  }
  const li = document.createElement("li");

  li.innerHTML = `
  <span>${taskText}</span>
  <div class="task-buttons">
     <button class="done-btn" onclick="markDone(this)">✔️</button>
          <button onclick="deleteTask(this)">❌</button>
  </div>
  `;
  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();


}
function markDone(button) {
  const li = button.parentElement.parentElement;
  li.classList.toggle("done");
  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  li.remove();
  saveTasks();
}
//localStorage
//save items

function saveTasks() {
  const tasks = [];
  const lis = document.querySelectorAll("#taskList li");
  lis.forEach(li => {
    const text = li.querySelector("span").innerText;
    const done = li.classList.contains("done");
    tasks.push({ text, done });
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Load tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }
    li.innerHTML = `
  <span>${task.text}</span>
  <div class="task-buttons">
     <button class="done-btn" onclick="markDone(this)">✔️</button>
          <button onclick="deleteTask(this)">❌</button>
  </div>
  `;
    document.getElementById("taskList").appendChild(li);
  })
}


function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark"); // ✅ save dark theme
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light"); // ✅ save light theme
  }
}



window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.textContent = savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

  loadTasks();
}

document.getElementById("taskInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }

})

