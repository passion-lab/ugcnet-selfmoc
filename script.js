document.addEventListener("DOMContentLoaded", function() {
    
    const testSelect = document.getElementById("test-select");
    const testNumberDisplay = document.getElementById("test-number");
    const examSelectors = document.getElementById("exam-selectors");
    const examSection = document.getElementById("exam-section");
    const iframe = document.getElementById("exam-iframe");
    const popup = document.getElementById("popup");


    const tests = {
        1: [180, "https://docs.google.com/forms/d/e/1FAIpQLSf1pTestLink1/viewform"],
        2: [120, "https://docs.google.com/forms/d/e/1FAIpQLSde8EZ2kjakhzUGSzRAWZMEzRSpBnG4fxoxeA3GODAXN-olFQ/viewform?embedded=true"],
        // Add more test links as needed
        "Random": [180, "https://docs.google.com/forms/d/e/1FAIpQLSf1pRandomLink/viewform"]
    };

    // Initialize test number
    let currentTest = Object.keys(tests).length - 1; // assume last key is the latest number


    // Populate dropdown
    for (let key in tests) {
        const option = document.createElement("option");
        option.value = key;
        option.text = key === "Random" ? key : `Test - ${key}`;
        testSelect.appendChild(option);
    }
    testSelect.value = currentTest;
    testNumberDisplay.textContent = currentTest;

    // Handle dropdown change
    testSelect.addEventListener("change", function() {
        currentTest = testSelect.value;
        testNumberDisplay.textContent = currentTest;
    });

    // Start Exam button
    document.getElementById("start-exam-btn").addEventListener("click", startExam);

    function startExam() {
        examSection.classList.remove("hidden");
        examSelectors.classList.add("hidden");
        iframe.src = tests[currentTest][1];
        startTimer(tests[currentTest][0]); // 180 minutes countdown
    }

    // Timer
    let timer;
    function startTimer(duration) {
        let time = duration * 60;
        timer = setInterval(function() {
            const minutes = String(Math.floor(time / 60)).padStart(3, "0");
            const seconds = String(time % 60).padStart(2, "0");
            document.getElementById("countdown-timer").textContent = `${minutes}:${seconds}`;
            if (time === 60) alert("1 minute remaining. Please submit soon!");
            if (time <= 0) endExam();
            time--;
        }, 1000);
    }

    // End Exam button
    document.getElementById("end-exam-btn").addEventListener("click", function() {
        popup.classList.remove("hidden");
    });

    document.getElementById("confirm-end-btn").addEventListener("click", endExam);
    document.getElementById("cancel-end-btn").addEventListener("click", function() {
        popup.classList.add("hidden");
    });

    function endExam() {
        clearInterval(timer);
        examSelectors.classList.remove("hidden");
        examSection.classList.add("hidden");
        popup.classList.add("hidden");
        iframe.src = "";
    }
});
