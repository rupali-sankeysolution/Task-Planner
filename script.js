var taskIdCounter = 0; // Global counter to track task IDs
var uniqueTaskNames = []; // Array to store unique task names
var assignedEmails = []; // Array to store assigned email addresses
var assignedEmailsWithColors = {}; // Object to store assigned emails and their associated colors

function openAddTaskModal() {
    var modal = document.getElementById("addTaskModal");
    modal.style.display = "block";
}

function closeAddTaskModal() {
    var modal = document.getElementById("addTaskModal");
    modal.style.display = "none";
}

var deletedTaskIds = [];

// function addTask() {
//     var taskIdInput = document.getElementById("taskIdInput");
//     var taskNameInput = document.getElementById("taskNameInput");
//     var priorityInput = document.getElementById("priorityInput"); // Retrieve the priority input
//     var taskId = parseInt(taskIdInput.value.trim()); // Parse entered ID to integer

//     // Check if entered ID is a positive integer
//     if (isNaN(taskId) || taskId <= 0 || taskId % 1 !== 0) {
//         displayErrorMessage("Please enter a valid positive integer for the task ID.", "taskIdErrorMessage");
//         return;
//     }

//     // Check if the entered task ID already exists
//     var taskTable = document.getElementById("taskTable");

//     var rows = taskTable.getElementsByTagName("tr");
    
//     for (var i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
//         var existingTaskId = parseInt(rows[i].getElementsByTagName("td")[0].textContent.trim());
//         if (existingTaskId === taskId) {
//             displayErrorMessage("Task ID is already used. Please enter a unique task ID.", "taskIdErrorMessage");
//             return;
//         }
//     }

//     if (deletedTaskIds.includes(taskId)) {
//         displayErrorMessage("Task ID is deleted and cannot be reused. Please enter a different task ID.", "taskIdErrorMessage");
//         return;
//     }

//     var taskName = taskNameInput.value.trim();
//     // Check if task name is empty or contains only blank spaces
//     if (taskName === "" || /^\s*$/.test(taskName)) {
//         displayErrorMessage("Please enter a non-empty task name.", "taskNameErrorMessage");
//         return;
//     }

//     var newTaskNameLower = taskName.toLowerCase().replace(/\s+/g, '');

//     // Check if task name already exists (case-insensitive check)
//     for (var i = 0; i < uniqueTaskNames.length; i++) {
//         var existingTaskNameLower = uniqueTaskNames[i].toLowerCase().replace(/\s+/g, '');
//         if (existingTaskNameLower === newTaskNameLower) {
//             displayErrorMessage("Task is already added. Please enter a unique task name.", "taskNameErrorMessage");
//             return;
//         }
//     }

//     // Add the new task name to the array of unique task names
//     uniqueTaskNames.push(taskName);

//     var priority = priorityInput.value; // Get the selected priority value

//     // Proceed to add the task
//     var startDateInput = document.getElementById("startDateInput").value;
//     var dueDateInput = document.getElementById("dueDateInput").value;
//     var statusInput = document.getElementById("statusInput").value;

//     // Create table row for the task with priority included
//     var newRow = taskTable.insertRow(-1); // Insert row at the end
//     newRow.innerHTML = `
//         <td>${taskId}</td>
//         <td>${taskName}</td>
//         <td>${startDateInput}</td>
//         <td>${dueDateInput}</td>
//         <td>${statusInput}</td>
//         <td>${priority}</td> <!-- Include the priority value in the table -->
//         <td>
//             <span class="options" onclick="editTask(${taskId})">&#x270E;</span>
//             <span class="options" onclick="deleteTask(${taskId})">&#x274C;</span>
//         </td>
//     `;

//     // Clear input fields
//     taskIdInput.value = ""; // Clear the task ID input field
//     taskNameInput.value = "";
//     document.getElementById("startDateInput").value = "";
//     document.getElementById("dueDateInput").value = "";
//     document.getElementById("statusInput").value = "Pending";

//     // Close modal after adding task
//     closeAddTaskModal();
// }

