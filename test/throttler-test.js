(function () {
    buster.testCase("Throttler", {
        setUp: function () {
            this.clock = this.useFakeTimers();
            this.timeout = 100;
            this.callback = this.spy();
            this.throttler = sfk.throttler.create({
                callback: this.callback, timeout: this.timeout});
        },
        tearDown: function () {
            this.clock.restore();
        },

        "does not make call until timeout elapsed": function () {
            this.throttler.queue("Dill");
            this.clock.tick(this.timeout/2);
            refute.called(this.callback);
            this.clock.tick(this.timeout/2 + 1);
            assert.called(this.callback);
        },


        "invokes callback once with last call args when two requests within timeout": function() {
            this.throttler.queue("Dill");
            this.clock.tick(this.timeout/2);

            this.throttler.queue("Dall");
            this.clock.tick(this.timeout);

            assert.calledOnce(this.callback);
            assert.calledWith(this.callback, "Dall");
        },

        "invokes immediatly on timeout set to zero": function() {
            this.throttler.timeout = 0;
            this.throttler.queue("Dill");
            assert.called(this.callback);
        }
    });
}());