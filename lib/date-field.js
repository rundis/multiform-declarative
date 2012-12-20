var sfk = this.sfk || {};
sfk.components = sfk.components || {};
(function () {
    var parent = sfk.components.inputField;
    var fv = sfk.formValidators;

    var suggestAndValidate = function(suggestFn) {
        var suggestion = suggestFn(this.element.value);
        if(suggestion) {
            this.element.value = moment(suggestion).format(this.format);
            this.emit("change");
        }
        this.validate();
    };

    sfk.components.dateField = _.extend({}, parent, {
        create: function (params) {
            var field = parent.create.call(this, params); // super
            field.format = params.format || "DD/MM/YY";

            if(params.suggest) {
                bean.off(field.element, "blur");
                bean.on(field.element, "blur", suggestAndValidate.bind(field, params.suggest));
            }

            return field;
        },

        isValid: function() {
            if(!this.isMandatory() && fv.isBlank(this.element.value)) return true;
            if(fv.isBlank(this.element.value)) return false;

            return moment(this.element.value, this.format).isValid();

        }

    });


}());