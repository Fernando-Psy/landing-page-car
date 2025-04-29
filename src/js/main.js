
        // Menu Toggle
        const menuButton = document.querySelector('.header__menu-button');
        const navList = document.querySelector('.header__nav-list');

        menuButton.addEventListener('click', () => {
            navList.classList.toggle('header__nav-list--active');
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navList.classList.contains('header__nav-list--active')) {
                    navList.classList.remove('header__nav-list--active');
                }
            });
        });

        // Header Scroll Effect
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });

        // Countdown Timer
        const countdownDate = new Date('June 15, 2025 19:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Vehicles Filter
        const vehicleTabs = document.querySelectorAll('.vehicles__tab');
        const vehicles = document.querySelectorAll('.vehicle');

        vehicleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                vehicleTabs.forEach(t => t.classList.remove('vehicles__tab--active'));
                tab.classList.add('vehicles__tab--active');

                // Filter vehicles
                const category = tab.dataset.category;

                vehicles.forEach(vehicle => {
                    if (category === 'all' || vehicle.dataset.category === category) {
                        vehicle.style.display = 'block';
                    } else {
                        vehicle.style.display = 'none';
                    }
                });
            });
        });

        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');

            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('faq__item--active')) {
                        otherItem.classList.remove('faq__item--active');
                    }
                });

                // Toggle current item
                item.classList.toggle('faq__item--active');
            });
        });

        // Scroll Animation
        function checkScroll() {
            const elements = [
                ...document.querySelectorAll('.attraction'),
                ...document.querySelectorAll('.vehicle'),
                ...document.querySelectorAll('.store'),
                ...document.querySelectorAll('.faq__item')
            ];

            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100) {
                    // Add class based on element type
                    if (element.classList.contains('attraction')) {
                        element.classList.add('attraction--visible');
                    } else if (element.classList.contains('vehicle')) {
                        element.classList.add('vehicle--visible');
                    } else if (element.classList.contains('store')) {
                        element.classList.add('store--visible');
                    } else if (element.classList.contains('faq__item')) {
                        element.classList.add('faq__item--visible');
                    }
                }
            });
        }

        // Initial check and add scroll event listener
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        checkScroll();
