(function () {
    buster.testCase("Form Status", {
        "have element of span.status > span.pristine": function () {
            var status = sfk.components.formStatus.create("pristine");
            var element = status.getElement();

            assert.tagName(element, "span");
            assert.className(element, "status");

            assert.tagName(element.firstChild, "span");
            assert.className(element.firstChild, "pristine");
        },

        "should update status": function () {
            var status = sfk.components.formStatus.create("pristine");
            var element = status.getElement();

            status.update("dirty");

            assert.className(element.firstChild, "dirty");
        }
    });
}());