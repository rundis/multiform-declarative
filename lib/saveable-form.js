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
                    components.status.dirty();
                    components.lagre.enable();
                } else {
                    components.status.error(["Error 1", "Error 2"]); // add the errors too !
                    components.lagre.disable();
                }
                form.emit("change");
            });


            saver.bind({
                error: function(data) {
                    components.status.error("Error from save");
                    form.emit("error", data);
                },
                save: function(data) {
                    components.status.saved();
                    form.id = data.id;
                    form.emit("save", data);
                }
            });

            deleter.bind({
                error: function(data) {
                    components.status.error("Error from delete");
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
