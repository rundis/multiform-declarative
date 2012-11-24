var sfk = this.sfk || {};

(function () {
    var c = cull;
    var e = cull.dom.el;

    function emitChange() {
        this.emit("change");
    }

    sfk.saveableForm = _.extend(bane.createEventEmitter(), {
        create: function (params) {
            var form = Object.create(this);

            c.doall(function (comp) {
                comp.on("change", emitChange.bind(form));
            }, params.components);

            form.components = params.components;

            return form;
        },

        getElements: function () {
            return c.map(c.func("getElement"), this.components);
        }
    });

}());
