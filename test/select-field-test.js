(function () {
    buster.testCase("Select Field", {
        setUp: function () {
            this.field = sfk.components.selectField.create({
                name: "blapp",
                options: [
                    {value:"1000", label:"Jalla"},
                    {value:"2000", label:"Dalla"}
                ]
            });

            this.element = this.field.getElement();
        },

        "should be a regular old input for now": function () {
            assert.tagName(this.element, "select");
        },

        "dom change event triggers change": function () {
            var listener = this.spy();
            this.field.on("change", listener);
            bean.fire(this.element, "change");
            assert.calledOnce(listener);
        },

        "should get state": function () {
            this.element.selectedIndex = "1";

            assert.equals(this.field.getState(), { name: "blapp", value: "2000" });
        }

    });
}());