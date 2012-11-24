(function () {
    buster.testCase("Label", {
        "should be a span": function () {
            var label = sfk.components.label.create();
            var element = label.getElement();

            assert.tagName(element, "span");
        },

        "should be set": function () {
            var label = sfk.components.label.create();
            var element = label.getElement();

            label.set("Heisann");

            assert.match(element.innerHTML, "Heisann");
        }
    });
}());