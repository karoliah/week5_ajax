'use strict';

const haeTVSarja = async (haku) => {
    // http://api.tvmaze.com/search/shows?q=haku
    try{
        const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' + haku);
        if(!vastaus.ok) throw new Error('jokin meni pieleen');
        const sarjat = await vastaus.json();
        console.log(sarjat);
    } catch (error) {
        console.log(error);
    }

};

haeTVSarja('dead');