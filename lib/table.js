var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    var e = cull.dom.el;

    var th = c.partial(e, "th");

    sfk.components.table = {
        create: function (headersOrder, componentDefinitions) {
            var table = Object.create(this);
            table.componentDefinitions = componentDefinitions;
            table.headersOrder = headersOrder;

            var headers = c.map(
                function(header) {
                    return componentDefinitions[header].label ?
                        componentDefinitions[header].label : "";  },
                headersOrder);


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
            var orderedElements = c.map(
                function(header) {return elements[header]; },
                this.headersOrder);

            this.tbody.appendChild(e.tr(c.map(e.td, orderedElements)));
        },

        remove: function(rowIdx) {
            var row = this.tbody.childNodes[rowIdx];
            this.tbody.removeChild(row);
        }
    };

}());
