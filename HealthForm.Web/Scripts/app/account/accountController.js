(function (app) {
    'use strict';


    app.controller('accountController', accountController)

    accountController.$inject = ['$scope', 'myService', '$uibModal', '$stateParams'];


    function accountController($scope, myService, $uibModal, $stateParams) {


        $scope.init = function () {
            $scope.vm = {};
            //$scope.vm.MasterCode = $stateParams.id;
            getData();
        }

        $scope.list = [{}];

        $scope.init();

        myService.get('api/Clients1/list', function (result) {
            $scope.Clients = result.data;
        })

        var columnDefs = [
        { field: "Id" },
        { field: "UserName" },
        { field: "Name" },
        { field: "Email" },
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
            myService.get('api/users/list', function (result) {
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
            myService.save('api/users/maintain', $scope, 'vm', function () {
                $scope.init();
                //$scope.dtInstance.reloadData();
            })
        }


       



    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';


    app.controller('accountLoginController', accountLoginController)

    accountLoginController.$inject = ['$scope', 'myService', '$rootScope', '$location', '$window'];


    function accountLoginController($scope, myService, $rootScope, $location, $window) {


        $scope.vm = {};


        $scope.login = function() {
            myService.login($scope, 'vm', afterLogin);
        }

        function afterLogin() {
            if ($rootScope.modalInstance)
                $rootScope.modalInstance.close('a');
            else
                $window.location.href = $window.location.origin + _webRoot + '#/home';
               
        }





    }




})(angular.module('MyApp'));