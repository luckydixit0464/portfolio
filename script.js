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

"Software Developer",

"B.Tech CSE Student (AI/ML)",

"Python Programmer",

"Machine Learning Enthusiast",

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