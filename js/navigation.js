$(document).ready(function() {
    // Custom breakpoint management
    function checkScreenSize() {
        if ($(window).width() >= 1480) {
            // Desktop mode
            $('.navbar-mobile-section').hide();
            $('.navbar-collapse-custom').show().css('display', 'flex');
            $('.desktop-only').show();
            $('.mobile-only').hide();
        } else {
            // Mobile mode
            $('.navbar-mobile-section').show();
            $('.navbar-collapse-custom').hide();
            $('.desktop-only').hide();
            $('.mobile-only').show();
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Check on window resize
    $(window).resize(function() {
        checkScreenSize();
        // Close mobile menu on resize to desktop
        if ($(window).width() >= 1480) {
            $('.navbar-collapse-custom').removeClass('show');
        }
    });
    
    // Custom toggle button functionality
    $('.custom-toggler').on('click', function(e) {
        e.preventDefault();
        $('.navbar-collapse-custom').toggleClass('show');
        $(this).toggleClass('active');
    });
    
    // Dropdown toggle for mobile
    $('.dropdown-toggle').on('click', function(e) {
        if ($(window).width() < 1480) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            $('.dropdown-menu').not($(this).next()).removeClass('show').slideUp(200);
            $('.dropdown-arrow').not($(this).find('.dropdown-arrow')).css('transform', 'rotate(0deg)');
            
            // Toggle current dropdown
            const $menu = $(this).next('.dropdown-menu');
            const $arrow = $(this).find('.dropdown-arrow');
            
            if ($menu.hasClass('show')) {
                $menu.removeClass('show').slideUp(200);
                $arrow.css('transform', 'rotate(0deg)');
            } else {
                $menu.addClass('show').slideDown(200);
                $arrow.css('transform', 'rotate(180deg)');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#mainNav').length) {
            $('.navbar-collapse-custom').removeClass('show');
            $('.custom-toggler').removeClass('active');
        }
    });
    
    // Scroll effect for navigation
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });
    
    // Desktop dropdown hover (above 1480px)
    if ($(window).width() >= 1480) {
        $('.dropdown').on('mouseenter', function() {
            $(this).find('.dropdown-menu').stop(true, true).fadeIn(200);
            $(this).find('.dropdown-arrow').css('transform', 'rotate(180deg)');
        }).on('mouseleave', function() {
            $(this).find('.dropdown-menu').stop(true, true).fadeOut(200);
            $(this).find('.dropdown-arrow').css('transform', 'rotate(0deg)');
        });
    }
    
    // Prevent dropdown links from closing menu on mobile
    $('.dropdown-item').on('click', function(e) {
        if ($(window).width() < 1480) {
            e.stopPropagation();
        }
    });
});

// Popular Cities Section JavaScript
$(document).ready(function() {
    // Add click handler for city cards
    $('.city-card').on('click', function() {
        const cityName = $(this).find('.city-name').text().toLowerCase();
        // Redirect to city-specific page or open modal
        console.log('Navigating to ' + cityName + ' properties');
        // window.location.href = '/properties/' + cityName;
    });
    
    // Animate on scroll (optional)
    function animateCitiesOnScroll() {
        const scrollPosition = $(window).scrollTop() + $(window).height();
        const citiesSection = $('.popular-cities').offset().top;
        
        if (scrollPosition > citiesSection + 100) {
            $('.city-card').each(function(index) {
                const card = $(this);
                setTimeout(function() {
                    card.addClass('animate-in');
                }, index * 100);
            });
        }
    }
    
    // Check on scroll
    $(window).on('scroll', animateCitiesOnScroll);
    
    // Check on load
    animateCitiesOnScroll();
});

// Featured Projects Section JavaScript
$(document).ready(function() {
    // City tab switching
    $('.city-tab').on('click', function() {
        const city = $(this).data('city');
        
        // Update active tab
        $('.city-tab').removeClass('active');
        $(this).addClass('active');
        
        // Show corresponding projects
        $('.tab-content').removeClass('active').hide();
        $('#' + city + '-projects').addClass('active').fadeIn(300);
    });
    
    // View Details button click
    $('.project-card .btn-primary').on('click', function(e) {
        e.preventDefault();
        const projectName = $(this).closest('.project-card').find('.project-name').text();
        console.log('Viewing details for:', projectName);
        // Add navigation logic here
    });
    
    // View All button click
    $('.view-all-btn').on('click', function() {
        const city = $('.city-tab.active').text();
        console.log('Viewing all projects in:', city);
        // Add navigation logic here
    });
    
    // Make tabs horizontally scrollable on mobile
    if ($(window).width() < 1200) {
        $('.city-tabs-wrapper').on('scroll', function() {
            // Optional: Add scroll indicators
        });
    }
});

