(function (app) {


    function commentsMaintController($scope, $timeout, myService) {

        var ctrl = this;

        $scope.$on("comments", function (evt, data) {
            //alert('ff');

            $timeout(getList);
            //$scope.childVm = {};

        });


        function getList() {
            //console.log(ctrl.entityObject);
            ctrl.childVm = angular.copy(ctrl.entityObject);
        }


        ctrl.editChild = function (childVm) {
            //console.log(childVm);
            ctrl.childVm = angular.copy(childVm);
            //ctrl.childVm = JSON.parse(JSON.stringify(childVm));
        }

        ctrl.addNew = function () {
            ctrl.childVm = angular.copy(ctrl.entityObject);
        }



        ctrl.save = function () {
            myService.save('api/comments/maintain', ctrl, 'childVm', function () {
                $scope.$broadcast("comments");
            });

        }


    };



    var comments = {
        bindings: {
            entityObject: '='
        },

        templateUrl: 'scripts/app/case/comments.html',
        controller: commentsMaintController
    };

    app.component('comments', comments);

    function commentsController($scope, $timeout, myService) {

        var ctrl = this;

        $scope.$on("comments", function (evt, data) {
            //alert('ff');

            $timeout(getList);
            //$scope.childVm = {};

        });


        function getList() {
            //console.log(ctrl.entityObject);
            myService.getListByPost('api/comments/list', ctrl, 'list', ctrl.entityObject);
        }


        ctrl.edit = function (childVm) {
            
            ctrl.onUpdate({ childVm: childVm });
        }



        ctrl.save = function () {
            myService.save('api/comments/maintain', ctrl, 'childVm', function () {
                $scope.$emit("comments");
            });

        }


    };



    var commentsList = {
        // isolated scope binding
        bindings: {
            entityObject: '=',
            onUpdate: '&'
        },

        // Inline template which is binded to message variable
        // in the component controller
        templateUrl: 'scripts/app/case/comments-list.html',

        // The controller that handles our component logic
        controller: commentsController
    };

    app.component('commentsList', commentsList);




})(angular.module('MyApp'));
