browser.runtime.onMessage.addListener(msg => {
  if (msg && msg.zipcode) {
    update(msg.zipcode);
  }
});

function update(zipcode) {
  let url = `http://api.wunderground.com/api/98072597ad44d824/geolookup/q/${zipcode}.json`;
  ajax(url).then(locationResponse => {
    let state = locationResponse.location.state;
    let city = locationResponse.location.city.replace(/ /g,"_");
    url = `http://api.wunderground.com/api/98072597ad44d824/conditions/q/${state}/${city}.json`;
    ajax(url).then(weather => {
      let temp = weather.current_observation.temp_f;
      let color;
      if (temp < 40) {
        color = "#3366ff";
      } else if (temp >= 40 && temp < 70) {
        color = "#ff9900";
      } else {
        color = "#ff3333";
      }
      browser.theme.update({
        images: {
          headerURL: weather.current_observation.icon_url,
        },
        colors: {
          accentcolor: color,
          textcolor: "#fff"
        }
      });
    });
  });
}

function ajax(url) {
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.responseText) {
        resolve(JSON.parse(xhr.responseText));
      }
    }
    xhr.send();
  });
}