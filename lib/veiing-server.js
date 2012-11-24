var sfk = this.sfk || {};

/* DUMMY */
(function () {

    sfk.veiingServer = {
        create: function () {
            return Object.create(this);
        },

        saveVeiing: function (data, callback) {
            callback({ result: "ok" });
        }
    };

}());
