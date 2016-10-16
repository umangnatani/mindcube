
(function () {

    'use strict';

    angular.module("MyApp", ['ngRoute',
                            'ui.router', // UI Router for SPA
                            'ngCookies',
                            'base64',
                            'ui.bootstrap',
                            'ngMessages',
                            'ngAnimate',
                            'toastr', // For growl notifications
                            'ui.grid',
                            'ui.grid.pagination',
                            'ui.grid.selection',
                            'ui.grid.saveState',
                            'datatables',
                            'formly',
                            'formlyBootstrap',
                            'validation', // For form validation
                            'validation.rule', // For form validation rules
                            'ngSanitize', 
                            'ui.select', // for select2
                            'datetime' // for date formatting
    ]).config(config)
    .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', 'formlyConfigProvider', 'toastrConfig', '$validationProvider'];



    function config($stateProvider, $urlRouterProvider, $httpProvider, formlyConfigProvider, toastrConfig, $validationProvider) {

        angular.forEach(StateVM, function (value, key) {
            //console.log(value);
            $stateProvider.state(value.StateName, JSON.parse(value.StateJSON));
        });


       

        $urlRouterProvider.otherwise('/');
           

        formlyConfigProvider.removeWrapperByName('bootstrapLabel');

        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right',
            closeButton: true,
            timeOut: 10000,
        });

        $validationProvider.showSuccessMessage = false;
        $validationProvider.setValidMethod('submit-only');

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

        $httpProvider.interceptors.push('ajaxGlobal');

        //$httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);
    }


    run.$inject = ['myService', '$rootScope', '$state'];

    function run(myService, $rootScope, $state) {
        // handle page refreshes
        myService.restoreCredentials();


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            var requireLogin = true;

            if (toState.data)
                requireLogin = toState.data.requireLogin;

            
            if (requireLogin && typeof $rootScope.UserInfo === 'undefined') {
                event.preventDefault();
                //console.log(toState)
                //alert('not allowed')
                myService.loginPopUp().then(function () {
                    return $state.go(toState.name, toParams);
                });
                // get me a login modal!
            }
        });
    }


    isAuthenticated.$inject = ['helperService', '$rootScope', '$location'];

    function isAuthenticated(helperService, $rootScope, $location) {
        if (!helperService.isUserLoggedIn()) {
            $rootScope.previousState = $location.path();
            $location.path('/login');
        }
    }




})();