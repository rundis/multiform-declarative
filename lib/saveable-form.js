var sfk = this.sfk || {};

(function () {
    var c = cull;

    sfk.saveableForm = _.extend(bane.createEventEmitter(), {
        create: function (params) {
            var form = Object.create(this);
            var components = params.components;
            var saver = params.saver;

            var status = sfk.components.formStatus.create("pristine");

            var bindChangeToDirtyStatus = function (c) {
                c.on("change", c.bind(status, "update", "dirty"));
            };

            c.doall(bindChangeToDirtyStatus, components);

            saver.on("error", function (data) {
                status.update("error");
                form.emit("error", data);
            });

            saver.on("save", function (data) {
                status.update("saved");
                form.emit("save", data);
            });

            var saveButton = sfk.components.button.create("Lagre");

            saveButton.on("click", function () { saver.save(form.getState()); });

            this.components = components;
            this.components.unshift(status);
            this.components.push(saveButton);
            return form;
        },

        getState: function () {
            return c.map(c.func("getState"), this.components);
        },

        getElements: function () {
            return c.map(c.func("getElement"), this.components);
        }
    });

}());