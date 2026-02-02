const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionSection = document.getElementById('question-section');
const successSection = document.getElementById('success-section');
const mainGif = document.getElementById('main-gif');

let yesSize = 1.4;
let noClicks = 0;

const noMessages = [
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "I'm gonna cry...",
    "You're so mean!",
    "Okay, I'll stop asking...",
    "Just kidding, CLICK YES!"
];

yesBtn.addEventListener('click', () => {
    questionSection.style.opacity = '0';
    setTimeout(() => {
        questionSection.classList.add('hidden');
        successSection.classList.remove('hidden');
        successSection.style.opacity = '0';
        setTimeout(() => {
            successSection.style.transition = 'opacity 1s ease';
            successSection.style.opacity = '1';
        }, 50);
        createConfetti();
        // Continuous confetti for a few seconds
        const interval = setInterval(createConfetti, 500);
        setTimeout(() => clearInterval(interval), 5000);
        startCountdown();
    }, 500);
});

function startCountdown() {
    const timerDisplay = document.getElementById('timer');
    const targetDate = new Date('February 14, 2026 00:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            timerDisplay.innerHTML = "Happy Valentine's Day! ❤️";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDisplay.innerHTML = `
            <div class="timer-segment"><span class="timer-value">${days}</span><span class="timer-label">Days</span></div>
            <div class="timer-segment"><span class="timer-value">${hours}</span><span class="timer-label">Hrs</span></div>
            <div class="timer-segment"><span class="timer-value">${minutes}</span><span class="timer-label">Min</span></div>
            <div class="timer-segment"><span class="timer-value">${seconds}</span><span class="timer-label">Sec</span></div>
        `;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

noBtn.addEventListener('click', () => {
    noClicks++;
    
    // Make Yes button bigger
    yesSize += 0.4;
    yesBtn.style.fontSize = `${yesSize}rem`;
    yesBtn.style.padding = `${yesSize * 10}px ${yesSize * 25}px`;
    
    // Change No button text
    if (noClicks < noMessages.length) {
        noBtn.innerText = noMessages[noClicks];
    } else {
        noBtn.innerText = "Okay, fine... but click Yes!";
    }

    // Move No button randomly with a bit of padding from edges
    const padding = 50;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding * 2) + padding;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = '1000';
});

// Floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const heartIcons = ['❤️', '💖', '💝', '💕', '💗', '🌸', '✨'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 400);
}

function createConfetti() {
    const colors = ['#ff4d6d', '#ff758f', '#ffafbd', '#ffc3a0', '#ffffff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.5;
        
        if (isEmoji) {
            confetti.innerHTML = ['❤️', '💖', '✨', '🌸', '🎉'][Math.floor(Math.random() * 5)];
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
        } else {
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        }
        
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 1000}deg) translateX(${(Math.random() - 0.5) * 200}px)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

createFloatingHearts();
