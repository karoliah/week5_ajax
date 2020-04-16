'use strict';

const ul = document.getElementById('sarjalista');
//valitse hakuteksti ja hakunappi elementit
const hakuteksti = document.getElementById('hakuteksti');
const hakunappi = document.getElementById('hakunappi');


const haeTVSarja = async (haku) => {
    // http://api.tvmaze.com/search/shows?q=haku
    ul.innerHTML = '';
    const fetchOptions = {
        /* esimerkin vuoksi :
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer: dosfksdofksfoks',
        },
        body: JSON.stringify(objekti),
         */
    };


    try{
        const vastaus = await fetch('http://api.tvmaze.com/search/shows?q=' + haku, fetchOptions);
        if(!vastaus.ok) throw new Error('jokin meni pieleen');
        const sarjat = await vastaus.json();
        console.log(sarjat);
        sarjat.forEach((sarja) => {
            if(sarja.show.officialSite === null) {
                sarja.show.officialSite = sarja.show.url;
            }
            if(sarja.show.image === null) {
                sarja.show.image = {medium: 'http://placekitten.com/320/200'};
            }
            ul.innerHTML += `<li>
                <h2>${sarja.show.name}</h2>
                <a href="${sarja.show.officalSite}">Linkki kotisivulle</a>
                <img src="${sarja.show.image.medium}" alt="${sarja.show.name}">
                <p>${sarja.show.summary}</p>
                 </li>`;
        });
    } catch (error) {
        console.log(error);
    }

};

//kun hakunappia klikkaa hae hakutekstin value ja kutsu haeTVSarja(value)
hakunappi.addEventListener('click', () =>{
    haeTVSarja(hakuteksti.value);
});

haeTVSarja('dead');