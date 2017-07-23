'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SpeakerModalCtrl
 * @description
 * # SpeakerModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SpeakerModalCtrl', function($scope, $uibModalInstance, speaker) {
    $scope.speaker = speaker;
    $scope.err = null;
    
    $scope.saveSpeaker = function(speaker) {
      if (speaker && speaker.$id) {
        if ($scope.imageData) {
          speaker.image = $scope.imageData;
        }
        $uibModalInstance.close({
          'action': 'edit',
          'speaker': speaker
        });
      } else if (speaker) {
        if ($scope.imageData) {
          speaker.image = $scope.imageData;
        }
        $uibModalInstance.close({
          'action': 'add',
          'speaker': speaker
        });
      } else {
        $scope.err = 'Please fill out the form or click Cancel to close.';
      }
    };
    
    $scope.handleImageAdd = function(evt) {
      var f = evt.target.files[0];
      var reader = new FileReader();
      reader.onload = (function(file) {
        return function(e) {
          var filePayload = e.target.result;
          $scope.imageData = filePayload;
        };
      })(f);
      reader.readAsDataURL(f);
    };
    
    $scope.$watch('speakerForm', function() {
      document.getElementById('image').addEventListener('change', $scope.handleImageAdd, false);
    }, true);
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });

