var sfk = this.sfk || {};
sfk.pages = sfk.pages || {};

(function () {
    var c = cull;
    var d = c.dom;
    var comps = sfk.components;

    sfk.pages.setupVeiing = function (params) {

        var table = comps.table.create(["", "Individ", "Dato (*)", "Vekt", "Brystomfang", "Hold (*)", "Avvenning", "Dager fra fødsel", "Tilvekst g/dag", "", ""]);

        var server = sfk.veiingServer.create();

        function createForm() {
            var dager = comps.label.create();
            var tilvekst = comps.label.create();

            var form = sfk.saveableForm.create({
                saver: sfk.veiingSaver.create(server),
                deleter: sfk.veiingDeleter.create(server),

                components: [
                    comps.inputField.create({ name: "individ" }),
                    comps.dateField.create({ name: "dato", mandatory: true, suggest: sfk.dateSuggester.suggest}),
                    comps.integerRange.create({ name: "vekt", min: 1, max: 2000 }),
                    comps.integerRange.create({ name: "brystomfang", min: 100, max: 200 }),
                    comps.selectField.create({ name: "hold", mandatory:true, options: params.hold }),
                    comps.selectField.create({ name: "avvenning", options: params.avvenning }),
                    dager,
                    tilvekst
                ]
            });

            form.on("save", function (veiing) {
                dager.set(veiing.dager);
                tilvekst.set(veiing.tilvekst);
            });

            return form;
        }

        var formList = sfk.growingFormList.create({
            container: table,
            createForm: createForm,
            shouldGrow: function (forms) { return !c.some(c.func("isPristine"), forms); }
        });

        formList.init([]);

        d.id("container").appendChild(table.getElement());
    };

}());
