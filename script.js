let clickValue = 1;
let scoreValueInt = 400;
let cps = 0;
let archCount = 0;
let archAngle = [];
let archInstances = [];
const maxArchUpgrades = 10;


function clicker() {
    play();
    started();
}

function play() {
    let button = document.getElementById("clicker");
    let title = document.getElementById("title");

    if (button) {
        button.style.display = "none";
        title.style.display = "none";
    }

    let audio = document.getElementById("audioPlayer");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

function started() {
    let score = document.getElementById("score");
    let asto = document.getElementById("asto");
    let menu = document.getElementById("upgrade-menu");
    let cpsDisplay = document.getElementById("cps");

    if (score) {
        score.style.display = "block";
        asto.style.display = "block";
        menu.style.display = "block";
        cpsDisplay.style.display = "block";
    }
}

e
function clicked() {
    let scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.innerText);
    let nya = document.getElementById("nya");

    currentScore += clickValue;
    scoreElement.innerText = currentScore;

    if (nya) {
        nya.play();
    }
}


function buyUpgrade(level, cost) {
    let upsound = document.getElementById("upgrad12");
    let scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.innerText);

    if (currentScore >= cost) {
        currentScore -= cost;
        clickValue += level;
        scoreElement.innerText = currentScore;

        if (upsound) {
            upsound.play();
        }
    } else {
        alert("Not enough points!");
    }
}


let isMuted = false;
function togglemute() {
    let muteButton = document.getElementById("mute");
    let audio = document.getElementById("audioPlayer");
    let nya = document.getElementById("nya");
    let upgrad12 = document.getElementById("upgrad12");

    isMuted = !isMuted;

    if (audio) audio.muted = isMuted;
    if (upgrad12) upgrad12.muted = isMuted;
    if (nya) nya.muted = isMuted;

    muteButton.src = isMuted ? "muted.png" : "unmute.png";
}


function buyArchUpgrade() {
    let scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.innerText);

    if (currentScore >= 100 && archCount < maxArchUpgrades) {
        
        scoreElement.innerText = currentScore - 100;

        // Zecki hat kleine eier
        cps += 1;
        updateCPS();

        // das stimmt
        spawnArch();
    } else if (archCount >= maxArchUpgrades) {
        alert("You have reached the maximum of 10 Arch Upgrades!");
    } else {
        alert("Not enough points!");
    }
}


function spawnArch() {
    let archContainer = document.getElementById("arch-container");
    let arch = document.createElement("img");

    arch.src = "arch.png";
    arch.classList.add("arch");
    arch.style.position = "absolute"; 
    arch.style.display = "block";
    archContainer.appendChild(arch);

    archInstances.push(arch);
    archAngle.push(archCount * (360 / maxArchUpgrades)); 

    if (archCount === 1) {
        rotateArchs(); 
    }
}


function updateCPS() {
    document.getElementById("cps").innerText = cps + " Clicks Per Second";
}


function rotateArchs() {
    function animate() {
        let asto = document.getElementById("asto");
        let astoRect = asto.getBoundingClientRect();
        let centerX = astoRect.left + astoRect.width / 2;
        let centerY = astoRect.top + astoRect.height / 2;

        for (let i = 0; i < archInstances.length; i++) {
            archAngle[i] += 2; 
            let radius = 50 + i * 10; 

            let x = centerX + radius * Math.cos(archAngle[i] * (Math.PI / 180));
            let y = centerY + radius * Math.sin(archAngle[i] * (Math.PI / 180));

            archInstances[i].style.transform = `translate(${x}px, ${y}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
}


setInterval(() => {
    let scoreElement = document.getElementById("score");
    let currentScore = parseInt(scoreElement.innerText);
    scoreElement.innerText = currentScore + cps;
}, 1000);
