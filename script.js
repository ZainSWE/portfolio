/* ============================================================
   ZAIN AHMAD - PORTFOLIO 2026 v6.9
   Lenis - GSAP - Apple Glassmorphism - Smooth Album Tilt
   Section Video Banners - Idle Gojo Float
   PERF: Merged 5 RAF loops → 1 masterTick | Lazy Gojo frames
         Lazy banner videos | Touch guards on blur/parallax
   ============================================================ */

(function () {
    'use strict';

    const isTouch = !window.matchMedia('(hover: hover)').matches;

    /* ------ Global mouse position ------ */
    let mouseX = 0, mouseY = 0;
    var gojoReady = false;
    document.addEventListener('mousemove', function(e) { mouseX = e.clientX; mouseY = e.clientY; });

    /* ============================================================
       MASTER RAF — one shared loop replaces 4 separate ones:
       cursor smoothing, spotlight glow, hero blur lerp, gojo float.
       Each init function just sets the shared variables below.
    ============================================================ */

    // Cursor
    let _cursor = null, _cursorDX = 0, _cursorDY = 0;

    // Spotlight (hover-only)
    let _spotlight = null, _spCX = 0, _spCY = 0;

    // Hero blur lerp (hover-only)
    let _wallpaper = null, _heroOverlay = null;
    let _blurCur = 0, _blurTgt = 0, _opCur = 0.4, _opTgt = 0.4;

    // Gojo float (hover-only)
    let _gojoLink = null, _gojoT = 0;
    let _gojoSPX = 0, _gojoSPY = 0, _gojoTPX = 0, _gojoTPY = 0;

    (function masterTick() {
        // Cursor lerp
        if (_cursor) {
            _cursorDX += (mouseX - _cursorDX) * 0.15;
            _cursorDY += (mouseY - _cursorDY) * 0.15;
            _cursor.style.left = _cursorDX + 'px';
            _cursor.style.top = _cursorDY + 'px';
        }
        // Spotlight lerp
        if (_spotlight) {
            _spCX += (mouseX - _spCX) * 0.08;
            _spCY += (mouseY - _spCY) * 0.08;
            _spotlight.style.background =
                'radial-gradient(600px circle at ' + _spCX + 'px ' + _spCY + 'px, rgba(6,182,212,0.06), transparent 70%)';
        }
        // Hero blur lerp
        if (_wallpaper) {
            _blurCur += (_blurTgt - _blurCur) * 0.08;
            _opCur  += (_opTgt  - _opCur)  * 0.08;
            _wallpaper.style.filter = 'blur(' + _blurCur.toFixed(1) + 'px)';
            if (_heroOverlay) _heroOverlay.style.background = 'rgba(4,10,16,' + _opCur.toFixed(3) + ')';
        }
        // Gojo idle float + mouse parallax
        if (_gojoLink && gojoReady) {
            _gojoT += 0.012;
            _gojoSPX += (_gojoTPX - _gojoSPX) * 0.04;
            _gojoSPY += (_gojoTPY - _gojoSPY) * 0.04;
            var fx = Math.sin(_gojoT * 0.6) * 5 + Math.sin(_gojoT * 1.2) * 2;
            var fy = Math.sin(_gojoT * 0.8) * 6 + Math.cos(_gojoT * 0.5) * 2.5;
            _gojoLink.style.transform =
                'translate(calc(-50% + ' + (fx + _gojoSPX).toFixed(2) + 'px), calc(-55% + ' + (fy + _gojoSPY).toFixed(2) + 'px))';
        }
        requestAnimationFrame(masterTick);
    })();

    /* ------ Cursor ------ */
    function initCursor() {
        var cursor = document.getElementById('cursor');
        if (!cursor || isTouch) return;
        _cursor = cursor; // register with masterTick

        document.querySelectorAll('a, button, .work-card, .carousel3d__face, .album__dot, .testimonial').forEach(function(el) {
            el.addEventListener('mouseenter', function() { cursor.classList.add('visible'); });
            el.addEventListener('mouseleave', function() { cursor.classList.remove('visible'); });
        });

        var heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.addEventListener('mouseenter', function() { cursor.classList.add('visible', 'title-hover'); });
            heroTitle.addEventListener('mouseleave', function() { cursor.classList.remove('title-hover'); });
        }

        var gojoLink = document.getElementById('hero-gojo-link');
        var gojoTip  = document.getElementById('gojo-tooltip');
        if (gojoLink && gojoTip) {
            gojoLink.addEventListener('mouseenter', function() { cursor.classList.add('visible'); gojoTip.classList.add('visible'); });
            gojoLink.addEventListener('mouseleave', function() { cursor.classList.remove('visible'); gojoTip.classList.remove('visible'); });
            gojoLink.addEventListener('mousemove', function(e) {
                gojoTip.style.left = e.clientX + 'px';
                gojoTip.style.top  = e.clientY + 'px';
            });
        }
    }

    /* ------ Intro ------ */
    var introEl   = document.getElementById('intro');
    var introWord = document.getElementById('intro-word');
    var greetings = [
        { text: 'Hello',      lang: 'en' },
        { text: 'Bonjour',    lang: 'fr' },
        { text: 'Hola',       lang: 'es' },
        { text: '\u3053\u3093\u306b\u3061\u306f', lang: 'ja' },
        { text: 'Hallo',      lang: 'de' },
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
        initCursor();
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
        initLazyVideos();       // NEW: lazy-load banner videos
        initBadgeHover();
        initScrollTextCycle();
        initBgWords();
        initHeroTitleZoom();
        initMagneticButtons();
        initSpotlight();
        if (!isTouch) initParallaxLayers();  // skip parallax scrub on touch — causes jank
        initWorkCardEntrance();
        initHeroTitleSplit();
        initClipPathReveal();
    }

    function initMarquee() {
        [
            { inner: document.querySelector('.marquee__inner'),        speed: 80 },
            { inner: document.querySelector('.footer__marquee-track'), speed: 60 },
            { inner: document.querySelector('.testimonials__track'),   speed: 50 }
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
            { text: 'Scroll',     dur: 4000 },
            { text: 'Défiler',    dur: 2000 },
            { text: 'Desplazar',  dur: 2000 },
            { text: 'スクロール', dur: 2000 },
            { text: 'Scrollen',   dur: 2000 },
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

    /* ------ Badge Hover ------ */
    function initBadgeHover() {
        document.querySelectorAll('.work-card').forEach(function(card) {
            var badge = card.querySelector('.work-card__badge');
            if (!badge) return;
            card.addEventListener('mouseenter', function() {
                badge.classList.remove('work-card__badge--return');
                setTimeout(function() { badge.classList.add('work-card__badge--return'); }, 550);
            });
            card.addEventListener('mouseleave', function() {
                badge.classList.remove('work-card__badge--return');
            });
        });
    }

    /* ------ Theme Toggle ------ */
    function initThemeToggle() {
        var btn  = document.getElementById('theme-toggle');
        var html = document.documentElement;
        var saved = localStorage.getItem('theme');
        if (saved) html.setAttribute('data-theme', saved);
        if (btn) {
            btn.addEventListener('click', function() {
                var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
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
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.getAll().forEach(function(st) { st.kill(); });
                    }
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

        var heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            gsap.set(heroTitle, { opacity: 0, y: 60, scale: 0.95 });
            gsap.to(heroTitle, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.1 });
        }

        gsap.set('.hero__bottom', { opacity: 0, y: 30 });
        gsap.to('.hero__bottom', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 });
        gsap.set('.hero__scroll', { opacity: 0 });
        gsap.to('.hero__scroll', { opacity: 1, duration: 0.6, delay: 0.8 });

        var gojoLink = document.getElementById('hero-gojo-link');
        if (gojoLink) {
            gsap.set(gojoLink, { opacity: 0, xPercent: -50, yPercent: -55, y: 80, scale: 0.9 });
            gsap.to(gojoLink, {
                opacity: 1, y: 0, scale: 1,
                duration: 1, ease: 'power3.out', delay: 0.3,
                onComplete: function() { gojoReady = true; }
            });
        }

        document.querySelectorAll('.reveal').forEach(function(el) {
            var delay = parseFloat(el.dataset.delay) || 0;
            gsap.fromTo(el, { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, delay: delay, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

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

        document.querySelectorAll('.section-num').forEach(function(el) {
            gsap.fromTo(el, { opacity: 0, x: -30 }, {
                opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        document.querySelectorAll('.work-card').forEach(function(card, i) {
            gsap.fromTo(card, { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            });
        });

        document.querySelectorAll('.tools__pill').forEach(function(s, i) {
            gsap.fromTo(s, { opacity: 0, y: 15, scale: 0.95 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.4, delay: i * 0.03, ease: 'power2.out',
                scrollTrigger: { trigger: s, start: 'top 85%', once: true }
            });
        });

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
        var track   = document.getElementById('work-track');
        if (!section || !track) return;
        var initialOffset = window.innerWidth * 0.18;

        function onScroll() {
            var rect = section.getBoundingClientRect();
            var sectionH = section.offsetHeight - window.innerHeight;
            var progress = Math.min(Math.max(-rect.top / sectionH, 0), 1);
            var maxShift = track.scrollWidth - window.innerWidth + initialOffset;
            var rightOffset = window.innerWidth * 0.2;
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
        (function render() {
            if (!isHovering) targetAngle -= speed;
            angle += (targetAngle - angle) * 0.04;
            ring.style.transform = 'rotateY(' + angle + 'deg)';
            requestAnimationFrame(render);
        })();

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

        var touchStartX = 0, touchLastX = 0;
        scene.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchLastX  = touchStartX;
            isHovering  = true;
        }, { passive: true });
        scene.addEventListener('touchmove', function(e) {
            var deltaX = e.touches[0].clientX - touchLastX;
            touchLastX = e.touches[0].clientX;
            targetAngle += deltaX * 0.4;
        }, { passive: true });
        scene.addEventListener('touchend', function() {
            setTimeout(function() { isHovering = false; }, 1200);
        }, { passive: true });
    }

    /* ------ Photo Album ------ */
    function initPhotoAlbum() {
        var album = document.getElementById('album');
        if (!album) return;
        var slides = album.querySelectorAll('.album__slide');
        var dots   = album.querySelectorAll('.album__dot');
        var totalSlides = slides.length;
        var lastIdx = 0;

        function clearFlipClasses(slide) {
            slide.classList.remove('flip-in-forward', 'flip-in-backward', 'flip-out-forward', 'flip-out-backward');
        }

        function updateAlbum() {
            var rect   = album.getBoundingClientRect();
            var albumH = album.offsetHeight - window.innerHeight;
            var progress = Math.min(Math.max(-rect.top / albumH, 0), 1);
            var idx = Math.min(Math.floor(progress * totalSlides), totalSlides - 1);
            if (idx === lastIdx) {
                slides.forEach(function(slide, i) { slide.classList.toggle('active', i === idx); });
                dots.forEach(function(dot, i) { dot.classList.toggle('active', i === idx); });
                return;
            }
            var forward  = idx > lastIdx;
            var outClass = forward ? 'flip-out-forward'  : 'flip-out-backward';
            var inClass  = forward ? 'flip-in-forward'   : 'flip-in-backward';
            slides.forEach(clearFlipClasses);
            if (slides[lastIdx]) { slides[lastIdx].classList.remove('active'); slides[lastIdx].classList.add(outClass); }
            if (slides[idx])     { slides[idx].classList.add(inClass); slides[idx].classList.add('active'); }
            dots.forEach(function(dot, i) { dot.classList.toggle('active', i === idx); });
            setTimeout(function() {
                if (slides[lastIdx]) clearFlipClasses(slides[lastIdx]);
                if (slides[idx])     clearFlipClasses(slides[idx]);
                [slides[lastIdx], slides[idx]].forEach(function(slide) {
                    if (!slide) return;
                    var front = slide.querySelector('.album__photo--front');
                    if (front) front.style.transform = '';
                });
            }, 950);
            lastIdx = idx;
        }

        window.addEventListener('scroll', updateAlbum, { passive: true });
        updateAlbum();

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var idx    = parseInt(dot.dataset.index, 10);
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
        var target   = parseInt(counter.dataset.target, 10);
        var animated = false;
        var obs = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                var duration = 2000, start = performance.now();
                function tick(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    var ease = 1 - Math.pow(1 - progress, 3);
                    var val  = Math.round(ease * target);
                    counter.textContent = val >= 1000000 ? (val / 1000000).toFixed(1) + 'M+'
                                        : val >= 1000    ? Math.round(val / 1000) + 'K+'
                                        : val;
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                obs.unobserve(counter);
            }
        }, { threshold: 0.5 });
        obs.observe(counter);
    }

    /* ------ Hero Blur on Scroll (now feeds into masterTick) ------ */
    function initHeroBlur() {
        if (isTouch) return; // blur filter too expensive on mobile GPUs
        _wallpaper   = document.getElementById('hero-wallpaper');
        _heroOverlay = document.querySelector('.hero__overlay');
        if (!_wallpaper) return;
        _wallpaper.style.willChange = 'filter';

        window.addEventListener('scroll', function() {
            var progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
            _blurTgt = progress * 12;
            _opTgt   = 0.4 + progress * 0.4;
        }, { passive: true });
    }

    /* ------ Section Banner Blur on Scroll ------ */
    function initSectionBannerBlur() {
        if (isTouch) return; // skip on touch — blur filter too expensive
        var banners = document.querySelectorAll('.section-banner');
        if (!banners.length) return;
        window.addEventListener('scroll', function() {
            banners.forEach(function(banner) {
                var rect     = banner.getBoundingClientRect();
                var progress = Math.min(Math.max(-rect.top / (window.innerHeight * 0.5), 0), 1);
                var video    = banner.querySelector('video');
                if (video) video.style.filter = 'blur(' + (progress * 14) + 'px)';
            });
        }, { passive: true });
    }

    /* ------ Lazy-load banner videos via IntersectionObserver ------ */
    function initLazyVideos() {
        // Banner videos use data-src to defer loading until near viewport.
        // The hero video (#hero-wallpaper) has src set directly and is NOT deferred.
        var lazyVideos = document.querySelectorAll('.section-banner video[data-src]');
        if (!lazyVideos.length) return;

        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var video = entry.target;
                    video.src = video.dataset.src;
                    video.load();
                    obs.unobserve(video);
                }
            });
        }, { rootMargin: '200px 0px' }); // start loading 200px before viewport

        lazyVideos.forEach(function(v) { obs.observe(v); });
    }

    /* ------ Gojo Idle Float + Mouse Parallax (feeds into masterTick) ------ */
    function initGojoParallax() {
        var gojo = document.getElementById('hero-gojo-link');
        if (!gojo || isTouch) return;
        _gojoLink = gojo; // register with masterTick

        document.addEventListener('mousemove', function() {
            var cx = window.innerWidth  / 2;
            var cy = window.innerHeight / 2;
            _gojoTPX = ((mouseX - cx) / cx) * 5;
            _gojoTPY = ((mouseY - cy) / cy) * 3;
        });
    }

    /* ============================================================
       Gojo Interactive Image Sequence
       FIX: frames are now preloaded lazily on FIRST hover,
       not eagerly at page init (was loading ~4.4 MB upfront).
    ============================================================ */
    function initGojoSequence() {
        var img  = document.getElementById('hero-gojo');
        var link = document.getElementById('hero-gojo-link');
        if (!img || !link) return;

        var totalFrames  = 49;
        var frameDuration = 1000 / 30; // ~30 fps
        var frames       = [];
        var currentFrame = 0;
        var direction    = 0;  // 0 = idle, 1 = forward, -1 = reverse
        var rafId        = null;
        var lastTime     = 0;
        var staticSrc    = 'assets/media/lego-gojo/image (1).webp';
        var preloaded    = false;
        var preloading   = false;

        /* Preload all frames on demand (first hover) */
        function preloadFrames(callback) {
            if (preloaded) { callback(); return; }
            if (preloading) return; // already in progress, do nothing — animation starts once done
            preloading = true;
            var loaded = 0;
            for (var i = 1; i <= totalFrames; i++) {
                var preloadImg = new Image();
                preloadImg.onload = function() {
                    if (++loaded === totalFrames) {
                        preloaded = true;
                        callback();
                    }
                };
                preloadImg.src = 'assets/media/lego-gojo/image (' + i + ').webp';
                frames.push(preloadImg);
            }
        }

        function tick(timestamp) {
            if (!lastTime) lastTime = timestamp;
            var delta = timestamp - lastTime;
            if (delta >= frameDuration) {
                lastTime = timestamp;
                currentFrame += direction;
                if (direction === 1 && currentFrame >= totalFrames - 1) {
                    currentFrame = totalFrames - 1;
                    direction = 0; rafId = null; return;
                }
                if (direction === -1 && currentFrame <= 0) {
                    currentFrame = 0;
                    direction = 0;
                    img.src = staticSrc;
                    rafId = null; return;
                }
                img.src = frames[currentFrame].src;
            }
            rafId = requestAnimationFrame(tick);
        }

        function startAnimation(dir) {
            direction = dir;
            lastTime  = 0;
            if (!rafId) rafId = requestAnimationFrame(tick);
        }

        link.addEventListener('mouseenter', function() {
            preloadFrames(function() { startAnimation(1); });
        });
        link.addEventListener('mouseleave', function() {
            if (preloaded) startAnimation(-1);
        });

        // Touch: tap to play forward, tap again to reverse
        link.addEventListener('touchstart', function() {
            preloadFrames(function() {
                startAnimation(direction === 1 ? -1 : 1);
            });
        }, { passive: true });
    }

    /* ------ Hero Wallpaper Parallax ------ */
    function initHeroParallax() {
        if (isTouch) return;
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
                var rect    = el.getBoundingClientRect();
                var x       = e.clientX - rect.left, y = e.clientY - rect.top;
                var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
                var rotateY = ((x - rect.width  / 2) / (rect.width  / 2)) *  6;
                el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.03,1.03,1.03)';
            });
            el.addEventListener('mouseleave', function() {
                el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
            });
        });
    }

    /* ------ Album Tilt ------ */
    function initAlbumTilt() {
        var album = document.getElementById('album');
        if (!album) return;
        var lastActive = null, lastHandlers = {};

        function attachTiltToActiveSlide() {
            if (lastActive && lastHandlers.mouseenter) {
                lastActive.removeEventListener('mouseenter', lastHandlers.mouseenter);
                lastActive.removeEventListener('mousemove',  lastHandlers.mousemove);
                lastActive.removeEventListener('mouseleave', lastHandlers.mouseleave);
            }
            var active = album.querySelector('.album__slide.active .album__photos');
            if (active) {
                var target = active.querySelector('.album__photo--front');
                if (target) {
                    let isZoomed = false, zoomTimer = null;
                    function getOrigTransform() {
                        return target.getAttribute('data-orig-transform') || target.style.transform || '';
                    }
                    target.setAttribute('data-orig-transform', target.style.transform || '');
                    target.style.transition = 'scale .5s cubic-bezier(0.22,1,0.36,1)';
                    const mouseenter = function() {
                        target.style.scale = '1.06';
                        zoomTimer = setTimeout(function() { isZoomed = true; }, 150);
                    };
                    const mousemove = function(e) {
                        if (!isZoomed) return;
                        var rect = active.getBoundingClientRect();
                        var x = e.clientX - rect.left, y = e.clientY - rect.top;
                        var rx = ((y - rect.height / 2) / (rect.height / 2)) * -8;
                        var ry = ((x - rect.width  / 2) / (rect.width  / 2)) *  8;
                        target.style.transform = getOrigTransform() + ' perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
                    };
                    const mouseleave = function() {
                        clearTimeout(zoomTimer);
                        isZoomed = false;
                        target.style.transition = 'scale .5s cubic-bezier(0.22,1,0.36,1), transform .4s cubic-bezier(0.22,1,0.36,1)';
                        target.style.transform = getOrigTransform();
                        target.style.scale = '1';
                        setTimeout(function() { target.style.transition = 'scale .5s cubic-bezier(0.22,1,0.36,1)'; }, 500);
                    };
                    active.addEventListener('mouseenter', mouseenter);
                    active.addEventListener('mousemove',  mousemove);
                    active.addEventListener('mouseleave', mouseleave);
                    lastActive   = active;
                    lastHandlers = { mouseenter, mousemove, mouseleave };
                }
            }
        }

        window.addEventListener('scroll', attachTiltToActiveSlide, { passive: true });
        window.addEventListener('DOMContentLoaded', attachTiltToActiveSlide);
        attachTiltToActiveSlide();
    }

    /* ------ Giant Background Words (CSS only, no JS needed) ------ */
    function initBgWords() { /* handled by CSS @keyframes */ }

    /* ------ Hero Title Zoom on Scroll ------ */
    function initHeroTitleZoom() {
        if (isTouch) return;
        var heroTitle = document.getElementById('hero-title');
        if (!heroTitle || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.to(heroTitle, {
            scale: 1.8, y: 120, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: '80% top', scrub: 0.3 }
        });
    }

    /* ------ Magnetic Buttons ------ */
    function initMagneticButtons() {
        if (isTouch) return;
        document.querySelectorAll('.btn, .nav__social, .theme-toggle').forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width  / 2;
                var y = e.clientY - rect.top  - rect.height / 2;
                gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', function() {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

    /* ------ Mouse Spotlight Glow (feeds into masterTick) ------ */
    function initSpotlight() {
        if (isTouch) return;
        var spotlight = document.createElement('div');
        spotlight.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:1', 'pointer-events:none',
            'background:radial-gradient(600px circle at 0px 0px,rgba(6,182,212,0.06),transparent 70%)',
            'will-change:background'
        ].join(';');
        document.body.appendChild(spotlight);
        _spotlight = spotlight; // register with masterTick
    }

    /* ------ Parallax Depth Layers on Scroll (desktop only) ------ */
    function initParallaxLayers() {
        // Guard is in initSite(): only called when !isTouch
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.utils.toArray('.section-title, .case__title--large').forEach(function(el) {
            gsap.to(el, { y: -60, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
        });

        gsap.utils.toArray('.big-text').forEach(function(el, i) {
            gsap.to(el, { y: i % 2 === 0 ? -80 : -40, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 2 } });
        });

        var aboutCards = gsap.utils.toArray('.about-card');
        aboutCards.forEach(function(card, i) {
            gsap.to(card, { y: i % 2 === 0 ? -50 : 50, ease: 'none', scrollTrigger: { trigger: '.about__grid', start: 'top bottom', end: 'bottom top', scrub: 2 } });
        });

        gsap.to('.creative__stat', { y: -40, ease: 'none', scrollTrigger: { trigger: '.creative', start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
        gsap.to('.kkc__text',      { y: -30, ease: 'none', scrollTrigger: { trigger: '.kkc',      start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
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
                    gsap.to(card, { opacity: 1, rotateY: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out' });
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
        title.style.opacity  = '1';
        title.style.transform = 'none';

        text.split('').forEach(function(ch) {
            var span = document.createElement('span');
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            span.style.cssText = 'display:inline-block;will-change:transform,opacity,filter';
            title.appendChild(span);
        });

        var chars = Array.from(title.querySelectorAll('span'));
        gsap.set(chars, { opacity: 0, y: 80, rotateX: -90, filter: 'blur(12px)', transformOrigin: 'bottom center', transformPerspective: 600 });
        gsap.to(chars, {
            opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
            duration: 0.9, ease: 'power3.out',
            stagger: { amount: 0.6, from: 'start' },
            delay: 0.2
        });
    }

    /* ------ Clip-Path Section Wipe Reveal ------ */
    function initClipPathReveal() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        var targets = [
            '.section-title', '.case__title--large', '.creative__title',
            '.case__tagline', '.kkc__desc', '.about__lead'
        ].join(',');

        gsap.utils.toArray(targets).forEach(function(el) {
            if (el.closest('.hero')) return;
            el.style.opacity  = '1';
            el.style.transform = 'none';
            el.classList.remove('reveal');
            gsap.fromTo(el,
                { clipPath: 'inset(0 100% 0 0)' },
                { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut',
                  scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
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