// Featured Projects - Horizontal Scroll for Mobile
$(document).ready(function() {
    // Update scroll dots based on scroll position
    function updateScrollDots() {
        $('.projects-scroll-wrapper').each(function() {
            const $wrapper = $(this);
            const $dots = $wrapper.siblings('.scroll-dots').find('.dot');
            
            if ($dots.length === 0) return;
            
            const scrollLeft = $wrapper.scrollLeft();
            const cardWidth = $wrapper.find('.project-card-wrapper').first().outerWidth(true);
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            $dots.removeClass('active');
            $dots.eq(activeIndex).addClass('active');
        });
    }
    
    // Dot click navigation
    $(document).on('click', '.scroll-dots .dot', function() {
        const index = $(this).data('index');
        const $wrapper = $(this).closest('.projects-scroll-container').find('.projects-scroll-wrapper');
        const $card = $wrapper.find('.project-card-wrapper').eq(index);
        
        if ($card.length) {
            const scrollPosition = $card.position().left + $wrapper.scrollLeft() - 15;
            $wrapper.animate({
                scrollLeft: scrollPosition
            }, 300);
        }
    });
    
    // Update dots on scroll
    $('.projects-scroll-wrapper').on('scroll', function() {
        updateScrollDots();
    });
    
    // City tab switching
    $('.city-tab').on('click', function() {
        const city = $(this).data('city');
        
        // Update active tab
        $('.city-tab').removeClass('active');
        $(this).addClass('active');
        
        // Show corresponding projects
        $('.tab-content').removeClass('active').hide();
        $('#' + city + '-projects').addClass('active').fadeIn(300);
        
        // Reset scroll position for new tab
        $('#' + city + '-projects').find('.projects-scroll-wrapper').scrollLeft(0);
        updateScrollDots();
    });
    
    // Touch swipe support
    let isDown = false;
    let startX;
    let scrollLeft;
    
    $('.projects-scroll-wrapper').on('mousedown touchstart', function(e) {
        isDown = true;
        const pageX = e.pageX || e.originalEvent.touches[0].pageX;
        startX = pageX - $(this).offset().left;
        scrollLeft = $(this).scrollLeft();
    });
    
    $('.projects-scroll-wrapper').on('mouseleave touchend mouseup', function() {
        isDown = false;
    });
    
    $('.projects-scroll-wrapper').on('mousemove touchmove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const pageX = e.pageX || e.originalEvent.touches[0].pageX;
        const x = pageX - $(this).offset().left;
        const walk = (x - startX) * 2;
        $(this).scrollLeft(scrollLeft - walk);
    });
    
    // Initialize on load
    updateScrollDots();
    
    // Handle window resize
    $(window).resize(function() {
        updateScrollDots();
    });
});

// Stakeholder Gateway JavaScript
$(document).ready(function() {
    // Tab animation on switch
    $('.stakeholder-tabs .nav-link').on('shown.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        
        // Animate service cards on tab change
        $(target).find('.services-grid .col-lg-4').each(function(index) {
            $(this).css('animation-delay', (index * 0.1) + 's');
            $(this).css('animation', 'slideInUp 0.5s ease backwards');
        });
    });
    
    // Service card hover effect
    $('.service-card').on('mouseenter', function() {
        $(this).find('.service-icon-box').addClass('animate-pulse');
    }).on('mouseleave', function() {
        $(this).find('.service-icon-box').removeClass('animate-pulse');
    });
});

// Force tab content to be visible
$(document).ready(function() {
    // Ensure active tab content is visible
    $('.stakeholder-tabs .nav-link').on('shown.bs.tab', function(e) {
        $('.tab-pane').hide();
        const target = $(e.target).attr('href');
        $(target).show();
    });
    
    // Initialize first tab as visible
    $('.tab-pane.active').show();
});
// Stakeholder Gateway - Mobile Dropdown Functionality
$(document).ready(function() {
    // Mobile dropdown selection
    $('.stakeholder-dropdown-menu .dropdown-item').on('click', function(e) {
        e.preventDefault();
        
        // Update dropdown button text
        const selectedText = $(this).text();
        $('.dropdown-label').text(selectedText);
        
        // Update active state
        $('.stakeholder-dropdown-menu .dropdown-item').removeClass('active');
        $(this).addClass('active');
        
        // Get target content
        const target = $(this).data('target');
        
        // Hide all tab panes
        $('.stakeholder-gateway .tab-pane').removeClass('show active');
        
        // Show selected tab pane
        $(target).addClass('show active');
        
        // Close dropdown
        $('.btn-dropdown').dropdown('toggle');
        
        // Scroll to content (smooth)
        $('html, body').animate({
            scrollTop: $('.stakeholder-content').offset().top - 100
        }, 300);
    });
    
    // Sync desktop tabs with mobile dropdown
    $('.stakeholder-tabs .nav-link').on('shown.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        const dropdownText = $(`.stakeholder-dropdown-menu .dropdown-item[data-target="${target}"]`).text();
        
        // Update dropdown to match
        $('.dropdown-label').text(dropdownText);
        $('.stakeholder-dropdown-menu .dropdown-item').removeClass('active');
        $(`.stakeholder-dropdown-menu .dropdown-item[data-target="${target}"]`).addClass('active');
    });
    
    // Initialize first tab on mobile
    if ($(window).width() < 768) {
        $('#buyers-content').addClass('show active');
    }
});

// Ecosystem Cards Interaction
$(document).ready(function() {
    $('.ecosystem-card').on('click', function() {
        const title = $(this).find('.ecosystem-title').text();
        // Add navigation logic here
        console.log('Navigate to:', title);
        
        // Optional: Add ripple effect
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 600);
    });
});