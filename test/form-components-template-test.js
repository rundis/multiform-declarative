(function () {
    buster.testCase("Form Components", {
        setUp: function () {
            this.formComponents = {
                "status":      {type: "formStatus"},
                "individ":     {type: "inputField", label: "Individ"}
            };

            this.template = sfk.components.formComponentsTemplate.create(this.formComponents);
            this.components = this.template.createComponents();

        },

        "template should create components from template definition": function () {
            assert.tagName(this.components.status.getElement(), "span");
            assert.tagName(this.components.individ.getElement(), "input");

        },

        "get elements for all components ": function () {
            var elements = this.components.getElements();
            var size = _.keys(elements).length;

            assert.equals(size, 2);
            assert.tagName(elements.status, "span");
        },

        "get components as a list": function () {
            var list = this.components.toList();

            assert.equals(list.length, 2);
        },

        "get state of components": function() {
            this.components.individ.getElement().value = "123";
            var state = this.components.getState();

            assert.equals(state.individ, "123");
        },

        "validates all applicable components": function() {
            this.components.individ.mandatory = true;
            refute(this.components.allValid());

            this.components.individ.getElement().value = "123";
            assert(this.components.allValid());
        }
    });
}());