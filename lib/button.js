var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    sfk.components.button = bane.createEventEmitter({
        create: function ( params) {
            var b = Object.create(this);
            b.element = e.input({
                value: params.label,
                type: "button"
            });


            if(params.disabled) { b.disable(); }

            b.element.onclick = params.onclick ?
                params.onclick.bind(b) : function() { b.emit("click"); };


            return b;
        },

        disable: function() { this.element.setAttribute("disabled", "disabled"); },
        enable: function() { this.element.removeAttribute("disabled"); },
        getElement: function () { return this.element; }
    });

}());
