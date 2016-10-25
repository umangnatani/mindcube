(function (app) {
    'use strict';

    app.controller('rootController', rootController);

    rootController.$inject = ['$scope', '$location', '$rootScope', 'myService', '$window'];

    function rootController($scope, $location, $rootScope, myService, $window) {


        $scope.menuItems = MenuVM;
        $scope.menuInfo = {};

        $scope.menuInfo.breadCrumb = [];

        //$scope.menuInfo.code = 'Menu';

        $rootScope.delete = function (id, type) {
            //alert(type);
            myService.deleteRecord(id, type, function () {
                $scope.$broadcast(type);
            });
        }

        $scope.$watch('menuInfo.code', function (newValue, oldValue, scope) {
            $scope.menuInfo.breadCrumb = [];

                angular.forEach(MenuVM, function (item, key) {
                    angular.forEach(item.Children, function (child, key) {
                        if (child.Code == $scope.menuInfo.code) {
                            $scope.menuInfo.childMenu = child;
                            $scope.menuInfo.curMenu = item;
                            $scope.menuInfo.breadCrumb.push({ Title: item.Title });
                            $scope.menuInfo.breadCrumb.push({ Title: child.Title });
                        }
                        //return child.Code == $scope.menuInfo.code;
                    });
                
                });
                //console.log($scope.menuInfo.childMenu);
        });


        //$scope.$on("menuLoaded", function (evt, data) {
        //    angular.forEach(MenuVM, function (item, key) {
        //        angular.forEach(item.Children, function (child, key) {
        //            if (child.Code == $scope.menuInfo.code) {
        //                $scope.menuInfo.childMenu = child;
        //                $scope.menuInfo.curMenu = item;
        //            }
        //            //return child.Code == $scope.menuInfo.code;
        //        });
        //    });
        //    console.log($scope.menuInfo.childMenu);
        //});

       

        //var childMenu = _.find(curMenu.Children, function (item) {
        //    //_.find(item.Children, function (child) {
        //    return item.Code == "Client";
        //    //return child.Code == $scope.menuInfo.code;
        //    //});
        //});

        



        $scope.logoff =  function() {
            myService.removeCredentials();
            //console.log($window.location);
            //console.log($location);
            $window.location.href = $window.location.origin + _webRoot + "home/login";
        }


        

    }

})(angular.module('MyApp'));




//$scope.menuItems = [
//    {
//        Title: "Dashboard",
//        URL: "#/login",
//        Icon: "fa fa-tachometer",
//        Id: "1",
//        Children:[]
//    },
//    {
//        Title: "Client",
//        URL: "#",
//        Icon: "fa fa-tachometer",
//        Id: "2",
//        Children: [
//            {
//                Children:[],
//                Title: "Add Client",
//                URL: "#/client/maintain",
//                Id: "AddClient",
//            }
//        ]
//    },
//    {
//        Title: "List",
//        Icon: "fa fa-cube",
//        Id: "4",
//        Children: [
//           {
//               Children:[],
//               Title: "View List",
//               URL: "#/list/view",
//               Id: "ViewList",
//           }
//        ]
//    }
//]