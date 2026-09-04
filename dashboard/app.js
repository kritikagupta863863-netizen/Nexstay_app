(() => {
  const state = { tasks: [], activity: [] };
  const statuses = ['Required', 'In progress', 'Completed', 'Blocked / decision needed', 'Deferred'];
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));

  async function load() {
    try {
      const [tasksResponse, activityResponse] = await Promise.all([
        fetch('data/tasks.json', { cache: 'no-store' }),
        fetch('data/activity.json', { cache: 'no-store' })
      ]);
      if (!tasksResponse.ok || !activityResponse.ok) throw new Error('JSON data could not be loaded');
      state.tasks = await tasksResponse.json();
      state.activity = await activityResponse.json();
      render();
      $('lastUpdated').textContent = `Loaded ${new Date().toLocaleTimeString()}`;
    } catch (error) {
      $('lastUpdated').textContent = 'Load failed';
      $('taskGroups').innerHTML = `<p class="empty">Could not load dashboard data. Run a local HTTP server; browsers block fetch from file://.</p>`;
      console.error(error);
    }
  }

  function render() {
    const search = $('search').value.toLowerCase();
    const status = $('statusFilter').value;
    const priority = $('priorityFilter').value;
    const filtered = state.tasks.filter((task) =>
      (status === 'all' || task.status === status) &&
      (priority === 'all' || task.priority === priority) &&
      [task.id, task.title, task.area].join(' ').toLowerCase().includes(search)
    );
    const counts = statuses.map((item) => state.tasks.filter((task) => task.status === item).length);
    $('summary').innerHTML = [['Total', state.tasks.length], ['Required', counts[0]], ['In progress', counts[1]], ['Completed', counts[2]], ['Blocked', counts[3]]]
      .map(([label, count]) => `<div class="metric"><strong>${count}</strong><span>${label}</span></div>`).join('');
    $('taskCount').textContent = `${filtered.length} shown`;
    $('taskGroups').innerHTML = statuses.map((group) => {
      const tasks = filtered.filter((task) => task.status === group);
      return `<div class="task-group"><h3>${escapeHtml(group)} · ${tasks.length}</h3>${tasks.length ? tasks.map(taskCard).join('') : '<p class="empty">No matching tasks.</p>'}</div>`;
    }).join('');
    $('activityList').innerHTML = state.activity.slice().sort((a, b) => b.date.localeCompare(a.date)).map((event) =>
      `<li><div class="activity-date">${escapeHtml(event.date)}</div><div class="activity-event"><strong>${escapeHtml(event.type)}</strong> · ${escapeHtml(event.message)}</div></li>`).join('');
  }

  function taskCard(task) {
    const source = task.source ? ` · ${escapeHtml(task.source)}` : '';
    return `<article class="task-card"><h4><a href="../status/TASKS.md" title="Open source task board">${escapeHtml(task.id)} — ${escapeHtml(task.title)}</a></h4><div class="task-meta"><span class="badge ${escapeHtml(task.priority.toLowerCase())}">${escapeHtml(task.priority)}</span><span>${escapeHtml(task.area)}</span><span>${escapeHtml(task.updated)}${source}</span></div></article>`;
  }

  function fillFilters() {
    [...new Set(state.tasks.map((task) => task.priority))].sort().forEach((priority) => $('priorityFilter').insertAdjacentHTML('beforeend', `<option>${escapeHtml(priority)}</option>`));
    statuses.forEach((status) => $('statusFilter').insertAdjacentHTML('beforeend', `<option>${escapeHtml(status)}</option>`));
  }
  ['search', 'statusFilter', 'priorityFilter'].forEach((id) => $(id).addEventListener('input', render));
  $('refreshButton').addEventListener('click', load);
  let timer;
  $('autoRefresh').addEventListener('change', (event) => {
    clearInterval(timer);
    if (event.target.checked) timer = setInterval(load, 60000);
  });
  load().then(fillFilters);
})();
