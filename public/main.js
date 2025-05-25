document.getElementById('search').addEventListener('input', async (e) => {
  const query = e.target.value.trim();

  const results = document.getElementById('results');
  results.innerHTML = '';

  if (!query) return;

  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Erro na busca');
    const mangas = await res.json();

    mangas.forEach(m => {
      const li = document.createElement('li');
      li.textContent = m.title;
      li.style.cursor = 'pointer';
      li.tabIndex = 0;
      li.onclick = () => window.location.href = `/manga.html?id=${m.id}`;
      li.onkeydown = (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          li.click();
        }
      };
      results.appendChild(li);
    });

  } catch (error) {
    results.innerHTML = '<li>Erro ao buscar mangás.</li>';
    console.error(error);
  }
});
