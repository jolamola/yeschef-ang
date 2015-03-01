angular
.module("yeschefApp", ["ngResource", "ui.router", "templates"])

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

.controller("newRecipeCtrl", function($scope, $http, $resource){
	var Recipe = $resource('api/recipes/:id', {id:'@id'})
	$scope.createRecipe = function(recipe) {
		new Recipe(recipe).$save();
		recipe.name="";
		recipe.size="";
		recipe.ingredient="";
		recipe.direction="";
	}
})

.controller("recipesController", function($scope, $http, $resource) {
	var Recipe = $resource('api/recipes/:id', {id:'@id'});
	Recipe.query(function(data){
		$scope.recipes = data
	});
})

.controller("showRecipeController", function($scope, $http, $resource, $stateParams) {
	var Recipe = $resource('api/recipes/:id', {id:'@id'});
	$scope.recipe = Recipe.get({id: $stateParams.id})
})

.controller("editRecipeCtrl", function($scope, $http, $resource, $stateParams, $state) {
	var Recipe = $resource('api/recipes/:id', {id:'@id'}, 
	  { 
		'update': { method: 'patch' }
	  });
	$scope.recipe = Recipe.get({id:$stateParams.id}, function(recipe){
		recipe.$update();
	});
	$scope.editRecipe = function(recipe) {
		recipe.$update(function(){
			$state.go('showrecipe',{id:$stateParams.id})
		});
	}
});

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
