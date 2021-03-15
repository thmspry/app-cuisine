const API_KEY = 'AIzaSyD-0a6UVG1gM7yxF_Nmt3DhpFGKxq-P7Ew'

const useYoutubeApi = {
    searchOnMichelDumasChannel: (keywords) => new Promise((resolve, reject) => {
        let searchUrl= `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=video&q=`;

        searchUrl += "michel%20dumas%20" + keywords[0];
        keywords.shift();
        keywords.forEach(word => {
            searchUrl += "%20" + word;
        });
        fetch(searchUrl).
        then((response) => response.json()).
        then(data => {
            resolve(data);
        }).
        catch(error => reject(error));
    }),
};

export default useYoutubeApi;
