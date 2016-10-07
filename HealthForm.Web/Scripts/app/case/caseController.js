(function (app) {
    'use strict';

    app.controller('correspMaintController', correspMaintController)

    correspMaintController.$inject = ['$scope', '$location', '$routeParams', 'myService'];

    function correspMaintController($scope, $location, $routeParams, myService) {

        $scope.obj = {
            Id: $routeParams.id,
            FirstName: 'Umang',
            ReceivedDt: '10/1/2016',
            //CaseComments:[],
            //CaseComments: [{ CommentDt: '10/8/2019', Comments: 'Test' }]
        };

        $scope.EntityObject = { ObjectId: $scope.obj.Id, ObjectType: 'csp' }

        $scope.deleteChild = function (id, type) {
            //alert(type);
            myService.deleteRecord(id, type, function () {
                $scope.$broadcast(type);
            });
        }

        //$scope.objectId = $scope.obj.Id;
        $scope.childObj = $scope.EntityObject;
        

        myService.loadModel('api/correspondences/details', $scope.obj.Id, $scope.obj, function (results) {
            $scope.obj = results.data;
            console.log(results.data);
            console.log($scope.obj);
        });

        $scope.$on("modelUpdated", function (evt, data) {
            myService.loadModel('api/correspondences/details', $scope.obj.Id, $scope.obj);
        });

        $scope.tabClick = function (tabname) {
            $scope.$broadcast(tabname);
        };

        

        //myService.get('api/codedetails/list/OPTION_TYPE',
        //    function (response) {
        //        $scope.Categories = response.data;
        //    });
        //$scope.Categories = {};
        myService.getCode($scope, 'Categories', 'CORRESP_CATEGORY');
        myService.getCode($scope, 'Sources', 'CORRESP_SOURCE');

       

        $scope.save = function () {
            //if (!$scope.comments.Id) {
            //    alert('no');
            //    $scope.obj.CaseComments.push($scope.comments);

            //}
                
            //    $scope.obj.CaseComments[$scope.comments.index]($scope.comments);
            //else
            //    $scope.obj.CaseComments.push($scope.comments);

            var url = 'api/correspondences/maintain';

            myService.post(url, $scope.obj, function () {
                $scope.EntityObject.ObjectId = $scope.obj.Id;
                console.log($scope.obj);
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
            myService.getList('api/comments/list', $scope, $scope.EntityObject);
            //$scope.childObj = {};
            $scope.childObj.Comments = '';
        });

        

        $scope.editChild = function (childObj) {
            $scope.childObj = JSON.parse(JSON.stringify(childObj));
            //console.log($scope.comments);
            //$scope.$broadcast("caseClick", JSON.parse(JSON.stringify(comment)));
            //$scope.comments.index = $index;
        }

        
        

        //$scope.obj = { EntDt: '10/1/2016', CommentDt: '10/5/2099', CorrespId: $scope.objectId };

        //$scope.obj = $scope.$parent.comments;

        //$scope.$on("caseClick", function (evt, data) {
        //    $scope.obj = data;
        //});

        //myService.loadModel('api/clients1/details', $scope);

        $scope.save = function () {
            //$scope.obj = $scope.childObj;
            //console.log($scope.obj);
            myService.post('api/comments/maintain', $scope.childObj, function () {
                $scope.$emit("comments");
            });
            
        }


    };

})(angular.module('MyApp'));