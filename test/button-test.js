(function () {
    buster.testCase("Button", {
        setUp: function() {
            this.button = sfk.components.button.create({label: "Heisann"});
            this.element = this.button.getElement();
        },
        "should have an input button with the given text": function () {
            assert.tagName(this.element, "input");
            assert.equals(this.element.value, "Heisann");
            assert.equals(this.element.type, "button");
        },

        "may be disabled upon creation": function() {
            var b = sfk.components.button.create({label: "Dill", disabled:true});
            assert.equals(b.element.getAttribute("disabled"), "disabled");
        },

        "should propagate clicks": function () {
            var listener = this.spy();

            this.button.on("click", listener);

            this.button.getElement().click();

            assert.calledOnce(listener);
        },

        "should invoke click handler if provided": function() {
            var clickHandler = this.spy();
            var b = sfk.components.button.create({label: "Dall", onclick: clickHandler});

            b.getElement().click();

            assert.calledOnce(clickHandler);
        },

        "may toggle disabled": function () {
            this.button.disable();
            assert.equals(this.element.getAttribute("disabled"), "disabled");

            this.button.enable();
            refute(this.element.hasAttribute("disabled"));
        }
    });
}());