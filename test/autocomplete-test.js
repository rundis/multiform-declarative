(function () {
    buster.testCase("Autocomplete", {
        setUp: function () {
            this.searcher = bane.createEventEmitter({search: this.spy()});
            this.resultRenderer = {render: this.spy()};
            this.ac = sfk.components.autocomplete.create({
                searcher: this.searcher,
                resultRenderer: this.resultRenderer
            });
            this.element = this.ac.getElement();
        },

        "should have autocomplete class": function () {
            assert.className(this.element, "sfk-autocomplete");
        },

        "triggers search on keyup": function() {
            this.element.value = "1";
            bean.fire(this.element, "keyup");

            assert.calledWith(this.searcher.search, "1");
        },

        "displays search result": function () {
            var results = ["Dill", "Dall"];
            this.searcher.emit("searchResults", results);

            assert.calledWith(this.resultRenderer.render, results);
        }

    });
}());