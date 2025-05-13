document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Post Submission
  const postForm = document.getElementById('postForm');
  const postFeed = document.getElementById('postFeed');

  if (postForm && postFeed) {
    postForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('postTitle').value.trim();
      const content = document.getElementById('postContent').value.trim();
      if (title && content) {
        const post = { title, content, time: new Date().toLocaleString() };
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        posts.unshift(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
        postForm.reset();
      }
    });

    function renderPosts() {
      postFeed.innerHTML = '';
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      posts.forEach(({ title, content, time }) => {
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `<h3>${title}</h3><p>${content}</p><small>${time}</small>`;
        postFeed.appendChild(div);
      });
    }

    renderPosts();
  }

  // Alumni Search Filter
  const searchInput = document.getElementById('searchAlumni');
  const alumniList = document.getElementById('alumniList');
  const alumniData = [
    { name: "Alice", skills: "Web Dev" },
    { name: "Bob", skills: "Data Science" },
    { name: "Charlie", skills: "Cybersecurity" },
  ];

  function displayAlumni(filter = '') {
    alumniList.innerHTML = '';
    alumniData
      .filter(alum => alum.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(alum => {
        const div = document.createElement('div');
        div.className = 'alumni-card';
        div.innerHTML = `<strong>${alum.name}</strong><p>${alum.skills}</p>`;
        alumniList.appendChild(div);
      });
  }

  if (searchInput && alumniList) {
    displayAlumni();
    searchInput.addEventListener('input', (e) => {
      displayAlumni(e.target.value);
    });
  }
});
