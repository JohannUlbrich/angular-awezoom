(function(window, angular, Awezoom) {
    'use strict';

    var angularAwezoom = angular.module('angular-awezoom', []);

    angularAwezoom.directive('awezoom', [
        'awezoomService',
        function awezoomDirective(awezoomService) {
            return {
                restrict: 'E',
                transclude: true,
                template: '<ng-transclude></ng-transclude>',
                controller: [
                    '$scope',
                    function AwezoomController() {}
                ],
                controllerAs: 'awezoomCtrl',
                bindToController: {
                    instanceId: '=',
                    settings: '='
                },
                scope: true,
                link: function(scope, element, attrs, ctrl) {

                    // Create awezoom instance
                    var myAwezoomInstance = new Awezoom(element[0], ctrl.settings);

                    // Add it to Service
                    awezoomService.addInstance(ctrl.instanceId, myAwezoomInstance);

                    // clean up
                    scope.$on('$destroy', function() {
                        awezoomService.removeInstance(myAwezoomInstance);
                    });
                }
            };
        }
    ]);

    angularAwezoom.factory('awezoomService', [
        function awezoomService() {
            var awezoomInstances = {};

            return {
                getInstance: function(instanceId) {
                    if (awezoomInstances[instanceId]) {
                        return awezoomInstances[instanceId];
                    }
                },

                addInstance: function(instanceId, instance) {
                    if (!awezoomInstances[instanceId]) {
                        awezoomInstances[instanceId] = instance;
                    }
                },

                removeInstance: function(instanceId) {
                    if (awezoomInstances[instanceId]) {
                        delete awezoomInstances[instanceId];
                    }
                }
            };
        }
    ]);
}(window, angular, Awezoom));
