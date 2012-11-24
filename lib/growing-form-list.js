var sfk = this.sfk || {};

(function () {

    sfk.growingFormList = {
        create: function (params) {
            var list = Object.create(this);
            list.shouldGrow = params.shouldGrow;
            list.container = params.container;
            list.createForm = params.createForm;
            list.forms = [];
            return list;
        },

        maybeGrow: function () {
            if (this.shouldGrow(this.forms)) {
                var form = this.createForm();
                form.on("change", this.maybeGrow.bind(this));
                this.container.add(form.getElements());
                this.forms.push(form);
            }
        },

        init: function () {
            this.maybeGrow();
        }

    };

}());
