'use strict';

angular.module('textbookApp')
  .controller('ClassroomCtrl', function ($scope, $stateParams, User, Classroom, Student, Conversation, Contact) {
    User.get().$promise.then(function(user) {
    	$scope.user = user;
      	setcurrentClassroom($stateParams.className);
    });

   $scope.toggleClassrooms = function(name) {
    	$scope.user.classrooms.forEach(function(classroom) {
    		if(classroom.name === name) {
    			setcurrentClassroom(classroom._id);
    		}
    	});
    };

    $scope.toggleContacts = function(argId) {
			Student.get({id: argId}, function(student) {
				$scope.contacts = student.contacts;
				$scope.id = argId;
			});

    };

    $scope.activeContact;
    $scope.setActive = function(contact){
      $scope.activeContact = contact;
      console.log ($scope.activeContact);
    }

    $scope.msgToSend;
    $scope.sendMsg = function(message){
      console.log("Send Msg");
      console.log(message);
      console.log($scope.activeContact);
      Conversation.getConversation({userId: $scope.user._id, contactId: $scope.activeContact._id})
        .$promise
        .then(function(conversation){
          console.log(conversation.data);
          Conversation.sendMsg({_id: conversation.data[0]._id, message: message, to: $scope.activeContact.phone, from: $scope.user.phone})
        });

      $scope.msgToSend = "";
      // console.log($scope.user);
    };

    $scope.deleteClassroom = function(classroomId) {
      Classroom.delete({id: classroomId});
      $scope.user.classrooms.forEach(function(classroom, i) {
        if(classroom._id === classroomId) {
          $scope.user.classrooms.splice(i, 1);
          User.update({id: $scope.user._id}, $scope.user);
          $scope.$emit('delete classroom', classroom);
        }
      })
    };


    var setcurrentClassroom = function(id) {
		Classroom.get({id: id}, function(classroom) {
    			$scope.currentClass = classroom;
    	});
	}
  });
