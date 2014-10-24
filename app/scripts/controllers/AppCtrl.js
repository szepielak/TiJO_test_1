(function () {
    'use strict';

    angular.module('utcApp').controller('AppCtrl', function ($scope, $route) {
        var ctrl = this;

        this.currentRoute = $route.current;

        $scope.$on('$routeChangeSuccess', function (event, routeData) {
            ctrl.currentRoute = routeData.originalPath;
        });

    });

})();
