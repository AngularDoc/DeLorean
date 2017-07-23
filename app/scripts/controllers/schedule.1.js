'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SessionFormModalCtrl
 * @description
 * # SessionFormModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SessionFormModalCtrl', function($scope, Ref, $firebaseArray, $uibModalInstance, session) {
    $scope.speakers = $firebaseArray(Ref.child('speakers'));
    $scope.session = session;
    $scope.err = null;
    
    $scope.saveSession = function(session) {
      if (session && session.$id) {
        $uibModalInstance.close({
          'action': 'edit',
          'session': session
        });
      } else if (session) {
        $uibModalInstance.close({
          'action': 'add',
          'session': session
        });
      } else {
        $scope.err = 'Please fill out the form or click Cancel to close.';
      }
    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });

