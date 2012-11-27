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

        "dom change event triggers change": function () {
            var listener = this.spy();
            this.element.value="23";
            this.field.on("change", listener);
            bean.fire(this.element, "change");
            assert.calledOnce(listener);
        },

        "dom keyup event triggers change": function () {
            var listener = this.spy();
            this.element.value="23";
            this.field.on("change", listener);
            bean.fire(this.element, "keyup", "1");
            assert.calledOnce(listener);
        },

        "should get state": function () {
            this.element.value = "9000";

            assert.equals(this.field.getState(), { name: "blapp", value: "9000" });
        }
    });
}());