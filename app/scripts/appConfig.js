(function () {
    'use strict';

    angular.module('utcApp').config(function (paginationSupportProvider) {
        paginationSupportProvider.setDefaultConfig({maxResultsProperty: 'size', firstResultProperty: 'from'});
    });
})();
