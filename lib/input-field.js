var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;
    var cn = cull.dom.cn;
    var fv = sfk.formValidators;

    var triggerChange = function() {
        if(this.oldVal !== this.element.value) {
            this.emit("change");
            this.oldVal = this.element.value;
        }
    };

    sfk.components.inputField = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.name = params.name;
            field.element = e.input();
            field.mandatory = params.mandatory || false;

            field.oldVal = "";
            bean.on(field.element,{
                change: triggerChange.bind(field),
                keyup: triggerChange.bind(field),
                blur: this.validate.bind(field)
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

        validate: function() {
            this.isValid() ?
                cn.rm("error", this.element) : cn.add("error", this.element);
        },

        isValid: function() {
            if(!this.isMandatory()) {
                return true;
            } else {
                return !fv.isBlank(this.element.value);
            }
        }
    });

}());
