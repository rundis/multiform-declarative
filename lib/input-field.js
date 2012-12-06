var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;
    var cn = cull.dom.cn;
    var fv = sfk.formValidators;

    sfk.components.inputField = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.name = params.name;
            field.element = e.input();
            field.mandatory = params.mandatory || false;

            field.oldVal = "";
            field.triggerChange = function() {
                if(field.oldVal !== field.element.value) {
                    field.emit("change");
                    field.oldVal = field.element.value;
                }
            };

            field.validate = function() {
                if(field.isValid()) {
                    cn.rm("error", field.element);
                } else {
                    cn.add("error", field.element);
                }
            };

            bean.on(field.element,{
                change: field.triggerChange,
                keyup: field.triggerChange,
                blur: field.validate
            });

            return field;
        },

        getElement: function () {
            return this.element;
        },

        getState: function () {
            return { name: this.name, value: this.element.value };
        },

        isMandatory: function() { return this.mandatory; },

        isValid: function() {
            if(!this.isMandatory()) {
                return true;
            } else {
                return !fv.isBlank(this.element.value);
            }
        }
    });

}());
