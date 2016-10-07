(function (app) {
    'use strict';

    app.factory('helperService', helperService);

    helperService.$inject = ['growl', 'growlMessages', '$base64', '$cookies', '$rootScope', '$http'];

    function helperService(growl, growlMessages, $base64, $cookies, $rootScope, $http) {

        var service = {
            showMessage: showMessage,
            preparePost: preparePost,
            login: login,
            isUserLoggedIn: isUserLoggedIn
        };


        return service;

        function login(url, scope, success, failure) {
            var data = "grant_type=password&username=" + scope.obj.UserId + "&password=" + scope.obj.Password;
            return $http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(function (result) {
                        //helperService.showMessage(result, scope)

                        $rootScope.UserInfo = {
                            isLoggedIn: true,
                            UserName: scope.obj.UserId,
                            token: result.data.access_token
                        };
                        //debugger;

                        $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.UserInfo.token;
                        $cookies.putObject('UserInfo', $rootScope.UserInfo, {
                            expires: new Date(2017, 1, 1),
                            path: '/'
                        });

                        //var temp = $cookies.get('loggedin');
                        console.log($cookies.getObject('UserInfo'));
                        //console.log(temp);

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

        function isUserLoggedIn() {
            return $rootScope.repository.loggedUser != null;
        }



        function showMessage(response, scope) {
            if (response.data.Code > 0) {
                growl.success(response.data.Message);
                //$rootScope.isBusy = true;
            }

            else {
                growl.error(response.data.Message);
                //$rootScope.isBusy = false;
            }
            $rootScope.isBusy = false;
            if (response.data.Object)
                    scope.obj = response.data.Object;
        }

        function preparePost(scope) {
            growlMessages.destroyAllMessages();
            $rootScope.isBusy = true;
            //scope.obj.Active = 1;
        }


      
    }

})(angular.module('common.core'));


(function (app) {
    'use strict';

    app.directive('disableOnPromise', disableOnPromise);


    function disableOnPromise($parse) {
        return {
            restrict: 'A',
            compile: function ($element, attr) {
                var fn = $parse(attr.disableOnPromise);
                return function clickHandler(scope, element, attrs) {
                    
                    element.on('click', function (event) {
                        attrs.$set('disabled', true);
                        scope.$apply(function () {
                            fn(scope, { $event: event }).finally(function () {
                                attrs.$set('disabled', false);
                            });
                        });
                    });
                };
            }
        };
    }

})(angular.module('common.core'));





