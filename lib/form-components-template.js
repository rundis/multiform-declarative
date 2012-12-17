var sfk = this.sfk || {};
sfk.components = sfk.components || {};

(function () {
    sfk.components.formComponentsTemplate = {
        create: function(componentDefinitions) {
            var template = Object.create(this);
            template.componentDefinitions = componentDefinitions;

            return template;
        },

        createComponents: function() {
            var components = {};
            for(var key in this.componentDefinitions) {
                var compDef = this.componentDefinitions[key];
                components[key] = sfk.components[compDef.type].create(compDef);
            }

            return components;
        }

    };


}());