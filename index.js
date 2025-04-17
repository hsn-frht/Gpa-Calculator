function toggleTheme() {
    let body = document.body;
    let icon = document.getElementById("theme-icon");
    // Toggle dark mode class
    body.classList.toggle("dark-mode");

    // Save theme preference to localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        icon.src = "./sun.svg";
    } else {
        icon.src = "./moon-stars-fill.svg";
        localStorage.setItem("theme", "light");
    }
    let element = document.getElementById("myElement");
            if (element.classList.contains("light-mode")) {
                element.classList.remove("light-mode");
                element.classList.add("dark-mode");
            } else {
                element.classList.remove("dark-mode");
                element.classList.add("light-mode");
            }
        }


// Check localStorage for saved theme on page load
window.onload = function () {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

};
let grades = []; // Store all grades globally
let courseIndex = 0; // Track current course
let totalCourses = 0;
let sum = 0;
let average = 0;
let gpa = 0;

document.getElementById("submit").onclick = handleSubmit;

function handleSubmit() {
    let n = parseInt(document.getElementById("inp-num").value); // Convert input to number

    if (isNaN(n) || n <= 0) {
        alert("Please enter a valid number of courses.");
        return;
    }

    totalCourses = n; // Store total courses globally
    courseIndex = 0;  // Reset course index
    grades = [];       // Reset grades array
    sum = 0;           // Reset sum

    askForGrade(); // Start taking grades
}

function askForGrade() {
    if (courseIndex < totalCourses) {
        document.getElementById("out_num").textContent = `Enter the grade for course ${courseIndex + 1}:`;
        document.getElementById("hiddenOption").style.display = "inline";
        document.getElementById("gradeSubmit").style.display = "inline"; // Ensure this exists in HTML
    } else {
        document.getElementById("out_num").textContent = "All grades entered!";
        document.getElementById("hiddenOption").style.display = "none";
        document.getElementById("gradeSubmit").style.display = "none";

        // Calculate and display GPA
        average = sum / totalCourses;
        gpa = (average * 4) / 100;
        document.getElementById("displayResult").textContent = `Your GPA is ${gpa.toFixed(2)}/4`;
        console.log("Final Grades:", grades);
        console.log("Sum:", sum, "Average:", average, "GPA:", gpa);
    }
}

function submitGrade() {
    if (totalCourses === 0) {
        document.getElementById("out_num").textContent = "please enter the amount of courses first";
        document.getElementById("displayResult").textContent ="error calculating gpa need to enter number of courses first";
        return;
    }

    let gradeInputElement = document.getElementById("hiddenOption");
    let gradeInput = gradeInputElement.value;
    let grade = parseInt(gradeInput);

    if (isNaN(grade) || grade < 0 || grade > 100) {
        alert("Please enter a valid grade between 0 and 100.");
        return;
    }

    grades.push(grade); // Store grade
    sum += grade; // Add to sum
    courseIndex++; // Move to next course
    gradeInputElement.value = ""; // Clear input
    askForGrade(); // Prompt next grade
}
