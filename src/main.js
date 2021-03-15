const vue = new Vue({
    el : 'app'
});

document.addEventListener('DOMContentLoaded', function() {
    let el = document.querySelector(".tabs");
    let optionsTabs = {
        duration : 500
    }

    var instanceTab = M.Tabs.init(el, optionsTabs);

    var elInto = document.querySelectorAll('.collapsible');
    let optionsInto = {
        accordion : true
    }
    var instances = M.Collapsible.init(elInto, optionsInto);

    let dropdown = document.querySelector(".collapsible");

    dropdown.addEventListener("click", function() {
        let arrow = document.querySelector("#arrow");

        if (!arrow.hasAttribute("class") || arrow.getAttribute("class") === "rotate-180-down") {
            arrow.setAttribute("class", "rotate-180-up");
        } else {
            arrow.setAttribute("class", "rotate-180-down");

        }

    });
});
