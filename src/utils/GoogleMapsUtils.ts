export const loadMapApi = () => {
    const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLivOkXKyUKxJoV5g8RRWb_jKqE_wt6J8&libraries=geometry,places&language=pt-br&region=BR&v=quarterly`;
    const scripts = document.getElementsByTagName('script');

    for(let i = 0; i < scripts.length; i++){
        if(scripts[i].src.indexOf(mapsUrl) === 0){
            return scripts[i];
        }
    }

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = mapsUrl;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    window.document.body.appendChild(googleMapsScript);

    return googleMapsScript;
}