var sfk = this.sfk || {};
//sfk.formValidators = sfk.formValidators || {};

sfk.formValidators = (function () {
    var isBlank = function(value) {
        return (!value && value !== 0) || (value + "").trim().length == 0 ;
    };

    return {
        isBlank: isBlank
    };

}());