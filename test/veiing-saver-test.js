(function () {
    buster.testCase("Veiing Saver", {
        setUp: function () {
            this.server = { saveVeiing: this.stub() };
            this.saver = sfk.veiingSaver.create(this.server);
        },

        "should contact server when asked to save": function () {
            this.saver.save([1, 2, 3]);

            assert.calledOnceWith(this.server.saveVeiing, [1, 2, 3]);
        },

        "should report success": function () {
            var listener = this.spy();
            this.saver.on("save", listener);
            this.saver.save("request");

            this.server.saveVeiing.yield({ result: "ok" });

            assert.calledOnceWith(listener, { result: "ok" });
        },

        "should report error": function () {
            var listener = this.spy();
            this.saver.on("error", listener);
            this.saver.save("request");

            this.server.saveVeiing.yield({ result: "error" });

            assert.calledOnceWith(listener, { result: "error" });
        }
    });
}());