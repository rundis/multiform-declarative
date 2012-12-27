(function () {
    buster.testCase("Autocomplete View", {
        setUp: function () {
            this.container = document.createElement("div");
            this.view = sfk.autocompleteView.create({container: this.container});
            this.position = {top:0, left:0};
        },

        "renders list to container": function () {
            this.view.render(["Item 1", "Item 2"], this.position);

            assert.tagName(this.container.lastChild, "ol");
            var listStyle = this.container.lastChild.getAttribute("style");
            assert.match(listStyle, "display: block");
            assert.className(this.container.lastChild, "sfk-autocomplete-results");
            assert.equals(this.container.lastChild.childNodes.length, 2);
            assert.tagName(this.container.lastChild.childNodes[0], "li");
            assert.tagName(this.container.lastChild.childNodes[0].firstChild, "a");
            assert.match(this.container.lastChild.childNodes[0].innerHTML, "Item 1");
            assert.match(this.container.lastChild.childNodes[1].innerHTML, "Item 2");
        },

        "calls custom renderItem callback": function() {
            var renderItem  = this.spy();
            var view = sfk.autocompleteView.create({container: this.container, renderItem: renderItem});
            var items = [{id: "1", name:"Item 1"}, {id: "2", name:"Item 2"}];
            view.render(items, this.position);

            assert.calledWith(renderItem, items[0]);
            assert.calledWith(renderItem, items[1]);
        },

        "renders only one list to container": function () {
            this.view.render(["Item 1", "Item 2"], this.position);
            this.view.render(["Item 1", "Item 2"], this.position);

            assert.equals(this.container.childNodes.length, 1);
        },

        "selects first item in non empty list": function() {
            this.view.render(["Item 1", "Item 2"], this.position);
            assert.className(this.container.lastChild.childNodes[0].firstChild, "selected");
        },

        "next selects next item and deselects current": function() {
            this.view.render(["Item 1", "Item 2"], this.position);
            this.view.next();

            refute.className(this.container.lastChild.childNodes[0].firstChild, "selected");
            assert.className(this.container.lastChild.childNodes[1].lastChild, "selected");
        },

        "previous selects previous item and deselects current": function() {
            this.view.render(["Item 1", "Item 2"], this.position);
            this.view.next();
            this.view.previous();

            refute.className(this.container.lastChild.childNodes[1].firstChild, "selected");
            assert.className(this.container.lastChild.childNodes[0].lastChild, "selected");
        },

        "previous or next cant move beyond bounds": function() {
            this.view.render(["Item 1", "Item 2"], this.position);
            this.view.previous();

            assert.className(this.container.lastChild.childNodes[0].lastChild, "selected");

            this.view.next();
            this.view.next();
            assert.className(this.container.lastChild.childNodes[1].lastChild, "selected");
        },

        "select returns currently selected item and closes": function() {
            this.view.render(["Item 1", "Item 2"], this.position);

            var selected = this.view.select();

            assert.equals(selected, "Item 1");
            assert.equals(this.view.list.getAttribute("style"), "display:none;");
        },

        "select returns item as passed to render": function() {
            var renderItem  = function(item) {
                return item.name;
            };
            var view = sfk.autocompleteView.create({container: this.container, renderItem: renderItem});
            var items = [{id: "1", name:"Item 1"}, {id: "2", name:"Item 2"}];
            view.render(items, this.position);

            assert.equals(view.select(), items[0]);

        }
    });
}());