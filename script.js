let currentPage = 1;

const loadIssues = async () => {
  try {
    const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`);
    if (!response.ok) {
      throw new Error('Failed to fetch issues.');
    }

    const data = await response.json();
    const issueList = document.getElementById('issue-list');
    issueList.innerHTML = '';

    data.forEach((issue) => {
      const issueItem = document.createElement('li');
      issueItem.textContent = issue.title;
      issueList.appendChild(issueItem);
    });

    document.getElementById('page-number').textContent = `Page number ${currentPage}`;
  } catch (error) {
    console.error(error);
  }
};

document.getElementById('load_prev').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadIssues();
  }
});

document.getElementById('load_next').addEventListener('click', () => {
  currentPage++;
  loadIssues();
});

loadIssues();
