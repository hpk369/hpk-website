// Fade-in animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
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

// Type writer effect for the name
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, Math.random() * 100 + 50); // Random typing speed for more natural effect
            }
        }
        
        // Start typewriter animation after a brief delay
        setTimeout(typeWriter, 500);
    }
});
