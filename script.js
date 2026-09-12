// ===============================
// MONTHSARY WEBSITE
// ===============================

// Get screens
const intro = document.getElementById("intro");
const question = document.getElementById("question");
const celebrate = document.getElementById("celebrate");
const codeScreen = document.getElementById("code");
const letter = document.getElementById("letter");

// Buttons
const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const codeForm = document.getElementById("codeForm");
const codeInput = document.getElementById("codeInput");
const codeError = document.getElementById("codeError");
const letterText = document.getElementById("letterText");
const signature = document.querySelector(".signature");
const extraMessageWrap = document.getElementById("extraMessageWrap");
const extraMessageBtn = document.getElementById("extraMessageBtn");
const extraMessageReveal = document.getElementById("extraMessageReveal");
const passcodeModal = document.getElementById("passcodeModal");
const closePasscode = document.getElementById("closePasscode");
const passcodeInput = document.getElementById("passcodeInput");
const submitPasscode = document.getElementById("submitPasscode");
const passcodeError = document.getElementById("passcodeError");
const backgroundMusic = document.getElementById("backgroundMusic");

const secretCode = "20062009";
const extraSecretCode = "forever you";
const letterParagraphs = Array.from(letterText.querySelectorAll("p")).map((paragraph) => ({
    className: paragraph.className,
    text: paragraph.textContent.replace(/\s+/g, " ").trim()
}));

// ===============================
// SCREEN TRANSITION
// ===============================

function showScreen(nextScreen) {

    const currentScreen = document.querySelector(".screen.active");

    if (currentScreen === nextScreen) return;

    currentScreen.classList.add("fade-out");

    setTimeout(() => {

        currentScreen.classList.remove("active");
        currentScreen.classList.remove("fade-out");

        nextScreen.classList.add("active");

    }, 700);
}


// ===============================
// INTRO → QUESTION
// ===============================

startBtn.addEventListener("click", () => {

    backgroundMusic.play().catch(() => {});
    showScreen(question);

});


// ===============================
// NO BUTTON ESCAPE
// ===============================

function moveNoButton() {

    const escapeRangeX = 10;
    const escapeRangeY = 6;
    const randomX = (Math.random() * 2 - 1) * escapeRangeX;
    const randomY = (Math.random() * 2 - 1) * escapeRangeY;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", (event) => {

    event.preventDefault();
    moveNoButton();

});

noBtn.addEventListener("click", (event) => {

    event.preventDefault();
    moveNoButton();

});


// ===============================
// YES 💜
// ===============================

yesBtn.addEventListener("click", () => {

    createHeartExplosion();

    showScreen(celebrate);

    // Go to letter after celebration
    setTimeout(() => {

        showScreen(codeScreen);

    }, 3000);

});


// ===============================
// SECRET CODE → LOVE LETTER
// ===============================

codeForm.addEventListener("submit", (event) => {

    event.preventDefault();

    if (codeInput.value.trim() !== secretCode) {
        codeError.textContent = "Almost, darling. Try again 💜";
        codeInput.value = "";
        codeInput.focus();
        return;
    }

    codeError.textContent = "";
    codeInput.blur();
    prepareLetter();
    showScreen(letter);

    setTimeout(() => {
        typeLetter();
    }, 750);

});

function prepareLetter() {

    letterText.innerHTML = "";
    signature.style.opacity = "0";
    signature.style.transform = "translateY(8px)";

}

async function typeLetter() {

    if (letterText.dataset.typed === "true") return;

    letterText.dataset.typed = "true";

    for (const paragraphData of letterParagraphs) {

        const paragraph = document.createElement("p");
        paragraph.className = paragraphData.className;
        letterText.appendChild(paragraph);

        for (const character of paragraphData.text) {
            paragraph.textContent += character;
            await new Promise((resolve) => setTimeout(resolve, 18));
        }

        await new Promise((resolve) => setTimeout(resolve, 220));
    }

    signature.style.opacity = "1";
    signature.style.transform = "translateY(0)";
    extraMessageWrap.hidden = false;
    extraMessageWrap.classList.add("visible");

}


