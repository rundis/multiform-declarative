(function () {
    buster.testCase("Autocomplete", {
        setUp: function () {
            this.searcher = bane.createEventEmitter({search: this.spy()});
            this.resultView = {
                render: this.spy(),
                next: this.spy(),
                previous: this.spy(),
                select: this.spy()
            };
            this.ac = sfk.components.autocomplete.create({
                searcher: this.searcher,
                resultView: this.resultView
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

        "arrow down triggers next on view": function() {
            bean.fire(this.element, "keyup", {keyCode: 40});
            assert.calledOnce(this.resultView.next);
        },

        "arrow up triggers previous on view": function() {
            bean.fire(this.element, "keyup", {keyCode: 38});
            assert.calledOnce(this.resultView.previous);
        },

        "enter selects current item in view": function() {
            bean.fire(this.element, "keyup", {keyCode: 13});
            assert.calledOnce(this.resultView.select);
        },


        "displays search result": function () {
            var results = ["Dill", "Dall"];
            this.searcher.emit("searchResults", results);

            assert.calledWith(this.resultView.render, results);
        }

    });
}());