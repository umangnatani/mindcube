(function (app) {
    'use strict';


    app.controller('codeController', codeController)

    codeController.$inject = ['$scope', '$q', '$http', 'myService', '$uibModal', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile'];

    // used angular datatables grid

    function codeController($scope, $q, $http, myService, $uibModal, DTOptionsBuilder, DTColumnBuilder, $compile) {


        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();
            $http.get('api/codemaster/list').then(function (result) {
                defer.resolve(result.data);
            });
            return defer.promise;
        }).withPaginationType('full_numbers')
      .withOption('createdRow', function (row) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
      });


        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Id').withTitle('Id'),
            DTColumnBuilder.newColumn('Code').withTitle('Code From'),
            DTColumnBuilder.newColumn('Text').withTitle('Text'),
           DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ];


        $scope.showMe = function (row) {
            alert(row.entity.ClientName);
        };

        function actionsHtml(data, type, full, meta) {
            return '<a class="btn btn-sm btn-warning" ui-sref="code_detail({id:&quot;' + data.Code + '&quot;})">' +
    '   <i class="fa fa-edit"></i>' +
    '</a>';

        }




    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';


    app.controller('codeDetailController', codeDetailController)

    codeDetailController.$inject = ['$scope', '$q', '$http', 'myService', '$uibModal', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile', '$stateParams'];

    // used angular datatables grid

    function codeDetailController($scope, $q, $http, myService, $uibModal, DTOptionsBuilder, DTColumnBuilder, $compile, $stateParams) {

        $scope.vm = {};
        $scope.vm.MasterCode = $stateParams.id;

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(getData).withPaginationType('full_numbers')
      .withOption('createdRow', function (row) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
      });

        $scope.dtInstance = {};

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('Id').withTitle('Id'),
            DTColumnBuilder.newColumn('Code').withTitle('Code From'),
            DTColumnBuilder.newColumn('Text').withTitle('Text'),
           DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ];


        $scope.showMe = function (row) {
            alert(row.entity.ClientName);
        };

        function actionsHtml(data, type, full, meta) {
            return '<a class="btn btn-sm btn-warning" ui-sref="code_maintain({id:' + data.Id + '})">' +
    '   <i class="fa fa-edit"></i>' +
    '</a>';

        }


        function getData() {
            var defer = $q.defer();
            $http.get('api/codedetails/list/' + $scope.vm.MasterCode).then(function (result) {
                defer.resolve(result.data);
            });
            return defer.promise;
        }

        $scope.save = function () {
            myService.save('api/codedetails/maintain', $scope, 'vm', function () {
                $scope.vm.Id = '';
                $scope.dtInstance.reloadData();
            })
        }




    }




})(angular.module('MyApp'));