function addTask() {
    var taskIdInput = document.getElementById("taskIdInput");
    var taskNameInput = document.getElementById("taskNameInput");
    var priorityInput = document.getElementById("priorityInput"); // Retrieve the priority input
    var taskId = parseInt(taskIdInput.value.trim()); // Parse entered ID to integer

    // Clear any previous error messages
    clearErrorMessages();

    // Check if entered ID is a positive integer
    if (isNaN(taskId) || taskId <= 0 || taskId % 1 !== 0) {
        displayErrorMessage("Please enter a valid positive integer for the task ID.", "taskIdErrorMessage");
        return;
    }

    // Check if the entered task ID already exists
    var taskTable = document.getElementById("taskTable");
    var rows = taskTable.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
        var existingTaskId = parseInt(rows[i].getElementsByTagName("td")[0].textContent.trim());
        // Check if the existing task ID is not in the deletedTaskIds array and matches the entered task ID
        if (!deletedTaskIds.includes(existingTaskId) && existingTaskId === taskId) {
            displayErrorMessage("Task ID is already used. Please enter a unique task ID.", "taskIdErrorMessage");
            return;
        }
    }

    var taskName = taskNameInput.value.trim();
    // Check if task name is empty or contains only blank spaces
    if (taskName === "" || /^\s*$/.test(taskName)) {
        displayErrorMessage("Please enter a non-empty task name.", "taskNameErrorMessage");
        return;
    }

    // Check if task name already exists (case-insensitive check)
    var newTaskNameLower = taskName.toLowerCase().replace(/\s+/g, '');
    for (var i = 0; i < uniqueTaskNames.length; i++) {
        var existingTaskNameLower = uniqueTaskNames[i].toLowerCase().replace(/\s+/g, '');
        if (existingTaskNameLower === newTaskNameLower) {
            displayErrorMessage("Task is already added. Please enter a unique task name.", "taskNameErrorMessage");
            return;
        }
    }

    // Add the new task name to the array of unique task names
    uniqueTaskNames.push(taskName);

    var priority = priorityInput.value; // Get the selected priority value

    // Proceed to add the task
    var startDateInput = document.getElementById("startDateInput").value;
    var dueDateInput = document.getElementById("dueDateInput").value;
    var statusInput = document.getElementById("statusInput").value;

    // Create table row for the task with priority included
    var newRow = taskTable.insertRow(-1); // Insert row at the end
    newRow.innerHTML = `
        <td>${taskId}</td>
        <td>${taskName}</td>
        <td>${startDateInput}</td>
        <td>${dueDateInput}</td>
        <td>${statusInput}</td>
        <td>${priority}</td> <!-- Include the priority value in the table -->
        <td>
            <span class="options" onclick="editTask(${taskId})">&#x270E;</span>
            <span class="options" onclick="deleteTask(${taskId})">&#x274C;</span>
        </td>
    `;

    // Clear input fields
    taskIdInput.value = ""; // Clear the task ID input field
    taskNameInput.value = "";
    document.getElementById("startDateInput").value = "";
    document.getElementById("dueDateInput").value = "";
    document.getElementById("statusInput").value = "Pending";

    // Close modal after adding task
    closeAddTaskModal();
}


function deleteTask(taskId) {
    var taskTable = document.getElementById("taskTable");
    var rows = taskTable.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var existingTaskId = parseInt(rows[i].getElementsByTagName("td")[0].textContent.trim());
        if (existingTaskId === taskId) {
            // Remove the row from the table
            taskTable.deleteRow(i);
            // Add the deleted task ID to the deletedTaskIds array
            deletedTaskIds.push(taskId);
            break;
        }
    }
}


document.getElementById("startDateInput").addEventListener("change", function() {
    var startDate = new Date(this.value); // Get the selected start date
    var endDateInput = document.getElementById("dueDateInput");
    
    // Set the minimum selectable date for the end date input field
    endDateInput.min = formatDate(startDate); // Convert date to string in YYYY-MM-DD format
});

// Function to format date in YYYY-MM-DD format
function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    var day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    return year + '-' + month + '-' + day;
}


function editTask(taskId) {
    var taskTable = document.getElementById("taskTable");
    var rows = taskTable.getElementsByTagName("tr");

    // Find the row corresponding to the taskId
    for (var i = 1; i < rows.length; i++) {
        var existingTaskId = parseInt(rows[i].getElementsByTagName("td")[0].textContent.trim());
        if (existingTaskId === taskId) {
            // Get task details
            var taskName = rows[i].getElementsByTagName("td")[1].textContent.trim();
            var startDate = rows[i].getElementsByTagName("td")[2].textContent.trim();
            var dueDate = rows[i].getElementsByTagName("td")[3].textContent.trim();
            var status = rows[i].getElementsByTagName("td")[4].textContent.trim();

            // Populate modal with task details
            document.getElementById("taskIdInput").value = taskId;
            document.getElementById("taskNameInput").value = taskName;
            document.getElementById("startDateInput").value = startDate;
            document.getElementById("dueDateInput").value = dueDate;
            document.getElementById("statusInput").value = status;

            // Open modal for editing
            openAddTaskModal();

            // Remove the row from the table
            taskTable.deleteRow(i);
            break;
        }
    }
}

function deleteTask(taskId) {
    var taskTable = document.getElementById("taskTable");
    var rows = taskTable.getElementsByTagName("tr");

    // Find the row corresponding to the taskId
    for (var i = 1; i < rows.length; i++) {
        var existingTaskId = parseInt(rows[i].getElementsByTagName("td")[0].textContent.trim());
        if (existingTaskId === taskId) {
            // Remove the row from the table
            taskTable.deleteRow(i);
            break;
        }
    }
}


