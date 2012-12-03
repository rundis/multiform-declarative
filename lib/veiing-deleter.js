var sfk = this.sfk || {};

(function () {

    function handleResponse(data) {
        if (data.result === "error") {
            this.emit("error", data);
        } else {
            this.emit("delete", data);
        }
    }

    sfk.veiingDeleter = bane.createEventEmitter({
        create: function (server) {
            var saver = Object.create(this);
            saver.server = server;
            return saver;
        },

        delete: function (data) {
            this.server.deleteVeiing(data, handleResponse.bind(this));
        }
    });

}());
