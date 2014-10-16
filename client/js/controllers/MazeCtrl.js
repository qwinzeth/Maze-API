var mazeApp = angular.module('mazeApp', []);

mazeApp.controller('MazeCtrl', function ($scope) {
  $scope.mazeWalls = [
    {'id': 0,
     'x1': 50,
     'x2': 100,
     'y1': 100,
     'y2': 125,
     'color': '#0000FF'}
  ];
});
