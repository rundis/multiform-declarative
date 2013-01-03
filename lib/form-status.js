var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    function setState(state) { this.element.firstChild.className = state; }

    sfk.components.formStatus = {
        create: function (params) {
            var status = Object.create(this);

            status.element = e.span({ className: "status" },
                                   e.span({ className: params.initial }));

            status.tooltip = sfk.components.tooltip.create({
                ownerElement: status.element
            });
            return status;
        },

        getElement: function () {
            return this.element;
        },

        dirty: function() {
            setState.call(this, "dirty");
            this.tooltip.disable();
        },

        saved: function() {
            setState.call(this, "saved");
            this.tooltip.disable();
        },

        error: function(messages) {
            setState.call(this, "error");
            this.tooltip.enable();
            this.tooltip.setMessage("Feil!", messages);
        },


        get: function () {
            return this.element.firstChild.className;
        }
    };

}());
