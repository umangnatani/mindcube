(function (app) {
    'use strict';


    app.controller('correspController', correspController)

    correspController.$inject = ['$scope', '$q', '$http', 'myService', '$uibModal', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile'];

    // used angular datatables grid

    function correspController($scope, $q, $http, myService, $uibModal, DTOptionsBuilder, DTColumnBuilder, $compile) {


        $scope.search = function () {
            myService.save('api/clients1/Search?Filter=' + $scope.filter, null,
             success);
        }


        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
            var defer = $q.defer();
            $http.get('api/correspondences/list').then(function (result) {
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
            DTColumnBuilder.newColumn('FirstName').withTitle('Received From'),
            DTColumnBuilder.newColumn('strReceivedDate').withTitle('Received Date'),
           DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ];


        $scope.showMe = function (row) {
            alert(row.entity.ClientName);
        };

        function actionsHtml(data, type, full, meta) {
            return '<a class="btn btn-sm btn-warning" ui-sref="correspondence_maintain({id:' + data.Id + '})">' +
    '   <i class="fa fa-edit"></i>' +
    '</a>';

        }




    }




})(angular.module('MyApp'));

(function (app) {
    'use strict';

    app.controller('correspMaintController', correspMaintController)

    correspMaintController.$inject = ['$scope', '$location', '$stateParams', 'myService', '$filter'];

    function correspMaintController($scope, $location, $stateParams, myService, $filter) {

        $scope.vm = {
            Id: $stateParams.id,
            FirstName: 'Umang',
            ReceivedDt: '10/1/2016',
            //CaseComments:[],
            //CaseComments: [{ CommentDt: '10/8/2019', Comments: 'Test' }]
        };

        

        $scope.deleteChild = function (id, type) {
            //alert(type);
            myService.deleteRecord(id, type, function () {
                $scope.$broadcast(type);
            });
        }




        
        $scope.valuationDatePickerIsOpen = false;
        $scope.opens = [];

        $scope.valuationDatePickerOpen = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation(); // This is the magic
            }
            this.valuationDatePickerIsOpen = true;
        };

        $scope.vm.CasePrograms = [{ ObjectId: $scope.vm.Id, ObjectType: 'csp' }];

        myService.getById('api/correspondences/details', $scope, 'vm', function () {
            if($scope.vm.CasePrograms.length === 0)
                $scope.vm.CasePrograms = [{ ObjectId: $scope.vm.Id, ObjectType: 'csp' }];
            //$scope.vm.Category = { Id: $scope.vm.CategoryId, Text: 'Complaint' };
            //$scope.vm.ReceivedDt = new Date(Date.parse($scope.vm.ReceivedDt));
        });

        //$scope.$watch('vm.ReceivedDt', function (newValue) {
        //    $scope.vm.ReceivedDt = $filter('date')(newValue, 'MM/dd/yyyy');
        //});
       

        $scope.$on("modelUpdated", function (evt, data) {
            myService.getById('api/correspondences/details', $scope, 'vm');
        });

        $scope.tabClick = function (tabname) {
            $scope.EntityObject = { ObjectId: $scope.vm.Id, ObjectType: 'csp' }
            $scope.childVm = $scope.EntityObject;
            $scope.$broadcast(tabname);
        };

        

        myService.getCode($scope, 'Categories', 'CORRESP_CATEGORY');
        myService.getCode($scope, 'Sources', 'CORRESP_SOURCE');

        myService.getList('api/programs/list', $scope, null, 'Programs')

        

        $scope.addNewChoice = function () {
            $scope.vm.CasePrograms.push({ ObjectId: $scope.vm.Id, ObjectType: 'csp' });
        };

        $scope.removeChoice = function (index) {
            //var lastItem = $scope.choices.length - 1;
            $scope.vm.CasePrograms.splice(index, 1);
        };

       

        $scope.save = function () {
            
            var url = 'api/correspondences/maintain';

            console.log($scope.vm);

            myService.save(url, $scope, 'vm', function () {
                //$scope.EntityObject.ObjectId = $scope.vm.Id;
                console.log($scope.vm);
            })
        }

       


    };

})(angular.module('MyApp'));


(function (app) {
    'use strict';

    app.controller('caseCommentsController', caseCommentsController)

    caseCommentsController.$inject = ['$scope', '$location', '$routeParams', 'myService'];

    function caseCommentsController($scope, $location, $routeParams, myService) {

        $scope.$on("comments", function (evt, data) {
            myService.getList('api/comments/list', $scope, $scope.EntityObject, 'list');
            //$scope.childVm = {};
            $scope.childVm.Comments = '';
        });

        

        $scope.editChild = function (childVm) {
            $scope.childVm = JSON.parse(JSON.stringify(childVm));
        }

        

        $scope.save = function () {
            myService.save('api/comments/maintain', $scope, 'childVm', function () {
                $scope.$emit("comments");
            });
            
        }


    };

})(angular.module('MyApp'));

(function (app) {
    'use strict';

    app.controller('caseIndividualsController', caseIndividualsController)

    caseIndividualsController.$inject = ['$scope', '$routeParams', 'myService'];

    function caseIndividualsController($scope, $routeParams, myService) {

        //$scope.$on("ind", function (evt, data) {
        //    myService.getList('api/comments/list', $scope, $scope.EntityObject, 'list');
        //    //$scope.childVm = {};
        //    $scope.childVm.Comments = '';
        //});



        $scope.editChild = function (childVm) {
            $scope.childVm = JSON.parse(JSON.stringify(childVm));
        }



        $scope.save = function () {
            myService.save('api/CaseIndividuals/maintain', $scope, 'childVm', function () {
                $scope.$emit("ind");
            });

        }


    };

})(angular.module('MyApp'));