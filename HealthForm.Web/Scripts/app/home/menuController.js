(function (app) {
    'use strict';


    app.controller('menuController', menuController)

    menuController.$inject = ['$scope', 'myService', '$uibModal', '$stateParams', '$interval'];

    // used angular datatables grid

    function menuController($scope, myService, $uibModal, $stateParams, $interval) {

        $scope.vm = { URL: 'javascript:void(0)' };
        $scope.list = [];


        var columnDefs = [
        { field: "Id" },
        { field: "Code" },
        { field: "Title" },
        { field: "URL" },
        { field: "StateName" },
        { field: "StateJSON" },
        { name: 'Edit', cellTemplate: '<div class="ui-grid-cell-contents"><a href="JavaScript:void(0)" ng-click="grid.appScope.edit(row.entity)">Edit</a></div>' }
        ];


        //{ name: 'Edit', cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.openEditDialog(row)">Edit</a>' }



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

       
        myService.get('Api/usermenu/list', function (result) {
            $scope.list = result.data;
            $scope.gridOptions.data = $scope.list;
            //$interval(function () { $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]); }, 0, 1);
        });


        $scope.edit = function (obj) {
            //console.log(obj);
            $scope.vm = obj;
        }



        $scope.save = function () {
            myService.save('api/usermenu/maintain', $scope, 'vm', function () {
                $scope.vm = {};
                //$scope.dtInstance.reloadData();
            })
        }




    }




})(angular.module('MyApp'));