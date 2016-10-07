(function (app) {
    'use strict';

    app.controller('homeController', homeController);

    homeController.$inject = ['$scope', '$location', '$rootScope'];
    function homeController($scope, $location, $rootScope) {

        $scope.userData = {};

        $scope.config = {};

        $scope.userData.displayUserInfo = displayUserInfo;
        //$scope.logout = logout;

        //$scope.config.errorMessage = 'Welcome';
        //$scope.config.showDiv = true;

        function displayUserInfo() {
            $scope.userData.isUserLoggedIn = membershipService.isUserLoggedIn();

            if ($scope.userData.isUserLoggedIn) {
                $scope.username = $rootScope.repository.loggedUser.username;
            }
        }

        //function logout() {
        //    membershipService.removeCredentials();
        //    $location.path('#/');
        //    $scope.userData.displayUserInfo();
        //}

        //$scope.userData.displayUserInfo();
    }

})(angular.module('MyApp'));