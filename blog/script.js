(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const searchInput = document.querySelector('#article-search');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const articleCards = [...document.querySelectorAll('.article-card')];
  const resultCount = document.querySelector('.result-count');
  const emptyState = document.querySelector('#empty-state');
  const toast = document.querySelector('#toast');
  const form = document.querySelector('#newsletter-form');
  const formFeedback = document.querySelector('#form-feedback');

  let activeFilter = 'all';
  let toastTimer;

  const readStoredTheme = () => {
    try {
      return localStorage.getItem('linye-theme');
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem('linye-theme', theme);
    } catch {
      // Private browsing may block localStorage; the toggle still works for this visit.
    }
  };

  const setTheme = (theme, persist = false) => {
    const isLight = theme === 'light';
    root.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? '切换到深色模式' : '切换到浅色模式');
    if (persist) saveTheme(isLight ? 'light' : 'dark');
  };

  const storedTheme = readStoredTheme();
  const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  setTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : preferredTheme);

  themeToggle.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
    showToast(root.dataset.theme === 'light' ? '已切换到浅色模式' : '已切换到深色模式');
  });

  const setMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
    mobileMenu.hidden = !isOpen;
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);

    if (event.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT') {
      event.preventDefault();
      searchInput.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setMenuState(false);
  });

  const normalize = (value) => value.trim().toLocaleLowerCase('zh-CN');

  const renderArticles = () => {
    const query = normalize(searchInput.value);
    let visibleCount = 0;

    articleCards.forEach((card) => {
      const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchableText = normalize(card.dataset.search || card.textContent);
      const matchesQuery = !query || searchableText.includes(query);
      const isVisible = matchesFilter && matchesQuery;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    resultCount.textContent = `${String(visibleCount).padStart(2, '0')} 篇`;
    emptyState.hidden = visibleCount !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle('is-selected', isSelected);
        item.setAttribute('aria-pressed', String(isSelected));
      });
      renderArticles();
    });
  });

  searchInput.addEventListener('input', renderArticles);

  document.querySelectorAll('[data-demo-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(link.dataset.demoLink || '文章详情正在整理中');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = form.elements.email;
    const email = emailInput.value.trim();

    if (!email || !emailInput.validity.valid) {
      formFeedback.textContent = '请输入有效的邮箱地址。';
      emailInput.focus();
      return;
    }

    formFeedback.textContent = '演示完成！接入表单服务后，这里就能真正订阅。';
    form.reset();
  });

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
  renderArticles();
})();
