(function () {
    buster.testCase("Form Components Template", {
        "should create components form template definition": function () {
            var formComponents = {
                "status":      {type: "formStatus"},
                "individ":     {type: "integerRange", label: "Individ"}
            };

            var template = sfk.components.formComponentsTemplate.create(formComponents);
            var components = template.createComponents();

            assert.tagName(components.status.getElement(), "span");
            assert.tagName(components.individ.getElement(), "input");

        }
    });
}());