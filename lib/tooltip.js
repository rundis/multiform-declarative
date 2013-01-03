var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    var d = cull.dom;
    var e = cull.dom.el;

    function calculatePos() {
        return {
            top : this.ownerElement.getBoundingClientRect().top,
            left: this.ownerElement.getBoundingClientRect().right
        };
    }

    function position() {
        var pos = calculatePos.call(this);
        var style = "position:absolute; top: " +
                pos.top + "px; left: " + pos.left + "px;";
        this.tip.setAttribute("style", style);
    }

    function createTipElement() {
        var content = this.content;
        if(c.isSeq(this.content)) {
            content = e.ul({className:"sfk-tooltip-msglist"},
                           c.map(e.li, this.content));
        }

        return  e.div(
            {className: 'sfk-tooltip'}, [
                e("h3", this.title),
                e.div(content)
            ]
        );
    }

    sfk.components.tooltip = {
        create: function(params) {
            var tip = Object.create(this);
            tip.enabled = true;
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
            if(!this.enabled) return;

            this.tip = createTipElement.call(this);
            position.call(this);
            document.getElementsByTagName("body")[0].appendChild(this.tip);
        },

        hide: function() {
            if(this.tip) {
                d.remove(this.tip);
                this.tip = null;
            }
        },

        setMessage: function(title, content) {
            this.title = title;
            this.content = content;
        },

        enable: function() { this.enabled = true;},
        disable: function() { this.enabled = false;}

    };
}());