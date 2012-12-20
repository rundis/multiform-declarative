var sfk = this.sfk || {};

(function () {
    var c = cull;

    var deleteForm = function(form) {
        var formIdx = _.indexOf(this.forms, form);
        if(formIdx >= 0) {
            var shouldConsiderAdd = (formIdx === this.forms.length -1);
            this.container.remove(formIdx);
            this.forms.splice(formIdx, 1);
            if(shouldConsiderAdd) {
                this.maybeGrow();
            }
        }
    };

    var defineDeleteListener = function(form) {
        if (form.on) {
            form.on("delete", deleteForm.bind(this, form));
        }
    };


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
                defineDeleteListener.call(this, form);
                form.on("change", this.maybeGrow.bind(this));
                this.container.add(form.getElements());
                this.forms.push(form);
            }
        },

        init: function () {
            c.doall(defineDeleteListener.bind(this), this.forms);
            this.maybeGrow();
        }

    };

}());
