angular.module('starter.controllers', [])

  .controller('MainCtrl', function ($scope)
  {
    $scope.playButtonSound = function()
    {
      console.log("Played button sound");
      $scope.media = new Audio();
      $scope.media.src = "../../aud/button-14.mp3";
      $scope.media.play();
    }
  })

  .controller('LanguageCtrl', function ($scope, Chats)
  {
    console.log("LanguageCtrl controller called");
    $scope.playButtonSound = function()
    {
      console.log("Played button sound");
      $scope.media = new Audio();
      $scope.media.src = "../../aud/button-14.mp3";
      $scope.media.play();
    }
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

  .controller('LangTaskCtrl', function ($scope, $http, $timeout, $window, $location, $stateParams)
  {
    console.log("LangTaskCtrl controller called");

    var id = $stateParams.id - 1;
    console.log("id: ", id);
    var closed = false;

    $http.get('Tasks.json').then(function (res)
    {
      var taskCounter = 0;

      console.log("id: ", id);
      $scope.tasks = res.data;


      var loop = function ()
      {
        if(closed)
        {
          return;
        }
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

    $scope.$on('$destroy', function ()
    {
      console.log("LangTaskCtrl controller Destroyed!");
      closed = true;
      $scope.media.pause();
    })

    $scope.testTask = function (option)
    {
      var id = $stateParams.id - 1;

      if ($scope.tasks[id].taskanswer === option)
      {
        console.log("correct answer");
        if ($window.cordova)
        {
          var audsrc = "../../aud/Correct.mp3";

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
          $scope.media.src = "../../aud/Correct.mp3";
          $scope.media.play();
        }
      }
      else
      {
        console.log("wrong answer");
        if ($window.cordova)
        {
          var audsrc = "../../aud/Error.mp3";

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
          $scope.media.src = "../../aud/Error.mp3";
          $scope.media.play();
        }
      }
    }

  })

  //.controller('LangaugeCtrl', function ($scope)
  //{
    //console.log("LanguageCtrl controller called");
    //$scope.playButtonSound = function()
  //  {
  //    console.log("Played button sound");
  //    $scope.media = new Audio();
  //    $scope.media.src = "../../aud/button-14.mp3";
  //    $scope.media.play();
  //  }
  //})

  .controller('TaskCtrl', function ($scope)
  {
    console.log("TaskCtrl controller called");

    $scope.playButtonSound = function()
    {
      console.log("Played button sound");
      $scope.media = new Audio();
      $scope.media.src = "../../aud/button-14.mp3";
      $scope.media.play();
    }

    $scope.$on('$destroy', function ()
    {
      console.log("Spyt ud");
    })
  });
