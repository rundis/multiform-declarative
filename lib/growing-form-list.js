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

        formIndex: function(form) {
            for(var i=0; i < this.forms.length; i++) {
                var candidateForm = this.forms[i];
                if(candidateForm === form) {
                    return i;
                }
            }
            return -1;
        },

        bindDeleteForm: function(form) {
            var list = this;
            if (form.on) {
                form.once("delete", function () {
                    var formIdx = list.formIndex(form);
                    if(formIdx >= 0) {
                        list.container.delete(formIdx);
                        list.forms.splice(formIdx, 1);
                        list.maybeGrow();
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
