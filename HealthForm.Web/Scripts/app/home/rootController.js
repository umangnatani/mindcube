(function (app) {
    'use strict';

    app.controller('rootController', rootController);

    rootController.$inject = ['$scope', '$location', '$rootScope', '$cookies', 'apiService'];
    function rootController($scope, $location, $rootScope, $cookies, apiService) {

        $scope.UserInfo = {};

        $scope.MainSectionId = "content-not-logged-in"

        $scope.$on('loginEvent', function (event, args) {
            displayUserInfo();
        });

        
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



        apiService.get('Api/UserMenu/list', null,
           function (result) {
               $scope.menuItems = result.data;
           });


        


        //$scope.logout = logout;

        //$scope.config.errorMessage = 'Welcome';
        //$scope.config.showDiv = true;

        function displayUserInfo() {

            //var isLoggedIn = $cookies.get('loggedin');
            //alert($cookies.get('loggedin'))

            $scope.UserInfo = $cookies.getObject('UserInfo');

            

            if ($scope.UserInfo) {
                $scope.MainSectionId = "main-content";
            }
        }

        //function logout() {
        //    membershipService.removeCredentials();
        //    $location.path('#/');
        //    $scope.userData.displayUserInfo();
        //}

        displayUserInfo();
    }

})(angular.module('MyApp'));