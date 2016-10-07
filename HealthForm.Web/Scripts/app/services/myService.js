(function (app) {
    'use strict';

    app.factory('myService', myService);

    myService.$inject = ['$http', '$location', '$rootScope', 'growl', 'growlMessages', '$cookies'];

    function myService($http, $location, $rootScope, growl, growlMessages, $cookies) {
        var service = {
            get: get,
            post: post,
            getCode: getCode,
            loadModel: loadModel,
            getList: getList,
            deleteRecord: deleteRecord
        };

        return service;



        // Get dropdown values from Code Detail
        function getCode(scope, arrDropdown, CodeMaster) {
            get('api/codedetails/list/' + CodeMaster,
            function (response) {
                scope[arrDropdown] = response.data;
            });
        }


        // load Form Model via api
        function loadModel(url, scope, vm, success) {
            if (scope[vm].Id) {
                get(url + '/' + scope[vm].Id, function (results) {
                    scope[vm] = results.data;
                    //console.log(objScope);
                    if (success)
                        success(result);
                });
            }
        }



        //#region ajax methods


        function deleteRecord(id, type, success, failure) {
            preparePost();
            return $http.post('api/util/delete', { ObjectId: id, ObjectType: type })
                    .then(function (result) {
                        showMessage(result)
                        if (success)
                            success(result);
                    }, function (error) {
                        if (error.status == '401') {
                            //notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }


        function getList(url, scope, data, success, failure) {
            preparePost();
            return $http.post(url, data)
                    .then(function (result) {
                        scope.list = result.data;
                        if (success)
                            success(result);
                    }, function (error) {
                        if (error.status == '401') {
                            //notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }


        function get(url, success, failure) {
            return $http.get(url)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        if (error.status == '401') {
                            //notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }

        function post(url, scope, vm, success, failure) {
            preparePost();
            return $http.post(url, scope[vm])
                    .then(function (result) {
                        showMessage(result, scope[vm])
                        if (success)
                            success(result);
                    }, function (error) {
                        if (error.status == '401') {
                            //notificationService.displayError('Authentication required.');
                            $rootScope.previousState = $location.path();
                            $location.path('/login');
                        }
                        else if (failure != null) {
                            failure(error);
                        }
                    });
        }


        function preparePost() {
            growlMessages.destroyAllMessages();
            $rootScope.isBusy = true;
        }


        function showMessage(response, objScope) {
            if (response.data.Code > 0) {
                growl.success(response.data.Message);
                //$rootScope.isBusy = true;
            }

            else {
                growl.error(response.data.Message);
                //$rootScope.isBusy = false;
            }
            $rootScope.isBusy = false;
            if (response.data.Object && objScope)
                objScope = response.data.Object;
        }

        //#endregion
    }

})(angular.module('common.core'));