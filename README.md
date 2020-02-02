# My Weather App https://adamcadaver.github.io/my-weather-app/
## Does it work?
Yes but I only implemented using zipcodes, no full addresses. The NOAA weather API has been very flaky whilst I have been working on this. 10010 and 10020 don't get forecasts for some reason but 002222 works!

## Well Factored?
Not perfect but fairly reasonable for a couple hours work. The client library for the Google Places API is a bit odd so I had to add a dummy `<div id="map"></div>` and a extra script tag. With more time I would have cleaned that up. App holds state and deals with layout. FavoritesList and ForecastDisplay are both dumb components. StoredFavorites manages the relationship with localStorage and GetForecast fetching data.

## Easy to use?
I think so! Very Spartan in terms of styling so it could look better.

## Things left undone
1. Tests - This is the first time I have written react so I was exploring a lot. For any production code I would add unit + integration tests.
2. Defensive Programming - More error catching, limit the amount of requests users can send
3. Caching - forecasts don't change every second so we could cache the forecasts and have the cache expiry after 30 minutes for example.
4. Styling - not my strong suit but good enough for a POC.
5. Add support for full addresses - Given this is my first foray into React, I thought it would be a good idea to limit the scope. the API to get LatLngs for full addresses is the same so this would be fairly quick to do.
