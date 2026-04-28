/* ============================================================
   ZAIN AHMAD - PORTFOLIO 2026 v6.9
   Lenis - GSAP - Apple Glassmorphism - Smooth Album Tilt
   Section Video Banners - Idle Gojo Float
   ============================================================ */

(function () {
    'use strict';

    /* ------ Global state ------ */
    let mouseX = 0, mouseY = 0;
    var gojoReady = false;
    document.addEventListener('mousemove', function(e) { mouseX = e.clientX; mouseY = e.clientY; });

    /* ------ Cursor ------ */
    const cursor = document.getElementById('cursor');
    if (cursor && window.matchMedia('(hover: hover)').matches) {
        let dx = 0, dy = 0;
        (function moveCursor() {
            dx += (mouseX - dx) * 0.15;
            dy += (mouseY - dy) * 0.15;
            cursor.style.left = dx + 'px';
            cursor.style.top = dy + 'px';
            requestAnimationFrame(moveCursor);
        })();
        document.querySelectorAll('a, button, .work-card, .carousel3d__face, .album__dot, .testimonial').forEach(function(el) {
            el.addEventListener('mouseenter', function() { cursor.classList.add('visible'); });
            el.addEventListener('mouseleave', function() { cursor.classList.remove('visible'); });
        });

        /* Title magnify cursor */
        var heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.addEventListener('mouseenter', function() { cursor.classList.add('visible','title-hover'); });
            heroTitle.addEventListener('mouseleave', function() { cursor.classList.remove('title-hover'); });
        }

        /* Gojo tooltip follows cursor (no inverted circle) */
        var gojoLink = document.getElementById('hero-gojo-link');
        var gojoTip = document.getElementById('gojo-tooltip');
        if (gojoLink && gojoTip) {
            gojoLink.addEventListener('mouseenter', function() { cursor.classList.add('visible'); gojoTip.classList.add('visible'); });
            gojoLink.addEventListener('mouseleave', function() { cursor.classList.remove('visible'); gojoTip.classList.remove('visible'); });
            gojoLink.addEventListener('mousemove', function(e) {
                gojoTip.style.left = e.clientX + 'px';
                gojoTip.style.top = e.clientY + 'px';
            });
        }
    }

    /* ------ Intro ------ */
    var introEl = document.getElementById('intro');
    var introWord = document.getElementById('intro-word');
    var greetings = [
        { text: 'Hello', lang: 'en' },
        { text: 'Bonjour', lang: 'fr' },
        { text: 'Hola', lang: 'es' },
        { text: '\u3053\u3093\u306b\u3061\u306f', lang: 'ja' },
        { text: 'Hallo', lang: 'de' },
        { text: '\u0633\u0644\u0627\u0645', lang: 'ps' },
    ];

    function runIntro() {
        document.body.style.overflow = 'hidden';
        var i = 0;
        function show() {
            if (i >= greetings.length) {
                introWord.style.opacity = '0';
                setTimeout(function() {
                    introEl.style.transition = 'opacity .6s cubic-bezier(0.22,1,0.36,1)';
                    introEl.style.opacity = '0';
                    setTimeout(function() {
                        introEl.style.display = 'none';
                        document.body.style.overflow = '';
                        initSite();
                    }, 600);
                }, 150);
                return;
            }
            introWord.textContent = greetings[i].text;
            introWord.style.opacity = '1';
            introWord.style.transition = 'opacity .2s ease';
            setTimeout(function() {
                introWord.style.opacity = '0';
                setTimeout(function() { i++; show(); }, 180);
            }, 280);
        }
        setTimeout(show, 300);
    }

    /* ------ Lenis ------ */
    var lenis;
    function initLenis() {
        if (typeof Lenis === 'undefined') return;
        lenis = new Lenis({ duration: 1.2, easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, touchMultiplier: 2, infinite: false });
        if (typeof gsap !== 'undefined') {
            lenis.on('scroll', function() { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update(); });
            gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
            requestAnimationFrame(raf);
        }
    }

    /* ------ Site Init ------ */
    function initSite() {
        initLenis();
        initThemeToggle();
        initNav();
        initMarquee(); 
        initGSAPAnimations();
        initHorizontalScroll();
        initTextHover();
        init3DCarousel();
        initPhotoAlbum();
        initCounter();
        initHeroParallax();
        initGojoParallax();
        initGojoSequence();
        initHeroBlur();
        initCardTilt();
        initAlbumTilt();
        initSectionBannerBlur();
        initBadgeHover();
        initScrollTextCycle();
        initBgWords();
        initHeroTitleZoom();
        initMagneticButtons();
        initSpotlight();
        initParallaxLayers();
        initWorkCardEntrance();
        initHeroTitleSplit();
        initClipPathReveal();
    }

    function initMarquee() {
        [
            { inner: document.querySelector('.marquee__inner'),         speed: 80  },
            { inner: document.querySelector('.footer__marquee-track'),  speed: 60  }
        ].forEach(function(m) {
            if (!m.inner) return;
            m.inner.querySelectorAll('.marquee__clone').forEach(function(el) { el.remove(); });
            var originals = Array.from(m.inner.children);
            var totalW = m.inner.scrollWidth;
            var needed = Math.ceil((window.innerWidth * 2) / totalW) + 1;
            for (var i = 0; i < needed; i++) {
                originals.forEach(function(el) {
                    var clone = el.cloneNode(true);
                    clone.classList.add('marquee__clone');
                    m.inner.appendChild(clone);
                });
            }
            var fullW = m.inner.scrollWidth;
            m.inner.style.animationDuration = (fullW / 2 / m.speed) + 's';
        });
    }

    /* ------ Scroll Text Language Cycle ------ */
    function initScrollTextCycle() {
        var scrollEl = document.querySelector('.hero__scroll span');
        if (!scrollEl) return;
        var scrollWords = [
            { text: 'Scroll', dur: 4000 },
            { text: 'Défiler', dur: 2000 },
            { text: 'Desplazar', dur: 2000 },
            { text: 'スクロール', dur: 2000 },
            { text: 'Scrollen', dur: 2000 },
            { text: '\u0633\u06A9\u0631\u0648\u0644', dur: 2000 }
        ];
        var si = 0;
        function cycleScroll() {
            scrollEl.style.transition = 'opacity .3s';
            scrollEl.style.opacity = '0';
            setTimeout(function() {
                si = (si + 1) % scrollWords.length;
                scrollEl.textContent = scrollWords[si].text;
                scrollEl.style.opacity = '1';
                setTimeout(cycleScroll, scrollWords[si].dur);
            }, 300);
        }
        setTimeout(cycleScroll, scrollWords[0].dur);
    }

    /* ------ Badge Hover (slide out then back in on top of overlay) ------ */
    function initBadgeHover() {
        document.querySelectorAll('.work-card').forEach(function(card) {
            var badge = card.querySelector('.work-card__badge');
            if (!badge) return;
            card.addEventListener('mouseenter', function() {
                badge.classList.remove('work-card__badge--return');
                /* After overlay slides up (~650ms), slide badge back in on top */
                setTimeout(function() {
                    badge.classList.add('work-card__badge--return');
                }, 550);
            });
            card.addEventListener('mouseleave', function() {
                badge.classList.remove('work-card__badge--return');
            });
        });
    }

    /* ------ Theme Toggle ------ */
    function initThemeToggle() {
        var btn = document.getElementById('theme-toggle');
        var html = document.documentElement;
        var saved = localStorage.getItem('theme');
        if (saved) html.setAttribute('data-theme', saved);
        if (btn) {
            btn.addEventListener('click', function() {
                var current = html.getAttribute('data-theme');
                var next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
    }

    /* ------ Nav ------ */
    function initNav() {
        var nav = document.getElementById('nav');
        var burger = document.getElementById('burger');
        var mobileMenu = document.getElementById('mobile-menu');
        var lastY = 0;
        window.addEventListener('scroll', function() {
            var y = window.scrollY;
            if (y > 100 && y > lastY) nav.classList.add('hidden');
            else nav.classList.remove('hidden');
            lastY = y;
        }, { passive: true });

        if (burger && mobileMenu) {
            burger.addEventListener('click', function() {
                burger.classList.toggle('open');
                mobileMenu.classList.toggle('open');
                document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
            });
            mobileMenu.querySelectorAll('a').forEach(function(a) {
                a.addEventListener('click', function() {
                    burger.classList.remove('open');
                    mobileMenu.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }

        var transition = document.getElementById('page-transition');
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var target = document.querySelector(a.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                transition.classList.add('active');
                setTimeout(function() {
                    /* Reset all ScrollTrigger-driven animations so they replay */
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.getAll().forEach(function(st) {
                            st.kill();
                        });
                    }
                    /* Reset reveal elements */
                    document.querySelectorAll('.reveal').forEach(function(el) {
                        el.style.opacity = ''; el.style.transform = '';
                        el.classList.remove('visible');
                    });
                    document.querySelectorAll('.big-text, .design__headline').forEach(function(el) {
                        el.style.opacity = ''; el.style.transform = '';
                    });
                    document.querySelectorAll('.section-num').forEach(function(el) {
                        el.style.opacity = ''; el.style.transform = '';
                    });
                    document.querySelectorAll('.work-card').forEach(function(el) {
                        el.style.opacity = ''; el.style.transform = '';
                    });
                    document.querySelectorAll('.tools__pill').forEach(function(el) {
                        el.style.opacity = ''; el.style.transform = '';
                    });
                    document.querySelectorAll('.timeline__item, .contact__item').forEach(function(el) {
                        el.style.opacity = ''; el.style.transform = '';
                    });
                    if (lenis) lenis.scrollTo(target, { immediate: true });
                    else target.scrollIntoView({ behavior: 'instant' });
                    /* Re-init GSAP animations after a frame so positions are correct */
                    requestAnimationFrame(function() {
                        initGSAPAnimations();
                        initHeroTitleZoom();
                        transition.classList.remove('active');
                    });
                }, 600);
            });
        });
    }

    /* ------ GSAP Animations ------ */
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') { initScrollReveals(); return; }
        gsap.registerPlugin(ScrollTrigger);

        /* Hero title: gsap.set() ensures from values apply synchronously (no flash) */
        var heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            gsap.set(heroTitle, { opacity: 0, y: 60, scale: 0.95 });
            gsap.to(heroTitle, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.1 });
        }

        /* Hero bottom */
        gsap.set('.hero__bottom', { opacity: 0, y: 30 });
        gsap.to('.hero__bottom', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 });
        gsap.set('.hero__scroll', { opacity: 0 });
        gsap.to('.hero__scroll', { opacity: 1, duration: 0.6, delay: 0.8 });

        /* Gojo: use xPercent/yPercent for centering so GSAP doesn't conflict with CSS */
        var gojoLink = document.getElementById('hero-gojo-link');
        if (gojoLink) {
            gsap.set(gojoLink, { opacity: 0, xPercent: -50, yPercent: -55, y: 80, scale: 0.9 });
            gsap.to(gojoLink, {
                opacity: 1, y: 0, scale: 1,
                duration: 1, ease: 'power3.out', delay: 0.3,
                onComplete: function() { gojoReady = true; }
            });
        }

        /* Reveals */
        document.querySelectorAll('.reveal').forEach(function(el) {
            var delay = parseFloat(el.dataset.delay) || 0;
            gsap.fromTo(el, { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, delay: delay, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        /* Big text stagger */
        document.querySelectorAll('.design__hero, .about__hero, .contact .container').forEach(function(container) {
            var texts = container.querySelectorAll('.big-text, .design__headline');
            if (!texts.length) return;
            texts.forEach(function(t, i) {
                gsap.fromTo(t, { opacity: 0, y: 50, skewY: 2 }, {
                    opacity: 1, y: 0, skewY: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: container, start: 'top 80%', once: true }
                });
            });
        });

        /* Section numbers */
        document.querySelectorAll('.section-num').forEach(function(el) {
            gsap.fromTo(el, { opacity: 0, x: -30 }, {
                opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        /* Work cards */
        document.querySelectorAll('.work-card').forEach(function(card, i) {
            gsap.fromTo(card, { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            });
        });

        
        /* Album text: slide from left+bottom, staggered h4 vs p
           Uses CSS transitions instead of GSAP to avoid conflicts with scroll-driven toggling */
        /* (handled purely in CSS via .album__text h4/p transition-delay) */

        /* Tools */
        document.querySelectorAll('.tools__pill').forEach(function(s, i) {
            gsap.fromTo(s, { opacity: 0, y: 15, scale: 0.95 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.4, delay: i * 0.03, ease: 'power2.out',
                scrollTrigger: { trigger: s, start: 'top 85%', once: true }
            });
        });

        /* Timeline, contact, marquee */
        document.querySelectorAll('.timeline__item').forEach(function(item, i) {
            gsap.fromTo(item, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 85%', once: true } });
        });
        document.querySelectorAll('.contact__item').forEach(function(item, i) {
            gsap.fromTo(item, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: i * 0.08, ease: 'power2.out', scrollTrigger: { trigger: item, start: 'top 90%', once: true } });
        });
        gsap.fromTo('.marquee', { opacity: 0 }, { opacity: 1, duration: 0.6, scrollTrigger: { trigger: '.marquee', start: 'top 95%', once: true } });
    }

    function initScrollReveals() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.dataset.delay || 0;
                    setTimeout(function() { entry.target.classList.add('visible'); }, delay * 1000);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        els.forEach(function(el) { obs.observe(el); });
    }

    /* ------ Horizontal Scroll ------ */
    function initHorizontalScroll() {
        var section = document.getElementById('work-scroll');
        var track = document.getElementById('work-track');
        if (!section || !track) return;
        var initialOffset = window.innerWidth * 0.18;

        function onScroll() {
            var rect = section.getBoundingClientRect();
            var sectionH = section.offsetHeight - window.innerHeight;
            var progress = Math.min(Math.max(-rect.top / sectionH, 0), 1);
            var maxShift = track.scrollWidth - window.innerWidth + initialOffset;

            // rightOffset mirrors what initialOffset does on the left side in the original.
            // It pushes the starting position further left so AirPods begins centered,
            // and increases total travel distance so the scroll feels longer.
            // Tweak the 0.37 multiplier: higher = card more to the left at start.
            var rightOffset = window.innerWidth * 0.2   ;

            var x = (progress - 1) * (maxShift + rightOffset);
            track.style.transform = 'translateX(' + Math.round(x) + 'px)';
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ------ Text Hover ------ */
    function initTextHover() {
        document.querySelectorAll('.work-card__title').forEach(function(el) {
            var text = el.getAttribute('data-text');
            if (!text) return;
            el.innerHTML = '';
            text.split('').forEach(function(ch, i) {
                var charWrap = document.createElement('span');
                charWrap.classList.add('char');
                var inner = document.createElement('span');
                inner.classList.add('char__inner');
                inner.style.transitionDelay = (i * 0.02) + 's';
                var top = document.createElement('span');
                top.classList.add('char__top');
                top.textContent = ch === ' ' ? '\u00A0' : ch;
                var bot = document.createElement('span');
                bot.classList.add('char__bot');
                bot.textContent = ch === ' ' ? '\u00A0' : ch;
                inner.appendChild(top);
                inner.appendChild(bot);
                charWrap.appendChild(inner);
                el.appendChild(charWrap);
            });
        });
    }

    /* ------ 3D Carousel ------ */
    function init3DCarousel() {
        var ring = document.getElementById('carousel3d-ring');
        if (!ring) return;
        var cards = ring.querySelectorAll('.carousel3d__card');
        var n = cards.length;
        var theta = 360 / n;
        var cardW = 240;
        var radius = Math.round((cardW / 2) / Math.tan(Math.PI / n));
        cards.forEach(function(card, i) { card.style.transform = 'rotateY(' + (theta * i) + 'deg) translateZ(' + radius + 'px)'; });

        var angle = 0, targetAngle = 0, speed = 0.04, isHovering = false;
        function render() {
            if (!isHovering) targetAngle -= speed;
            angle += (targetAngle - angle) * 0.04;
            ring.style.transform = 'rotateY(' + angle + 'deg)';
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        var scene = document.getElementById('carousel3d-scene');
        scene.addEventListener('mouseenter', function() { isHovering = true; });
        scene.addEventListener('mouseleave', function() { isHovering = false; });
        var scrollCooldown = false;
        scene.addEventListener('wheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (scrollCooldown) return;
            scrollCooldown = true;
            targetAngle += e.deltaY > 0 ? -theta : theta;
            setTimeout(function() { scrollCooldown = false; }, 400);
        }, { passive: false });
    }

    /* ------ Photo Album ------ */
    function initPhotoAlbum() {
        var album = document.getElementById('album');
        if (!album) return;
        var slides = album.querySelectorAll('.album__slide');
        var dots = album.querySelectorAll('.album__dot');
        var totalSlides = slides.length;

        var lastIdx = 0;
        function clearFlipClasses(slide) {
            slide.classList.remove('flip-in-forward', 'flip-in-backward', 'flip-out-forward', 'flip-out-backward');
        }

        function updateAlbum() {
            var rect = album.getBoundingClientRect();
            var albumH = album.offsetHeight - window.innerHeight;
            var progress = Math.min(Math.max(-rect.top / albumH, 0), 1);
            var idx = Math.min(Math.floor(progress * totalSlides), totalSlides - 1);
            if (idx === lastIdx) {
                slides.forEach(function(slide, i) { slide.classList.toggle('active', i === idx); });
                dots.forEach(function(dot, i) { dot.classList.toggle('active', i === idx); });
                return;
            }

            var forward = idx > lastIdx;
            var outClass = forward ? 'flip-out-forward' : 'flip-out-backward';
            var inClass = forward ? 'flip-in-forward' : 'flip-in-backward';

            // Remove flip classes from all slides
            slides.forEach(clearFlipClasses);

            // Outgoing slide
            if (slides[lastIdx]) {
                slides[lastIdx].classList.remove('active');
                slides[lastIdx].classList.add(outClass);
            }
            // Incoming slide
            if (slides[idx]) {
                slides[idx].classList.add(inClass);
                slides[idx].classList.add('active');
            }
            dots.forEach(function(dot, i) { dot.classList.toggle('active', i === idx); });

            // Remove flip classes after animation

            setTimeout(function() {
                if (slides[lastIdx]) clearFlipClasses(slides[lastIdx]);
                if (slides[idx]) clearFlipClasses(slides[idx]);

                // Reset transform on .album__photo--front for both outgoing and incoming slides
                [slides[lastIdx], slides[idx]].forEach(function(slide) {
                    if (!slide) return;
                    var front = slide.querySelector('.album__photo--front');
                    if (front) {
                        front.style.transform = '';
                    }
                });
            }, 950);

            lastIdx = idx;
        }
        window.addEventListener('scroll', updateAlbum, { passive: true });
        updateAlbum();

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var idx = parseInt(dot.dataset.index, 10);
                var albumH = album.offsetHeight - window.innerHeight;
                var targetScroll = album.offsetTop + (idx / totalSlides) * albumH;
                if (lenis) lenis.scrollTo(targetScroll, { duration: 1.2 });
                else window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            });
        });
    }

    /* ------ Counter ------ */
    function initCounter() {
        var counter = document.getElementById('views-counter');
        if (!counter) return;
        var target = parseInt(counter.dataset.target, 10);
        var animated = false;
        var obs = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                var duration = 2000, start = performance.now();
                function tick(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    var ease = 1 - Math.pow(1 - progress, 3);
                    var val = Math.round(ease * target);
                    counter.textContent = val >= 1000000 ? (val / 1000000).toFixed(1) + 'M+' : val >= 1000 ? Math.round(val / 1000) + 'K+' : val;
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                obs.unobserve(counter);
            }
        }, { threshold: 0.5 });
        obs.observe(counter);
    }

    /* ------ Hero Blur on Scroll (smooth RAF lerp) ------ */
    function initHeroBlur() {
        var wallpaper = document.getElementById('hero-wallpaper');
        var overlay = document.querySelector('.hero__overlay');
        if (!wallpaper) return;
        var currentBlur = 0, targetBlur = 0;
        var currentOpacity = 0.4, targetOpacity = 0.4;
        wallpaper.style.willChange = 'filter';

        window.addEventListener('scroll', function() {
            var scrollY = window.scrollY;
            var vh = window.innerHeight;
            var progress = Math.min(scrollY / (vh * 0.6), 1);
            targetBlur = progress * 12;
            targetOpacity = 0.4 + progress * 0.4;
        }, { passive: true });

        function smooth() {
            currentBlur += (targetBlur - currentBlur) * 0.08;
            currentOpacity += (targetOpacity - currentOpacity) * 0.08;
            wallpaper.style.filter = 'blur(' + currentBlur.toFixed(1) + 'px)';
            if (overlay) overlay.style.background = 'rgba(4,10,16,' + currentOpacity.toFixed(3) + ')';
            requestAnimationFrame(smooth);
        }
        requestAnimationFrame(smooth);
    }

    /* ------ Section Banner Blur on Scroll ------ */
    function initSectionBannerBlur() {
        var banners = document.querySelectorAll('.section-banner');
        if (!banners.length) return;
        window.addEventListener('scroll', function() {
            banners.forEach(function(banner) {
                var rect = banner.getBoundingClientRect();
                var vh = window.innerHeight;
                /* Blur increases as top of banner passes above viewport center */
                var progress = Math.min(Math.max(-rect.top / (vh * 0.5), 0), 1);
                var video = banner.querySelector('video');
                if (video) video.style.filter = 'blur(' + (progress * 14) + 'px)';
            });
        }, { passive: true });
    }

    /* ------ Gojo Idle Float + Mouse Parallax (smooth lerp) ------ */
    function initGojoParallax() {
        var gojo = document.getElementById('hero-gojo-link');
        if (!gojo) return;
        var t = 0;
        var targetPX = 0, targetPY = 0;
        var smoothPX = 0, smoothPY = 0;

        document.addEventListener('mousemove', function() {
            var cx = window.innerWidth / 2;
            var cy = window.innerHeight / 2;
            targetPX = ((mouseX - cx) / cx) * 5;
            targetPY = ((mouseY - cy) / cy) * 3;
        });

        function animate() {
            t += 0.012;
            /* Lerp parallax for buttery smooth movement */
            smoothPX += (targetPX - smoothPX) * 0.04;
            smoothPY += (targetPY - smoothPY) * 0.04;
            /* Multi-harmonic float — noticeable organic sway */
            var floatX = Math.sin(t * 0.6) * 5 + Math.sin(t * 1.2) * 2;
            var floatY = Math.sin(t * 0.8) * 6 + Math.cos(t * 0.5) * 2.5;
            if (gojoReady) {
                var tx = floatX + smoothPX;
                var ty = floatY + smoothPY;
                gojo.style.transform = 'translate(calc(-50% + ' + tx + 'px), calc(-55% + ' + ty + 'px))';
            }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    /* ------ Gojo Interactive Image Sequence ------ */
    function initGojoSequence() {
        var img = document.getElementById('hero-gojo');
        var link = document.getElementById('hero-gojo-link');
        if (!img || !link) return;

        var totalFrames = 49;
        var frameDuration = 1000 / 30; /* ~30 fps */
        var frames = [];
        var currentFrame = 0;
        var direction = 0; /* 0 = idle, 1 = forward, -1 = reverse */
        var rafId = null;
        var lastTime = 0;
        var staticSrc = 'assets/media/lego-gojo/image (1).webp';
        var isTouchDevice = !window.matchMedia('(hover: hover)').matches;

        /* Preload all frames */
        for (var i = 1; i <= totalFrames; i++) {
            var preload = new Image();
            preload.src = 'assets/media/lego-gojo/image (' + i + ').webp';
            frames.push(preload);
        }

        var loopDirection = 1;
        function tickLoop(timestamp) {
            if (!lastTime) lastTime = timestamp;
            var delta = timestamp - lastTime;
            if (delta >= frameDuration) {
                lastTime = timestamp;
                currentFrame += loopDirection;
                if (currentFrame >= totalFrames - 1) { currentFrame = totalFrames - 1; loopDirection = -1; }
                else if (currentFrame <= 0) { currentFrame = 0; loopDirection = 1; }
                img.src = frames[currentFrame].src;
            }
            rafId = requestAnimationFrame(tickLoop);
        }

        function tickInteractive(timestamp) {
            if (!lastTime) lastTime = timestamp;
            var delta = timestamp - lastTime;
            if (delta >= frameDuration) {
                lastTime = timestamp;
                currentFrame += direction;
                if (direction === 1 && currentFrame >= totalFrames - 1) {
                    currentFrame = totalFrames - 1;
                    direction = 0;
                    rafId = null;
                    return;
                }
                if (direction === -1 && currentFrame <= 0) {
                    currentFrame = 0;
                    direction = 0;
                    img.src = staticSrc;
                    rafId = null;
                    return;
                }
                img.src = frames[currentFrame].src;
            }
            rafId = requestAnimationFrame(tickInteractive);
        }

        function startAnimation(dir) {
            direction = dir;
            lastTime = 0;
            if (!rafId) rafId = requestAnimationFrame(tickInteractive);
        }

        if (isTouchDevice) {
            /* Mobile: auto-loop through all frames continuously */
            rafId = requestAnimationFrame(tickLoop);
        } else {
            /* Desktop: play forward on hover, reverse on leave */
            link.addEventListener('mouseenter', function() {
                startAnimation(1);
            });
            link.addEventListener('mouseleave', function() {
                startAnimation(-1);
            });
        }
    }

    /* ------ Hero Wallpaper Parallax ------ */
    function initHeroParallax() {
        var wallpaper = document.getElementById('hero-wallpaper');
        if (!wallpaper) return;
        window.addEventListener('scroll', function() {
            wallpaper.style.transform = 'scale(1.1) translateY(' + (window.scrollY * 0.3) + 'px)';
        }, { passive: true });
    }

    /* ------ Card Tilt on Hover ------ */
    function initCardTilt() {
        document.querySelectorAll('[data-tilt]').forEach(function(el) {
            el.addEventListener('mousemove', function(e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left, y = e.clientY - rect.top;
                var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
                var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
                el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.03,1.03,1.03)';
            });
            el.addEventListener('mouseleave', function() {
                el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
            });
        });
    }

    /* ------ Album Tilt: Smooth zoom first, tilt only when fully zoomed ------ */
    function initAlbumTilt() {
        var album = document.getElementById('album');
        if (!album) return;
        var lastActive = null;
        var lastHandlers = {};

        function attachTiltToActiveSlide() {
            // Remove previous listeners if any
            if (lastActive && lastHandlers.mouseenter) {
                lastActive.removeEventListener('mouseenter', lastHandlers.mouseenter);
                lastActive.removeEventListener('mousemove', lastHandlers.mousemove);
                lastActive.removeEventListener('mouseleave', lastHandlers.mouseleave);
            }
            var active = album.querySelector('.album__slide.active .album__photos');
            if (active) {
                var target = active.querySelector('.album__photo--front');
                if (target) {
                    let isZoomed = false;
                    let zoomTimer = null;
                    function getOrigTransform() {
                        return target.getAttribute('data-orig-transform') || target.style.transform || '';
                    }
                    target.setAttribute('data-orig-transform', target.style.transform || '');
                    target.style.transition = 'scale .5s cubic-bezier(0.22,1,0.36,1)';
                    // Define handlers so we can remove them later
                    const mouseenter = function() {
                        target.style.scale = '1.06';
                        zoomTimer = setTimeout(function() { isZoomed = true; }, 150);
                    };
                    const mousemove = function(e) {
                        if (!isZoomed) return;
                        var rect = active.getBoundingClientRect();
                        var x = e.clientX - rect.left, y = e.clientY - rect.top;
                        var rx = ((y - rect.height / 2) / (rect.height / 2)) * -8;
                        var ry = ((x - rect.width / 2) / (rect.width / 2)) * 8;
                        var orig = getOrigTransform();
                        target.style.transform = orig + ' perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
                    };
                    const mouseleave = function() {
                        clearTimeout(zoomTimer);
                        isZoomed = false;
                        var orig = getOrigTransform();
                        target.style.transition = 'scale .5s cubic-bezier(0.22,1,0.36,1), transform .4s cubic-bezier(0.22,1,0.36,1)';
                        target.style.transform = orig;
                        target.style.scale = '1';
                        setTimeout(function() {
                            target.style.transition = 'scale .5s cubic-bezier(0.22,1,0.36,1)';
                        }, 500);
                    };
                    active.addEventListener('mouseenter', mouseenter);
                    active.addEventListener('mousemove', mousemove);
                    active.addEventListener('mouseleave', mouseleave);
                    lastActive = active;
                    lastHandlers = { mouseenter, mousemove, mouseleave };
                }
            }
        }

        // Attach on load and every scroll
        window.addEventListener('scroll', attachTiltToActiveSlide, { passive: true });
        window.addEventListener('DOMContentLoaded', attachTiltToActiveSlide);
        attachTiltToActiveSlide();
    }

    /* ------ Giant Background Words (CSS animation - continuous, never stops) ------ */
    function initBgWords() {
        /* bg-words now use pure CSS @keyframes animation (always moving, never still) */
        /* No GSAP scrub needed — CSS handles continuous left/right slide with delay on bottom row */
    }

    /* ------ Hero Title Zoom on Scroll ------ */
    function initHeroTitleZoom() {
        var heroTitle = document.getElementById('hero-title');
        if (!heroTitle || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.to(heroTitle, {
            scale: 1.8,
            y: 120,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '80% top',
                scrub: 0.3
            }
        });
    }

    /* ------ Magnetic Buttons ------ */
    function initMagneticButtons() {
        document.querySelectorAll('.btn, .nav__social, .theme-toggle').forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', function() {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

    /* ------ Mouse Spotlight Glow ------ */
    function initSpotlight() {
        var spotlight = document.createElement('div');
        spotlight.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:1', 'pointer-events:none',
            'background:radial-gradient(600px circle at 0px 0px,rgba(6,182,212,0.06),transparent 70%)',
            'transition:background 0.1s', 'will-change:background'
        ].join(';');
        document.body.appendChild(spotlight);
        var tx = 0, ty = 0, cx = 0, cy = 0;
        document.addEventListener('mousemove', function(e) { tx = e.clientX; ty = e.clientY; });
        (function tick() {
            cx += (tx - cx) * 0.08;
            cy += (ty - cy) * 0.08;
            spotlight.style.background =
                'radial-gradient(600px circle at ' + cx + 'px ' + cy + 'px, rgba(6,182,212,0.06), transparent 70%)';
            requestAnimationFrame(tick);
        })();
    }

    /* ------ Parallax Depth Layers on Scroll ------ */
    function initParallaxLayers() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        /* Section titles drift upward faster than scroll */
        gsap.utils.toArray('.section-title, .case__title--large').forEach(function(el) {
            gsap.to(el, {
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });
        });

        /* Big text moves at different rates for depth */
        gsap.utils.toArray('.big-text').forEach(function(el, i) {
            gsap.to(el, {
                y: i % 2 === 0 ? -80 : -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('section') || el.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });
        });

        /* About cards drift at opposing rates */
        var aboutCards = gsap.utils.toArray('.about-card');
        aboutCards.forEach(function(card, i) {
            gsap.to(card, {
                y: i % 2 === 0 ? -50 : 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about__grid',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                }
            });
        });

        /* Creative stat counter floats */
        gsap.to('.creative__stat', {
            y: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '.creative',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.8
            }
        });

        /* KKC text block drifts opposite to gallery */
        gsap.to('.kkc__text', {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.kkc',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    /* ------ Work Card Entrance: Perspective Flip ------ */
    function initWorkCardEntrance() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        var cards = gsap.utils.toArray('.work-card');
        gsap.set(cards, { opacity: 0, rotateY: 25, transformOrigin: 'left center', transformPerspective: 1000 });
        cards.forEach(function(card, i) {
            ScrollTrigger.create({
                trigger: '.work__sticky',
                start: 'top 80%',
                once: true,
                onEnter: function() {
                    gsap.to(card, {
                        opacity: 1,
                        rotateY: 0,
                        duration: 0.9,
                        delay: i * 0.1,
                        ease: 'power3.out'
                    });
                }
            });
        });
    }

    /* ------ Staggered Hero Title Character Split ------ */
    function initHeroTitleSplit() {
        var title = document.getElementById('hero-title');
        if (!title || typeof gsap === 'undefined') return;
        var text = title.textContent;
        title.innerHTML = '';
        title.style.opacity = '1';
        title.style.transform = 'none';

        text.split('').forEach(function(ch, i) {
            var span = document.createElement('span');
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            span.style.cssText = [
                'display:inline-block',
                'will-change:transform,opacity,filter'
            ].join(';');
            title.appendChild(span);
        });

        var chars = Array.from(title.querySelectorAll('span'));
        gsap.set(chars, { opacity: 0, y: 80, rotateX: -90, filter: 'blur(12px)', transformOrigin: 'bottom center', transformPerspective: 600 });
        gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: { amount: 0.6, from: 'start' },
            delay: 0.2
        });
    }

    /* ------ Clip-Path Section Wipe Reveal ------ */
    function initClipPathReveal() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        /* Only target elements NOT already handled by initGSAPAnimations */
        var targets = [
            '.section-title',
            '.case__title--large',
            '.creative__title',
            '.case__tagline',
            '.kkc__desc',
            '.about__lead'
        ].join(',');

        gsap.utils.toArray(targets).forEach(function(el) {
            if (el.closest('.hero')) return;

            /* Force visibility so GSAP opacity reveal doesn't hide it */
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.remove('reveal');

            gsap.fromTo(el,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.1,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        once: true
                    }
                }
            );
        });
    }
    
    /* ------ Start ------ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runIntro);
    } else {
        runIntro();
    }
})();
