const vue = new Vue({
    el : 'app'
});

document.addEventListener('DOMContentLoaded', function() {


    // Instanciation Collapsible des intolérances
    var collapsible = document.querySelectorAll('.collapsible');
    let optionsInto = {
        accordion : true
    }
    var instanceCollapsible = M.Collapsible.init(collapsible, optionsInto);

    // Instanciation Modal de détail
    var modal = document.querySelectorAll('.modal');
    let optionsModal = {
        opacity : 0.3,
        inDuration : 250,
        outDuration: 250
    }
    var instanceModal = M.Modal.init(modal, optionsModal);


    let dropdown = document.querySelector(".collapsible");

    dropdown.addEventListener("click", function() {
        let arrow = document.querySelector("#arrow");

        if (!arrow.hasAttribute("class") || arrow.getAttribute("class") === "rotate-180-down") {
            arrow.setAttribute("class", "rotate-180-up");
        } else {
            arrow.setAttribute("class", "rotate-180-down");

        }
    });

    /*let checkboxes = document.querySelectorAll(".filled-in");
    if (localStorage.getItem('intolerances') != null) {
        let intolerances = localStorage.getItem("intolerances")
        checkboxes.forEach(c => {
            //console.log("On est sur la cb",c.getAttribute("id"))
            if(intolerances[c.getAttribute("id")] === true) {
                c.setAttribute("checked", "checked");
            }
        })
    }*/

});
