(function (app) {
    'use strict';


    app.controller('codeController', codeController)

    codeController.$inject = ['$scope', 'myService', '$uibModal'];

    // used angular datatables grid

    function codeController($scope, myService, $uibModal) {


        $scope.vm = {};
        $scope.list = [];


        var columnDefs = [
        { field: "Id" },
        { field: "Code" },
        { field: "Text" },
        { field: "Description" },
        { field: "StateName" },
        { field: "IsTest" },
        { name: 'Edit', cellTemplate: '<div class="ui-grid-cell-contents"><a href="JavaScript:void(0)" ng-click="grid.appScope.edit(row.entity)">Edit</a> | <a ng-href="#/code/detail/{{row.entity.Code}}">Code Detail</a></div>' }
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


        myService.get('Api/codemaster/list', function (result) {
            $scope.list = result.data;
            $scope.gridOptions.data = $scope.list;
            //$interval(function () { $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]); }, 0, 1);
        });


        $scope.edit = function (obj) {
            //console.log(obj);
            $scope.vm = obj;
        }



        $scope.save = function () {
            myService.save('api/codemaster/maintain', $scope, 'vm', function () {
                $scope.vm = {};
                //$scope.dtInstance.reloadData();
            })
        }





    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';


    app.controller('codeDetailController', codeDetailController)

    codeDetailController.$inject = ['$scope', 'myService', '$uibModal', '$stateParams'];

    // used angular datatables grid

    function codeDetailController($scope, myService, $uibModal, $stateParams) {

        $scope.init = function () {
            $scope.vm = {};
            $scope.vm.MasterCode = $stateParams.id;
            getData();
        }

        $scope.list = [{}];

        $scope.init();

        var columnDefs = [
        { field: "Id" },
        { field: "Code" },
        { field: "Text" },
        { field: "Description" },
        { field: "Field1" },
        { name: 'Edit', cellTemplate: '<div class="ui-grid-cell-contents"><a href="JavaScript:void(0)" ng-click="grid.appScope.edit(row.entity)">Edit</a></div>' }
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
            myService.get('Api/codedetails/list/' + $scope.vm.MasterCode, function (result) {
                $scope.list = result.data;
                $scope.gridOptions.data = $scope.list;
                //$interval(function () { $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]); }, 0, 1);
            });
        }


        $scope.edit = function (obj) {
            //console.log(obj);
            $scope.vm = obj;
        }



        $scope.save = function () {
            myService.save('api/codedetails/maintain', $scope, 'vm', function () {
                $scope.init();
                //$scope.dtInstance.reloadData();
            })
        }




    }




})(angular.module('MyApp'));