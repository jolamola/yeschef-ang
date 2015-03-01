module Api
  class RecipesController < ApplicationController

    def index
      recipes = Recipe.all.order('updated_at desc')
      render json: recipes
      # (only: [:name, :expiration, :id, :created_at, :food_type])
    end

    def show
      recipe = Recipe.find(params[:id])
      render json: recipe
      # (only: [:name, :expiration, :id, :created_at, :food_type, :photo_url])
    end

    def create
      recipe = Recipe.new(params.require(:recipe).permit!)

      if recipe.save
        render json: recipe
        # (only: [:name, :expiration, :id, :created_at, :recipe_type])
      else
        render json: {errors: recipe.errors}, status: 422
      end
    end

    def update
      recipe = Recipe.find(params[:id])
      if recipe.update(params.require(:recipe).permit!)
        render json: recipe
      else
        render json: {errors: recipe.errors}, status: 422
      end
    end





  end
end
