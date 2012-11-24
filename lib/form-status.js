var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    sfk.components.formStatus = {
        create: function (initial) {
            var status = Object.create(this);

            status.element = e.span({ className: "status" },
                                   e.span({ className: initial }));

            return status;
        },

        getElement: function () {
            return this.element;
        },

        update: function (state) {
            this.element.firstChild.className = state;
        }
    };

}());
