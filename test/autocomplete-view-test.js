(function () {
    buster.testCase("Autocomplete View", {
        setUp: function () {
            this.container = document.createElement("div");
            this.view = sfk.autocompleteView.create({container: this.container});

        },

        "renders list to container": function () {
            this.view.render(["Item 1", "Item 2"]);

            assert.tagName(this.container.lastChild, "ol");
            assert.className(this.container.lastChild, "sfk-autocomplete-results");
            assert.equals(this.container.lastChild.childNodes.length, 2);
            assert.match(this.container.lastChild.childNodes[0].innerHTML, "Item 1");
            assert.match(this.container.lastChild.childNodes[1].innerHTML, "Item 2");
        },

        "renders only one list to container": function () {
            this.view.render(["Item 1", "Item 2"]);
            this.view.render(["Item 1", "Item 2"]);

            assert.equals(this.container.childNodes.length, 1);
        }
    });
}());