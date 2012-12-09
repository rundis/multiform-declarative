(function () {
    buster.testCase("Select Field", {
        setUp: function () {
            this.field = sfk.components.selectField.create({
                name: "blapp",
                options: [
                    {value:null, label:"Velg"},
                    {value:"1000", label:"Jalla"},
                    {value:"2000", label:"Dalla"}
                ]
            });

            this.element = this.field.getElement();
        },

        "should be a regular old select for now": function () {
            assert.tagName(this.element, "select");
        },

        "dom change event triggers change": function () {
            var listener = this.spy();
            this.field.on("change", listener);
            bean.fire(this.element, "change");
            assert.calledOnce(listener);
        },

        "should get state": function () {
            this.element.selectedIndex = "2";

            assert.equals(this.field.getState(), { name: "blapp", value: "2000" });
        },

        "is default always valid": function () {
            assert(this.field.isValid());
        },

        "mandatory field requires that selection val is not null": function () {
            this.field.mandatory = true;
            refute(this.field.isValid());

            this.element.selectedIndex = "2";
            assert(this.field.isValid());
        },

        "validates on blur": function () {
            this.field.mandatory = true;

            bean.fire(this.element, "blur");
            assert.className(this.element, "error");

        }

    });
}());