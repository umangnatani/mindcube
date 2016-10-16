(function (app) {
    'use strict';


    app.controller('clientController', clientController)

    clientController.$inject = ['$scope', 'myService', '$uibModal'];


    function clientController($scope, myService, $uibModal) {

        $scope.init = function () {
            $scope.vm = {};
            //$scope.vm.MasterCode = $stateParams.id;
            getData();
        }

        $scope.list = [{}];

        $scope.init();

        var columnDefs = [
        { field: "Id" },
        { field: "ClientName" },
        { name: 'Edit', cellTemplate: '<div class="ui-grid-cell-contents"><a href="JavaScript:void(0)" ng-click="grid.appScope.edit(row.entity)">Edit</a> | <a href="JavaScript:void(0)" ng-click="grid.appScope.delete(row.entity.Id)">Delete</a></div>' }
        ];


        $scope.gridOptions = {
            totalItems: $scope.list.length,
            paginationPageSize: 10,
            enableSorting: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            columnDefs: columnDefs,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enablePaginationControls: false,
            paginationCurrentPage: 1,
            //showFooter: true,

            //rowModelType: 'pagination'
        };

        //$scope.gridOptions.multiSelect = false;
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                //var msg = 'row selected ' + row.isSelected;
                $scope.vm = row.entity;
            });
        };

        function getData() {
            myService.get('api/clients1/list', function (result) {
                $scope.list = result.data;
                $scope.gridOptions.data = $scope.list;
                //$interval(function () { $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]); }, 0, 1);
            });
        }


        $scope.edit = function (obj) {
            //console.log(obj);
            $scope.vm = obj;
        }

        $scope.delete = function (id) {
            myService.deleteRecord(id, 'client', function () {
                $scope.init();
            });
        }



        $scope.save = function () {
            myService.save('api/clients1/maintain', $scope, 'vm', function () {
                $scope.init();
                //$scope.dtInstance.reloadData();
            })
        }


    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';

    app.controller('clientMaintController', clientMaintController)

    clientMaintController.$inject = ['$scope', '$location', '$stateParams', 'myService'];

    function clientMaintController($scope, $location, $stateParams, myService) {

        $scope.vm = {Id: $stateParams.id};
        
        myService.getById('api/clients1/details', $scope, 'vm');

        $scope.save = function () {
            myService.save('api/clients1/maintain', $scope, 'vm')
        }
      

    };
    
})(angular.module('MyApp'));





