(function (app) {
    'use strict';

    app.controller('rootController', rootController);

    rootController.$inject = ['$scope', '$location', '$rootScope', 'myService', '$window'];

    function rootController($scope, $location, $rootScope, myService, $window) {


        $scope.menuItems = MenuVM

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