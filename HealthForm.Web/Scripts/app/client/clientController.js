(function (app) {
    'use strict';


    app.controller('clientController', clientController)

    clientController.$inject = ['$scope', '$q', '$http', 'myService', '$uibModal', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile'];

    // used angular datatables grid

    function clientController($scope, $q, $http, myService, $uibModal, DTOptionsBuilder, DTColumnBuilder, $compile) {


        $scope.search = function () {
            myService.post('api/clients1/Search?Filter=' + $scope.filter, null,
             success);
        }


        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();
            $http.get('Api/Clients1/list').then(function (result) {
                defer.resolve(result.data);
            });
            return defer.promise;
        }).withPaginationType('full_numbers')
      .withOption('createdRow', function(row) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
      });
        

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Id').withTitle('Id'),
            DTColumnBuilder.newColumn('ClientName').withTitle('Client Name'),
           DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ];


        $scope.showMe = function (row) {
            alert(row.entity.ClientName);
        };

        function actionsHtml(data, type, full, meta) {
            return '<a class="btn btn-sm btn-warning" ng-href="#/client/maintain/' + data.Id + '">' +
    '   <i class="fa fa-edit"></i>' +
    '</a>';
                
        }




      function success(result) {
        //$scope.DisplayClients = result.data;
          $scope.Clients = result.data;
          $scope.gridOptions.data = $scope.Clients;

          //$scope.gridOptions.api.refreshView();

      }


      $scope.openEditDialog = function (client) {
          $scope.client = client;
          $uibModal.open({
              templateUrl: 'Scripts/app/client/maintain.html',
              controller: 'clientMaintController',
              scope: $scope
          }).result.then(function ($scope) {
              clearSearch();
          }, function () {
          });
      }

      function clearSearch() {
          //$scope.filterCustomers = '';
          //search();
      }

    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';

    app.controller('clientMaintController', clientMaintController)

    clientMaintController.$inject = ['$scope', '$location', '$routeParams', 'myService'];

    function clientMaintController($scope, $location, $routeParams, myService) {

        $scope.vm = {Id: $routeParams.id};
        
        myService.loadModel('api/clients1/details', $scope, 'vm');

        $scope.save = function () {
            myService.post('api/clients1/maintain', $scope, 'vm')
        }
      

    };
    
})(angular.module('MyApp'));





