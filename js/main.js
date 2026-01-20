
document.addEventListener("DOMContentLoaded", function () {

    // Smooth Scroll for Navbar Links
const navLinks = document.querySelectorAll('#navbar nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});


// Fade-in sections on scroll
const faders = document.querySelectorAll('section');
const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('fade-in');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    fader.classList.add('fade-section');
    appearOnScroll.observe(fader);
});

// Lightbox for Gallery
const galleryImgs = document.querySelectorAll('#gallery .img-gallery img');
galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background: rgba(0,0,0,0.8);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:1000;
        `;
        const lightImg = document.createElement('img');
        lightImg.src = img.src;
        lightImg.style.cssText = `
            max-width:90%;
            max-height:90%;
            border-radius:10px;
        `;
        lightbox.appendChild(lightImg);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// Form Validation
const form = document.querySelector('#contact form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

form.addEventListener('submit', function(e){
    let errors = [];

    // التحقق من الاسم
    if(nameInput.value.trim() === ''){
        errors.push('Please enter your name');
    }

    // التحقق من البريد الإلكتروني باستخدام Regex
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(emailInput.value.trim() === ''){
        errors.push('Please enter your email');
    } else if(!emailPattern.test(emailInput.value.trim())){
        errors.push('Please enter a valid email');
    }

    // subjectالتحقق من
    if(subjectInput.value.trim() === ''){
        errors.push('Please enter a subject');
    }

    // التحقق من الرسالة
    if(messageInput.value.trim() === ''){
        errors.push('Please enter a message');
    }

    // إذا كان هناك أخطاء، منع الإرسال وعرض رسالة
    if(errors.length > 0){
        e.preventDefault();
        alert(errors.join('\n'));
    }
});


// Back to Top Button
const backToTop = document.createElement('button');
backToTop.textContent = '⬆';
backToTop.id = 'backToTop';
backToTop.style.cssText = `
position: fixed;
bottom: 40px;
right: 40px;
padding: 8px 12px;
font-size: 25px;
border:none;
border-radius:50%;
background:#e4b95b;
color:#fff;
cursor:pointer;
display:none;
z-index:999;
`;
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 500) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});


});