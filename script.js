// Section Observer for Fade In
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.id === 'message') {
                startTyping();
            }
        }
    });
}, observerOptions);

// Audio Autoplay Workaround using Overlay
const music = document.getElementById('bg-music');
const overlay = document.getElementById('audio-overlay');

const startAudio = () => {
    music.play().then(() => {
        overlay.classList.add('fade-out');
        // Start other animations after music starts
        document.body.classList.add('reveal');
    }).catch(e => {
        console.log("Autoplay blocked, waiting for interaction");
    });
};

overlay.addEventListener('click', startAudio);
overlay.addEventListener('touchstart', startAudio);

sections.forEach(section => {
    observer.observe(section);
});


// Typing Animation Logic
const message = [
    "If missing me hurts, just close your eyes.",
    "I’m the one thinking about you at the same time.",
    "\n\nDistance is temporary. What we have is permanent.",
    "\n\nI'm sending you a big panda hug right now... 🐼❤️"
];

let hasStartedTyping = false;
function startTyping() {
    if (hasStartedTyping) return;
    hasStartedTyping = true;

    const typingContainer = document.getElementById('typing-text');
    let lineIdx = 0;
    let charIdx = 0;

    function type() {
        if (lineIdx < message.length) {
            if (charIdx < message[lineIdx].length) {
                typingContainer.innerHTML += message[lineIdx].charAt(charIdx);
                charIdx++;
                setTimeout(type, 50 + Math.random() * 50);
            } else {
                typingContainer.innerHTML += '<br>';
                lineIdx++;
                charIdx = 0;
                setTimeout(type, 800);
            }
        }
    }
    type();
}

// Final Button Interaction
const missBtn = document.getElementById('miss-me-btn');
const btnContainer = document.getElementById('final-button-container');
const revealDiv = document.getElementById('final-reveal');

missBtn.addEventListener('click', () => {
    btnContainer.classList.add('hidden');
    revealDiv.classList.remove('hidden');

    // Play music on first interaction (browser requirement)
    const music = document.getElementById('bg-music');
    music.play().catch(e => console.log("Audio play failed, needs click first:", e));

    // Start final typing animation
    startFinalTyping();
});

const finalMessage = [
    "My Dearest,",
    "\nI'm writing this because sometimes my heart is so full of you that words are the only way to let it breathe. Every moment without you feels like a quiet ache, a soft reminder of the piece of my soul that walks beside you.",
    "\nI miss the way your presence turns a normal room into a sanctuary. I miss the sound of your laughter—it's my favorite song, the one I play in my head whenever the world gets too loud.",
    "\nDistance is just a test of how far love can travel. And as I close my eyes, I realize that you aren't 'away' at all. You're in every breath I take, every thought that makes me smile, and every beat of my heart.",
    "\nSo please, never doubt how much you mean to me. You are my home, my peace, and my beautiful forever. I am counting the seconds until I can finally hold you and tell you all of this in person.",
    "\nI am always yours, through every distance and every dream.",
    "\n\nWith all my love, ❤️"
];

function startFinalTyping() {
    const typingContainer = document.getElementById('final-typing-text');
    let lineIdx = 0;
    let charIdx = 0;

    function type() {
        if (lineIdx < finalMessage.length) {
            if (charIdx < finalMessage[lineIdx].length) {
                typingContainer.innerHTML += finalMessage[lineIdx].charAt(charIdx);
                charIdx++;
                setTimeout(type, 40 + Math.random() * 30);
            } else {
                typingContainer.innerHTML += '<br>';
                lineIdx++;
                charIdx = 0;
                setTimeout(type, 1000);
            }
        }
    }
    setTimeout(type, 1500); // Start after reveal animation
}

// Particle/Floating Hearts Generation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// CSS for dynamic hearts (injecting to avoid separate file or style block clutter)
const style = document.createElement('style');
style.innerHTML = `
    .heart-particle {
        position: fixed;
        bottom: -20px;
        z-index: -1;
        pointer-events: none;
        animation: floatUp linear forwards;
    }
    @keyframes floatUp {
        to {
            transform: translateY(-105vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
