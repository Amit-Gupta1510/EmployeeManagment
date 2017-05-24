angular.module('employee', ['ui.router', 'ngAria'])
    .directive('integer', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ngModel) {
                var INTEGER_REGEXP = /^\-?\d+$/;
                ngModel.$validators.integer = function (modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    })
    .controller('EmployeeController', function ($http, $state, $rootScope, $stateParams, $scope) {

        //*** here i am using employeeDetail root scope data obj model to perform CRUD operation****
        //**So if variable is not initialize then first initializing it with blank array...
        if (!$rootScope.employeesDetail) {
            $rootScope.employeesDetail = [];
        }

        $scope.stateName = $state.current.name;//fetching current state name
        //***** this func adding or updating employee details********
        $scope.employeeDetails = {
            "id": '',
            "name": "",
            "phone": null,
            "address": {
                "city": "",
                "address_line1": "",
                "address_line2": "",
                "postal_code": null
            }
        };
        var employeeId = $stateParams.id ? Number($stateParams.id) : "";

        //*** Finding Employee from root scope that we need to be update....
        if (employeeId && $scope.stateName === 'edit') {
            var employeeIndex = -1;
            angular.forEach($rootScope.employeesDetail, function (employeeDetails, index) {
                if (employeeId === employeeDetails.id) {
                    employeeIndex = index;
                }
            });
            $scope.employeeDetails = $rootScope.employeesDetail[employeeIndex];
        }

        //***** this func adding or updating employee details********
        $scope.submitEmployeeDetails = function () {
            if ($scope.employeeDetails.phone !== undefined || $scope.employeeDetails.phone !== null || $scope.employeeDetails.phone !== '') {
                if (!(/^\-?\d+$/.test($scope.employeeDetails.phone))) {
                    $scope.employeeDetails.phone = "NA";
                }
            }
            if ($scope.stateName === 'add') {
                $scope.employeeDetails.id = $rootScope.employeesDetail.length + 1;
                $rootScope.employeesDetail.push($scope.employeeDetails);
                alert('Employee ' + $scope.employeeDetails.name.toUpperCase() + " details added.");
            }// For update just updating old model by current one employee details
            else if ($scope.stateName === 'edit') {
                $rootScope.employeesDetail[employeeIndex] = $scope.employeeDetails;
                alert('Employee ' + $scope.employeeDetails.name.toUpperCase() + " details updated.");
            }
            $state.go('search');
        };
    });