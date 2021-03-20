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


    // Pour gérer l'animation de la petite flèche dans la Collapsible
    let dropdown = document.querySelector(".collapsible");
    dropdown.addEventListener("click", function() { // Au clic
        let arrow = document.querySelector("#arrow");

        // Si la fleche est vers le bas (soit par défaut au démarage de la page soit après être retournée)
        if (!arrow.hasAttribute("class") || arrow.getAttribute("class") === "rotate-180-down") {
            arrow.setAttribute("class", "rotate-180-up"); // On la tourne vers le haut (Collapsible ouverte)
        } else {
            arrow.setAttribute("class", "rotate-180-down"); // On la tourne vers le bas (Collapsible fermée)
        }
    });

});
