(function () {
    'use strict';

    function TaskDAO($resource) {
        var api = $resource('/api/task/:a/:b', null, {
            query: {isArray: false},
            queryBranches: {isArray: true},
            queryTags: {isArray:true}
        });

        return {
            query: function (filter) {
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
            },
            remove: function (id) {
                return api.remove({a: id}).$promise;
            }

        };
    }

    angular.module('utcApp').factory('TaskDAO', ['$resource', TaskDAO]);
})();
