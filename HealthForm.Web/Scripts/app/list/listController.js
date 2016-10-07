(function (app) {
    'use strict';


    app.controller('listController', listController)

    listController.$inject = ['$scope', 'apiService', '$uibModal'];


    function listController($scope, apiService, $uibModal) {

        $scope.Count = 0;

        $scope.Clients = [];

        var config = {};


        //function getData() {
        apiService.get('Api/lists/list', config,
           success);
        //}




        $scope.search = function () {
            apiService.post('api/clients1/Search?Filter=' + $scope.filter, null,
             success);
        }


        var columnDefs = [
        { field: "Id" },
        { field: "ListTitle" },
        { name: "Client", field: "Client.ClientName" },
        { name: 'Edit', cellTemplate: 'scripts/app/list/menu.html' }
        ];


        //{ name: 'Edit', cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.openEditDialog(row)">Edit</a>' }



        $scope.gridOptions = {
            totalItems: $scope.Clients.length,
            paginationPageSize: 5,
            enableSorting: true,
            columnDefs: columnDefs,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enablePaginationControls: false,
            paginationCurrentPage: 1,
            //showFooter: true,

            //rowModelType: 'pagination'
        };





        function success(result) {
            //$scope.DisplayClients = result.data;
            $scope.Clients = result.data;
            $scope.gridOptions.data = $scope.Clients;
            //$scope.gridApi.saveState.save();
            //$scope.gridOptions.totalItems = $scope.Clients.length;


            //$scope.gridOptions.api.refreshView();

        }

        

        //$scope.openEditDialog = function (client) {
        //    $scope.client = client;
        //    $uibModal.open({
        //        templateUrl: 'Scripts/app/list/maintain.html',
        //        controller: 'clientMaintController',
        //        scope: $scope
        //    }).result.then(function ($scope) {
        //        clearSearch();
        //    }, function () {
        //    });
        //}

        function clearSearch() {
            //$scope.filterCustomers = '';
            //search();
        }

    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';

    app.controller('listMaintController', listMaintController)

    listMaintController.$inject = ['$scope', '$location', '$routeParams', 'apiService', 'helperService'];

    function listMaintController($scope, $location, $routeParams, apiService, helperService) {

        //$scope.Vendors = {};

        $scope.obj = {};

        $scope.clients = {};

        //debugger;

        apiService.get('Api/Clients1/list', null,
            function (response) {
                $scope.clients = response.data;
            });


        if ($routeParams.id != '')
            load();


        function load() {

            //$scope.loadingMovie = true;

            apiService.get('Api/Lists/details/' + $routeParams.id, null,
            successLoad);
        }

        function successLoad(result) {
            $scope.list = result.data;
            //$scope.loadingMovie = false;

            //loadGenres();
        }


       


        $scope.saveList = function () {
            //$scope.list.Active = 1;
            apiService.post('Api/Lists/Maintain', $scope)
        }

        $scope.makeInactive = function () {
            $scope.list.Active = 0;
            apiService.post('Api/Lists', $scope.list, success)
        }

        


    };
    
})(angular.module('MyApp'));

