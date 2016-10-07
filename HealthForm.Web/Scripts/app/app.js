
(function () {

    'use strict';

    angular.module("MyApp", ['common.core', 'common.ui']).config(config)
    .run(run);

    config.$inject = ['$routeProvider', 'growlProvider', '$httpProvider', 'formlyConfigProvider'];



    function config($routeProvider, growlProvider, $httpProvider, formlyConfigProvider) {
        $routeProvider.
             when('/', {
                 templateUrl: 'Scripts/app/home/main.html',
                 controller: 'homeController'
             })
            .when('/dashboard', {
                templateUrl: 'Scripts/app/home/main.html',
                controller: 'homeController'
            })
          .when('/client/maintain', {
              templateUrl: 'Scripts/app/client/maintain.html',
              controller: 'clientMaintController'
          })
            .when('/client/view', {
                templateUrl: 'Scripts/app/client/index.html',
                controller: 'clientController'
            })
           .when('/correspondence/maintain', {
               templateUrl: 'Scripts/app/case/corresp-maintain.html',
               controller: 'correspMaintController'
           })
            .when('/correspondence/maintain/:id', {
                templateUrl: 'Scripts/app/case/corresp-maintain.html',
                controller: 'correspMaintController'
            })


          .when('/client/maintain/:id', {
              templateUrl: 'Scripts/app/client/maintain.html',
              controller: 'clientMaintController'
          })

            .when('/list/view', {
                templateUrl: 'Scripts/app/list/index.html',
                controller: 'listController'
            })

         .when('/list/maintain', {
             templateUrl: 'Scripts/app/list/maintain.html',
             controller: 'listMaintController',
             resolve: { isAuthenticated: isAuthenticated }
         })
         .when('/list/maintain/:id', {
             templateUrl: 'Scripts/app/list/maintain.html',
             controller: 'listMaintController'
         })
             .when('/list/column/:id', {
                 templateUrl: 'Scripts/app/list/column.html',
                 controller: 'listcolumnController'
             })
              .when('/list/form/:id', {
                  templateUrl: 'Scripts/app/list/list-form.html',
                  controller: 'listformController'
              })
         .when('/list/:ListId/column-maintain', {
             templateUrl: 'Scripts/app/list/column-maintain.html',
             controller: 'listcolumnMaintController'
         })
            .when('/list/column-maintain/:id/', {
                templateUrl: 'Scripts/app/list/column-maintain.html',
                controller: 'listcolumnMaintController'
            })
             .when('/patient/register', {
                 templateUrl: 'Scripts/app/patient/maintain.html',
                 controller: 'patientMaintController'
             })
              .when('/account/register', {
                  templateUrl: 'Scripts/app/account/maintain.html',
                  controller: 'accountMaintController'
              })
            .when('/login', {
                templateUrl: 'Scripts/app/account/login.html',
                controller: 'accountLoginController'
            })
          .otherwise({
              redirectTo: '/'
          });


        formlyConfigProvider.removeWrapperByName('bootstrapLabel');

        //formlyConfigProvider.setWrapper({
        //    name: 'inputWrapper', // optional. Defaults to name || types.join(' ') || 'default'
        //    template: 'the template with <formly-transclude></formly-transclude> in it', // must have this OR templateUrl
        //    templateUrl: 'path/to/template.html', // the resulting template MUST have <formly-transclude></formly-transclude> in it and must have templateUrl OR template (not both)
        //    types: 'stringOrArray' // this can be a string or an array of strings that map to types specified by setTemplate and setTemplateUrl
        //});

        //formlyConfigProvider.setWrapper({
        //    name: 'bootstrapLabel',
        //    template: 'the template with <formly-transclude></formly-transclude> in it', // must have this OR templateUrl
        //    //templateUrl: 'label-wrapper.html'
        //});

        // Replace formlyBootstrap input field type to implement read-only forms
        //formlyConfigProvider.setType({
        //    name: 'input',
        //    templateUrl: 'input-template.html',
        //    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        //    //overwriteOk: true
        //});

        formlyConfigProvider.setWrapper({
            name: 'bootstrapLabel',
            template: [
              '<label for="{{::id}}" class="{{options.templateOptions.labelClass}} control-label">',
                '{{to.label}} {{to.required ? "*" : ""}}',
              '</label>',
              '<div class="{{options.templateOptions.valueClass}}">',
                '<formly-transclude></formly-transclude>',
              '</div>'
            ].join(' ')
        });

        //formlyConfigProvider.setType({
        //    name: 'horizontalInput',
        //    extends: 'input',
        //    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
        //});

               

        //$httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);
    }


    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) {
        // handle page refreshes
        $rootScope.UserInfo = $cookies.getObject('UserInfo');
        if ($rootScope.UserInfo) {
            $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.UserInfo.token;
        }
    }


    isAuthenticated.$inject = ['helperService', '$rootScope', '$location'];

    function isAuthenticated(helperService, $rootScope, $location) {
        if (!helperService.isUserLoggedIn()) {
            $rootScope.previousState = $location.path();
            $location.path('/login');
        }
    }




})();