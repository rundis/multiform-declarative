var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    var e = cull.dom.el;
    var cn = cull.dom.cn;
    var th = c.partial(e, "th");

    var orderElements = function(elements) {
        return c.map(function(key) {return elements[key]; }, this.elementOrder);
    };

    var headers = function(table) {
        return c.map(
            function(key) {
                return {
                    label: table.componentDefinitions[key].label || "",
                    className: table.componentDefinitions[key].mandatory ? "mandatory" : ""
                };
            }, table.elementOrder);
    };

    sfk.components.table = {
        create: function (elementOrder, componentDefinitions) {
            var table = Object.create(this);
            table.componentDefinitions = componentDefinitions;
            table.elementOrder = elementOrder;

            table.tbody = e("tbody");
            table.element = e.table([
                e("thead",
                  e.tr(c.map(
                      function(h) {
                          return th({className:h.className}, h.label);
                      }, headers(table)))),
                table.tbody
            ]);
            return table;
        },

        getElement: function () {
            return this.element;
        },

        add: function (elements) {
            var orderedElements = orderElements.bind(this, elements)();

            this.tbody.appendChild(
                e.tr(c.map(e.td, orderedElements)));
        },

        remove: function(rowIdx) {
            var row = this.tbody.childNodes[rowIdx];
            this.tbody.removeChild(row);
        }
    };

}());
