(function () {
    var c = cull;
    var d = cull.dom;
    var e = cull.dom.el;

    buster.testCase("Tooltip", {
        setUp: function () {
            this.ownerElement = e.span();
            this.tooltip = sfk.components.tooltip.create({
                ownerElement: this.ownerElement, title: "My title", content: "My content"});
            this.container = document.getElementsByTagName("body")[0];

            this.getTip = function() {
                var elemList = d.get(".sfk-tooltip", this.container);
                if(elemList.length === 1 ) {
                    return elemList[0];
                } else {
                    return null;
                }
            };
        },

        "has title and content": function () {
            this.tooltip.show();

            assert.tagName(this.getTip(), "div");
            assert.equals("My title", this.getTip().firstChild.innerHTML);
            assert.equals("My content", this.getTip().lastChild.innerHTML);
        },

        "removes tooltip element from dom on hide": function() {
            this.tooltip.show();
            this.tooltip.hide();

            refute(this.getTip());
        },

        "does not croak when hide without show": function() {
            this.tooltip.show();
            this.tooltip.hide();
            this.tooltip.hide();
            refute(this.getTip());
        },

        "displays on mouseover for owning element": function() {
            bean.fire(this.ownerElement, "mouseover");
            assert(this.getTip());
        },

        "hides on mouseout for owning element": function() {
            this.tooltip.show();
            bean.fire(this.ownerElement, "mouseout");
            refute(this.getTip());
        },

        "happily accepts markup for content": function() {
            this.tooltip.content = e.span(e.span("Nested"));
            this.tooltip.show();

            assert.equals(this.getTip().lastChild.firstChild.firstChild.innerHTML, "Nested");
        }

    });
}());