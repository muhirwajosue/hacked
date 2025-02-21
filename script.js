const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 'truth' },
    { minDegree: 31, maxDegree: 90, value: 'dare' },
    { minDegree: 91, maxDegree: 150, value: 'truth' },
    { minDegree: 151, maxDegree: 210, value: 'truth' },
    { minDegree: 211, maxDegree: 270, value: 'dare' },
    { minDegree: 271, maxDegree: 330, value: 'truth' },
    { minDegree: 331, maxDegree: 360, value: 'dare' },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background color for each piece
var pieColors = [
    "#FF0000",
    "#0000FF",
    "#008000",
    "#A020F0",
    "#FFA500",
    "#FFFF00",
];

// Create chart
let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ['truth', 'dare', 'truth', 'dare', 'truth', 'dare'],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p> </p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

// Spinner count
let count = 0;
let resultValue = 101;

// Load the spin sound
let spinSound = new Audio('spin-sound.mp3'); // Use the path to your sound file

// Get the spin button
const spinButton = document.getElementById('spin-btn');

// Add event listener to play sound on spin
spinButton.addEventListener('click', () => {
    // Play the sound when the button is clicked
    spinSound.play();

    // Your existing spinning logic for the wheel goes here
    // (e.g., start spinning the wheel animation)
});


// Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();

        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});