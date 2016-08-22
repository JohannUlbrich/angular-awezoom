/**
 * 
 */

(function(root, factory) {
    // AMD
    if (typeof define === 'function' && define.amd) {
        define([], factory);

    // Node
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // Browser globals
    } else {
        root.Awezoom = factory();
    }
}(this, function() {
    'use strict';

    var angularAwezoom = angular.module('angular-awezoom');

    angularAwezoom.directive('awezoom', [
        'awezoomService',
        function awezoom(awezoomService) {
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
        function() {
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

    return angularAwezoom;

}));
