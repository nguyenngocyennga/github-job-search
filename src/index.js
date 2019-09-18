const results = document.querySelector("#results");
const resultsSubText = document.querySelector("#results-sub-text");

const searchJobs = (keyword) => {
  const apiUrl = `https://jobs.github.com/positions.json?description=${keyword}&full_time=true&page=1`;
  fetch(apiUrl)
    .then(response => response.json())
    .then((data) => {
      const response = `<p>Here are <b>${data.length}</b> alluring jobs for your next <b>${keyword}</b> venture:</p>`;
      resultsSubText.insertAdjacentHTML('afterbegin', response);
      const tableHeader = `
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Type</th>
          <th>Location</th>
        </tr>`;
      results.insertAdjacentHTML('afterbegin', tableHeader);
      data.forEach((job) => {
        const newJob = `
        <tr>
          <td><a href="${job.url}">${job.title}</a></td>
          <td>${job.company}</td>
          <td>${job.type}</td>
          <td>${job.location}</td>
        </tr>`;
        results.insertAdjacentHTML('beforeend', newJob);
      });
    });
};

const searchForm = document.querySelector("#search-jobs");

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  resultsSubText.innerHTML = "";
  results.innerHTML = "";
  const keyword = document.querySelector("#keyword").value;
  searchJobs(keyword);
});
