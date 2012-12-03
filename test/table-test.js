(function () {
    buster.testCase("Table", {
        "setUp": function() {
            this.table = sfk.components.table.create(["a", "b", "z"]);
            this.element = this.table.getElement();
        },

        "should create table element with headers": function () {
            assert.tagName(this.element, "table");
            assert.tagName(this.element.firstChild, "thead");
            assert.tagName(this.element.lastChild, "tbody");
            assert.tagName(this.element.firstChild.firstChild, "tr");
            assert.equals(this.element.firstChild.firstChild.childNodes.length, 3);
            assert.tagName(this.element.firstChild.firstChild.firstChild, "th");
            assert.match(this.element.firstChild.firstChild.firstChild.innerHTML, "a");
        },

        "should add rows": function () {
            var tbody = this.element.lastChild;

            this.table.add(["1", "2", "26"]);
            assert.tagName(tbody.firstChild, "tr");
            assert.equals(tbody.firstChild.childNodes.length, 3);
            assert.tagName(tbody.firstChild.childNodes[0], "td");
            assert.tagName(tbody.firstChild.childNodes[1], "td");
            assert.tagName(tbody.firstChild.childNodes[2], "td");
            assert.match(tbody.firstChild.childNodes[2].innerHTML, "26");
        },

        "should remove row": function() {
            var tbody = this.element.lastChild;
            this.table.add(["1", "2", "3"]);
            this.table.add(["4", "5", "6"]);
            this.table.add(["7", "8", "9"]);

            this.table.remove(1);


            assert.equals(tbody.childNodes.length, 2);
            assert.match(tbody.lastChild.childNodes[0].innerHTML, "7");
        }
    });
}());