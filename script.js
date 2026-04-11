// Custom Cursor - Arrow Pointer
(function() {
    const cursor = document.querySelector('.cursor');

    if (!cursor) return;

    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .social-link, .contact-item, .nav-link');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
})();

// Smooth background parallax on mouse move
(function() {
    const bgGradient = document.querySelector('.bg-gradient');

    if (bgGradient) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;

            bgGradient.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });
    }
})();

// 3D Canvas Particle Network with Space Effect
(function() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let distantStars = [];
    
    // Config
    const particleCount = 100;
    const starCount = 400;
    const maxDistance = 150;
    
    // Mouse tracking
    let mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    document.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });
    
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    function init() {
        resize();
        window.addEventListener('resize', resize);
        
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        distantStars = [];
        for (let i = 0; i < starCount; i++) {
            distantStars.push(new DistantStar());
        }
        
        requestAnimationFrame(animate);
    }
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    class DistantStar {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 0.4 + 0.1; // Deep depth
            this.size = this.z * 1.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        draw() {
            const dx = mouse.x !== -1000 ? (mouse.x - width / 2) * 0.002 * this.z : 0;
            const dy = mouse.y !== -1000 ? (mouse.y - height / 2) * 0.002 * this.z : 0;
            const scrollOffset = scrollY * 0.1 * this.z;
            
            let drawX = (this.x - dx) % width;
            if (drawX < 0) drawX += width;
            
            let drawY = (this.y - dy - scrollOffset) % height;
            if (drawY < 0) drawY += height;
            
            ctx.beginPath();
            ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 2 + 0.6; // Closer depth
            this.size = this.z * 1.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, ' : 'rgba(0, 240, 255, ';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
            
            const dx = mouse.x !== -1000 ? (mouse.x - width / 2) * 0.01 * this.z : 0;
            const dy = mouse.y !== -1000 ? (mouse.y - height / 2) * 0.01 * this.z : 0;
            const scrollOffset = scrollY * 0.3 * this.z;
            
            this.drawX = (this.x - dx) % width;
            if (this.drawX < 0) this.drawX += width;
            
            this.drawY = (this.y - dy - scrollOffset) % height;
            if (this.drawY < 0) this.drawY += height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.drawX, this.drawY, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.5)';
            ctx.fill();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < distantStars.length; i++) {
            distantStars[i].draw();
        }
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            if (mouse.x !== -1000) {
                const dx = mouse.x - particles[i].drawX;
                const dy = mouse.y - particles[i].drawY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color + (1 - distance / maxDistance) + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particles[i].drawX, particles[i].drawY);
                    ctx.stroke();
                    
                    particles[i].x += dx * 0.002;
                    particles[i].y += dy * 0.002;
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
})();

// Mobile Menu Toggle
(function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
})();

// Fade-in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(entry.target.dataset.delay || 0));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    fadeElements.forEach((element) => {
        const isGridItem = element.closest('.projects-grid') || element.closest('.timeline');
        if (isGridItem && !element.dataset.delay) {
            const siblings = Array.from(element.parentNode.children).filter(el => el.classList.contains('fade-in'));
            const childIndex = siblings.indexOf(element);
            element.dataset.delay = (childIndex * 150).toString();
        }
        observer.observe(element);
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Add more shapes on scroll to create dynamic background
    const body = document.body;
    const shapeColors = [
        'rgba(65, 88, 208, 0.15)',
        'rgba(200, 80, 192, 0.15)',
        'rgba(255, 204, 112, 0.18)',
        'rgba(80, 150, 255, 0.12)'
    ];
    
    const borderRadiusVariations = [
        '30% 70% 70% 30% / 30% 30% 70% 70%',
        '64% 36% 27% 73% / 55% 58% 42% 45%',
        '41% 59% 37% 63% / 44% 42% 58% 56%',
        '59% 41% 52% 48% / 44% 59% 41% 56%',
        '38% 62% 63% 37% / 41% 44% 56% 59%'
    ];
    
    function createRandomShape() {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        // Random size between 40px and 100px
        const size = Math.floor(Math.random() * 60) + 40;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Random position
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        
        // Random border radius for organic shape
        const randomBorderRadius = borderRadiusVariations[Math.floor(Math.random() * borderRadiusVariations.length)];
        shape.style.borderRadius = randomBorderRadius;
        
        // Random color
        const randomColor = shapeColors[Math.floor(Math.random() * shapeColors.length)];
        shape.style.backgroundColor = randomColor;
        
        // Random animation delay
        shape.style.animationDelay = `${Math.random() * 20}s`;
        
        // Set lower opacity
        shape.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        // Add to body
        body.appendChild(shape);
        
        // Remove after animation completes
        setTimeout(() => {
            shape.remove();
        }, 30000); // 30 seconds
    }

    // Create a new shape occasionally on scroll
    let lastScrollTop = 0;
    let throttled = false;
    
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        
        // Only proceed if we've scrolled more than 100px and throttle is not active
        if (!throttled && Math.abs(currentScrollTop - lastScrollTop) > 100) {
            throttled = true;
            
            // 25% chance of creating a shape
            if (Math.random() < 0.25) {
                createRandomShape();
            }
            
            lastScrollTop = currentScrollTop;
            
            // Reset throttle after 500ms
            setTimeout(() => {
                throttled = false;
            }, 500);
        }
    });

    // Create a few random shapes on load
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createRandomShape();
        }, i * 1000); // Stagger creation
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip for "#" links
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3D Card Tilt Effect
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const multiplier = 10;
            const xRotate = -y / rect.height * multiplier;
            const yRotate = x / rect.width * multiplier;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".typing-cursor");

    if (typedTextSpan && cursorSpan) {
        const textArray = ["Application Support Analyst", "Problem Solver", "Tech Enthusiast"];
        const typingDelay = 100;
        const erasingDelay = 40;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }

        setTimeout(type, newTextDelay);
    }
});

// Slight parallax effect on decorative elements
window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelectorAll('.floating-shape').forEach((shape) => {
        const speed = Math.random() * 1.5 + 0.5;
        shape.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
});

