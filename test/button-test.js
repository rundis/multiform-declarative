(function () {
    buster.testCase("Button", {
        setUp: function() {
            this.button = sfk.components.button.create("Heisann");
            this.element = this.button.getElement();
        },
        "should have an input button with the given text": function () {
            assert.tagName(this.element, "input");
            assert.equals(this.element.value, "Heisann");
            assert.equals(this.element.type, "button");
        },

        "should propagate clicks": function () {
            var listener = this.spy();

            this.button.on("click", listener);

            this.button.getElement().click();

            assert.calledOnce(listener);
        },

        "may toggle disabled": function () {
            this.button.disable();
            assert.equals(this.element.getAttribute("disabled"), "disabled");

            this.button.enable();
            refute(this.element.hasAttribute("disabled"));
        }
    });
}());