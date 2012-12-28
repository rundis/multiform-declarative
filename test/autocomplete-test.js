(function () {
    buster.testCase("Autocomplete", {
        setUp: function () {
            this.searcher = bane.createEventEmitter({search: this.spy()});
            this.resultView = {
                render: this.spy(),
                next: this.spy(),
                previous: this.spy(),
                select: this.stub(),
                isSelectable: this.stub(),
                renderItem: this.stub(),
                close: this.spy()
            };
            this.ac = sfk.components.autocomplete.create({
                searcher: this.searcher,
                delay: 0,
                resultView: this.resultView
            });
            this.element = this.ac.getElement();
        },

        "invalid if blank and mandatory": function() {
            this.ac.mandatory = true;
            refute(this.ac.isValid());
        },

        "valid if has value and mandatory": function() {
            this.ac.mandatory = true;
            this.ac.value = "Something";
            assert(this.ac.isValid());
        },

        "validate sets class accordingly": function() {
            this.ac.mandatory = true;
            this.ac.validate();
            assert.className(this.element, "error");

            this.ac.value = "Something";
            this.ac.validate();
            refute.className(this.element, "error");
        },

        "validates on blur": function() {
            this.ac.mandatory = true;
            bean.fire(this.element, "blur");
            assert.className(this.element, "error");

        },

        "closes view on blur": function() {
            bean.fire(this.element, "blur");
            assert.called(this.resultView.close);
        },

        "render display val on blur": function() {
            this.element.value = "dill";
            this.ac.value = "Jalla";
            this.resultView.renderItem.returns("renderedJalla");

            bean.fire(this.element, "blur");

            assert.equals(this.element.value, "renderedJalla");
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
            var item = {id:1, name: "jall"};
            this.resultView.select.returns(item);
            this.resultView.renderItem.returns(item.name);
            this.resultView.isSelectable.returns(true);


            bean.fire(this.element, "keyup", {keyCode: 13});

            assert.equals(this.element.value, item.name);
            assert.equals(this.ac.getState().value, item);
        },

        "enter does nothing when no item selectable in view": function() {
            this.resultView.isSelectable.returns(false);

            bean.fire(this.element, "keyup", {keyCode: 13});

            assert.calledOnce(this.resultView.isSelectable);
        },

        "esc closes view": function() {
            bean.fire(this.element, "keyup", {keyCode: 27});
            assert.calledOnce(this.resultView.close);
        },

        "displays search result": function () {
            var results = ["Dill", "Dall"];
            this.searcher.emit("searchResults", results);

            assert.calledWith(this.resultView.render, results);
        }

    });
}());