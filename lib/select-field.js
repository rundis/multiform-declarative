var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;
    var cn = cull.dom.cn;
    var fv = sfk.formValidators;

    var toSelOption = function(option){
        var optVal = e.option(option.label);
        optVal.value = option.value;
        return optVal;
    };

    var createSelect = function (options) {
        return e.select(cull.map(toSelOption, options));
    };

    sfk.components.selectField = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.name = params.name;
            field.mandatory = params.mandatory || false;
            field.element = createSelect(params.options);

            bean.on(field.element,{
                change: function() { field.emit("change"); },
                blur: this.validate.bind(field)
            });

            return field;
        },

        getElement: function () {
            return this.element;
        },

        getState: function () {
            var val = this.element[this.element.selectedIndex].value;
            if(val === "null") val = null;
            return { name: this.name, value: val };
        },

        isMandatory: function() { return this.mandatory; },

        isValid: function() {
            if(!this.isMandatory()) return true;

            return !fv.isBlank(this.getState().value);
        },

        validate: function() {
            this.isValid() ?
                    cn.rm( "error", this.element) : cn.add("error", this.element);
        }

    });

}());
