'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:InfoModalCtrl
 * @description
 * # InfoModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('InfoModalCtrl', function($scope, $uibModalInstance, $window, $confirm, speaker) {
    $scope.speaker = speaker;

    $scope.editSpeaker = function(speaker) {
      $uibModalInstance.close({
        'action': 'edit',
        'speaker': speaker
      });
    };

    $scope.deleteSpeaker = function(speaker) {
      $confirm({text: 'Are you sure you want to delete ' + speaker.name + '? (this cannot be undone)'})
        .then(function() {
          $uibModalInstance.close({
            'action': 'delete',
            'speaker': speaker
          });
        });
    };
    
    $scope.socialLink = function(network, profile) {
      var link = '';
      
      switch(network) {
        case 'google_plus':
          link = 'https://plus.google.com/' + profile;
          break;
        case 'facebook':
          link = 'https://www.facebook.com/' + profile;
          break;
        case 'twitter':
          link = 'https://twitter.com/' + profile;
          break;
        case 'github':
          link = 'https://github.com/' + profile;
          break;
        case 'linkedin':
          link = 'https://www.linkedin.com/in/' + profile;
          break;
      }
      
      $window.open(link, '_blank');
      return false;
    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });