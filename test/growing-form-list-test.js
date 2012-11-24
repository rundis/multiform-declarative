(function () {
    function t() { return true; }
    function f() { return false; }

    buster.testCase("Growing Form List", {
        setUp: function () {
            this.container = { add: this.spy() };
            this.newForm = bane.createEventEmitter();
            this.createForm = this.stub().returns(this.newForm);

            this.list = sfk.growingFormList.create({
                container: this.container,
                createForm: this.createForm,
                shouldGrow: t
            });
        },

        "creates first form": function () {
            this.list.init();

            assert.calledOnce(this.createForm);
            assert.calledOnceWith(this.container.add, this.newForm);
        },

        "does not create form if not growable": function () {
            this.list.shouldGrow = f;
            this.list.init();

            refute.called(this.createForm);
            refute.called(this.container.add);
        },

        "grows on changes": function () {
            this.list.init();
            this.newForm.emit("change");
            assert.calledTwice(this.createForm);
        },

        "should pass list of forms to shouldGrow": function () {
            this.list.shouldGrow = function (list) { return list.length < 3; };
            this.list.init();
            for (var i = 0, l = 100; i < l; i++) {
                this.newForm.emit("change");
            }
            assert.calledThrice(this.createForm);
        }
    });
}());