// Get the search input and button
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");

// Add event listener to the search button
searchButton.addEventListener("click", function() {
    var searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== "") {
        // Call a function to search for tasks based on the search term
        searchTasks(searchTerm);
    }
});

function searchTasks() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.trim().toLowerCase(); // Trim and convert search term to lowercase
    table = document.getElementById("taskTable");
    tr = table.getElementsByTagName("tr");

    // Loop through each row of the table
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Index 1 represents the Task Name column
        if (td) {
            txtValue = td.textContent || td.innerText;
            // Check if the task name contains the search term
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // Show the row if matched
            } else {
                tr[i].style.display = "none"; // Hide the row if not matched
            }
        }
    }
}

// Function to assign the task
function assignTask() {
    console.log("Assign Task button clicked.");
    var assigneeEmailInput = document.getElementById("assigneeEmailInput");
    var assigneeEmail = assigneeEmailInput.value.trim();

    // Validate the email format
    if (!isValidEmail(assigneeEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check if the email is already assigned
    if (assignedEmails.includes(assigneeEmail)) {
        alert("This email is already assigned.");
        return;
    }

    // Add the email to the assigned list
    assignedEmails.push(assigneeEmail);

    // Display the assigned person's initials
    displayAssignedPersons();

    // Clear the assignee email input field
    assigneeEmailInput.value = "";
}

// Function to display assigned persons' initials or count
function displayAssignedPersons() {
    var assignedInitialsContainer = document.getElementById("assignedInitialsContainer");
    assignedInitialsContainer.innerHTML = ""; // Clear previous content

    // Check the number of assigned persons
    var count = assignedEmails.length;
    if (count <= 3) {
        // Display initials for each assigned person
        for (var i = 0; i < count; i++) {
            var email = assignedEmails[i];
            var initials = getEmailInitials(email);
            var color;

            // Check if color already assigned for the email
            if (assignedEmailsWithColors[email]) {
                color = assignedEmailsWithColors[email]; // Use existing color
            } else {
                color = getRandomColor(); // Generate new color
                assignedEmailsWithColors[email] = color; // Store color for the email
            }

            // Create circular element for initials
            var circularElement = document.createElement("div");
            circularElement.textContent = initials;
            circularElement.classList.add("circular-button"); // Add a class for styling
            circularElement.style.backgroundColor = color; // Apply the color as background color

            assignedInitialsContainer.appendChild(circularElement);
        }
    } else {
        // Display initials for the first three assigned persons
        for (var i = 0; i < 3; i++) {
            var email = assignedEmails[i];
            var initials = getEmailInitials(email);
            var color;

            // Check if color already assigned for the email
            if (assignedEmailsWithColors[email]) {
                color = assignedEmailsWithColors[email]; // Use existing color
            } else {
                color = getRandomColor(); // Generate new color
                assignedEmailsWithColors[email] = color; // Store color for the email
            }

            // Create circular element for initials
            var circularElement = document.createElement("div");
            circularElement.textContent = initials;
            circularElement.classList.add("circular-button"); // Add a class for styling
            circularElement.style.backgroundColor = color; // Apply the color as background color

            assignedInitialsContainer.appendChild(circularElement);
        }

        // Display count for additional assigned persons
        var countElement = document.createElement("div");
        countElement.textContent = "+" + (count - 3); // Calculate the count excluding the first three
        countElement.classList.add("remaining-count"); // Add a class for styling
        assignedInitialsContainer.appendChild(countElement);
    }
}

// Function to extract the first initial from the email address
function getEmailInitials(email) {
    var name = email.split("@")[0]; // Get the part before '@'
    var firstInitial = name.charAt(0).toUpperCase(); // Get the first letter and convert to uppercase
    return firstInitial;
}

// Function to generate random color
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to validate email format
function isValidEmail(email) {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}


// Function to display error messages below input fields
function displayErrorMessage(message, errorMessageContainerId) {
    var errorMessageContainer = document.getElementById(errorMessageContainerId);
    errorMessageContainer.textContent = message;
}

// Function to clear error messages
function clearErrorMessages() {
    var taskIdErrorMessage = document.getElementById("taskIdErrorMessage");
    var taskNameErrorMessage = document.getElementById("taskNameErrorMessage");
    taskIdErrorMessage.textContent = "";
    taskNameErrorMessage.textContent = "";
}

// Add event listener to clear error messages on input change
document.getElementById("taskIdInput").addEventListener("input", clearErrorMessages);
document.getElementById("taskNameInput").addEventListener("input", clearErrorMessages);



