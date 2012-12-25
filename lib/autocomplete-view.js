var sfk = this.sfk || {};
(function () {
    var c = cull;
    var e = cull.dom.el;

    sfk.autocompleteView = bane.createEventEmitter({
        create: function(params) {
            var view = Object.create(this);
            view.container = params.container;

            view.list = e("ol", {className: 'sfk-autocomplete-results'});
            view.container.appendChild(view.list);

            return view;
        },

        render: function(items) {
            e.content(c.map(e.li, items), this.list);
        }
    }
    );
}());