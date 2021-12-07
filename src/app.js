const form = document.querySelector('.search-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const data = response.results;

  if (data.length !== 0) {
    var container = document.querySelector('.container');
    container.innerText = '';
    var template = document.querySelector('#template');

    data.forEach(function (result) {
      var clone = template.content.cloneNode(true);
      var img = clone.querySelectorAll('img');
      var caption = clone.querySelectorAll('figcaption');
      var desc = clone.querySelectorAll('p');

      img[0].src = result.urls.thumb;
      caption[0].innerText = 'by ' + result.user.name;

      if (result.description != null) {
        if (result.description.length > 100) {
          result.description = result.description.substr(0, 99) + '...';
        }

        desc[0].innerText = result.description;
      }

      container.appendChild(clone);
    });
  } else {
    var container = document.querySelector('.container');
    container.innerText = 'No results found';
  }
});
