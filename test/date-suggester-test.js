(function () {
    var suggest = sfk.dateSuggester.suggest;

    buster.testCase("Date Suggester", {
        setUp: function() {
            sfk.dateSuggester.setMustBeBefore(moment([2012, 09, 10]));
        },

        "suggests current year and month when one or two digits": function () {
            assert.equals(suggest("1"), new Date(2012, 09, 1));
            assert.equals(suggest("01"), new Date(2012, 09, 1));
        },

        "suggests current year when three or four digits": function () {
            assert.equals(suggest("109"), new Date(2012, 08, 10));
            assert.equals(suggest("1009"), new Date(2012, 08, 10));
        },

        "suggest previous year when month after todays month": function () {
            assert.equals(suggest("1011"), new Date(2011, 10, 10));
            assert.equals(suggest("1111"), new Date(2011, 10, 11));
        },

        "suggests previous month when day suggested after todays day": function () {
            assert.equals(suggest("11"), new Date(2012, 08, 11));
            assert.equals(suggest("1110"), new Date(2012, 08, 11));
        },

        "suggests nothing if not all digits": function() {
            assert.equals(suggest("11/1"), null);
        },

        "suggest nothing if longer than 4 chars": function () {
            assert.equals(suggest("12345"), null);
            assert.equals(suggest("12/12"), null);
        }


    });
}());