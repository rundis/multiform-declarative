var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {

    var fv = sfk.formValidators;
    var parent = sfk.components.inputField;

    sfk.components.integerRange = _.extend({}, parent, {
        create: function (params) {
            var field = parent.create.call(this, params); // super
            field.min = params.min;
            field.max = params.max;
            return field;
        },

        isValid: function () {
            if(!this.isMandatory() && fv.isBlank(this.element.value))  return true;
            return this.element.value <= this.max && this.element.value >= this.min;
        }
    });

}());
