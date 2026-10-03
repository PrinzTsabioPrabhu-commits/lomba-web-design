document.addEventListener('DOMContentLoaded', () => {
  window.requestAnimationFrame(() => {
    document.body.classList.add('page-enter');
    window.setTimeout(() => document.body.classList.remove('page-enter'), 1200);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (header) {
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (hero) {
    const updateHeroParallax = () => {
      const offset = window.scrollY * 0.14;
      hero.style.backgroundPosition = `center ${offset}px`;
    };
    updateHeroParallax();
    window.addEventListener('scroll', updateHeroParallax, { passive: true });
  }

  const autoRevealSelector = [
    'main section .grid-3 > *',
    'main section .grid-crafts > *',
    'main section .craft-grid > *',
    'main section .makers-grid > *',
    'main section .home-journey-grid > *',
    'main section .home-stories-grid > *',
    'main section .region-map > *',
    'main section .feature-list > *',
    'main section .info-grid > *',
    'main section .filters > *',
    'main section .region-panel',
    'main section .economy-note',
    'main section .cta-panel',
    'main section .process-shell',
    'main section .article-layout',
    'main section .side-box',
    'main section .info-card',
    'main section .process-step',
    'main section .stories-heading',
    'main section .article-main > h2',
    'main section .article-main > p',
    'main section .article-main > .eyebrow',
    'main section .article-main > .pull-quote'
  ].join(', ');

  document.querySelectorAll(autoRevealSelector).forEach((item) => item.classList.add('reveal'));

  const revealItems = document.querySelectorAll('main .reveal');
  const pendingRevealItems = new Set(revealItems);
  let revealObserver = null;
  let revealCheckScheduled = false;

  const revealItem = (item) => {
    item.classList.add('is-visible');
    pendingRevealItems.delete(item);
    revealObserver?.unobserve(item);
  };

  const revealVisibleItems = () => {
    revealCheckScheduled = false;
    pendingRevealItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.96 && bounds.bottom > 0) {
        revealItem(item);
      }
    });
  };

  const scheduleRevealCheck = () => {
    if (revealCheckScheduled) return;
    revealCheckScheduled = true;
    window.requestAnimationFrame(revealVisibleItems);
  };

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealItem(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px -2% 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    window.addEventListener('scroll', scheduleRevealCheck, { passive: true });
    window.addEventListener('resize', scheduleRevealCheck);
    scheduleRevealCheck();
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    pendingRevealItems.clear();
  }

  const pageLinks = document.querySelectorAll('.site-nav a');
  pageLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath && window.location.pathname.endsWith(linkPath)) {
      link.classList.add('active');
    }
  });

  const regionData = {
    java: {
      title: 'Java',
      summary: 'From Pekalongan to Yogyakarta, Java carries a living archive of textile, wood, and ceremonial craft traditions.',
      crafts: ['Batik', 'Jepara Wood Carving', 'Wayang'],
      location: 'Pekalongan / Jepara / Yogyakarta',
      artisan: 'Siti Rahma',
      story: 'Batik patterns continue to move between heritage and everyday life.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Batik_Artisan_Applying_Wax_with_Canting_in_Trusmi_Cirebon_Indonesia.jpg/960px-Batik_Artisan_Applying_Wax_with_Canting_in_Trusmi_Cirebon_Indonesia.jpg'
    },
    sumatera: {
      title: 'Sumatera',
      summary: 'Sumatera preserves weaving, metalwork, and ceremonial craft deeply rooted in local ritual and identity.',
      crafts: ['Songket', 'Tenun Minang', 'Ukiran Kayu'],
      location: 'Padang / Bukittinggi / Palembang',
      artisan: 'Dewi Ningsih',
      story: 'Threads carry memory across generations and trade routes.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Tenunan_songket_khas_Minangkabau.jpg/960px-Tenunan_songket_khas_Minangkabau.jpg'
    },
    kalimantan: {
      title: 'Kalimantan',
      summary: 'Kalimantan speaks through wood, rattan, and the surrounding forests that shape each craft practice.',
      crafts: ['Anyaman Rotan', 'Ukiran Dayak', 'Gambar Tato'],
      location: 'Pontianak / Samarinda / Balikpapan',
      artisan: 'Rudi Laman',
      story: 'Craft in the forest is learned through attention and patience.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Patung_Sapundu_Suku_Dayak_Ngaju.jpg'
    },
    sulawesi: {
      title: 'Sulawesi',
      summary: 'Sulawesi layers design with ritual, agriculture, and the physical rhythm of island life.',
      crafts: ['Tenun Toraja', 'Perak', 'Anyaman'],
      location: 'Toraja / Makassar / Manado',
      artisan: 'Adinda Toding',
      story: 'Every motif carries community memory and spiritual meaning.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Rumah_Tongkonan_Di_Toraja.jpg/960px-Rumah_Tongkonan_Di_Toraja.jpg'
    },
    bali: {
      title: 'Bali & Nusa Tenggara',
      summary: 'The islands bring together ritual, weaving, and a refined sense of material culture shaped by place.',
      crafts: ['Tenun Ikat', 'Perhiasan Tradisional', 'Ukiran Bali'],
      location: 'Ubud / Lombok / Sumba',
      artisan: 'Made Aria',
      story: 'Beauty and function continue to be held together by hand.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Balinese_Hindus_dressed_for_traditional_dance_Indonesia.jpg/960px-Balinese_Hindus_dressed_for_traditional_dance_Indonesia.jpg'
    },
    papua: {
      title: 'Papua',
      summary: 'Papua brings earth-toned textures and symbolic design grounded in connection to land, ancestry, and ceremony.',
      crafts: ['Noken', 'Asmat Carving', 'Tifa Body'],
      location: 'Jayapura / Wamena / Merauke',
      artisan: 'Mareta Yogi',
      story: 'The story is never separated from the material it is made from.',
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Membuat_noken.jpg/960px-Membuat_noken.jpg'
    }
  };

  const regionButtons = document.querySelectorAll('[data-region]');
  const regionTitle = document.querySelector('[data-region-title]');
  const regionSummary = document.querySelector('[data-region-summary]');
  const regionCrafts = document.querySelector('[data-region-crafts]');
  const regionLocation = document.querySelector('[data-region-location]');
  const regionArtisan = document.querySelector('[data-region-artisan]');
  const regionStory = document.querySelector('[data-region-story]');
  const regionImage = document.querySelector('[data-region-image]');

  const applyRegion = (key) => {
    const data = regionData[key];
    if (!data) return;
    if (regionTitle) regionTitle.textContent = data.title;
    if (regionSummary) regionSummary.textContent = data.summary;
    if (regionCrafts) regionCrafts.innerHTML = data.crafts.map((craft) => `<li>${craft}</li>`).join('');
    if (regionLocation) regionLocation.textContent = data.location;
    if (regionArtisan) regionArtisan.textContent = data.artisan;
    if (regionStory) regionStory.textContent = data.story;
    if (regionImage) regionImage.style.backgroundImage = `url('${data.image}')`;

    regionButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.region === key);
    });
  };

  if (regionButtons.length) {
    const initialRegion = regionButtons[0]?.dataset.region || 'java';
    applyRegion(initialRegion);
    regionButtons.forEach((button) => {
      button.addEventListener('click', () => applyRegion(button.dataset.region));
    });
  }

  const processSteps = document.querySelectorAll('[data-process-step]');
  const processPanels = document.querySelectorAll('.process-panel');

  const activateProcess = (index) => {
    processSteps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index);
      step.setAttribute('aria-selected', String(i === index));
    });

    processPanels.forEach((panel, i) => {
      panel.classList.toggle('is-active', i === index);
    });
  };

  if (processSteps.length) {
    processSteps.forEach((step, index) => {
      step.addEventListener('click', () => activateProcess(index));
    });
    activateProcess(0);
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const craftCards = document.querySelectorAll('.craft-card');

  document.querySelectorAll('.culture-card .card-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      const label = toggle.getAttribute('aria-label') || 'Toggle culture explanation';
      toggle.setAttribute('aria-label', isExpanded ? label.replace('Tutup', 'Lihat') : label.replace('Lihat', 'Tutup'));
      toggle.closest('.culture-card')?.classList.toggle('is-flipped', !isExpanded);
    });
  });

  const storyToggles = document.querySelectorAll('.story-toggle');
  storyToggles.forEach((toggle) => {
    const storyName = toggle.dataset.storyName;
    const detail = toggle.closest('.story-card')?.querySelector('.story-detail');
    if (detail && storyName) {
      detail.tabIndex = 0;
      detail.setAttribute('role', 'region');
      detail.setAttribute('aria-label', `Cerita lengkap tentang ${storyName}`);
    }
  });

  storyToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const storyCard = toggle.closest('.story-card');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      storyToggles.forEach((otherToggle) => {
        const otherCard = otherToggle.closest('.story-card');
        otherToggle.setAttribute('aria-expanded', 'false');
        otherToggle.textContent = '+';
        otherToggle.setAttribute('aria-label', `Baca cerita ${otherToggle.dataset.storyName}`);
        otherCard?.classList.remove('is-story-open');
      });

      if (!isExpanded) {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.textContent = '−';
        toggle.setAttribute('aria-label', `Tutup cerita ${toggle.dataset.storyName}`);
        storyCard?.classList.add('is-story-open');
      }
    });
  });

  const storySearch = document.querySelector('#story-search');
  const storyCards = [...document.querySelectorAll('.story-card')];
  const storyEmpty = document.querySelector('#story-empty');
  const normalizeSearchText = (text) => text
    .toLocaleLowerCase('id')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const filterStates = new WeakMap();

  const animateFilter = (items, matches, onSettled = () => {}) => {
    const filterItems = Array.from(items);
    if (!filterItems.length) return;

    const group = filterItems[0].parentElement;
    let state = filterStates.get(group);
    if (!state) {
      state = { timer: 0, version: 0, animations: [] };
      filterStates.set(group, state);
    }

    window.clearTimeout(state.timer);
    state.version += 1;
    const version = state.version;
    state.animations.forEach((animation) => animation.cancel());
    state.animations = [];

    const currentlyVisible = new Map(filterItems.map((item) => [item, item.dataset.hidden !== 'true']));
    const entering = [];
    const leaving = [];

    filterItems.forEach((item) => {
      const isMatch = matches(item);
      const wasVisible = currentlyVisible.get(item);
      item.classList.remove('filter-leaving');

      if (isMatch) {
        item.setAttribute('aria-hidden', 'false');
        item.inert = false;
        if (wasVisible) item.dataset.hidden = 'false';
        else entering.push(item);
      } else if (wasVisible) {
        item.setAttribute('aria-hidden', 'true');
        item.inert = true;
        item.classList.add('filter-leaving');
        leaving.push(item);
      } else {
        item.setAttribute('aria-hidden', 'true');
        item.inert = true;
      }
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      filterItems.forEach((item) => {
        item.dataset.hidden = String(!matches(item));
        item.classList.remove('filter-leaving');
      });
      onSettled(filterItems.filter(matches).length);
      return;
    }

    leaving.forEach((item) => {
      if (typeof item.animate === 'function') {
        state.animations.push(item.animate(
          [
            { opacity: getComputedStyle(item).opacity, transform: 'translateY(0) scale(1)' },
            { opacity: 0, transform: 'translateY(-8px) scale(0.985)' }
          ],
          { duration: 180, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
        ));
      }
    });

    state.timer = window.setTimeout(() => {
      if (state.version !== version) return;

      const previousPositions = new Map(
        filterItems
          .filter((item) => matches(item) && currentlyVisible.get(item))
          .map((item) => [item, item.getBoundingClientRect()])
      );

      filterItems.forEach((item) => {
        const isMatch = matches(item);
        item.dataset.hidden = String(!isMatch);
        item.classList.remove('filter-leaving');
        if (isMatch) item.classList.add('is-visible');
      });

      window.requestAnimationFrame(() => {
        if (state.version !== version) return;

        entering.forEach((item, index) => {
          if (typeof item.animate !== 'function') return;

          state.animations.push(item.animate(
            [
              { opacity: 0, transform: 'translateY(14px) scale(0.985)' },
              { opacity: 1, transform: 'translateY(0) scale(1)' }
            ],
            { duration: 420, delay: Math.min(index, 5) * 35, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          ));
        });

        filterItems.forEach((item) => {
          const previous = previousPositions.get(item);
          if (!matches(item) || !previous || typeof item.animate !== 'function') return;

          const current = item.getBoundingClientRect();
          const deltaX = previous.left - current.left;
          const deltaY = previous.top - current.top;
          if (!deltaX && !deltaY) return;

          state.animations.push(item.animate(
            [
              { transform: `translate(${deltaX}px, ${deltaY}px)` },
              { transform: 'translate(0, 0)' }
            ],
            { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          ));
        });

        onSettled(filterItems.filter(matches).length);
      });
    }, leaving.length ? 180 : 0);
  };

  if (storySearch && storyCards.length) {
    storySearch.addEventListener('input', () => {
      const query = normalizeSearchText(storySearch.value.trim());
      const matches = (card) => {
        const searchableText = normalizeSearchText(`${card.dataset.search || ''} ${card.innerText}`);
        return searchableText.includes(query);
      };

      animateFilter(storyCards, matches, (visibleCount) => {
        if (storyEmpty) storyEmpty.hidden = visibleCount > 0;
      });

      storyCards.forEach((card) => {
        if (!matches(card) && card.classList.contains('is-story-open')) {
          const toggle = card.querySelector('.story-toggle');
          toggle?.setAttribute('aria-expanded', 'false');
          toggle?.setAttribute('aria-label', `Baca cerita ${toggle.dataset.storyName}`);
          if (toggle) toggle.textContent = '+';
          card.classList.remove('is-story-open');
        }
      });
    });
  }

  const applyFilter = (category) => {
    animateFilter(craftCards, (card) => category === 'all' || card.dataset.category === category);

    filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === category);
    });
  };

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.filter));
    });
    applyFilter('all');
  }
});
