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

            components.on("change", function() {
                if(form.isValid()) {
                    components.status.update("dirty");
                    components.lagre.enable();
                } else {
                    components.status.update("error"); // add the errors too !
                    components.lagre.disable();
                }
                form.emit("change");
            });


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
            return this.components.getState();
        },

        getId: function() {
            return this.id;
        },

        getElements: function () {
            return this.components.getElements();
        },

        isPristine: function () {
            return this.components.status.get() === "pristine";
        },

        isValid: function() {
            return this.components.allValid();
        }
    });

}());
