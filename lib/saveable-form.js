var sfk = this.sfk || {};

(function () {
    var c = cull;

    sfk.saveableForm = _.extend(bane.createEventEmitter(), {
        create: function (params) {
            var form = Object.create(this);
            var components = params.components;
            var saver = params.saver;
            var deleter = params.deleter;


            components.slett.getElement().onclick = function() { deleter.delete(form.getId()); };
            components.lagre.getElement().onclick = function () { saver.save(form.getState()); };


            var bindComponentChangeListener = function (component) {
                if (component.on) {
                    component.on("change", function () {
                        components.status.update("dirty");
                        form.emit("change");
                        form.isValid() ? components.lagre.enable() : components.lagre.disable();
                    });
                }
            };
            c.doall(bindComponentChangeListener, _.values(components));


            saver.bind({
                error: function(data) {
                    components.status.update("error");
                    form.emit("error", data);
                },
                save: function(data) {
                    components.status.update("saved");
                    form.id = data.id;
                    form.emit("save", data);
                }
            });

            deleter.bind({
                error: function(data) {
                    components.status.update("error");
                    form.emit("error", data);
                },
                delete: function(data) { form.emit("delete"); }
            });


            form.components = components;
            return form;
        },

        getState: function () {
            return c.mapdef(function (component) {
                if (component.getState) { return component.getState(); }
            }, _.values(this.components));
        },

        getId: function() {
            return this.id;
        },


        getElements: function () {
            var elements = {};

            for(var key in this.components) {
                elements[key] = this.components[key].getElement();
            }
            return elements;
        },

        isPristine: function () {
            return this.components.status.get() === "pristine";
        },

        isValid: function() {
            return c.all(function(component) {
                return !component.isValid || component.isValid();
            }, _.values(this.components));
        }
    });

}());
