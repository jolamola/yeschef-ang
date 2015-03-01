Rails.application.routes.draw do
  # get "/login" => "sessions#new", as: :login
  # post "/login" => "sessions#create"
  # delete "/login" => "sessions#destroy", as: :logout

  root to: 'application#index'

  # resources :users
  # resources :recipes

  namespace :api do
    resources :recipes
  end
end
