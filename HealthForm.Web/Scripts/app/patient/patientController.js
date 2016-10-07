(function (app) {
    'use strict';


    app.controller('patientMaintController', patientMaintController)

    patientMaintController.$inject = ['$scope', '$routeParams', 'apiService', '$uibModal'];


    function patientMaintController($scope, $routeParams, apiService, $uibModal) {

        $scope.ListId = 3;
        $scope.PatientId = 1;


        apiService.get('Api/listcolumns/list/' + $scope.ListId, null,
          success);

        apiService.get('Api/listvalues/list?ObjectId=1&ListId=' + $scope.ListId, null,
         success2);

        $scope.obj = {};

        $scope.obj.List = {};


        $scope.saveList = saveList;

        $scope.userFields = [];




        $scope.options = {
            formState: {
                horizontalLabelClass: 'col-sm-2',
                horizontalFieldClass: 'col-sm-10',
                //readOnly: true
            }
        };


        function saveList() {
            var JSONText = JSON.stringify($scope.obj.List);
            //$scope.obj = {};
            $scope.obj.JSONText = JSONText;
            apiService.post('Api/ListValues/Maintain', $scope);
            console.log('form submitted:', $scope.obj.List);
        }

        function getType(type) {
            switch (type) {
                case 'T': return 'input';
                case 'D': return 'multiCheckbox';
                case 'C': return 'checkbox';
                default: return 'input';
            }


        }


        function success2(result) {
            //alert(result.data.JSONText);
            $scope.obj.List = JSON.parse(result.data.JSONText);

            console.log('form started:', result.data);
        }



        function success(result) {
            //$scope.DisplayClients = result.data;
            $scope.list = result.data;

            angular.forEach($scope.list, function (value, key) {
                var field = {};
                //field.className = value.ValueCols;
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
                    valueClass: value.ValueCols,
                    labelClass: value.LabelCols,
                    required: value.IsRequired,
                    options: options
                };
                $scope.userFields.push(field);
            });




        }






    }




})(angular.module('MyApp'));