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

        "triggers change on dom change event": function () {
            var listener = this.spy();
            this.element.value="23";
            this.field.on("change", listener);
            bean.fire(this.element, "change");
            assert.calledOnce(listener);
        },

        "triggers change on dom keyup event": function () {
            var listener = this.spy();
            this.element.value="23";
            this.field.on("change", listener);
            bean.fire(this.element, "keyup", "1");
            assert.calledOnce(listener);
        },

        "should get state": function () {
            this.element.value = "9000";

            assert.equals(this.field.getState(), { name: "blapp", value: "9000" });
        },

        "is default valid regardless": function() {
            assert(this.field.isValid());
        },

        "is valid when mandatory when has value": function () {
            this.field.mandatory = true;
            this.element.value = "1";
            assert(this.field.isValid());
        },

        "is invalid if mandatory field is blank": function() {
            this.field.mandatory = true;
            refute(this.field.isValid());
        },

        "validates on blur": function () {
            this.field.mandatory = true;
            bean.fire(this.element, "blur");
            assert.className(this.element, "error");

            this.element.value = "123";
            bean.fire(this.element, "blur");
            refute.className(this.element, "error");
        }

    });
}());