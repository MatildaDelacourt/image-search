import fetch from 'node-fetch';
console.log('helo from unsplas');

exports.handler = async (event) => {
  const { query } = JSON.parse(event.body);

  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  })
    .then((response) => {
      console.log('are we logged in?',response);
      return response.json();
    })
    .catch((error) => console.log('error', error));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};
