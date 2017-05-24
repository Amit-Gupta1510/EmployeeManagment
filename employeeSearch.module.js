angular.module('employeeSearch', ['ui.router', 'ngAnimate', 'employee'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('search');
        $stateProvider
            .state('employee', {
                abstract: true,
                template: "<ui-view/>",
                url: "/employee"
            })
            .state('search', {
                url: '/search',
                templateUrl: 'employee_search.tpl.html',
                controller: 'EmployeeSearchController'
            })
            .state('add', {
                url: '/add',
                templateUrl: 'employee.tpl.html',
                controller: 'EmployeeController'
            })
            .state('edit', {
                url: '/edit?id',
                templateUrl: 'employee.tpl.html',
                controller: 'EmployeeController'
            });
    });