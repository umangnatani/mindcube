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

    accountLoginController.$inject = ['$scope', '$routeParams', 'apiService', '$uibModal', 'helperService', '$rootScope', '$location', '$window'];


    function accountLoginController($scope, $routeParams, apiService, $uibModal, helperService, $rootScope, $location, $window) {


        $scope.obj = {};

        $scope.saveList = saveList;




        function saveList() {
            helperService.login('token', $scope, afterLogin);
        }

        function afterLogin() {
            apiService.post('api/users/login', $scope);
            //helperService.saveCredentials($scope.obj);
            //$scope.$emit('loginEvent');
            if ($rootScope.previousState)
                $location.path($rootScope.previousState);
            else
            {
                var getUrl = $window.location;
                $window.location.href = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/";
            }
                
        }





    }




})(angular.module('MyApp'));