(function () {
    var e = cull.dom.el;

    function createComponent() {
        var comp = bane.createEventEmitter();
        var elem = e.div();
        comp.getElement = function () { return elem; };
        return comp;
    }

    buster.testCase("Saveable Form", {
        setUp: function () {
            this.component1 = createComponent();
            this.component2 = createComponent();

            this.form = sfk.saveableForm.create({
                server: {},
                components: [ this.component1, this.component2 ]
            });

            this.changeListener = this.spy();
            this.form.on("change", this.changeListener);
        },

        "propagates changes from multiple components": function () {
            this.component1.emit("change");
            this.component2.emit("change");

            assert.calledTwice(this.changeListener);
        },

        "return elements for all components": function () {
            assert.equals(this.form.getElements().length, 2);
            assert.tagName(this.form.getElements()[0], "div", "component1");
            assert.tagName(this.form.getElements()[1], "div", "component2");
        }
    });
}());