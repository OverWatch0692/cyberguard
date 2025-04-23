// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Toggle active class for team tabs
    const teamTabs = document.querySelectorAll('.team-tab');
    const teamContents = document.querySelectorAll('.team-content');

    teamTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            teamTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all content sections
            teamContents.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding content
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Show success message with animation
                subscribeBtn.innerHTML = '<span class="loading"></span>';
                
                // Simulate API call
                setTimeout(() => {
                    subscribeBtn.innerHTML = 'Subscribed!';
                    subscribeBtn.classList.add('btn-success');
                    emailInput.value = '';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        subscribeBtn.innerHTML = 'Subscribe';
                        subscribeBtn.classList.remove('btn-success');
                    }, 3000);
                }, 1500);
            } else {
                // Show error with shake animation
                emailInput.classList.add('is-invalid');
                subscribeBtn.classList.add('btn-danger');
                
                // Remove error classes after animation
                setTimeout(() => {
                    emailInput.classList.remove('is-invalid');
                    subscribeBtn.classList.remove('btn-danger');
                }, 1000);
            }
        });
    }

    // Validate email format
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Interactive security meter animation
    const securityMeters = document.querySelectorAll('.security-meter');
    
    if (securityMeters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const levelBar = entry.target.querySelector('.security-level');
                    levelBar.style.width = levelBar.getAttribute('data-width');
                }
            });
        });
        
        securityMeters.forEach(meter => {
            observer.observe(meter);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Team expert card hover effect
    const expertCards = document.querySelectorAll('.expert-card');
    
    expertCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle rotation
            card.style.transform = 'translateY(-10px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transformation
            card.style.transform = '';
        });
    });

    // Red team interactive diagrams
    const diagrams = document.querySelectorAll('.interactive-diagram');
    
    diagrams.forEach(diagram => {
        const hotspots = diagram.querySelectorAll('.hotspot');
        
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('click', () => {
                // Hide all tooltips first
                diagram.querySelectorAll('.tooltip-content').forEach(tooltip => {
                    tooltip.classList.remove('active');
                });
                
                // Show the clicked hotspot's tooltip
                const tooltipId = hotspot.getAttribute('data-tooltip');
                const tooltip = document.getElementById(tooltipId);
                
                if (tooltip) {
                    tooltip.classList.add('active');
                }
            });
        });
    });

    // Toggle dark/light mode
    const modeToggle = document.getElementById('mode-toggle');
    
    if (modeToggle) {
        modeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        });
        
        // Check for saved user preference
        const savedMode = localStorage.getItem('darkMode');
        
        if (savedMode === 'enabled') {
            document.body.classList.add('dark-mode');
            modeToggle.checked = true;
        }
    }

    // Animated counters for stats
    const animateCounter = (counter, target) => {
        let current = 0;
        const increment = target > 100 ? Math.ceil(target / 100) : 1;
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = current;
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };
    
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        const counters = statsSection.querySelectorAll('.counter');
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entries[0].target);
            }
        });
        
        statsObserver.observe(statsSection);
    }

    // Security assessment tool
    const assessmentForm = document.getElementById('security-assessment');
    
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(assessmentForm);
            let score = 0;
            
            // Calculate security score (example logic)
            if (formData.get('firewall') === 'yes') score += 20;
            if (formData.get('updates') === 'yes') score += 15;
            if (formData.get('authentication') === 'mfa') score += 25;
            else if (formData.get('authentication') === 'password') score += 10;
            if (formData.get('backup') === 'yes') score += 20;
            if (formData.get('training') === 'yes') score += 20;
            
            // Display result
            const resultElement = document.getElementById('assessment-result');
            let securityLevel = '';
            let recommendations = '';
            
            if (score < 40) {
                securityLevel = 'High Risk';
                recommendations = 'Your security posture needs immediate attention. We recommend implementing multi-factor authentication, regular security updates, and employee training as soon as possible.';
            } else if (score < 70) {
                securityLevel = 'Moderate Risk';
                recommendations = 'Your security posture has some good measures but still needs improvement. Focus on enhancing authentication methods and ensuring regular backups.';
            } else {
                securityLevel = 'Low Risk';
                recommendations = 'Your security posture is strong. Continue maintaining your current practices and consider advanced threat detection for even better protection.';
            }
            
            resultElement.innerHTML = `
                <div class="alert ${score < 40 ? 'alert-danger' : score < 70 ? 'alert-warning' : 'alert-success'}">
                    <h4>Your Security Score: ${score}/100</h4>
                    <p><strong>Security Level:</strong> ${securityLevel}</p>
                    <p><strong>Recommendations:</strong> ${recommendations}</p>
                </div>
            `;
            
            resultElement.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Testimonial carousel functionality
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected testimonial
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonialItems.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 5000);
    }

    // Interactive security chart (placeholder for chart.js integration)
    const securityChartCanvas = document.getElementById('security-threats-chart');
    
    if (securityChartCanvas) {
        // This would typically use Chart.js, but we're including just the setup code
        console.log('Security chart would be initialized here');
        
        // Example data structure for the chart
        const threatData = {
            labels: ['Phishing', 'Malware', 'DDoS', 'Insider Threats', 'Ransomware'],
            datasets: [{
                label: 'Threat Frequency (%)',
                data: [35, 25, 15, 10, 15],
                backgroundColor: [
                    'rgba(255, 75, 85, 0.7)',
                    'rgba(62, 123, 250, 0.7)',
                    'rgba(151, 71, 255, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(76, 175, 80, 0.7)'
                ]
            }]
        };
        
        // Chart.js would be initialized here
    }
});