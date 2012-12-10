var sfk = this.sfk || {};
sfk.dateSuggester = (function (my) {
    var mustBeBefore = moment();

    var rollBackIfNeeded = function(suggestion) {
        if(!suggestion) return;

        if(suggestion.diff(mustBeBefore, 'months') > 0) {
            suggestion.subtract('years', 1);
        }
        if(suggestion.diff(mustBeBefore, 'days') > 0) {
            suggestion.subtract('months', 1);
        }
        return suggestion;
    };

    var suggest = function(partial) {
        if(!/^\d{1,4}$/.test(partial)) { return null; }

        var day = partial.substring(0, 2);
        var month = partial.substring(2) ? partial.substring(2) -1  : mustBeBefore.month();

        var suggestion = moment([mustBeBefore.year(), month, day]);
        rollBackIfNeeded(suggestion);

        return suggestion ? suggestion.toDate() : null;
    };

    my.suggest = suggest;
    my.setMustBeBefore = function(val) {mustBeBefore = val;};

    return my;

}(sfk.dateSuggester || {}));