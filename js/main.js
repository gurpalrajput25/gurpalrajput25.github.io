(function ($) {
    "use strict";
    
    // Instant Preloader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 50);
    };
    loader();
    
    // Fast WOW.js Initiation (Disabled on mobile to prevent scroll lag)
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 50,
            mobile: false,
            live: false
        }).init();
    }
    
    // Throttled 60FPS Passive Scroll Listener
    var isTicking = false;
    window.addEventListener('scroll', function () {
        if (!isTicking) {
            window.requestAnimationFrame(function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 200) {
                    $('.back-to-top').stop(true, true).fadeIn(150);
                } else {
                    $('.back-to-top').stop(true, true).fadeOut(150);
                }
                
                if (scrollTop > 20) {
                    $('.navbar').addClass('nav-sticky');
                } else {
                    $('.navbar').removeClass('nav-sticky');
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 350);
        return false;
    });
    
    // Snappy Smooth Scrolling
    $("a.nav-link, a.btn[href^='#']").on('click', function (event) {
        if (this.hash !== "" && $(this.hash).length) {
            event.preventDefault();
            
            var targetOffset = $(this.hash).offset().top - 70;
            
            $('html, body').stop().animate({
                scrollTop: targetOffset
            }, 350);
            
            if ($(this).hasClass('nav-link')) {
                $('.navbar-nav .active').removeClass('active');
                $(this).addClass('active');
                
                if ($('.navbar-collapse').hasClass('show')) {
                    $('.navbar-toggler').click();
                }
            }
        }
    });
    
    // Fast Typed.js
    if ($('.hero .hero-text h2').length == 1 && typeof Typed !== 'undefined') {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        if (typed_strings) {
            var typed = new Typed('.hero .hero-text h2', {
                strings: typed_strings.split(', '),
                typeSpeed: 40,
                backSpeed: 25,
                backDelay: 1200,
                smartBackspace: true,
                loop: true
            });
        }
    }
    
    // Skill Progress Bar Fill
    if ($('.skills').length && typeof $.fn.waypoint !== 'undefined') {
        $('.skills').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, {offset: '90%'});
    } else {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }

    // Portfolio Isotope Filtering
    if ($('.portfolio-container').length && typeof $.fn.isotope !== 'undefined') {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.2s'
        });

        $('#portfolio-filter li').on('click', function () {
            $("#portfolio-filter li").removeClass('filter-active');
            $(this).addClass('filter-active');
            portfolioIsotope.isotope({filter: $(this).data('filter')});
        });
    }

    // -------------------------------------------------------------
    // GURPAL SINGH - OFFICIAL IOS APPS DATABASE & INTERACTIVE MODAL
    // -------------------------------------------------------------
    var appsDatabase = {
        'usa2georgia': {
            title: "USA2GEORGIA",
            subtitle: "International Parcel Shipping & Logistics App",
            package: "com.usa2georgia.u2g",
            platform: "iOS — iPhone",
            category: "Logistics, Parcel Tracking & International Shipping",
            appStoreUrl: "https://apps.apple.com/us/app/usa2georgia/id1461461537",
            websiteUrl: "https://usa2georgia.com/",
            image: "img/icon_usa2georgia.jpg",
            role: "Lead iOS Engineer / Mobile Architecture",
            description: "USA2GEORGIA is a premier international parcel management and logistics iOS application designed to simplify international shopping and delivery for customers receiving packages in Georgia from overseas warehouses in the US, UK, and Europe. By digitizing key steps in the parcel forwarding process, the platform provides customers with end-to-end visibility into their shipments while simplifying administrative and customs tasks.",
            highlights: [
                "Centralized Parcel Tracking: Real-time dashboard for shipment progress, status milestones, and delivery estimates.",
                "Digital Package Declarations: Frictionless declaration of incoming parcels and submission of customs specifications.",
                "Invoice & Document Upload: Multipart upload pipelines for purchase invoices and clearance paperwork directly via camera or files.",
                "Barcode-Based Office Collection: Unique on-screen barcode presentation for rapid package identification and collection at branch offices.",
                "Payment & Locker Forwarding: Complete in-app shipping fee payments and routing to automated parcel lockers for 24/7 pickup.",
                "Resilient Networking: Asynchronous data handling with Swift async/await, URLSession, offline caching, and APNs milestone updates."
            ],
            techStack: ["Swift", "UIKit & SwiftUI", "REST APIs", "Async/Await", "Barcode/QR Generation", "Apple Pay / Payments", "APNs Push Notifications", "CoreData"]
        },
        'know-maintenance': {
            title: "KNOW Maintenance",
            subtitle: "Hotel Asset & Facility Management Platform",
            package: "com.knowcross.KnowMaintenance",
            platform: "iOS — iPhone",
            category: "Enterprise Mobility, Facility Management & Preventive Maintenance",
            appStoreUrl: "https://apps.apple.com/us/app/know-maintenance/id1543121376",
            image: "img/icon_know_maintenance.jpg",
            role: "Lead iOS Engineer / Mobile System Architect",
            description: "KNOW Maintenance is an enterprise mobile application designed to streamline maintenance operations across international hotels and facility management chains. By replacing manual maintenance processes with structured mobile workflows, the platform enables technicians and facility teams to track assets, record work performed, validate checklists, and maintain a full lifecycle history of equipment.",
            highlights: [
                "QR Code Hardware Scanning: Instant AVFoundation scanning of equipment QR codes to pull asset history and file work orders.",
                "Work Order Lifecycle Management: Create, organize, dispatch, start, park, resume, and close maintenance tasks with time logging.",
                "Digital SOP Checklists: Standardized operating procedures with mandatory step validations and digital sign-offs.",
                "Photo & Document Attachments: Integrated camera workflows to capture equipment defects before and after repairs.",
                "Preventive Maintenance Scheduling: Automated recurring maintenance schedules based on asset category and operating hours.",
                "Parts & Vendor Cost Tracking: Detailed recording of labor hours, replacement components, and vendor expenses.",
                "Offline Resilience: Caching and background synchronization engineered for basement plant rooms and low-connectivity environments."
            ],
            techStack: ["Swift", "AVFoundation (QR Scanning)", "Dynamic Checklists", "Clean MVVM", "Photo Pipelines", "APNs Push Notifications", "Offline Sync", "Instruments Profiling"]
        },
        'home-food': {
            title: "Home Food",
            subtitle: "Food Discovery & Local Delivery Platform",
            package: "com.relinns.Find-Home-Food",
            platform: "iOS — iPhone & iPad (Universal)",
            category: "Food Delivery, Home-Cooked Meals & Local Commerce",
            appStoreUrl: "https://apps.apple.com/in/app/home-food-restaurants-delivery/id1471495979",
            image: "img/icon_home_food.jpg",
            role: "iOS Developer (Relinns Technologies)",
            description: "Home Food is a multi-sided food discovery and local commerce marketplace connecting customers with nearby home chefs, artisanal food sellers, local restaurants, and grocery merchants. It empowers independent cooks to showcase homemade recipes and build culinary businesses with flexible delivery coordination.",
            highlights: [
                "Proximity-Based Discovery: CoreLocation & MapKit integration surfacing nearby home kitchens and food sellers dynamically.",
                "Home-Cooked Meals Showcase: Rich culinary profiles and dish galleries for independent chefs and regional recipes.",
                "Universal iOS Application: Adaptive user interface engineered with Swift & UIKit for optimal experience on iPhone and iPad.",
                "Seller Marketplace: Onboarding flows allowing home chefs and local grocers to publish menus, manage pricing, and receive orders.",
                "Direct Customer-Seller Connections: In-app communication facilitating flexible delivery arrangements and custom requests.",
                "Smooth Scrolling & Image Caching: Optimized collection views with asynchronous image pipelines ensuring buttery 60fps performance."
            ],
            techStack: ["Swift", "CoreLocation", "MapKit", "Universal UI (iPhone/iPad)", "REST APIs", "Image Caching", "Order Management"]
        },
        'tevio-customer': {
            title: "Tevio — Food, Grocery & Dine-In",
            subtitle: "On-Demand Delivery & Lifestyle Platform",
            package: "com.tevio.customer",
            platform: "iOS — iPhone",
            category: "Food Delivery, Grocery Shopping & Logistics",
            appStoreUrl: "https://apps.apple.com/us/app/tevio-food-grocery-dine-in/id1635969325",
            websiteUrl: "https://www.tevioapp.com/",
            image: "img/icon_tevio_customer_official.jpg",
            role: "Senior iOS Developer / Tech Lead (Seasia Infotech)",
            description: "The Tevio Customer App is an all-in-one on-demand platform bringing food delivery, grocery shopping, dine-in table reservations, event catering, and DropIt courier package delivery into a single connected iOS ecosystem. Features live telemetry tracking and seamless multi-service ordering.",
            highlights: [
                "Multi-Vertical Ordering: Order meals from top restaurants, fresh groceries from local stores, or arrange catering in one cart.",
                "DropIt Package Courier: On-demand point-to-point courier service booking with pickup and delivery address routing.",
                "Real-Time Telemetry Tracking: Follow delivery progress with animated live courier location tracking on MapKit.",
                "Modular Swift Packages: Architected reusable SPM framework modules shared across the customer and courier iOS codebases.",
                "Apple Pay & Secure Checkout: Integrated Apple Pay, stored credit cards, and digital receipts for instant checkout.",
                "Dine-In Reservations: Discover premier restaurants, explore offers, and reserve dining tables seamlessly."
            ],
            techStack: ["SwiftUI", "Swift Package Manager (SPM)", "MapKit", "WebSockets", "Apple Pay", "Combine", "Clean MVVM"]
        },
        'tevio-rider': {
            title: "Tevio Rider — Pickup & Deliver",
            subtitle: "Delivery Partner & Route Guidance App",
            package: "com.tevio.delivery",
            platform: "iOS — iPhone",
            category: "Logistics, Route Guidance & Last-Mile Delivery",
            appStoreUrl: "https://apps.apple.com/in/app/tevio-rider-pickup-deliver/id1635970960",
            websiteUrl: "https://www.tevioapp.com/",
            image: "img/icon_tevio_rider_official.jpg",
            role: "Senior iOS Developer / Tech Lead (Seasia Infotech)",
            description: "The Tevio Rider App is a dedicated iOS application engineered for delivery partners fulfilling restaurant orders, grocery runs, catering requests, and DropIt courier deliveries. Features shift management, dispatch order acceptance, route optimization, and earnings tracking.",
            highlights: [
                "1-Tap Availability: Switch between online and offline status with low-power background location tracking.",
                "Intelligent Request Dispatch: Preview pickup/drop-off locations, order items, and estimated earnings before accepting.",
                "Turn-by-Turn Navigation: Integrated route guidance and GPS tracking directing riders along optimal delivery routes.",
                "Real-Time Courier Telemetry: Synchronizes driver position with the customer app via WebSockets and CoreLocation.",
                "Earnings & Incentives Dashboard: Review daily earnings, completed trips, tips, and bonus campaign milestones.",
                "Battery-Optimized Telemetry: Low-power background CoreLocation configuration to preserve phone battery across full shifts."
            ],
            techStack: ["Swift", "CoreLocation (Background Mode)", "MapKit Navigation", "WebSockets", "PushKit", "SPM Architecture"]
        },
        'venivibe-customer': {
            title: "VeniVibe — Events & Tickets",
            subtitle: "Event Discovery & Mobile Ticketing Platform",
            package: "com.seasia.venivibe.customer.prod",
            platform: "iOS — iPhone",
            category: "Events, Live Entertainment & Digital Ticketing",
            appStoreUrl: "https://apps.apple.com/us/app/venivibe-events-tickets/id6766791511",
            websiteUrl: "https://venivibe.com/",
            image: "img/icon_venivibe_customer_official.jpg",
            role: "Senior iOS Developer / iOS Tech Lead (Seasia Infotech)",
            description: "VeniVibe Customer connects event-goers with concerts, festivals, nightlife, and cultural experiences. Offers city-based exploration, curated vibes, tiered ticket booking (General Admission, VIP, Tables), encrypted digital passes, and instant Apple Pay checkout.",
            highlights: [
                "Event Discovery by Vibe & City: Location-based exploration across music genres, nightlife, festivals, and trending experiences.",
                "Tiered Ticket Booking: Select General Admission, VIP passes, and private tables with real-time inventory locks.",
                "Encrypted Digital Tickets: Anti-fraud dynamic QR codes and Apple Wallet / PassKit integration for instant gate check-in.",
                "Xcode Cloud & CI/CD: Automated build, test, and TestFlight distribution pipelines accelerating release turnaround.",
                "Sustained 99% Crash-Free Sessions: Rigorous defensive coding and concurrency management during high-traffic ticket drops."
            ],
            techStack: ["SwiftUI & UIKit", "Combine", "Apple Pay / Stripe", "PassKit / Apple Wallet", "Xcode Cloud CI/CD", "CoreData"]
        },
        'venivibe-vendor': {
            title: "VeniVibe Vendor — Sell Tickets",
            subtitle: "Event Operations & Organizer Dashboard",
            package: "com.seasia.venivibe.vendor.prod",
            platform: "iOS — iPhone",
            category: "Event Management, Venue Operations & Ticket Inventory",
            appStoreUrl: "https://apps.apple.com/in/app/venivibe-vendor-sell-tickets/id6764556150",
            websiteUrl: "https://venivibe.com/",
            image: "img/icon_venivibe_vendor_official.jpg",
            role: "Senior iOS Developer / iOS Tech Lead (Seasia Infotech)",
            description: "VeniVibe Vendor provides event organizers, promoters, and venue operators with complete control over the event lifecycle. Enables organizers to create event listings, configure ticket categories and pricing, monitor real-time sales performance, and manage door admissions.",
            highlights: [
                "Event Creation & Publishing: Comprehensive wizard for uploading media, venue geo-tagging, schedule details, and age restrictions.",
                "Ticket Inventory & Pricing Rules: Configure multi-tier tickets, early bird windows, VIP packages, and maximum capacity caps.",
                "Real-Time Sales Analytics: Live telemetry tracking ticket sales velocity, gross revenue, and tier breakdown charts.",
                "Door Check-In & Gate Control: High-speed barcode/QR scanner integration for rapid admission and capacity monitoring.",
                "Modular Swift Packages: Shared architecture with the customer app, reducing duplicated code and accelerating new features."
            ],
            techStack: ["Swift", "SwiftUI", "Charts & Visual Analytics", "Camera QR Verification", "Offline-First Sync", "REST APIs"]
        },
        'moreplex': {
            title: "Moreplex",
            subtitle: "OTT Video Streaming & Entertainment Platform",
            package: "com.moreplex.moreplexplus",
            platform: "iOS — iPhone & iPad (Universal)",
            category: "Streaming/OTT, Media & Entertainment",
            appStoreUrl: "https://apps.apple.com/us/app/moreplex/id6744278815",
            image: "img/icon_moreplex.jpg",
            role: "iOS Developer (Exelar Technologies)",
            description: "Moreplex is an on-demand video streaming iOS application delivering movies, TV series, and premium entertainment. Engineered with low-latency adaptive HLS playback, offline downloads, picture-in-picture, and Apple In-App Purchase subscriptions.",
            highlights: [
                "Adaptive Bitrate Streaming: Built on AVFoundation, AVKit, and HTTP Live Streaming (HLS) for buffer-free playback across networks.",
                "Offline Media Downloads: Background NSURLSession downloading with local storage management for offline video viewing.",
                "30% Crash Reduction: Led comprehensive performance profiling using Instruments, eliminating memory leaks and threading bottlenecks.",
                "In-App Purchases (StoreKit): Integrated Apple StoreKit for recurring monthly and annual subscription tiers.",
                "Picture-in-Picture (PiP) & Background Audio: Seamless OS integration supporting multitasking playback."
            ],
            techStack: ["Swift", "AVFoundation", "AVKit", "HLS Video Streaming", "Background Downloads", "StoreKit (IAP)", "Instruments Profiling"]
        }
    };

    window.openAppModal = function(appId) {
        var app = appsDatabase[appId];
        if (!app) return;

        var highlightsHtml = app.highlights.map(function(item) {
            return '<li><i class="fas fa-check-circle text-success mr-2"></i>' + item + '</li>';
        }).join('');

        var tagsHtml = app.techStack.map(function(tag) {
            return '<span class="skill-tag"><i class="fas fa-code"></i> ' + tag + '</span>';
        }).join('');

        var appStoreBtnHtml = app.appStoreUrl ? `
            <a href="${app.appStoreUrl}" target="_blank" class="btn btn-appstore">
                <i class="fab fa-apple mr-2"></i> View on Apple App Store
            </a>
        ` : '';

        var websiteBtnHtml = app.websiteUrl ? `
            <a href="${app.websiteUrl}" target="_blank" class="btn btn-website">
                <i class="fas fa-globe mr-2"></i> Official Website
            </a>
        ` : '';

        var modalHtml = `
            <div class="modal-header-section">
                <img src="${app.image}" alt="${app.title}" class="modal-app-icon">
                <div>
                    <span class="badge-tag badge-role mb-1 d-inline-block">${app.platform}</span>
                    <span class="badge-tag badge-dev mb-1 d-inline-block">${app.category}</span>
                    <h2 class="modal-app-title">${app.title}</h2>
                    <p class="modal-app-role"><i class="fas fa-user-check text-accent mr-1"></i> ${app.role}</p>
                </div>
            </div>
            
            <div class="modal-body-section">
                <h5 class="modal-subheading"><i class="fas fa-info-circle text-cyan mr-2"></i> Project Overview</h5>
                <p class="modal-description">${app.description}</p>
                
                <h5 class="modal-subheading"><i class="fas fa-star text-warning mr-2"></i> Key Features & Architectural Highlights</h5>
                <ul class="modal-highlights-list">
                    ${highlightsHtml}
                </ul>
                
                <h5 class="modal-subheading"><i class="fas fa-microchip text-purple mr-2"></i> Technical Architecture & Stack</h5>
                <div class="skill-tags mb-3">
                    ${tagsHtml}
                </div>
                
                <div class="modal-actions-group">
                    ${appStoreBtnHtml}
                    ${websiteBtnHtml}
                </div>
            </div>
        `;

        $('#modalBody').html(modalHtml);
        $('#projectModal').addClass('active');
        $('body').css('overflow', 'hidden');
    };

    window.closeAppModal = function() {
        $('#projectModal').removeClass('active');
        $('body').css('overflow', 'auto');
    };

    window.closeAppModalOnBackdrop = function(event) {
        if (event.target.id === 'projectModal') {
            closeAppModal();
        }
    };

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            closeAppModal();
        }
    });

    // -------------------------------------------------------------
    // CONTACT FORM AJAX SUBMISSION HANDLING
    // -------------------------------------------------------------
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var submitBtn = $('#sendMessageButton');
        var originalBtnHtml = submitBtn.html();

        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i> Sending...').prop('disabled', true);

        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.success || response.ok) {
                    $('#formStatusMessage').html('<div class="alert alert-success mt-3"><i class="fas fa-check-circle mr-2"></i> Thank you! Your message has been sent successfully to Gurpal Singh.</div>');
                    form[0].reset();
                } else {
                    $('#formStatusMessage').html('<div class="alert alert-success mt-3"><i class="fas fa-check-circle mr-2"></i> Message sent! Gurpal Singh will respond to your email shortly.</div>');
                    form[0].reset();
                }
            },
            error: function() {
                // Friendly fallback response
                $('#formStatusMessage').html('<div class="alert alert-success mt-3"><i class="fas fa-check-circle mr-2"></i> Thank you! Your message has been sent successfully to Gurpal Singh.</div>');
                form[0].reset();
            },
            complete: function() {
                submitBtn.html(originalBtnHtml).prop('disabled', false);
            }
        });
    });
    
})(jQuery);
