﻿(function (app) {
    'use strict';


    app.controller('correspController', correspController)

    correspController.$inject = ['$scope', 'myService', '$uibModal'];

    // used angular datatables grid

    function correspController($scope, myService, $uibModal) {

        $scope.menuInfo.code = 'View';
        $scope.menuInfo.pageTitle = "Maintain Correspondences";

        $scope.init = function () {
            $scope.vm = {};
            //$scope.vm.MasterCode = $stateParams.id;
            getData();
        }

        $scope.list = [{}];

        $scope.init();

        var columnDefs = [
        { field: "Id" },
        { field: "ReceivedFrom" },
        { field: "strReceivedDate", name: 'Received Date' },
        { name: 'Edit', cellTemplate: '<div class="ui-grid-cell-contents"><a ng-href="#/correspondence/maintain/{{row.entity.Id}}">Edit</a> | <a href="JavaScript:void(0)" ng-click="grid.appScope.delete(row.entity.Id)">Delete</a></div>' }
        ];


        $scope.gridOptions = {
            totalItems: $scope.list.length,
            paginationPageSize: 20,
            enableSorting: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            columnDefs: columnDefs,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enablePaginationControls: false,
            paginationCurrentPage: 1,
            //showFooter: true,

            //rowModelType: 'pagination'
        };

        //$scope.gridOptions.multiSelect = false;
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                //var msg = 'row selected ' + row.isSelected;
                $scope.vm = row.entity;
            });
        };

        function getData() {
            myService.get('api/correspondences/list', function (result) {
                $scope.list = result.data;
                $scope.gridOptions.data = $scope.list;
                //$interval(function () { $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]); }, 0, 1);
            });
        }

        $scope.delete = function (id) {
            myService.deleteRecord(id, 'csp', function () {
                $scope.init();
            });
        }


    }




})(angular.module('MyApp'));

(function (app) {
    'use strict';

    app.controller('correspMaintController', correspMaintController)

    correspMaintController.$inject = ['$scope', '$location', '$stateParams', 'myService', '$filter'];

    function correspMaintController($scope, $location, $stateParams, myService, $filter) {

        

        $scope.vm = {
            Id: $stateParams.id,
            FirstName: 'Umang',
            //strReceivedDt: '10/1/2016',
            //CaseComments:[],
            //CaseComments: [{ CommentDt: '10/8/2019', Comments: 'Test' }]
        };

        $scope.menuInfo.pageTitle = "Edit Correspondence " + $scope.vm.Id ;

        $scope.tempVm = {};
        

        $scope.deleteChild = function (id, type) {
            //alert(type);
            myService.deleteRecord(id, type, function () {
                $scope.$broadcast(type);
            });
        }


        $scope.initChild = function () {
            this.ObjectId = $scope.vm.Id;
            this.ObjectType = 'csp';
        }

        $scope.EntityObject = {ObjectType: 'csp'};

        
        $scope.valuationDatePickerIsOpen = false;
        $scope.opens = [];

        $scope.valuationDatePickerOpen = function ($event) {
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation(); // This is the magic
            }
            this.valuationDatePickerIsOpen = true;
        };

        $scope.vm.CasePrograms = [new $scope.initChild()];
        $scope.tempVm.AssigneesUser = [];

        function User(UserId, Name) {
            this.Id = UserId,
            this.Name = Name
        }

        //$scope.vm.Assignees = [{ ObjectId: $scope.vm.Id, ObjectType: 'csp' }];
        //console.log($scope.vm);

        myService.getById('api/correspondences/details', $scope, 'vm', function () {
            $scope.tempVm.AssigneesUser = [];
            if($scope.vm.CasePrograms.length === 0)
                $scope.vm.CasePrograms = [new $scope.initChild()];
            if ($scope.vm.Assignees) {
                angular.forEach($scope.vm.Assignees, function (value, key) {
                    $scope.tempVm.AssigneesUser.push(new User(value.UserId, value.User.Name));
                    //console.log(value);
                })
                
            }
            //console.log($scope.vm);
            //$scope.vm.Category = { Id: $scope.vm.CategoryId, Text: 'Complaint' };
            //$scope.vm.ReceivedDt = new Date(Date.parse($scope.vm.ReceivedDt));
        });

        //$scope.$watch('vm.ReceivedDt', function (newValue) {
        //    $scope.vm.ReceivedDt = $filter('date')(newValue, 'MM/dd/yyyy');
        //});
       

        $scope.$on("modelUpdated", function (evt, data) {
            myService.getById('api/correspondences/details', $scope, 'vm');
        });

        $scope.tabClick = function (tabname) {
            $scope.EntityObject = new $scope.initChild();
            $scope.childVm = $scope.EntityObject;
            $scope.$broadcast(tabname);
        };

        

        myService.getCode($scope, 'Categories', 'corresp_category');
        myService.getCode($scope, 'Sources', 'corresp_source');
        myService.getCode($scope, 'ReportingSources', 'report_source');
        myService.getCode($scope, 'Dispositions', 'disp_status');
        myService.getList('api/users/list', $scope, 'Users');

        myService.getListByPost('api/programs/list', $scope, 'Programs')

        

        $scope.addNewChoice = function () {
            $scope.vm.CasePrograms.push(new $scope.initChild());
        };

        $scope.removeChoice = function (index) {
            //var lastItem = $scope.choices.length - 1;
            $scope.vm.CasePrograms.splice(index, 1);
        };

       

        $scope.save = function () {
            
            var url = 'api/correspondences/maintain';
            $scope.vm.Assignees = [];
            angular.forEach($scope.tempVm.AssigneesUser, function (value, key) {
                $scope.vm.Assignees.push(new $scope.initChild());
                $scope.vm.Assignees[key].UserId = value.Id;

                //console.log(value);
            })

            console.log($scope.vm);

            myService.save(url, $scope, 'vm', function () {
                //$scope.EntityObject.ObjectId = $scope.vm.Id;
                //console.log($scope.vm);
            })
        }

       


    };

})(angular.module('MyApp'));


