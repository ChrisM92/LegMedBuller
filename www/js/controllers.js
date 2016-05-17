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

  .controller('LangTaskCtrl', function ($scope, $http, $timeout, $window, $location)
  {
    console.log("controller called");
    var taskCounter = 0;

    var id = $location.search().id - 1;
    console.log("id: ", id);

    $http.get('Tasks.json').then(function (res)
    {
      $scope.tasks = res.data;

      var loop = function ()
      {
        if (taskCounter < $scope.tasks[id].images.length)
        {
          if ($window.cordova)
          {
            var audsrc = $scope.tasks[id].audio[taskCounter];

            if (ionic.platform.is('android'))
            {
              audsrc = '/android_asset/www' + audsrc;
            }

            $scope.media.src = new $window.Media($scope.tasks[id].audio[taskCounter]);
            $scope.media.play();
          }
          else
          {
            $scope.media = new Audio();
            $scope.media.src = $scope.tasks[id].audio[taskCounter];
            $scope.media.play();
          }

          $scope.currentImage = $scope.tasks[id].images[taskCounter];
          $timeout(loop, $scope.tasks[id].milliseconds[taskCounter]);
          console.log("Delay: ", $scope.tasks[id].milliseconds[taskCounter])
          taskCounter++;
        }
        else
        {
          $scope.hideNow = true;
          $scope.image1 = $scope.tasks[id].images[0];
          $scope.image2 = $scope.tasks[id].images[1];
          $scope.image3 = $scope.tasks[id].images[2];
          $scope.media = new Audio();
          $scope.media.src = $scope.tasks[id].taskaudio;
          $scope.media.play();
        }
      };
      loop();
    });

    $scope.testTask = function (option)
    {
      if ($scope.tasks[id].taskanswer === option)
      {
        console.log("correct answer");
        if ($window.cordova)
        {
          var audsrc = "../../aud/Tada.mp3";

          if (ionic.platform.is('android'))
          {
            audsrc = '/android_asset/www' + audsrc;
          }

          $scope.media.src = new $window.Media(audsrc);
          $scope.media.play();
        }
        else
        {

          $scope.media = new Audio();
          $scope.media.src = "../../aud/Tada.mp3";
          $scope.media.play();
        }
      }
      else
      {
        console.log("wrong answer");
        $scope.media = new Audio();
        $scope.media.src = "../../aud/Wrong.mp3";
        $scope.media.play();
      }
    }

  })

  .controller('SprogCtrl', function ($scope)
  {

  })

  .controller('TaskCtrl', function ($scope)
  {

  });
