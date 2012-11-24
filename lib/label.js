var sfk = this.sfk || {};

(function () {
    sfk.components.label = {
        create: function () {
            var label = Object.create(this);
            label.element = cull.dom.el.span();
            return label;
        },

        getElement: function () {
            return this.element;
        },

        set: function (text) {
            this.element.innerText = text;
        }
    };
}());
