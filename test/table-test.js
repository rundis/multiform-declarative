(function () {
    buster.testCase("Table", {
        "should create table element with headers": function () {
            var table = sfk.components.table.create(["a", "b", "z"]);
            var element = table.getElement();

            assert.tagName(element, "table");
            assert.tagName(element.firstChild, "thead");
            assert.tagName(element.lastChild, "tbody");
            assert.tagName(element.firstChild.firstChild, "tr");
            assert.equals(element.firstChild.firstChild.childNodes.length, 3);
            assert.tagName(element.firstChild.firstChild.firstChild, "th");
            assert.match(element.firstChild.firstChild.firstChild.innerHTML, "a");
        },

        "should add rows": function () {
            var table = sfk.components.table.create(["a", "b", "z"]);
            var tbody = table.getElement().lastChild;

            table.add(["1", "2", "26"]);
            assert.tagName(tbody.firstChild, "tr");
            assert.equals(tbody.firstChild.childNodes.length, 3);
            assert.tagName(tbody.firstChild.childNodes[0], "td");
            assert.tagName(tbody.firstChild.childNodes[1], "td");
            assert.tagName(tbody.firstChild.childNodes[2], "td");
            assert.match(tbody.firstChild.childNodes[2].innerHTML, "26");
        }
    });
}());