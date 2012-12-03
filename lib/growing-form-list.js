var sfk = this.sfk || {};

(function () {
    var c = cull;

    sfk.growingFormList = {
        create: function (params) {
            var list = Object.create(this);
            list.shouldGrow = params.shouldGrow;
            list.container = params.container;
            list.createForm = params.createForm;
            list.forms = params.forms || [];

            return list;
        },

        maybeGrow: function () {
            if (this.shouldGrow(this.forms)) {
                var form = this.createForm();
                this.bindDeleteForm(form);
                form.on("change", this.maybeGrow.bind(this));
                this.container.add(form.getElements());
                this.forms.push(form);
            }
        },


        bindDeleteForm: function(form) {
            var list = this;
            if (form.on) {
                form.once("delete", function () {
                    var formIdx = _.indexOf(list.forms, this);
                    if(formIdx >= 0) {
                        var shouldConsiderAdd = (formIdx === list.forms.length -1);
                        list.container.remove(formIdx);
                        list.forms.splice(formIdx, 1);
                        if(shouldConsiderAdd) {
                            list.maybeGrow();
                        }
                    }
                });
            }
        },

        init: function () {
            c.doall(this.bindDeleteForm.bind(this), this.forms);
            this.maybeGrow();
        }

    };

}());
