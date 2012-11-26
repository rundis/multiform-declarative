var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    sfk.components.selectField = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.name = params.name;

            var toSelOption = function(option){
                var optVal = e.option(option.label);
                optVal.value = option.value;
                return optVal;
            };
            console.log("The options:" + params.options);

            var fieldOptions = cull.map(toSelOption, params.options);
            field.element = e.select(fieldOptions);

            field.triggerChange = function() {field.emit("change");};
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
            var val = this.element[this.element.selectedIndex].value;
            return { name: this.name, value: val };
        }
    });

}());
