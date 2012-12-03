var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    var e = cull.dom.el;

    var th = c.partial(e, "th");

    sfk.components.table = {
        create: function (headers) {
            var table = Object.create(this);
            table.tbody = e("tbody");
            table.element = e.table([
                e("thead", e.tr(c.map(th, headers))),
                table.tbody
            ]);
            return table;
        },

        getElement: function () {
            return this.element;
        },

        add: function (elements) {
            this.tbody.appendChild(e.tr(c.map(e.td, elements)));
        },

        remove: function(rowIdx) {
            var row = this.tbody.childNodes[rowIdx];
            this.tbody.removeChild(row);
        }
    };

}());
