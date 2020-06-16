//TODO: make sure links to projects work
module.exports = dailyEmail = (
  intray,
  nextActions,
  projects
) => `<h1>Your Daily Update</h1>
    <h2>Here are your <a href="https://www.estuaryapp.com/notes/next" target="_blank" rel="noopener noreferrer">next actions</a></h2>
    <ul>
      ${nextActions.reduce(
        (acc, note) => (acc += `<li>${note.content}</li>`),
        ``
      )}
    </ul>
    <hr/>
    <h2>Here are your <a href="https://www.estuaryapp.com/projects/list" target="_blank" rel="noopener noreferrer">projects</a></h2>
    <ul>
      ${projects.reduce(
        (acc, project) =>
          (acc += `<h3>${project.title}</h3><p>${project.description}</p>`),
        ``
      )}
    </ul>
    <hr/>
    <h2>Here are the note you still need to <a href="https://www.estuaryapp.com/notes/in-tray" target="_blank" rel="noopener noreferrer">organize</a></h2>
    <ul>
      ${intray.reduce((acc, note) => (acc += `<li>${note.content}</li>`), ``)}
    </ul>`;

// <ul>
//   ${projects.reduce(
//     (acc, project) =>
//       (acc += `<a href="https://www.estuaryapp.com/projects/show/${project._id}" target="_blank" rel="noopener noreferrer"><h3>${project.title}</h3></a><p>${project.description}</p>`),
//     ``
//   )}
// </ul>
