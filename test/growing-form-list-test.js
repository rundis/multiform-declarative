(function () {
    function t() { return true; }
    function f() { return false; }

    buster.testCase("Growing Form List", {
        setUp: function () {
            this.container = { add: this.spy(), delete: this.spy() };
            this.newForm = bane.createEventEmitter({
                getElements: function () { return [1, 2, 3]; }
            });
            this.createForm = this.stub().returns(this.newForm);

            this.list = sfk.growingFormList.create({
                container: this.container,
                createForm: this.createForm,
                shouldGrow: t
            });


            this.existingForm1 = bane.createEventEmitter({
                getElements: function () { return [1, 2, 3]; },
                getId: function() {return "123"; }
            });
            this.existingForm2 = bane.createEventEmitter({
                getElements: function () { return [1, 2, 3]; },
                getId: function() {return "124"; }
            });

            this.listWithExistingForms = sfk.growingFormList.create({
                container: this.container,
                createForm: this.createForm,
                shouldGrow: t,
                forms: [this.existingForm1, this.existingForm2]
            });
        },

        "creates first form": function () {
            this.list.init();

            assert.calledOnce(this.createForm);
            assert.calledOnceWith(this.container.add, [1, 2, 3]);
        },

        "creates empty form for list with existing forms": function() {
            this.listWithExistingForms.init();
            assert.calledOnce(this.createForm);
            assert.calledOnceWith(this.container.add, [1, 2, 3]);
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
        },

        "deletes form from list upon delete event": function() {
            this.listWithExistingForms.init();

            this.existingForm2.emit("delete");
            this.existingForm1.emit("delete");

            assert.calledWith(this.container.delete, 1);
            assert.calledWith(this.container.delete, 0);
        },

        "delete of list with one, deletes and adds new": function() {
            this.list.init();
            this.newForm.emit("delete");
            assert.calledWith(this.container.delete, 0);
            assert.calledTwice(this.createForm);
        }
    });
}());