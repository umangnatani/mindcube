(function (app) {
    'use strict';


    app.controller('listcolumnController', listcolumnController)

    listcolumnController.$inject = ['$scope', '$routeParams', 'apiService', '$uibModal'];


    function listcolumnController($scope, $routeParams, apiService, $uibModal) {

        $scope.ListId = $routeParams.id;

        
        apiService.get('Api/listcolumns/list/' + $routeParams.id, null,
           success);



        $scope.search = function () {
            apiService.post('api/clients1/Search?Filter=' + $scope.filter, null,
             success);
        }


        var columnDefs = [
        { field: "ColumnOrder" },
        { field: "ColumnTitle" },
        { field: "ColumnType" },
        { name: 'Edit', cellTemplate: 'scripts/app/list/column-menu.html' }
        ];


        //{ name: 'Edit', cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.openEditDialog(row)">Edit</a>' }



        $scope.gridOptions = {
            enableSorting: true,
            columnDefs: columnDefs

            //rowModelType: 'pagination'
        };



        $scope.persons = [
    { 'id': 1, 'name': 'omer', 'age': 35, 'suggestedPhones': [{ 'destination': 'home', 'number': '0544317259' }] },
    { 'id': 2, 'name': 'noam', 'age': 32, 'suggestedPhones': [{ 'destination': 'home', 'number': '036024607' }] },
    { 'id': 3, 'name': 'dafna', 'age': 28, 'suggestedPhones': [{ 'destination': 'home', 'number': '0522318779' }] }
        ]

        function success(result) {
            //$scope.DisplayClients = result.data;
            $scope.list = result.data;
            $scope.gridOptions.data = $scope.list;

            //$scope.gridOptions.api.refreshView();

        }



        //$scope.openEditDialog = function (client) {
        //    $scope.client = client;
        //    $uibModal.open({
        //        templateUrl: 'Scripts/app/list/maintain.html',
        //        controller: 'clientMaintController',
        //        scope: $scope
        //    }).result.then(function ($scope) {
        //        clearSearch();
        //    }, function () {
        //    });
        //}

       

    }




})(angular.module('MyApp'));



(function (app) {
    'use strict';

    app.controller('listcolumnMaintController', listcolumnMaintController)

    listcolumnMaintController.$inject = ['$scope', '$routeParams', 'apiService', 'helperService', '$timeout'];

    function listcolumnMaintController($scope, $routeParams, apiService, helperService, $timeout) {

        $scope.obj = {};

        $scope.obj.ListId = $routeParams.ListId;

       
        apiService.get('Api/codedetails/list/OPTION_TYPE', null,
        function (response) {
            $scope.columntypes = response.data;
        });

       
        $scope.obj.ListColumnOptions = [{ Text: '' }
        ];


        $scope.addNewChoice = function () {
            $scope.obj.ListColumnOptions.push({ Text: '', ListColumnId: $scope.obj.Id });
        };

        $scope.removeChoice = function (index) {
            //var lastItem = $scope.choices.length - 1;
            $scope.obj.ListColumnOptions.splice(index,1);
        };

        if ($routeParams.id > 0)
            load();


        function load() {
            //$scope.loadingMovie = true;
            apiService.get('Api/listcolumns/Details/' + $routeParams.id, null,
        successLoad);
        }

        function successLoad(result) {
            $scope.obj = result.data;
            //$scope.loadingMovie = false;

            //loadGenres();
        }





        $scope.save = function () {
            
            //debugger;
            //growlMessages.destroyAllMessages();
            //$$rootScope.isBusy = true;
            //$timeout( function()
            // {
            //     $$rootScope.isBusy = false;
            //     alert( 'done');
            // }, 10000);
            //$scope.obj.Active = 1;
            //$scope.obj.ListId = $scope.ListId;
            return apiService.post('Api/ListColumns/Maintain', $scope);
        }

        //$scope.makeInactive = function () {
        //    $scope.list.Active = 0;
        //    apiService.post('Api/Lists', $scope.list, success)
        //}

        function success(response) {
            $$rootScope.isBusy = helperService.showMessage(response);
            $scope.obj.Id = response.data.Code;
        }


    };

})(angular.module('MyApp'));



(function (app) {
    'use strict';


    app.controller('listformController', listformController)

    listformController.$inject = ['$scope', '$routeParams', 'apiService', '$uibModal'];


    function listformController($scope, $routeParams, apiService, $uibModal) {

        $scope.ListId = $routeParams.id;


        apiService.get('Api/listcolumns/list/' + $routeParams.id, null,
          success);

        apiService.get('Api/listvalues/list?ObjectId=1&ListId=' + $routeParams.id, null,
         success2);

        $scope.obj = {};

        $scope.obj.List = {};

        $scope.userFields = [];
        //  {
        //      // the key to be used in the model values
        //      // so this will be bound to vm.user.username
        //      key: 'username',
        //      type: 'select',
        //      templateOptions: {
        //          label: 'Username',
        //          placeholder: 'johndoe',
        //          required: true,
        //          description: 'Descriptive text'
        //      }
        //  },
        //  {
        //      key: 'password',
        //      type: 'input',
        //      templateOptions: {
        //          type: 'password',
        //          label: 'Password',
        //          required: true
        //      },
        //      expressionProperties: {
        //          'templateOptions.disabled': '!model.username' // disabled when username is blank
        //      }
        //  }
        //];

        $scope.onSubmit = onSubmit;


        function onSubmit() {
            var JSONText = JSON.stringify($scope.obj.List);
            //$scope.obj = {};
            $scope.obj.JSONText = JSONText;
            apiService.post('Api/ListValues/Maintain', $scope);
            console.log('form submitted:', $scope.obj.List);
        }

        function getType(type) {
            switch (type){
                case 'T': return 'input';
                case 'D': return 'multiCheckbox';
                case 'C': return 'checkbox';
                default: return 'input';
            }
       

        }
       

        function success2(result) {
            //alert(result.data.JSONText);
            $scope.obj.List = JSON.parse(result.data.JSONText);
            //angular.forEach(result.data, function (value, key) {
            //    if (value.ListColumn.ColumnType === 'D'){
            //        if ($scope.obj.List[value.ListColumnId] === undefined)
            //            $scope.obj.List[value.ListColumnId] = [value.OptionId];
            //     else
            //            $scope.obj.List[value.ListColumnId].push(value.OptionId);

            //    //alert($scope.user[value.ListColumnId]);
            //    }
            //    else
            //        $scope.obj.List[value.ListColumnId] = value.OptionText;
            //});

            console.log('form started:', result.data);
        }


       
        function success(result) {
            //$scope.DisplayClients = result.data;
            $scope.list = result.data;
            
            angular.forEach($scope.list, function (value, key) {
                var field = {};
                field.className = value.ValueCols;
                field.key = value.Id;
                field.type = getType(value.ColumnType);
                var options = [];
                if (value.ColumnType == 'D') {
                    angular.forEach(value.ListColumnOptions, function (value, key) {
                        options.push({ name: value.Text, value: value.Id });
                    });
                   }
                field.templateOptions = {
                    label: value.ColumnTitle,
                    required: value.IsRequired,
                    options: options
                };
                $scope.userFields.push(field);
            });

            //$scope.gridOptions.api.refreshView();

           


        }






    }




})(angular.module('MyApp'));

