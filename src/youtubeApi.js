//const API_KEY = 'AIzaSyD-0a6UVG1gM7yxF_Nmt3DhpFGKxq-P7Ew'
const API_KEY = 'AIzaSyAwMiD8InjTJB84mLZqQf6z4z3zKvshWiM'
const useYoutubeApi = {
    searchOnMichelDumasChannel: (keywords) => new Promise((resolve, reject) => {
        let searchUrl= `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=video&channelId=UCSLyEx8ISkp567AjOAHYN5Q&q=`;

        /*searchUrl += keywords[0];
        keywords.shift();
        keywords.forEach(word => {
            searchUrl += "%20" + word;
        });


        keywords.forEach(word => {
            console.log("Test avec " + word)
            console.log("URL : " + searchUrl + word)
            fetch(searchUrl + word).
            then((response) => response.json()).
            then(data => {
                console.table(data)
                if (data.items.length > 0) {
                    resolve(data);
                }
            }).
            catch(error => reject(error));
        });*/
        keywords = keywords.join('|')
        fetch(searchUrl + keywords)
            .then((response) => response.json())
            .then(data => {
                if (data.items.length > 0) {
                    resolve(data)
                } else {
                    reject({"error":"aucune vidéo trouvée"})
                }
            }).catch(error => reject(error))
    }),
};

export default useYoutubeApi;