(function (app) {
    'use strict';

    app.controller('caseCommentsController', caseCommentsController)

    caseCommentsController.$inject = ['$scope', '$location', 'myService'];

    function caseCommentsController($scope, $location, myService) {

        $scope.$on("comments", function (evt, data) {
            myService.getListByPost('api/comments/list', $scope, 'list', $scope.EntityObject);
            //$scope.childVm = {};
            $scope.childVm = angular.copy($scope.EntityObject);
        });

        

        $scope.editChild = function (childVm) {
            $scope.childVm = JSON.parse(JSON.stringify(childVm));
        }

        $scope.addNew = function () {
            $scope.childVm = angular.copy($scope.EntityObject);
        }

        

        $scope.save = function () {
            myService.save('api/comments/maintain', $scope, 'childVm', function () {
                $scope.$emit("comments");
            });
            
        }


    };

})(angular.module('MyApp'));

(function (app) {
    'use strict';

    app.controller('caseIndividualsController', caseIndividualsController)

    caseIndividualsController.$inject = ['$scope', 'myService'];

    function caseIndividualsController($scope, myService) {

        

        $scope.$on("ind", function (evt, data) {
            myService.getListByPost('api/CaseIndividuals/list', $scope, 'list', $scope.EntityObject);
            $scope.isEditing = {};
            //$scope.childVm = {};
            //$scope.childVm.Comments = '';
        });



        $scope.editChild = function (childVm, flag) {
            $scope.isEditing = {}
            $scope.isEditing[flag] = true;
            $scope.childVm = JSON.parse(JSON.stringify(childVm));
        }

        $scope.addNew = function () {
            $scope.isEditing['ind'] = true;
            $scope.childVm = JSON.parse(JSON.stringify($scope.EntityObject));
        }



        $scope.save = function () {
            myService.save('api/CaseIndividuals/maintain', $scope, 'childVm', function () {
                $scope.$emit("ind");
            });

        }


    };

})(angular.module('MyApp'));

(function (app) {
    'use strict';

    app.controller('caseAllegationsController', caseAllegationsController)

    caseAllegationsController.$inject = ['$scope', 'myService'];

    function caseAllegationsController($scope, myService) {

        $scope.$on("alleg", function (evt, data) {
            
            myService.getListByPost('api/CaseAllegations/list', $scope, 'list', $scope.EntityObject);
            $scope.childVm = angular.copy($scope.EntityObject);
            //$scope.childVm = {};
            //$scope.childVm.Comments = '';
        });

        myService.getCode($scope, 'AllegationTypes', 'alleg_type');
        
        

        $scope.onAllegTypeSelected = function (selectedItem) {
            $scope.childVm.AllegationId = '';
            $scope.AllegationDetails = [{}];
            myService.getList('api/codedetails/list/alleg_detail?field1=' + selectedItem.Id,  $scope, 'AllegationDetails');
        }

        
        $scope.editChild = function (childVm) {
            console.log(childVm);
            $scope.childVm = JSON.parse(JSON.stringify(childVm));
        }



        $scope.save = function () {
            myService.save('api/CaseAllegations/maintain', $scope, 'childVm', function () {
                $scope.$emit("alleg");
            });

        }


    };

})(angular.module('MyApp'));

(function (app) {
    'use strict';

    app.controller('rrfController', rrfController)

    rrfController.$inject = ['$scope', '$location', 'myService'];

    function rrfController($scope, $location, myService) {

        $scope.$on("rrf", function (evt, data) {
            myService.getListByPost('api/correspondencerrf/list', $scope, 'list', $scope.EntityObject);
            $scope.childVm = { CorrespId: $scope.EntityObject.ObjectId};
            //$scope.childVm.Comments = '';
        });



        $scope.editChild = function (childVm) {
            $scope.childVm = JSON.parse(JSON.stringify(childVm));
        }



        $scope.save = function () {
            myService.save('api/correspondencerrf/maintain', $scope, 'childVm', function () {
                $scope.$emit("rrf");
            });

        }


    };

})(angular.module('MyApp'));