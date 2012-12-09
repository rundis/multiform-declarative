var sfk = this.sfk || {};
sfk.components = sfk.components || {};
(function () {
    var parent = sfk.components.inputField;
    var fv = sfk.formValidators;

    sfk.components.dateField = _.extend({}, parent, {
        create: function (params) {
            var field = parent.create.call(this, params); // super
            field.format = params.format || "DD/MM/YY";

            if(params.suggest) {
                field.suggestAndValidate = function() {
                    var suggestion = params.suggest(field.element.value);
                    if(suggestion) {
                        field.element.value = moment(suggestion).format(field.format);
                    }
                    field.validate();
                };

                bean.off(field.element, "blur");
                bean.on(field.element, "blur", field.suggestAndValidate);

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