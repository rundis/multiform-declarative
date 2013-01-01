var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

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

        update: function (state) {
            this.element.firstChild.className = state;

            // To be refactored
            if(state === "error") {
                this.tooltip.title = "Feil!";
                this.tooltip.content=  "Du må angi felt xyz";
            }
        },

        get: function () {
            return this.element.firstChild.className;
        }
    };

}());
