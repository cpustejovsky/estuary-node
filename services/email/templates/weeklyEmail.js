module.exports = weeklyEmail = (
  notes,
  projects
) => `<h1>Your Weekly Accomplishments</h1>
<p>Don't worry if you didn't complete as much as you wanted or anything at all. Life is a journey and you can do better next week. I believe in you.</p>
    <h2>Here are your completed next actions
    <ul>
      ${notes.reduce((acc, note) => (acc += `<li>${note.content}</li>`), ``)}
    </ul>
    <hr/>
    <h2>Here are your completed projects</h2>
    <ul>
      ${projects.reduce(
        (acc, project) =>
          (acc += `<h3>${project.title}</h3><p>${project.description}</p>`),
        ``
      )}
    </ul>
    
    `;
