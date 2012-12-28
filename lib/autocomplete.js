var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    var e = cull.dom.el;
    var fv = sfk.formValidators;
    var cn = cull.dom.cn;

    var search = function() {
        this.searchThrottler.queue(this.element.value);
    };

    function setElementValue() {
        this.element.value = this.resultView.renderItem(this.value);
    }

    function selectItem() {
        if(this.resultView.isSelectable()) {
            this.value = this.resultView.select();
            setElementValue.call(this);
            this.emit("change");
        }
    }

    function onBlurHandler() {
        this.validate();
        if(this.value) {
            setElementValue.call(this);
        }
        this.resultView.close();
    }

    var mapKeyActions = function(event) {
        switch (event.keyCode) {
        case 40: //ARROW_DOWN
            this.resultView.next();
            break;

        case 38: // ARROW_UP
            this.resultView.previous();
            break;

        case 13: // ENTER
            selectItem.call(this);
            break;

        case 27: // ESC
            this.resultView.close();
            break;

        default:
            search.call(this);
        }
    };

    var displayResults = function(results) {
        var pos = {
            top : this.element.getBoundingClientRect().bottom,
            left: this.element.getBoundingClientRect().left
        };
        this.resultView.render(results, pos);
    };

    sfk.components.autocomplete = bane.createEventEmitter({
        create: function (params) {
            var field = Object.create(this);
            field.mandatory = params.mandatory;
            field.element = e.input({className: 'sfk-autocomplete'});
            field.searcher = params.searcher;

            var delay = c.defined(params.delay) ? params.delay : 100;
            field.searchThrottler = sfk.throttler.create({
                timeout:delay, callback: field.searcher.search.bind(field.searcher) });

            field.resultView = params.resultView ?
                params.resultView :
                sfk.autocompleteView.create({container: document.getElementsByTagName("body")[0]});

            bean.on(field.element, {
                keyup: mapKeyActions.bind(field),
                blur: onBlurHandler.bind(field)
            });
            field.searcher.on("searchResults", displayResults.bind(field));

            return field;
        },

        isValid: function() {
            if(!this.isMandatory()) {
                return true;
            } else {
                return !fv.isBlank(this.value);
            }
        },

        validate: function() {
            this.isValid() ?
                cn.rm("error", this.element) : cn.add("error", this.element);
        },

        getState: function () {
            return { name: this.name, value: this.value };
        },

        getElement: function () { return this.element; },

        isMandatory: function() { return this.mandatory; }

    });

}());