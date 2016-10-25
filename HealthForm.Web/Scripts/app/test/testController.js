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

    app.controller('ParentController', ParentController)


    function ParentController($scope) {
        $scope.somePrimitive = 99;
        $scope.someObject = {
            ObjectType: 'csp'
        };
        $scope.updateValues = function () {
            $scope.somePrimitive = 33;
            $scope.someObject = {
                ObjectType: 'case',
                ObjectId: 21,
            };
            $scope.$broadcast('changed');
        };
    }

})(angular.module('MyApp'));



(function (app) {


    var example = {
        bindings: {
            obj: '=',
            prim: '='
        },
        template: `
    <div class="section">
      <h4>
        Isolate Component
      </h4>
      <p>Object: {{ $ctrl.obj }}</p>
      <p>Primitive: {{ $ctrl.prim }}</p>
      <a href="" ng-click="$ctrl.updateValues();">
        Change Isolate Values
      </a>
    </div>
  `,
        controller: function ($scope, $timeout) {

            var $ctrl = this;

            //console.log($ctrl.obj);

            $scope.$on("changed", function (evt, data) {
                $timeout(callAtTimeout);
            });

            function callAtTimeout() {
                console.log($ctrl.obj);
            }

            $ctrl.updateValues = function () {
                $ctrl.prim = 10;
                $ctrl.obj = {
                    ObjectType: 'case-child'
                };
                console.log($ctrl.obj);
            };
        }
    };

    app.component('example', example);

})(angular.module('MyApp'));
