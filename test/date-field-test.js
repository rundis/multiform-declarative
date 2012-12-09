(function () {
    buster.testCase("Date Field", {

        setUp: function() {
            this.field = sfk.components.dateField.create({format: "dd/MM/yy"});
            this.element = this.field.getElement();

            this.suggest = this.stub();
            this.fieldWithSuggest = sfk.components.dateField.create({
                format: "DD/MM/YY",
                suggest: this.suggest
            });

        },
        "validates date": function () {
            this.element.value = "12/30/09";
            refute(this.field.isValid());
            this.element.value = "12/12/00";
            assert(this.field.isValid());
        },
        "allows blank when not mandatory": function () {
            assert(this.field.isValid());

            this.field.mandatory = true;
            refute(this.field.isValid());
        },

        "calls date suggestion on blur if suggest function provided": function() {
            this.fieldWithSuggest.element.value = "0101";
            this.suggest.returns(new Date(2012, 0, 1));

            bean.fire(this.fieldWithSuggest.element, "blur");

            assert.calledOnceWith(this.suggest, "0101");
            assert.equals(this.fieldWithSuggest.element.value, "01/01/12");
            refute.className(this.fieldWithSuggest.element, "error");
        },

        "leaves value intact if suggest function returns null": function () {
            var fieldVal = "0X01";
            this.fieldWithSuggest.element.value = fieldVal;
            this.suggest.returns(null);

            bean.fire(this.fieldWithSuggest.element, "blur");

            assert.calledOnceWith(this.suggest, fieldVal);
            assert.equals(this.fieldWithSuggest.element.value, fieldVal);
            assert.className(this.fieldWithSuggest.element, "error");
        }
    });
}());