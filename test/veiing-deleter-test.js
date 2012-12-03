(function () {
    buster.testCase("Veiing Deleter", {
        setUp: function () {
            this.server = { deleteVeiing: this.stub() };
            this.deleter = sfk.veiingDeleter.create(this.server);
        },

        "should contact server when asked to delete": function () {
            this.deleter.delete(1);

            assert.calledOnceWith(this.server.deleteVeiing, 1);
        },

        "should report success": function () {
            var listener = this.spy();
            this.deleter.on("delete", listener);
            this.deleter.delete("request");

            this.server.deleteVeiing.yield({ result: "ok" });

            assert.calledOnceWith(listener, { result: "ok" });
        },

        "should report error": function () {
            var listener = this.spy();
            this.deleter.on("error", listener);
            this.deleter.delete("request");


            this.server.deleteVeiing.yield({ result: "error" });

            assert.calledOnceWith(listener, { result: "error" });
        }
    });
}());