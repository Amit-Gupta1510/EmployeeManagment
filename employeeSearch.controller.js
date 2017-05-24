angular.module('employeeSearch')
// let's define the scotch controller that we call up in the about state
    .controller('EmployeeSearchController', function ($state, $rootScope, $scope) {
        $scope.employee = {filter: ''};
        if (!$rootScope.employeesDetail) {
            $rootScope.employeesDetail = [];
        }
        $scope.employeesInfo = angular.copy($rootScope.employeesDetail);
        /*$rootScope.employeesDetails = [
         {
         "id": 1,
         "name": "Jhon",
         "phone": "9999999999",
         "address": {
         "city": "Pune",
         "address_line1": "ABC road",
         "address_line2": "XYZ building",
         "postal_code": "12455"
         }
         },
         {
         "id": 2,
         "name": "Jacob",
         "phone": "AZ99A99PQ9",
         "address": {
         "city": "Pune",
         "address_line1": "PQR road",
         "address_line2": "ABC building",
         "postal_code": "13455"
         }
         },
         {
         "id": 3,
         "name": "Ari",
         "phone": "145458522",
         "address": {
         "city": "Mumbai",
         "address_line1": "ABC road",
         "address_line2": "XYZ building",
         "postal_code": "12455"
         }
         }];*/

        $scope.employeeDetailLabels = ['Id', 'Name', 'Phone', 'City', 'Address1', 'Address2', 'Postal Code'];

        $scope.editEmployeeDetail = function (id) {
            $state.go('edit', {id: id})
        };

        $scope.filterEmployee = function () {
            var filteredEmployees = [];
            if ($scope.employee.filter) {
                angular.forEach($rootScope.employeesDetail, function (employeeDetail) {
                    var name = employeeDetail.name.toLowerCase();
                    var city = employeeDetail.address.city.toLowerCase();
                    var filter = $scope.employee.filter.toLowerCase();
                    if ((name.indexOf(filter) === 0) || (city.indexOf(filter) === 0)) {
                        filteredEmployees.push(employeeDetail);
                    }
                });

                $scope.employeesInfo = filteredEmployees;
            }
            else {
                $scope.employeesInfo = angular.copy($rootScope.employeesDetail);
            }
        };

    });