(function () {
    var fv = sfk.formValidators;
    buster.testCase("Form Validators", {
        "empty string isBlank": function () {
            assert(fv.isBlank(""));
        },
        "non empty string is not blank": function () {
            refute(fv.isBlank("a"));
        },
        "undefined is blank": function () {
            assert(fv.isBlank(undefined));
        },
        "null is blank": function () {
            assert(fv.isBlank(null));
        },
        "zero is not blank": function () {
            refute(fv.isBlank(0));
        },
        "only whitespace is blank": function () {
            assert(fv.isBlank("   "));
        }
    });
}());