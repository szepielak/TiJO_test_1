(function () {
    'use strict';

    function TaskDAO($resource) {
        var api = $resource('/api/task/:a/:b', null, {
            queryTask: {isArray: false},
            queryBranches: {isArray: true},
            queryTags: {isArray:true}
        });

        return {
            queryTask: function (filter) {
                return api.query(filter).$promise;
            },
            queryBranches: function (repoUrl, searchQuery) {
                return api.queryBranches({a: 'branches', b: repoUrl, query: searchQuery}).$promise;
            },
            queryTags: function (searchQuery) {
                return api.queryTags({a: 'tags', query: searchQuery}).$promise;
            },
            save: function (data) {
                return api.save(data).$promise;
            }
        };
    }

    angular.module('utcApp').factory('TaskDAO', ['$resource', TaskDAO]);
})();
