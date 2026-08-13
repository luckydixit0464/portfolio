// ===============================
// THREE JS BACKGROUND
// ===============================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
alpha: true,
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("bg")
.appendChild(renderer.domElement);

camera.position.z = 5;

// ===============================
// PARTICLES
// ===============================

const particlesGeometry =
new THREE.BufferGeometry();

const particleCount = 8000;

const positions =
new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++){

positions[i] =
(Math.random() - 0.5) * 20;

}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
)
);

const particlesMaterial =
new THREE.PointsMaterial({
size:0.02,
color:0x00d9ff
});

const particles =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particles);

// ===============================
// ANIMATION LOOP
// ===============================

function animate(){

requestAnimationFrame(animate);

particles.rotation.y += 0.0015;
particles.rotation.x += 0.0004;

renderer.render(
scene,
camera
);

}

animate();

// ===============================
// RESPONSIVE CANVAS
// ===============================

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

// ===============================
// TYPING EFFECT
// ===============================

const roles = [

"Full Stack Developer",

"B.Tech CSE Student (AI/ML)",

"Python Programmer",

"Future AI Engineer"

];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText =
document.querySelector(".typing-text");

function typeEffect(){

if(!typingText) return;

const currentRole =
roles[roleIndex];

if(isDeleting){

typingText.textContent =
currentRole.substring(
0,
charIndex - 1
);

charIndex--;

}else{

typingText.textContent =
currentRole.substring(
0,
charIndex + 1
);

charIndex++;

}

let speed = isDeleting ? 60 : 120;

if(
!isDeleting &&
charIndex === currentRole.length
){

speed = 1800;
isDeleting = true;

}
else if(
isDeleting &&
charIndex === 0
){

isDeleting = false;

roleIndex =
(roleIndex + 1) %
roles.length;

speed = 500;

}

setTimeout(
typeEffect,
speed
);

}

typeEffect();

// ===============================
// MOBILE MENU
// ===============================

const menuBtn =
document.querySelector(".menu-btn");

const navLinks =
document.querySelector(".nav-links");

if(menuBtn){

menuBtn.addEventListener(
"click",
()=>{

navLinks.classList.toggle(
"active"
);

}
);

}

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements =
document.querySelectorAll(
".card, .timeline-item, .skill-card"
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform =
"translateY(0)";

}

});

},

{
threshold:0.1
}

);

revealElements.forEach(item=>{

item.style.opacity = "0";

item.style.transform =
"translateY(40px)";

item.style.transition =
"all 0.8s ease";

observer.observe(item);

});

// ===============================
// NAVBAR ACTIVE LINK
// ===============================

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop - 150;

if(
pageYOffset >= sectionTop
){

current =
section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href") ===
"#" + current
){

link.classList.add("active");

}

});

}
);

// ===============================
// SMOOTH BUTTON HOVER EFFECT
// ===============================

document
.querySelectorAll(".btn")
.forEach(btn=>{

btn.addEventListener(
"mouseenter",
()=>{

btn.style.transform =
"translateY(-4px)";

});

btn.addEventListener(
"mouseleave",
()=>{

btn.style.transform =
"translateY(0px)";

});

});

// ===============================
// PARALLAX HERO IMAGE
// ===============================

const heroImage =
document.querySelector(
".hero-image img"
);

window.addEventListener(
"mousemove",
(e)=>{

if(!heroImage) return;

let x =
(window.innerWidth/2 - e.pageX)
/ 40;

let y =
(window.innerHeight/2 - e.pageY)
/ 40;

heroImage.style.transform =
`translate(${x}px, ${y}px)`;

}
);

// ===============================
// AI PORTFOLIO ASSISTANT
// ===============================

const aiLauncher = document.getElementById("aiLauncher");
const aiPanel = document.getElementById("aiPanel");
const aiClose = document.getElementById("aiClose");
const aiWelcome = document.getElementById("aiWelcome");
const aiWelcomeClose = document.getElementById("aiWelcomeClose");
const aiMessages = document.getElementById("aiMessages");
const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMic = document.getElementById("aiMic");
const aiVoiceToggle = document.getElementById("aiVoiceToggle");
let aiVoiceEnabled = true;
let aiHistory = [];
let firstAssistantOpen = true;

function toggleAssistant(open){
    aiPanel.classList.toggle("open", open);
    aiPanel.setAttribute("aria-hidden", String(!open));
    aiLauncher.setAttribute("aria-expanded", String(open));

    if(open){
    aiWelcome.style.display = "none";
    setTimeout(() => aiInput.focus(), 150);

    if(firstAssistantOpen){
        firstAssistantOpen = false;

        speakAnswer(
            "Hello! Welcome to Lucky Dixit's portfolio. I'm Lucky's AI assistant. How can I help you today?"
        );
    }
}
}

aiLauncher.addEventListener("click", ()=>{
    toggleAssistant(!aiPanel.classList.contains("open"));
});

aiClose.addEventListener("click", ()=>toggleAssistant(false));
aiWelcomeClose.addEventListener("click", ()=>aiWelcome.style.display = "none");

