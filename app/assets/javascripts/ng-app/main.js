angular
.module("yeschefApp", ["ngResource", "ui.router", "templates",'ui.bootstrap','ngAnimate'])

.config(function($httpProvider,	$stateProvider) {
	$httpProvider.defaults.headers.common['X-CSRF-Token'] =
	$('meta[name=csrf-token]').attr('content');

	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "home.html",
		controller: "recipesController"
	})
	.state("allrecipes", {
		url: "/allrecipes",
		templateUrl: "recipes.html",
		controller: "recipesController"
	})
	.state("new", {
		url: "/new",
		templateUrl: "newRecipe.html",
		controller: "newRecipeCtrl"
	})
	.state("editrecipe", {
		url: "/recipe/:id/edit",
		templateUrl: "edit.html",
		controller: "editRecipeCtrl"
	})
	.state("showrecipe", {
		url: "/recipe/:id",
		templateUrl: "show.html",
		controller: "showRecipeController"
	});

})

.controller("recipesController", function($scope, $http, $resource, $modal, $log) {
	var Recipe = $resource('api/recipes/:id', {id:'@id'});
	Recipe.query(function(data){
		$scope.recipes = data
	});	

		// Modal
	// $scope.open = function () {
	// 	var instance = $modal.open({
	// 		templateUrl: 'newRecipe.html',
	// 		controller: 'newRecipeCtrl'
	// 	});

	// };
})
.controller("newRecipeCtrl", function($scope, $http, $state, $resource){
	var Recipe = $resource('api/recipes/:id', {id:'@id'})
	$scope.createRecipe = function(recipe) {
		// $scope.uploader = new FileUploader()
		// $scope.uploader.addToQueue()
		recipe = new Recipe(recipe).$save();
		recipe.name="";
		recipe.size="";
		recipe.ingredient="";
		recipe.direction="";
		$state.go('allrecipes')
	};
})
.controller("showRecipeController", function($scope, $http, $resource, $stateParams, $state) {
	var Recipe = $resource('api/recipes/:id', {id:'@id'});
	$scope.recipe = Recipe.get({id: $stateParams.id})

	$scope.deleteRecipe = function(recipe) {
		$scope.recipe = Recipe.get({id: recipe.id}, function(recipe){
			recipe.$delete();
			$state.go('allrecipes')
		});
	}

})

.controller("editRecipeCtrl", function($scope, $http, $resource, $stateParams, $state) {
	var Recipe = $resource('api/recipes/:id', {id:'@id'}, 
	{ 
		'update': { method: 'patch' }
	});

	$scope.recipe = Recipe.get({id: $stateParams.id}, function(recipe){
		recipe.$update();
	});

	$scope.editRecipe = function(recipe) {
		recipe.$update();
		$state.go('showrecipe',{id:$stateParams.id})
	};
})

.controller("deleteRecipe", function($scope, $http, $resource, $stateParams, $state){
	$scope.deleteRecipe = function(recipe, index) {

		console.log(recipe)
		$scope.recipe = Recipe.get({id: recipe.id}, function(recipe){
			recipe.$delete();
			$state.go('allrecipes')
		});

	}
});


  // $scope.destroyPost = function(post, index) {
  //   $scope.post = Post.get({id: post.id}, function(post) {
  //     post.$delete();
  //     $scope.posts.splice(index, 1);
  //   });
  // }

		// var self = this;
		// self.num = 4;

		// self.inc_num = function(val) {
		// 	self.num = self.num + val;
		// 	self.showBox = !self.showBox;
		// 	// $state.go("aboutme");
		// 	console.log($state);
		// };
		// self.showBox = false;

	// $scope.createRecipe = function() {
	// 	new Recipe({
	// 		$scope.newRecipe
	// 		// name: $scope.newRecipe.name,
	// 		// size: $scope.newRecipe.size,
	// 		// ingredient: $scope.newRecipe.ingredient,
	// 		// direction: $scope.newRecipe.direction
	// 	}).$save();
	// 	// .$save(function(data) {
	// 	// 	$scope.recipes.unshift(data);
	// 	// 	$scope.newRecipe = null
	// 	// });
	// };




		// $scope.saveRecipe = function(recipe) {
		// 	recipe.$update();
		// }

		// $scope.destroyRecipe = function(recipe, index) {
		// 	$scope.recipe = Recipe.get({id: recipe.id}, function(recipe) {
		// 		recipe.$delete();
		// 		$scope.posts.splice(index,1);
		// 	});
		// };