// ===============================
// EXTRA SECRET MESSAGE
// ===============================

function openPasscodeModal() {
    passcodeModal.classList.remove("hidden");
    passcodeInput.value = "";
    passcodeError.textContent = "";
    setTimeout(() => passcodeInput.focus(), 80);
}

function closePasscodeModal() {
    passcodeModal.classList.add("hidden");
    passcodeInput.value = "";
    passcodeError.textContent = "";
}

extraMessageBtn.addEventListener("click", openPasscodeModal);
closePasscode.addEventListener("click", closePasscodeModal);

passcodeModal.addEventListener("click", (event) => {
    if (event.target === passcodeModal) {
        closePasscodeModal();
    }
});

submitPasscode.addEventListener("click", () => {
    const enteredCode = passcodeInput.value;

    if (enteredCode.trim().toLowerCase() !== extraSecretCode.toLowerCase()) {
        passcodeError.textContent = "Wrong passcode. Try again 💜";
        passcodeInput.value = "";
        passcodeInput.focus();
        return;
    }

    extraMessageReveal.classList.add("visible");
    extraMessageBtn.disabled = true;
    extraMessageBtn.textContent = "Unlocked 💜";
    extraMessageBtn.style.opacity = "0.75";
    extraMessageBtn.style.cursor = "default";
    closePasscodeModal();
});

passcodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        submitPasscode.click();
    }
});


// ===============================
// FLOATING PARTICLES
// ===============================

const particleContainer =
    document.getElementById("particles");

function createParticle() {

    const particle =
        document.createElement("div");

    const lilacColors = [
        "#f0abfc",
        "#d8b4fe",
        "#c084fc",
        "#a855f7"
    ];

    particle.classList.add("particle");

    particle.style.setProperty(
        "--particle-color",
        lilacColors[Math.floor(Math.random() * lilacColors.length)]
    );

    const size =
        Math.random() * 4 + 2;

    particle.style.width =
        `${size}px`;

    particle.style.height =
        `${size}px`;

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.animationDuration =
        `${Math.random() * 8 + 6}s`;

    particle.style.animationDelay =
        `${Math.random() * 5}s`;

    particle.style.setProperty(
        "--particle-rotation",
        `${Math.random() * 90 - 45}deg`
    );

    particleContainer.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 15000);

}


// Create particles
for (let i = 0; i < 45; i++) {

    createParticle();

}


// Keep creating particles
setInterval(() => {

    createParticle();

}, 500);


// ===============================
// HEART EXPLOSION
// ===============================

function createHeartExplosion() {

    const hearts = [
        "💜",
        "💜",
        "♡",
        "♥",
        "✦",
        "✨"
    ];

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];

        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.fontSize =
            `${Math.random() * 20 + 15}px`;

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "9999";

        document.body.appendChild(heart);

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            Math.random() *
            250 +
            100;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        const heartAnimation = heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(0.4)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    Math.random() *
                    1000 +
                    1200,

                easing:
                    "cubic-bezier(.17,.67,.35,1.2)"
            }
        );

        const removeHeart = () => {

            if (heart.isConnected) heart.remove();

        };

        heartAnimation.addEventListener("finish", removeHeart, { once: true });
        heartAnimation.addEventListener("cancel", removeHeart, { once: true });
        setTimeout(removeHeart, 2600);

    }

}


// ===============================
// PREVENT ACCIDENTAL SCROLL
// ===============================

document.addEventListener(
    "touchmove",
    (event) => {

        if (
            !event.target.closest(
                ".letter-container"
            )
        ) {

            event.preventDefault();

        }

    },
    { passive: false }
);


// ===============================
// CONSOLE MESSAGE 💜
// ===============================

console.log(
    "Made with love for myloveee 💜🌸"
);