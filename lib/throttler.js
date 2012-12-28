var sfk = this.sfk || {};
(function () {
    sfk.throttler = {
        create: function(params) {
            var t = Object.create(this);
            t.callback = params.callback;
            t.timeout = params.timeout;
            return t;
        },

        queue: function(term) {
            var self = this;
            clearTimeout(this.timer);

            if(this.timeout) {
                this.timer = setTimeout(function() {
                    self.callback(term);
                }, this.timeout);
            } else {
                self.callback(term);
            }
        }
    };
}());