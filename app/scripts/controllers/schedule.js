'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleCtrl', function($scope, Ref, $firebaseArray, $timeout, $uibModal, $window, $location, Config) {
    $scope.sessions = $firebaseArray(Ref.child('sessions'));
    
    $scope.sessionTimes = [];
    Ref.child('sessions').orderByChild('time').on('value', function(snap) {
      var sessions = snap.val(), x;
      for (x in sessions) {
        var time = sessions[x].time;
        if ($scope.sessionTimes.indexOf(time) == -1) {
          $scope.sessionTimes.push(time);
        }
      }
    });
    
    $scope.openFormModal = function(session) {
      $scope.session = session;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalSessionForm.html',
        controller: 'SessionFormModalCtrl',
        resolve: {
          session: function() {
            return $scope.session;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'add') {
          $scope.add(results.session);
        } else if (results.action === 'edit') {
          $scope.edit(results.session);
        }
      });
    };

    $scope.openInfoModal = function(session) {
      $scope.session = session;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'modalSessionContent.html',
        controller: 'SessionModalCtrl',
        resolve: {
          session: function() {
            return $scope.session;
          }
        }
      });
      modalInstance.result.then(function(results) {
        if (results.action === 'delete') {
          $scope.delete(results.session);
        } else if (results.action === 'edit') {
          $scope.openFormModal(results.session);
        }
      });
    };
    
    $scope.getTime = function(time) {
      var sHour = time.substring(0, time.indexOf(':'));
      var sMinutes = time.substring(time.indexOf(':')+1, time.indexOf(':')+3);
      var event = parseDate(Config.eventDate);
      return new Date(event.getFullYear(), event.getMonth(), event.getDate(), sHour, sMinutes, 0);
    };
    
    $scope.getEndTime = function(time) {
      var sessionTime = $scope.getTime(time);
      var newTime = sessionTime.getTime();
      newTime += parseInt(Config.sessionLength);
      return new Date(newTime);
    };
    
    function parseDate(str) {
      var d = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      return (d) ? new Date(d[1], d[2]-1, d[3]) : new Date();
    }

    $scope.add = function(session) {
      $scope.sessions.$add(session);
    };

    $scope.edit = function(session) {
      $scope.sessions.$save(session);
    };
  
    $scope.delete = function(session) {
      $scope.sessions.$remove(session);
    };
    
    $scope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });

