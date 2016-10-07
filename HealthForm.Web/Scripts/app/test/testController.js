(function (app) {
    'use strict';


    app.controller('exampleCtrl', exampleCtrl)

    exampleCtrl.$inject = ['$scope', 'apiService', '$uibModal'];


    function exampleCtrl($scope) {
        var columnDefs = [
                    { headerName: "Make", field: "make" },
                    { headerName: "Model", field: "model" },
                    { headerName: "Price", field: "price" }
        ];

        var rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData
        };

    }


})(angular.module('MyApp'));


(function (app) {
    'use strict';


    app.controller('clientMenuController', clientMenuController)

    clientMenuController.$inject = ['$scope', 'apiService', '$uibModal'];


    function clientMenuController($scope) {


    }


})(angular.module('MyApp'));
