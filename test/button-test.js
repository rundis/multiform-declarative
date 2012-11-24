(function () {
    buster.testCase("Button", {
        "should have an input button with the given text": function () {
            var button = sfk.components.button.create("Heisann");
            var element = button.getElement();
            assert.tagName(element, "input");
            assert.equals(element.value, "Heisann");
            assert.equals(element.type, "button");
        },

        "should propagate clicks": function () {
            var listener = this.spy();
            var button = sfk.components.button.create("Heisann");
            button.on("click", listener);

            button.getElement().click();

            assert.calledOnce(listener);
        }
    });
}());