var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {

    var parent = sfk.components.inputField;

    sfk.components.integerRange = _.extend({}, parent, {
        create: function (params) {
            var field = parent.create.call(this, params); // super
            field.min = params.min;
            field.max = params.max;
            return field;
        },

        isValid: function () {
            return this.element.value <= this.max && this.element.value >= this.min;
        }
    });

}());
