'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SpeakersCtrl
 * @description
 * # SpeakersCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SpeakersCtrl', function($scope, Ref, $firebaseArray, $timeout, $uibModal, $window, $location, Config) {
    $scope.site = Config;
    $scope.loading = true;
    $scope.speakers = $firebaseArray(Ref.child('speakers'));
    
    $scope.speakers.$loaded().then(function() {
      $scope.loading = false;
    });

    $scope.openFormModal = function(speaker) {
      $scope.speaker = speaker;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalSpeakerForm.html',
        controller: 'SpeakerModalCtrl',
        resolve: {
          speaker: function() {
            return $scope.speaker;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'add') {
          $scope.add(results.speaker);
        } else if (results.action === 'edit') {
          $scope.edit(results.speaker);
        }
      });
    };

    $scope.openInfoModal = function(speaker) {
      $scope.speaker = speaker;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalInfoContent.html',
        controller: 'InfoModalCtrl',
        resolve: {
          speaker: function() {
            return $scope.speaker;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'delete') {
          $scope.delete(results.speaker);
        } else if (results.action === 'edit') {
          $scope.openFormModal(results.speaker);
        }
      });
    };

    $scope.add = function(speaker) {
      $scope.speakers.$add(speaker);
    };

    $scope.edit = function(speaker) {
      $scope.speakers.$save(speaker);
    };
  
    $scope.delete = function(speaker) {
      $scope.speakers.$remove(speaker);
    };
    
    $scope.goto = function(link, c, a, l, v) {
      $scope.gaClick(c, a, l, v);
      $window.open(link);
    };

    $scope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
    
    $scope.gaClick = function(category, action, label, value) {
      $window.ga('send', 'event', category, action, label, value);
    };
  });
