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

    accountLoginController.$inject = ['$scope', '$routeParams', 'apiService', 'myService', '$rootScope', '$location', '$window'];


    function accountLoginController($scope, $routeParams, apiService, myService, $rootScope, $location, $window) {


        $scope.vm = {};


        $scope.login = function() {
            myService.login($scope, 'vm', afterLogin);
        }

        function afterLogin() {
            if ($rootScope.modalInstance)
                $rootScope.modalInstance.close('a');
            else
                $window.location.href = $window.location.origin + _webRoot + '#/home';
               
        }





    }




})(angular.module('MyApp'));