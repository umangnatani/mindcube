(function (app) {
    'use strict';

    app.controller('correspMaintController', correspMaintController)

    correspMaintController.$inject = ['$scope', '$location', '$stateParams', 'myService'];

    function correspMaintController($scope, $location, $stateParams, myService) {

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


        $scope.vm.CasePrograms = [{ ObjectId: $scope.vm.Id, ObjectType: 'csp' }];

        myService.getById('api/correspondences/details', $scope, 'vm');
       

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