function addAiMessage(text, sender="assistant"){
    const message = document.createElement("div");
    message.className = `ai-message ${sender}`;
    message.textContent = text;
    aiMessages.appendChild(message);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    return message;
}

function speakAnswer(text){
    if(!aiVoiceEnabled || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
}

function localPortfolioAnswer(question){
    const q = question.toLowerCase();

    if(/hello|hi|hey/.test(q)){
        return "Hi! I am Lucky's portfolio assistant. You can ask about Lucky's skills, projects, education, internship, certificates or contact details.";
    }

    if(/about|who|introduce|yourself/.test(q)){
        return "Lucky Dixit is a B.Tech Computer Science student specialising in AI and Machine Learning. He is interested in Python development, machine learning, AI automation and modern web technologies.";
    }

    if(/skill|technology|know|expert/.test(q)){
        return "Lucky's skills include Python, JavaScript, HTML/CSS, SQL, Java, Machine Learning, Flask, scikit-learn, MySQL, Git/GitHub, Power BI and AI automation.";
    }

    if(/project|work|built/.test(q)){
        return "Lucky built a Car Price Prediction System using Python, data preprocessing, feature engineering, Random Forest Regression and Flask. He also created a responsive Online Learning Platform with course listing, registration and student login.";
    }

    if(/experience|internship|intern/.test(q)){
        return "Lucky completed a one-month Web Development Internship at In Amigos Foundation. He developed responsive pages, improved UI and user experience, collaborated with a team, and assisted with testing and debugging.";
    }

    if(/education|college|degree|study|cgpa|school/.test(q)){
        return "Lucky is pursuing a B.Tech in CSE - AI/ML at Maharana Institute of Professional Studies from 2024 to 2028, with a CGPA of 8.0.";
    }

    if(/certificate|nptel|workshop|certification/.test(q)){
        return "Lucky earned an NPTEL Elite certification in Joy of Computing Using Python with an 85% score. He also completed a Full Stack Development workshop by Softpro India and a Power BI certification from OfficeMaster.";
    }

    if(/contact|email|phone|call|hire|linkedin|github/.test(q)){
        return "You can contact Lucky at luckydixit0464@gmail.com or +91 6394867018. His LinkedIn and GitHub links are available at the top of this portfolio.";
    }

    if(/location|live|from|kanpur/.test(q)){
        return "Lucky is based in Chaubepur, Kanpur.";
    }

    if(/resume|cv/.test(q)){
        return "Use the Download Resume button at the top of the portfolio to open Lucky's resume.";
    }

    return "I can help with Lucky's profile, skills, projects, education, internship, certificates and contact details. Try asking: What projects has Lucky built?";
}

async function getAiAnswer(question){
    // Optional live-AI integration: create a server endpoint at POST /api/chat
    // that returns JSON in the format { reply: "..." }. The local answer bank
    // keeps this static portfolio useful until that backend is connected.
    try{
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: question, history: aiHistory })
        });

        if(response.ok){
            const data = await response.json();
            if(data.reply) return data.reply;
        }
    }catch(error){
        // Static hosting normally has no API endpoint, so use local answers.
    }

    return localPortfolioAnswer(question);
}

async function askAssistant(question){
    const cleanQuestion = question.trim();
    if(!cleanQuestion) return;

    toggleAssistant(true);
    addAiMessage(cleanQuestion, "user");
    aiHistory.push({ role: "user", content: cleanQuestion });

    const typing = addAiMessage("Thinking...", "assistant");
    typing.classList.add("ai-typing");

    const answer = await getAiAnswer(cleanQuestion);
    typing.remove();
    addAiMessage(answer, "assistant");
    aiHistory.push({ role: "assistant", content: answer });
    speakAnswer(answer);
}

aiForm.addEventListener("submit", event=>{
    event.preventDefault();
    const question = aiInput.value;
    aiInput.value = "";
    askAssistant(question);
});

document.querySelectorAll("[data-question]").forEach(button=>{
    button.addEventListener("click", ()=>askAssistant(button.dataset.question));
});

aiVoiceToggle.addEventListener("click", ()=>{
    aiVoiceEnabled = !aiVoiceEnabled;
    aiVoiceToggle.classList.toggle("active", !aiVoiceEnabled);
    aiVoiceToggle.setAttribute("aria-label", aiVoiceEnabled ? "Turn voice replies off" : "Turn voice replies on");
    aiVoiceToggle.title = aiVoiceEnabled ? "Voice replies on" : "Voice replies off";
    aiVoiceToggle.innerHTML = aiVoiceEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

    if(!aiVoiceEnabled && "speechSynthesis" in window){
        window.speechSynthesis.cancel();
    }
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.addEventListener("start", ()=>aiMic.classList.add("listening"));
    recognition.addEventListener("end", ()=>aiMic.classList.remove("listening"));
    recognition.addEventListener("error", ()=>aiMic.classList.remove("listening"));
    recognition.addEventListener("result", event=>{
        aiInput.value = event.results[0][0].transcript;
        aiForm.requestSubmit();
    });

    aiMic.addEventListener("click", ()=>{
        try{ recognition.start(); }catch(error){}
    });
}else{
    aiMic.style.display = "none";
}
