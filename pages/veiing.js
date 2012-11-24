var sfk = this.sfk || {};
sfk.pages = sfk.pages || {};

(function () {
    var c = cull;
    var d = c.dom;
    var comps = sfk.components;

    sfk.pages.setupVeiing = function (params) {

        var table = sfk.table.create(["", "Individ", "Vekt", "Brystomfang", "Hold", "Avvenning", "Dager fra fødsel", "Tilvekst g/dag", "", ""]);

        var server = sfk.veiingServer.create();

        function createForm() {
            var status = comps.formStatus.create("pristine");
            var dager = comps.label.create();
            var tilvekst = comps.label.create();

            var form = sfk.saveableForm.create({
                server: server,
                components: [
                    status,
                    comps.individSelector.create({ server: server }),
                    comps.integerRange.create({ name: "vekt", min: 1, max: 2000 }),
                    comps.integerRange.create({ name: "brystomfang", min: 100, max: 200 }),
                    comps.select.create({ name: "hold", options: params.hold }),
                    comps.select.create({ name: "avvenning", options: params.avvenning }),
                    dager,
                    tilvekst
                ]
            });

            form.on("change", function () { status.update("dirty"); });

            form.on("error", function () { status.update("error"); });

            form.on("save", function (veiing) {
                dager.set(veiing.dager);
                tilvekst.set(veiing.tilvekst);
                status.update("saved");
            });

            return form;
        }

        var formList = sfk.growingFormList.create({
            container: table,
            createForm: createForm,
            shouldGrow: function (forms) { return !c.some(c.prop("pristine"), forms); }
        });

        formList.init([]);

        d.id("container").appendChild(table);
    };

}());
