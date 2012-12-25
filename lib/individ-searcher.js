var sfk = this.sfk || {};


// DUMMY
(function () {
    var c = cull;
    var individer = ["0123", "0199", "0234", "0567", "0568", "0883"];

    sfk.individSearcher = bane.createEventEmitter({
        create: function() {
            return Object.create(this);
        },

        search: function(term) {
            var ajaxResults = c.mapdef(function(individ) {
                return term && individ.indexOf(term) === 0 ? individ : null;
            }, individer);

            this.emit("searchResults", ajaxResults);
        }
    });
}());