'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SponsorModalCtrl
 * @description
 * # SponsorModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SponsorModalCtrl', function($scope, $uibModalInstance, sponsor) {
    $scope.sponsor = sponsor;
    $scope.err = null;
    
    $scope.saveSponsor = function(sponsor) {
      if (sponsor && sponsor.$id) {
        if ($scope.imageData) {
          sponsor.image = $scope.imageData;
        }
        $uibModalInstance.close({
          'action': 'edit',
          'sponsor': sponsor
        });
      } else if (sponsor) {
        if ($scope.imageData) {
          sponsor.image = $scope.imageData;
        }
        $uibModalInstance.close({
          'action': 'add',
          'sponsor': sponsor
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
    
    $scope.$watch('sponsorForm', function() {
      document.getElementById('image').addEventListener('change', $scope.handleImageAdd, false);
    }, true);
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
