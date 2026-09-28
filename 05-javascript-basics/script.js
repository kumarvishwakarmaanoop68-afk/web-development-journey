// Day 5 - JavaScript Basics

// 1. Variables
const profile = {
    name: "Anoop Vishvakarma",
    role: "Web Development Learner",
    score: 82,
    skills: ["HTML", "CSS", "JavaScript", "Python", "C++"]
};

let scoreMessage = "";
let level = "";
let levelMessage = "";

// 2. Function with parameter and return value
function getScoreMessage(score) {
    if (score >= 80) {
        return "Excellent progress! Keep building projects.";
    } else if (score >= 60) {
        return "Good progress. Practice more to improve.";
    } else {
        return "Keep practicing the fundamentals.";
    }
}

// 3. switch statement
function getSkillLevel(score) {
    const category = score >= 80 ? "advanced" : score >= 60 ? "intermediate" : "beginner";

    switch (category) {
        case "advanced":
            return "Advanced";
        case "intermediate":
            return "Intermediate";
        default:
            return "Beginner";
    }
}

// 4. Function call
scoreMessage = getScoreMessage(profile.score);
level = getSkillLevel(profile.score);

if (level === "Advanced") {
    levelMessage = "Strong foundation for the next stage.";
} else {
    levelMessage = "Keep practicing before moving to harder topics.";
}

// 5. for loop
const skillsList = document.getElementById("skills-list");

for (let i = 0; i < profile.skills.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = profile.skills[i];
    skillsList.appendChild(listItem);
}

// 6. Template literal
const summary = `${profile.name} is a ${profile.role} with a current learning score of ${profile.score}/100.`;

// 7. Update the webpage
document.getElementById("profile-name").textContent = profile.name;
document.getElementById("profile-role").textContent = profile.role;
document.getElementById("score-value").textContent = `${profile.score}/100`;
document.getElementById("score-message").textContent = scoreMessage;
document.getElementById("level-value").textContent = level;
document.getElementById("level-message").textContent = levelMessage;
document.getElementById("summary-text").textContent = summary;

// Extra console practice
console.log("Profile:", profile);
console.log("Skills:", profile.skills);
console.log("Score:", profile.score);
console.log("Skill level:", level);
