var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    var d = cull.dom;
    var e = cull.dom.el;

    sfk.components.tooltip = {
        create: function(params) {
            var tip = Object.create(this);
            tip.ownerElement = params.ownerElement;
            tip.title = params.title;
            tip.content = params.content;


            bean.on(tip.ownerElement, {
                mouseenter: this.show.bind(tip),
                mouseleave: this.hide.bind(tip)
            });

            return tip;
        },

        show: function() {
            var body = document.getElementsByTagName("body")[0];
            this.tip = e.div(
                {className: 'sfk-tooltip'}, [
                    e("h3", this.title),
                    e.div(this.content)
                ]
            );
            body.appendChild(this.tip);
        },

        hide: function() {
            if(this.tip) {
                d.remove(this.tip);
                this.tip = null;
            }
        }
    };
}());