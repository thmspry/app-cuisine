const vue = new Vue({
    el : 'app'
});

document.addEventListener('DOMContentLoaded', function() {
    let el = document.querySelector(".tabs");
    console.log(el)
    let optionsTabs = {
        duration : 500
    }
    var instanceTab = M.Tabs.init(el, optionsTabs);
});
