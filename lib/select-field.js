var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;
    var cn = cull.dom.cn;

    sfk.components.selectField = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.name = params.name;
            field.mandatory = params.mandatory || false;

            var toSelOption = function(option){
                var optVal = e.option(option.label);
                optVal.value = option.value;
                return optVal;
            };

            var fieldOptions = cull.map(toSelOption, params.options);
            field.element = e.select(fieldOptions);

            field.triggerChange = function() {field.emit("change");};
            field.validate = function() {
                if(field.isValid()) {
                    cn.rm( "error", field.element);
                } else {
                    cn.add("error", field.element);
                }
            };

            bean.on(field.element,{
                change: field.triggerChange,
                blur: field.validate
            });

            return field;
        },

        getElement: function () {
            return this.element;
        },

        getState: function () {
            var val = this.element[this.element.selectedIndex].value;
            return { name: this.name, value: val };
        },

        isMandatory: function() { return this.mandatory; },

        isValid: function() {
            if(!this.isMandatory()) return true;

            return this.getState().value + "" !== "null";
        }
    });

}());
