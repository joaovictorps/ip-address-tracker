function search() {
    let ipOrDomain = document.getElementById('search').value;

    axios.get(`https://geo.ipify.org/api/v1?apiKey=at_cYstAyb90AdkYmKc8xZMu1gpeMtTw&domain=${ipOrDomain}`).then(res => {
        const { ip, isp } = res.data;
        const { city, region, timezone, postalCode, lat, lng } = res.data.location;

        replace(city, region, postalCode, ip, isp, timezone, lat, lng);
    }).catch(err => {
        alert("Invalid ip address or domain. Make sure you don't have any AD blockers enabled.");
    });
}

function getAddress() {
    axios.get(`https://geo.ipify.org/api/v1?apiKey=at_cYstAyb90AdkYmKc8xZMu1gpeMtTw`).then(res => {
        const { ip, isp } = res.data;
        const { city, region, timezone, postalCode, lat, lng } = res.data.location;

        replace(city, region, postalCode, ip, isp, timezone, lat, lng);
    }).catch(err => {
        alert("Invalid ip address or domain. Make sure you don't have any AD blockers enabled.");
    });

}

function replace(city, region, postalCode, ip, isp, timezone, lat, lng) {
    let inputIp = document.getElementById('search');
    let htmlIp = document.getElementById('ip');
    let htmlIsp = document.getElementById('isp');
    let htmlTimezone = document.getElementById('timezone');
    let htmlLocation = document.getElementById('location');

    htmlIp.innerHTML = ip;
    htmlLocation.innerHTML = `${city}, ${region} ${postalCode}`;
    htmlTimezone.innerHTML = timezone;
    htmlIsp.innerHTML = isp;
    inputIp.value = ip;

    if(map) {
        map.remove();
    }
    
    map = L.map(document.getElementById('mapDIV'), {
        center: [lat + 0.002, lng],
        zoom: 16
    });
    basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    });
    basemap.addTo(map);

    L.marker([lat, lng]).addTo(map)
    .bindPopup(`${isp}.<br> ${postalCode}`)
    .openPopup();
}

let map;
let basemap;

window.onload = () => {
    getAddress();

}; 