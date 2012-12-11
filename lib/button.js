var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    sfk.components.button = bane.createEventEmitter({
        create: function (label, params) {
            var b = Object.create(this);
            b.element = e.input({
                value: label,
                type: "button"
            });
            var optionals = params || {};

            if(optionals.disabled) { b.disable(); }

            b.element.onclick = optionals.onclick ?
                optionals.onclick.bind(b) : function() { b.emit("click"); };


            return b;
        },

        disable: function() { this.element.setAttribute("disabled", "disabled"); },
        enable: function() { this.element.removeAttribute("disabled"); },
        getElement: function () { return this.element; }
    });

}());
