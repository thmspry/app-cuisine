const API_KEY = 'AIzaSyD-0a6UVG1gM7yxF_Nmt3DhpFGKxq-P7Ew'
//const API_KEY = 'AIzaSyAwMiD8InjTJB84mLZqQf6z4z3zKvshWiM'
const useYoutubeApi = {

    /**
     * Cherche une vidéo sur la chaine YouTube "Chef Michel Dumas" correpondante aux mots-clés
     * @param keywords : string[] array de mots clés
     * @returns {Promise<unknown>} : l'ID de la vidéo la plus correspondante aux mot-clés
     */
    searchOnMichelDumasChannel: (keywords) => new Promise((resolve, reject) => {
        let searchUrl= `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=video&channelId=UCSLyEx8ISkp567AjOAHYN5Q&q=`;

        /**
         * Le pipe permet de faire un OU entre les mots pour l'API
         * Par exemple, si le premier mot ne donne rien mais le deuxième si, l'API renvoie le résultat du deuxième
         */
        keywords = keywords.join('|')
        console.log("Je vais chercher avec : " + searchUrl + keywords)
        fetch(searchUrl + keywords)
            .then((response) => response.json())
            .then(data => {
                if (data.items !== undefined && data.items.length > 0) {
                    resolve(data.items[0].id.videoId)
                } else {
                    reject({"error":"aucune vidéo trouvée OU quota dépassé"})
                }
            })
            .catch(error => reject(error))
    }),
};

export default useYoutubeApi;
