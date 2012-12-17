var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    var c = cull;
    sfk.components.formComponentsTemplate = {
        create: function(componentDefinitions) {
            var template = Object.create(this);
            template.componentDefinitions = componentDefinitions;

            return template;
        },

        createComponents: function() {
            var getKeys = function(obj) {
                return _.chain(obj).keys().reject(function(key) {
                    return _.isFunction(obj[key]);
                }).value();
            };

            var components = {
                getElements: function() {
                    var elements = {};
                    var self = this;

                    _.each(getKeys(self), function(key) {
                        elements[key] = self[key].getElement();
                    });
                    return elements;
                },

                toList: function() {
                    var self = this;
                    return c.map(function(key) {return self[key];}, getKeys(self));
                },

                getState: function() {
                    var state = {};
                    var self = this;
                    c.doall(function(key) {
                        if(self[key].getState) {
                            state[key] = self[key].getState().value;
                        }
                    }, getKeys(self));

                    return state;
                },

                on: function(evt, fn) {
                    c.doall(function(comp) {
                        if(comp.on) {
                            comp.on(evt, fn);
                        }
                    }, this.toList());
                },

                allValid: function() {
                    return c.all(function(comp) {
                        return !comp.isValid || comp.isValid();
                    }, this.toList());
                }
            };

            for(var key in this.componentDefinitions) {
                var compDef = this.componentDefinitions[key];
                components[key] = sfk.components[compDef.type].create(compDef);
            }

            return components;
        }

    };


}());