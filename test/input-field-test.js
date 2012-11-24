(function () {
    buster.testCase("Input Field", {
        setUp: function () {
            this.field = sfk.components.inputField.create({
                name: "blapp"
            });

            this.element = this.field.getElement();
        },

        "should be a regular old input for now": function () {
            assert.tagName(this.element, "input");
        },

        "should trigger change": function () {
            var listener = this.spy();
            this.field.on("change", listener);

            this.element.onchange(); // todo: bruk et rammeverk for event binding + keyup

            assert.calledOnce(listener);
        },

        "should get state": function () {
            this.element.value = "9000";

            assert.equals(this.field.getState(), { name: "blapp", value: "9000" });
        }
    });
}());