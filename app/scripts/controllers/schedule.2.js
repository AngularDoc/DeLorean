'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SessionModalCtrl
 * @description
 * # SessionModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SessionModalCtrl', function($scope, Ref, $firebaseArray, $uibModalInstance, $confirm, $window, Config, session) {
    $scope.speakers = $firebaseArray(Ref.child('speakers'));
    $scope.session = session;
    var postText = 'Check out this talk "' + session.title + '" only at #' + Config.eventName.replace(/ /g, '');
    var today = new Date();
    
    function parseDate(str) {
      var d = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
      return (d) ? new Date(d[1], d[2]-1, d[3]) : new Date();
    }

    var event = parseDate(Config.eventDate);
    var eventDate = new Date(event.getFullYear(), event.getMonth(), event.getDate(), 0, 0, 0);
    var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    $scope.event = eventDate.getTime();
    $scope.today = todayDate.getTime();
  
    $scope.showSurvey = $scope.today == $scope.event;
    
    $scope.shareTwitter = function(session) {
      $window.open('//twitter.com/share?text=' + encodeURIComponent(postText) + '&url=' + Config.eventURL, '_blank');
    };
    
    $scope.openSurvey = function(session) {
      $window.open(session.surveyLink, '_blank');
    };
    
    $scope.openVideo = function(session) {
      $window.open(session.videoLink, '_blank');
    };
    
    $scope.openSlides = function(session) {
      $window.open(session.slidesLink, '_blank');
    };

    $scope.editSession = function(session) {
      $uibModalInstance.close({
        'action': 'edit',
        'session': session
      });
    };

    $scope.deleteSession = function(session) {
      $confirm({text: 'Are you sure you want to delete "' + session.title + '"? (this cannot be undone)'})
        .then(function() {
          $uibModalInstance.close({
            'action': 'delete',
            'session': session
          });
        });
    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });

