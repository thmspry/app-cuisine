Vue.component('instruction', {
    props: ["instruction"],
    template: `
    <div class="instruction-solo">
        <span class="step-number">{{instruction.number}}</span>
        <span class="step-instruction">{{instruction.step}}</span>
    </div>`,
})
