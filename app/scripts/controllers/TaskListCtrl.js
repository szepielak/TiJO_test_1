(function ()
{
    'use strict';

    function TaskListCtrl(TaskDAO, TestDAO, paginationSupport, ConfirmAction)
    {
        var ctrl = this;

        ctrl.tasks = {
            filter: {query: null, size: 5}
        };

        ctrl.tests = {
            filter: {query: null}
        };

        this.newTest = {};

        var refreshList = paginationSupport(ctrl.tasks, function (callback)
        {
            TaskDAO.query(ctrl.tasks.filter).then(function (result)
            {
                ctrl.tasks.list = result.results;
                callback(result.total);
            });
        });

        this.suggestTests = function (query)
        {
            return TestDAO.query({query: query, size: 10}).then(function (result)
            {
                ctrl.tests.list = result.results;
                return result.results;
            });
        };

        this.assignTaskToTest = function (test)
        {
            var selectedTasks = [];
            this.newTest.title = '';

            angular.forEach(ctrl.tasks.list, function (task)
            {
                if (task.selected) {
                    selectedTasks.push(task.id);
                }
            });
            TestDAO.assignTasks(test.id, selectedTasks).then(refreshList);
        };

        this.createTestAndAssignTasks = function ()
        {
            TestDAO.save(this.newTest).then(function (test)
            {
                ctrl.assignTaskToTest(test);
                ctrl.newTest = {};
            });
        };

        this.deleteTask = function (id)
        {
            ConfirmAction.open('Remove Task', 'Are you sure?').result.then(function ()
            {
                TaskDAO.remove(id).then(refreshList);
            });

        };

        refreshList();
    }

    var module = angular.module('utcApp');
    module.controller('TaskListCtrl', ['TaskDAO', 'TestDAO', 'paginationSupport', 'ConfirmAction', TaskListCtrl]);

})();
