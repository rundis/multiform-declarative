var sfk = this.sfk || {};

(function () {
    var c = cull;

    sfk.saveableForm = _.extend(bane.createEventEmitter(), {
        create: function (params) {
            var form = Object.create(this);
            var components = params.components;
            var saver = params.saver;

            var status = sfk.components.formStatus.create("pristine");

            var bindChangeToDirtyStatus = function (component) {
                if (component.on) {
                    component.on("change", function () {
                        status.update("dirty");
                        form.emit("change");
                    });
                }
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

            this.status = status;
            this.components = components;
            this.components.unshift(status);
            this.components.push(saveButton);
            return form;
        },

        getState: function () {
            return c.mapdef(function (component) {
                if (component.getState) { return component.getState(); }
            }, this.components);
        },

        getElements: function () {
            return c.mapdef(function (component) {
                if (component.getElement) { return component.getElement(); }
            }, this.components);
        },

        isPristine: function () {
            return this.status.get() === "pristine";
        }
    });

}());
