var sfk = this.sfk || {};


// DUMMY
(function () {
    var c = cull;
    var individer = [
        {inr: "0123", pnr: "012344567"},
        {inr: "0199", pnr: "012344567"},
        {inr: "0234", pnr: "012344567"},
        {inr: "0567", pnr: "012344567"},
        {inr: "0568", pnr: "012344567"},
        {inr: "0883", pnr: "012344567"}
    ];

    sfk.individSearcher = bane.createEventEmitter({
        create: function() {
            return Object.create(this);
        },

        search: function(term) {
            var ajaxResults = c.mapdef(function(individ) {
                return term && individ.inr.indexOf(term) === 0 ? individ : null;
            }, individer);

            this.emit("searchResults", ajaxResults);
        }
    });
}());