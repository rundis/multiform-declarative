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
        },

        "input field is default valid regardless": function() {
            assert(this.field.isValid());
        },

        "mandatory field is valid when has value": function () {
            this.field.mandatory = true;
            this.element.value = "1";
            assert(this.field.isValid());
        },

        "mandatory field is not valid if empty": function() {
            this.field.mandatory = true;
            refute(this.field.isValid());
        },

        "mandatory field not valid if only blanks": function () {
            this.field.mandatory = true;
            this.element.value = "    ";
            refute(this.field.isValid());
        },


        "field validates on blur": function () {
            this.field.mandatory = true;
            bean.fire(this.element, "blur");
            assert.className(this.element, "error");

            this.element.value = "123";
            bean.fire(this.element, "blur");
            refute.className(this.element, "error");
        }

    });
}());