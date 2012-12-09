var sfk = this.sfk || {};

sfk.formValidators = (function () {
    var isBlank = function(value) {
        return (!value && value !== 0) || cull.trim(value + "").length == 0 ;
    };

    return {
        isBlank: isBlank
    };

}());