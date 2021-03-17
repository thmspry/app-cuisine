Vue.component('instruction', {
    props: ["instruction"],
    template: `
    <div class="instruction-solo">
        <p class="step-number">{{instruction.number}}</p>
        <p class="step-instruction">{{instruction.step}}</p>
    </div>`,
})
