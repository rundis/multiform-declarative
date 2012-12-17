(function () {
    buster.testCase("Table", {
        "setUp": function() {
            this.componentDefinitions  = {
                "dill":     {type: "input", label:"2.Dill"},
                "dall":     {type: "integerRange" },
                "dull":     {type: "dateField", label:"1.Dull"},
                "jall":     {type: "label"}
            };

            this.table = sfk.components.table.create(["dull", "dill", "dall"], this.componentDefinitions);
            this.element = this.table.getElement();
        },

        "should create table element with headers": function () {
            assert.tagName(this.element, "table");
            assert.tagName(this.element.firstChild, "thead");
            assert.tagName(this.element.lastChild, "tbody");
            assert.tagName(this.element.firstChild.firstChild, "tr");
            assert.equals(this.element.firstChild.firstChild.childNodes.length, 3);
            assert.tagName(this.element.firstChild.firstChild.firstChild, "th");
            assert.match(this.element.firstChild.firstChild.firstChild.innerHTML, "1.Dull");
        },

        "should add rows": function () {
            var tbody = this.element.lastChild;

            this.table.add({"dull": "1", "dill": "2", "dall": "26"});
            assert.tagName(tbody.firstChild, "tr");
            assert.equals(tbody.firstChild.childNodes.length, 3);
            assert.tagName(tbody.firstChild.childNodes[0], "td");
            assert.tagName(tbody.firstChild.childNodes[1], "td");
            assert.tagName(tbody.firstChild.childNodes[2], "td");
            assert.match(tbody.firstChild.childNodes[2].innerHTML, "26");
        },

        "should remove row": function() {
            var tbody = this.element.lastChild;
            this.table.add({"dull": "1", "dill": "2", "dall": "3"});
            this.table.add({"dull": "4", "dill": "5", "dall": "6"});
            this.table.add({"dull": "7", "dill": "8", "dall": "9"});

            this.table.remove(1);


            assert.equals(tbody.childNodes.length, 2);
            assert.match(tbody.lastChild.childNodes[0].innerHTML, "7");
        }
    });
}());