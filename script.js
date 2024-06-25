const resultsDiv = document.getElementById("results");

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
        .then(response => response.json())
        .then(data => {
            const { results } = data;

            const timesToDisplay = [
                ['Sunset', results.sunset],
                ['Civil Twilight End', results.civil_twilight_end],
                ['Nautical Twilight End', results.nautical_twilight_end],
                ['Astronomical Twilight End', results.astronomical_twilight_end]
            ];

            // Display all times, no filtering needed.
            timesToDisplay.forEach(([name, time]) => {
                const formattedTime = formatTime(time);
                const p = document.createElement("p");
                p.textContent = `${name}: ${formattedTime}`;
                resultsDiv.appendChild(p);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function error() {
    resultsDiv.innerHTML = "<p>Location not available. Showing data for Stuttgart.</p>";
    success({ coords: { latitude: 48.7758459, longitude: 9.1829321 } });
}

function formatTime(isoTimeString) {
    const date = new Date(isoTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
