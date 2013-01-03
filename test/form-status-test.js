(function () {
    buster.testCase("Form Status", {
        setUp: function () {
            this.status = sfk.components.formStatus.create({initial:"pristine"});
            this.element = this.status.getElement();
            this.spy(this.status.tooltip, "enable");
            this.spy(this.status.tooltip, "disable");
            this.spy(this.status.tooltip, "setMessage");
        },

        "have element of span.status > span.pristine": function () {
            assert.tagName(this.element, "span");
            assert.className(this.element, "status");

            assert.tagName(this.element.firstChild, "span");
            assert.className(this.element.firstChild, "pristine");
        },

        "set dirty": function () {
            this.status.dirty();
            assert.className(this.element.firstChild, "dirty");
            assert.calledOnce(this.status.tooltip.disable);
        },

        "set saved": function() {
            this.status.saved();
            assert.className(this.element.firstChild, "saved");
            assert.calledOnce(this.status.tooltip.disable);
        },

        "set error": function() {
            var errorMsg = "My error message";
            this.status.error(errorMsg);
            assert.className(this.element.firstChild, "error");
            assert.calledOnce(this.status.tooltip.enable);
            assert.calledWith(this.status.tooltip.setMessage, "Feil!", errorMsg);
        }
    });
}());