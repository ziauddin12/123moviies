(() => {
  const grid = document.getElementById('movieGrid');
  const cards = Array.from(grid.querySelectorAll('.movie-card'));
  const search = document.getElementById('movieSearch');
  const sort = document.getElementById('sortSelect');
  const chips = Array.from(document.querySelectorAll('.genre-chip'));
  const count = document.getElementById('resultCount');
  const empty = document.getElementById('emptyState');
  const reset = document.getElementById('resetFilters');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  let activeGenre = 'All';

  function render() {
    const term = search.value.trim().toLowerCase();
    let visible = cards.filter(card => {
      const matchesGenre = activeGenre === 'All' || card.dataset.genre === activeGenre;
      const matchesSearch = card.dataset.title.toLowerCase().includes(term);
      card.hidden = !(matchesGenre && matchesSearch);
      return !card.hidden;
    });

    if (sort.value === 'title') visible.sort((a,b) => a.dataset.title.localeCompare(b.dataset.title));
    if (sort.value === 'year') visible.sort((a,b) => Number(b.dataset.year) - Number(a.dataset.year));
    visible.forEach(card => grid.appendChild(card));
    count.textContent = String(visible.length);
    empty.hidden = visible.length !== 0;
    grid.hidden = visible.length === 0;
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    activeGenre = chip.dataset.genre;
    chips.forEach(item => item.classList.toggle('active', item === chip));
    render();
  }));
  search.addEventListener('input', render);
  sort.addEventListener('change', render);
  reset.addEventListener('click', () => {
    activeGenre = 'All';
    search.value = '';
    sort.value = 'featured';
    chips.forEach(chip => chip.classList.toggle('active', chip.dataset.genre === 'All'));
    render();
  });
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  render();
})();