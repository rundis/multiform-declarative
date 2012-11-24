var sfk = this.sfk || {};

(function () {

    function handleResponse(data) {
        if (data.result === "error") {
            this.emit("error", data);
        } else {
            this.emit("save", data);
        }
    }

    sfk.veiingSaver = bane.createEventEmitter({
        create: function (server) {
            var saver = Object.create(this);
            saver.server = server;
            return saver;
        },

        save: function (data) {
            this.server.saveVeiing(data, handleResponse.bind(this));
        }
    });

}());
