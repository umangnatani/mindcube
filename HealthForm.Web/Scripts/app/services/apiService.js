﻿    (function (app) {
        'use strict';

        app.factory('apiService', apiService);

        apiService.$inject = ['$http', '$location', '$rootScope', 'helperService'];

        function apiService($http, $location, $rootScope, helperService) {
            var service = {
                get: get,
                post: post
            };

            function get(url, config, success, failure) {
                //url = '/hf' + url;
                return $http.get(url, config)
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

            function post(url, scope, success, failure) {
                helperService.preparePost(scope);
                return $http.post(url, scope.obj)
                        .then(function (result) {
                            helperService.showMessage(result, scope)
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

            return service;
        }

    })(angular.module('MyApp'));