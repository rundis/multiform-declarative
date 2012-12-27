var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var e = cull.dom.el;

    var search = function() {
        this.searcher.search(this.element.value);
    };

    var mapKeyActions = function(event) {
        switch (event.keyCode) {
            case 40: //ARROW_DOWN
            this.resultView.next();
            break;

            case 38: // ARROW_UP
            this.resultView.previous();
            break;

            case 13: // ENTER
            this.value = this.resultView.select();
            this.element.value = this.resultView.renderItem(this.value);
            break;

            case 27: // ESC
            this.resultView.close();
            break;

            default:
            search.call(this);
        }
    };

    var displayResults = function(results) {
        var pos = {
            top : this.element.getBoundingClientRect().bottom,
            left: this.element.getBoundingClientRect().left
        };
        this.resultView.render(results, pos);
    };

    sfk.components.autocomplete = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.element = e.input({className: 'sfk-autocomplete'});
            field.searcher = params.searcher;

            field.resultView = params.resultView ?
                params.resultView :
                sfk.autocompleteView.create({container: document.getElementsByTagName("body")[0]});

            bean.on(field.element, "keyup", mapKeyActions.bind(field));
            field.searcher.on("searchResults", displayResults.bind(field));

            return field;
        },

        getElement: function () { return this.element; }
    });

}());