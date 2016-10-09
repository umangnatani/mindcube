(function (app) {
    'use strict';

    app.factory('myService', myService);

    myService.$inject = ['$http', '$location', '$rootScope', '$cookies', 'toastr', '$uibModal'];

    function myService($http, $location, $rootScope, $cookies, toastr, $uibModal) {
        var service = {
            save: save,
            get: get,
            post: post,
            getCode: getCode,
            getById: getById,
            getList: getList,
            deleteRecord: deleteRecord,
            login: login,
            removeCredentials: removeCredentials,
            restoreCredentials: restoreCredentials,
            loginPopUp: loginPopUp
        };

        return service;


        function loginPopUp() {
            $rootScope.modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'Scripts/app/account/login.html',
                //size: size,
            });

            return $rootScope.modalInstance.result.then();

            //modalInstance.result.then(modalInstance.close());
        }



        // Get dropdown values from Code Detail
        function getCode(scope, arrDropdown, CodeMaster) {
            get('api/codedetails/list/' + CodeMaster,
            function (response) {
                scope[arrDropdown] = response.data;
            });
        }


        // load Form Model via api
        function getById(url, scope, vm, success) {
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


        function getList(url, scope, data, objList, success, failure) {
            preparePost();
            return post(url, data,
                function (result) {
                    scope[objList] = result.data;
                    if (success)
                        success(result);
                }, failure);
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

        function save(url, scope, vm, success, failure) {
            preparePost();
            return post(url, scope[vm], 
                function (result) {
                    showMessage(result, scope, vm);
                    if (success)
                        success(result);
            }, failure);
        }


        function preparePost() {
            //growlMessages.destroyAllMessages();
            $rootScope.isBusy = true;
        }


        function showMessage(response, scope, vm) {
            if (response.data.Code > 0) {
                //ngToast.create({
                //    className: 'success',
                //    content: response.data.Message
                //});
                toastr.success(response.data.Message);
                //$rootScope.isBusy = true;
            }

            else {
                toastr.error(response.data.Message);
                //$rootScope.isBusy = false;
            }
            $rootScope.isBusy = false;
            if (response.data.Object)
                scope[vm] = response.data.Object;
        }



        function post(url, data, success, failure) {
            return $http.post(url, data)
                    .then(function (result) {
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


        //#endregion



        //login function

        function login(scope, vm, success, failure) {
            var data = "grant_type=password&username=" + scope[vm].UserId + "&password=" + scope[vm].Password;

            return $http.post('token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(function (result) {
                        $rootScope.UserInfo = {
                            isLoggedIn: true,
                            UserId: scope[vm].UserId,
                            token: result.data.access_token
                        };
                        //debugger;

                        $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.UserInfo.token;

                        post('api/users/login', scope[vm], function (obj) {
                            //console.log(obj.data);
                        })

                        $cookies.putObject('UserInfo', $rootScope.UserInfo, {
                            //expires: new Date(2017, 1, 1),
                            path: '/'
                        });



                        
                        //console.log($cookies.getObject('UserInfo'));
                        
                        if (success)
                            success(result);

                    }, function (error) {
                        if (error.status == '400') {
                            toastr.error(error.data.error_description);
                        }
                        else {
                            console.log(error);
                        }
                    });


        }

        function removeCredentials() {
            $rootScope.UserInfo = {};
            $cookies.remove('UserInfo', { path: '/' });
        }

        function restoreCredentials() {
            $rootScope.UserInfo = $cookies.getObject('UserInfo');
            if ($rootScope.UserInfo) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.UserInfo.token;
            }
        }
    }

})(angular.module('MyApp'));


(function (app) {
    'use strict';

    app.factory('ajaxGlobal', ajaxGlobal);

    ajaxGlobal.$inject = ['$q', '$rootScope', '$log', '$timeout', '$injector'];

    function ajaxGlobal($q, $rootScope, $log, $timeout, $injector) {

        var myService, $http, $state;

        // this trick must be done so that we don't receive
        // `Uncaught Error: [$injector:cdep] Circular dependency found`
        $timeout(function () {
            myService = $injector.get('myService');
            $http = $injector.get('$http');
            $state = $injector.get('$state');
        });

        return {
            request: function (config) {
                //$rootScope.isBusy = true;
                return config;
            },
            requestError: function (rejection) {
                //$rootScope.isBusy = false;
                $log.error('Request error:', rejection);
                return $q.reject(rejection);
            },
            response: function (response) {
                //$rootScope.isBusy = false;
                return response;
            },
            responseError: function (rejection) {
                //$rootScope.isBusy = false;
                var deferred = $q.defer();
                if (rejection.status == 401) {
                    myService.loginPopUp().then(function () {
                        deferred.resolve($http(rejection.config));
                    });
                    return rejection;
                }
                else {
                    alert2(rejection.data);
                    //$log.error('Response error:', rejection);
                }
                return $q.reject(rejection);
            }
        };



    }

})(angular.module('MyApp'));