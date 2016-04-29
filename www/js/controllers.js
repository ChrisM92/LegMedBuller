angular.module('starter.controllers', [])

  .controller('DashCtrl', function () {})

  .controller('LanguageCtrl', function ($scope, Chats)
  {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat)
    {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats)
  {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope)
  {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('SprogPopulatorCtrl', function ($scope, $http, $interval)
  {
    var stop;
    $scope.taskCounter = 0;
    $http.get('Tasks.json')
      .then(function (res)
      {
        $scope.tasks = res.data;
        console.log(res.data);

        stop = $interval(function ()
        {
          if ($scope.taskCounter < 3)
          {
            $scope.currentImage = $scope.tasks.tasks[$scope.taskCounter].image1;
            $scope.taskCounter++;
            console.log("new image");
          } else
          {
            $interval.cancel(stop);

            console.log("done");
          }
        }, 5000);
      });

  })

  .controller('SprogCtrl', function ($scope)
  {

  })

  .controller('TaskCtrl', function ($scope)
  {

  });
