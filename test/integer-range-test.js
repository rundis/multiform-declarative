(function () {
    buster.testCase("Integer Range", {
        setUp: function () {
            this.field = sfk.components.integerRange.create({
                name: "blapp",
                min: 5,
                max: 7
            });

            this.element = this.field.getElement();
        },

        "should be a regular old input for now": function () {
            assert.tagName(this.element, "input");
        },

        "should be invalid outside of range": function () {
            this.element.value = 8;
            refute(this.field.isValid());

            this.element.value = 12;
            refute(this.field.isValid());

            this.element.value = 7;
            assert(this.field.isValid());
        },

        "should really be an integer" : function() {
            this.element.value = "abc";
            refute(this.field.isValid());
        }
    });
}());