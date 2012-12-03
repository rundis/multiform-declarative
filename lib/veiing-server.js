var sfk = this.sfk || {};

/* DUMMY */
(function () {

    sfk.veiingServer = {
        create: function () {
            return Object.create(this);
        },

        saveVeiing: function (data, callback) {
            callback({
                result: "ok",
                id: "123",
                dager: 17,
                tilvekst: 7
            });
        },

        deleteVeiing: function(data, callback) {
            callback({
                result: "ok"
            });
        }
    };

}());
