var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    sfk.components.button = bane.createEventEmitter({
        create: function (text) {
            var b = Object.create(this);
            b.element = e.input({
                value: text,
                type: "button"
            });

            b.element.onclick = function () { b.emit("click"); };

            return b;
        },

        disable: function() { this.element.setAttribute("disabled", "disabled"); },
        enable: function() { this.element.removeAttribute("disabled"); },
        getElement: function () { return this.element; }
    });

}());
