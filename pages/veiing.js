var sfk = this.sfk || {};
sfk.pages = sfk.pages || {};

(function () {
    var c = cull;
    var d = c.dom;
    var comps = sfk.components;

    sfk.pages.setupVeiing = function (params) {

        var formComponentsTemplate  = sfk.components.formComponentsTemplate.create({
            "status":      {type: "formStatus", initial: "pristine"},
            "individ":     {type: "autocomplete", mandatory:true, label: "Individ"},
            "dato":        {type: "dateField" , label: "Dato", mandatory: true, suggest: sfk.dateSuggester.suggest},
            "vekt":        {type: "integerRange", label: "Vekt", min: 1, max: 2000 },
            "brystomfang": {type: "integerRange", label: "Brystomfang", min: 100, max: 200 },
            "hold":        {type: "selectField",  label: "Hold", mandatory:true, options: params.hold },
            "avvenning":   {type: "selectField", label: "Avvenning", options: params.avvenning },
            "dager":       {type: "label", label: "Dager fra fødsel"},
            "tilvekst":    {type: "label", label: "Tilvekst g/dag"},
            "lagre":       {type: "button", label: "Lagre"},
            "slett":       {type: "button", label: "Slett"}
        });


        var table = comps.table.create(
            ["status", "individ", "dato", "vekt", "brystomfang", "hold", "avvenning", "dager", "tilvekst", "lagre", "slett"],
            formComponentsTemplate.componentDefinitions);

        var server = sfk.veiingServer.create();


        function createForm() {
            // ugly hack
            var individSearcher = sfk.individSearcher.create();
            var resultView = sfk.autocompleteView.create({
                container:  document.getElementsByTagName("body")[0],
                renderItem: function(item) { return item.inr + "/" + item.pnr; }
            });
            formComponentsTemplate.componentDefinitions.individ.resultView = resultView;
            formComponentsTemplate.componentDefinitions.individ.searcher = individSearcher;
            // end ugly hach

            var components = formComponentsTemplate.createComponents();

            components.individ.searcher = individSearcher;

            var form = sfk.saveableForm.create({
                saver: sfk.veiingSaver.create(server),
                deleter: sfk.veiingDeleter.create(server),
                components: components
            });

            form.on("save", function (veiing) {
                components.dager.set(veiing.dager);
                components.tilvekst.set(veiing.tilvekst);
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

        //var acContainer = document.getElementsByTagName("body")[0];//.createElement("div");


        /*var ac = sfk.components.autocomplete.create({
            searcher: sfk.individSearcher.create(),
            resultView: sfk.autocompleteView.create({container: acContainer})
        });*/


       // d.id("container").appendChild(ac.getElement());
        //d.id("container").appendChild(acContainer);


    };

}());
