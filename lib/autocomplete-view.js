var sfk = this.sfk || {};
(function () {
    var c = cull;
    var d = cull.dom;
    var e = cull.dom.el;
    var cn = cull.dom.cn;


    function getStyle(el, property) {
      if ( window.getComputedStyle ) {
          return document.defaultView.getComputedStyle(el)[property];
      }
      if ( el.currentStyle ) {
        return el.currentStyle[property];
      }
    }

    var selectItem = function(idx) {
        if(idx > -1 && idx < this.list.childNodes.length) {
            cn.add("selected", this.list.childNodes[idx].firstChild);
        }
    };

    var deselectItem = function(idx) {
        if(idx > -1 && idx < this.list.childNodes.length) {
            cn.rm("selected", this.list.childNodes[idx].firstChild);
        }
    };

    var indexOfSelected = function() {
        for(var i=0; i < this.list.childNodes.length; i++) {
            var item = this.list.childNodes[i];
            if(d.hasClassName("selected", item.firstChild)) {
                return i;
            }
        }
        return -1;
    };

    var renderItemDefault = function(item) {
        return item;
    };


    sfk.autocompleteView = bane.createEventEmitter({
        create: function(params) {
            var view = Object.create(this);
            view.container = params.container;

            view.list = e("ol", {className: 'sfk-autocomplete-results'});
            view.container.appendChild(view.list);
            view.renderItem = params.renderItem ? params.renderItem : renderItemDefault;

            return view;
        },

        render: function(items, pos) {
            if(!items) { return; }
            var view = this;
            view.items = items;

            e.content(
                c.map(function(item) {
                    return e.li(e("a", view.renderItem(item)));
                }, items), this.list);

            selectItem.call(this, 0);

            var style = "display: block;position: absolute;" +
                    "top: " + pos.top + "px;" +
                    "left: " + pos.left + "px;";
            this.list.setAttribute("style", style);
        },

        next: function() {
            var currIdx = indexOfSelected.call(this);
            if(currIdx < this.list.childNodes.length -1) {
                deselectItem.call(this, currIdx);
                selectItem.call(this, currIdx + 1);
            }
        },

        previous: function() {
            var currIdx = indexOfSelected.call(this);
            if(currIdx > 0) {
                deselectItem.call(this, currIdx);
                selectItem.call(this, currIdx - 1);
            }
        },

        close: function() {
            this.list.setAttribute("style", "display:none;");
        },

        select: function() {
            var currIdx = indexOfSelected.call(this);

            this.close();
            return this.items[currIdx];
        },

        isSelectable: function() {
            return getStyle(this.list, "display") === "block" &&
                this.items && this.items.length > 0;
        }

    });
}());