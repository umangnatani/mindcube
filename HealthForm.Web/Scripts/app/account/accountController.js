(function (app) {
    'use strict';


    app.controller('accountMaintController', accountMaintController)

    accountMaintController.$inject = ['$scope', '$routeParams', 'apiService', '$uibModal', 'helperService'];


    function accountMaintController($scope, $routeParams, apiService, $uibModal, helperService) {


        //apiService.get('Api/listcolumns/list/' + $scope.ListId, null,
        //  success);



        //$scope.obj = { Id: 0, HashedPassword: '', Salt: '', IsInactive: 0, IsLocked: 0, DateCreated: '09/23/2016', ClientId:0 };
        $scope.obj = {};

        $scope.saveList = saveList;




        function saveList() {
            apiService.post('Api/Users/Maintain', $scope);
        }

       



    }




})(angular.module('MyApp'));


(function (app) {
    'use strict';


    app.controller('accountLoginController', accountLoginController)

    accountLoginController.$inject = ['$scope', '$routeParams', 'apiService', '$uibModal', 'myService', '$rootScope', '$location', '$window'];


    function accountLoginController($scope, $routeParams, apiService, $uibModal, myService, $rootScope, $location, $window) {


        $scope.vm = {};


        $scope.login = function() {
            myService.login($scope, 'vm', afterLogin);
        }

        function afterLogin() {
            //apiService.post('api/users/login', $scope);
            //helperService.saveCredentials($scope.obj);
            //$scope.$emit('loginEvent');
            if ($rootScope.previousState)
                $location.path($rootScope.previousState);
            else
            {
                //console.log($window.location);
                //console.log($location);
                $window.location.href = $window.location.origin + _webRoot;
            }
                
        }





    }




})(angular.module('MyApp'));