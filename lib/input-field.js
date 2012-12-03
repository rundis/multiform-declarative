var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    sfk.components.inputField = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.name = params.name;
            field.element = e.input();

            field.oldVal = "";
            field.triggerChange = function() {
                if(field.oldVal !== field.element.value) {
                    field.emit("change");
                    field.oldVal = field.element.value;
                }
            };
            bean.on(field.element,{
                change: field.triggerChange,
                keyup: field.triggerChange
            });

            return field;
        },

        getElement: function () {
            return this.element;
        },

        getState: function () {
            return { name: this.name, value: this.element.value };
        }
    });

}());