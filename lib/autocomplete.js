var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    var search = function() {
        this.searcher.search(this.element.value);
    };

    var displayResults = function(results) {
        this.resultRenderer.render(results);
    };

    sfk.components.autocomplete = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.element = e.input({className: 'sfk-autocomplete'});
            field.searcher = params.searcher;
            field.resultRenderer = params.resultRenderer;

            bean.on(field.element, "keyup", search.bind(field));
            field.searcher.on("searchResults", displayResults.bind(field));

            return field;
        },

        getElement: function () { return this.element; }
    });

}());