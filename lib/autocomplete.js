var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    var search = function() {
        this.searcher.search(this.element.value);
    };

    var mapKeyActions = function(event) {
        switch (event.keyCode) {
            case 40:
            this.resultView.next();
            break;

            case 38:
            this.resultView.previous();
            break;

            case 13:
            this.element.value = this.resultView.select();
            break;

            default:
            search.call(this);
        }
    };

    var displayResults = function(results) {
        this.resultView.render(results);
    };

    sfk.components.autocomplete = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.element = e.input({className: 'sfk-autocomplete'});
            field.searcher = params.searcher;
            field.resultView = params.resultView;

            bean.on(field.element, "keyup", mapKeyActions.bind(field));
            field.searcher.on("searchResults", displayResults.bind(field));

            return field;
        },

        getElement: function () { return this.element; }
    });

}());