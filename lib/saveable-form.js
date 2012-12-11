var sfk = this.sfk || {};

(function () {
    var c = cull;

    sfk.saveableForm = _.extend(bane.createEventEmitter(), {
        create: function (params) {
            var form = Object.create(this);
            var components = params.components;
            var saver = params.saver;
            var deleter = params.deleter;

            var status = sfk.components.formStatus.create("pristine");
            var deleteButton = sfk.components.button.create("Slett");
            var saveButton = sfk.components.button.create("Lagre");

            var componentChangeListener = function (component) {
                if (component.on) {
                    component.on("change", function () {
                        status.update("dirty");
                        form.emit("change");

                        form.isValid() ? saveButton.enable() : saveButton.disable();
                    });
                }
            };
            c.doall(componentChangeListener, components);


            saver.on("error", function (data) {
                status.update("error");
                form.emit("error", data);
            });

            saver.on("save", function (data) {
                status.update("saved");
                form.id = data.id;
                form.emit("save", data);
            });


            saveButton.disable();
            saveButton.on("click", function () { saver.save(form.getState()); });

            deleter.on("error", function(data) {
                status.update("error");
                form.emit("error", data);
            });

            deleter.on("delete", function(data) { form.emit("delete"); });
            deleteButton.on("click", function() { deleter.delete(form.getId()); });


            form.status = status;
            form.components = components;
            form.components.unshift(status);
            form.components.push(saveButton);
            form.components.push(deleteButton);
            return form;
        },

        getState: function () {
            return c.mapdef(function (component) {
                if (component.getState) { return component.getState(); }
            }, this.components);
        },

        getId: function() {
            return this.id;
        },


        getElements: function () {
            return c.mapdef(function (component) {
                if (component.getElement) { return component.getElement(); }
            }, this.components);
        },

        isPristine: function () {
            return this.status.get() === "pristine";
        },

        isValid: function() {
            return c.all(function(component) {
                return !component.isValid || component.isValid();
                }, this.components);
        }
    });

}());
