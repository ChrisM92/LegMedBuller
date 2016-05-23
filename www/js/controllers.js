angular.module('starter.controllers', [])

  .controller('MainCtrl', function ($scope)
  {
    $scope.playButtonSound = function()
    {
      console.log("Played button sound");
      $scope.media = new Audio();
      $scope.media.src = "../../aud/interface/button-14.mp3";
      $scope.media.play();
    }
  })

  .controller('LanguageAgeCtrl', function ($scope, Chats)
  {
    console.log("LanguageAgeCtrl controller called");
    $scope.playButtonSound = function()
    {
      console.log("Played button sound");
      $scope.media = new Audio();
      $scope.media.src = "../../aud/interface/button-14.mp3";
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

  .controller('ChoiceGameCtrl', function ($scope, $http, $timeout, $window, $location, $stateParams)
  {
    console.log("ChoiceGameCtrl controller called");

    var id = $stateParams.id - 1;
    $scope.idNext = id + 2;
    console.log("id: ", id);
    var closed = false;
    $scope.showMenuButtons = false;

    $http.get('Tasks.json').then(function (res)
    {
      var taskCounter = 0;


      console.log("id: ", id);
      $scope.tasks = res.data;
      $scope.difficulty = $scope.tasks[id].difficulty;


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

      $timeout(loop, 2000);
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
        console.log("difficulty value: ", $scope.difficulty)
        if ($window.cordova)
        {
          var audsrc = "../../aud/interface/Correct.mp3";

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
          $scope.media.src = "../../aud/interface/Correct.mp3";
          $scope.media.play();
        }

        $scope.showMenuButtons = true;
      }
      else
      {
        console.log("wrong answer");
        if ($window.cordova)
        {
          var audsrc = "../../aud/interface/Error.mp3";

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
          $scope.media.src = "../../aud/interface/Error.mp3";
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
      $scope.media.src = "../../aud/interface/button-14.mp3";
      $scope.media.play();
    }

    $scope.$on('$destroy', function ()
    {
      console.log("TaskCtrl Destroyed");
    })
  });
