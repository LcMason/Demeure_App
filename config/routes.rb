Rails.application.routes.draw do
  
  resources :reviews
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/charges", to: "charges#create"
  get "/me", to: "users#show"
  post "/cart", to: "user_items#cart"
  post "/checkout", to: "user_items#post"

  # get "/items/:items_id/reviews", to: "reviews#index"
  get "items/:items_id/reviews/:id", to: "reviews#show"

  # resources :users, only: :index do
  #   resources :user_items
  # end
  resources :users, only: :show do
    resources :user_items
  end

  resources :users, only: :index do
    resources :reviews
  end

  resources :items, only: [:index, :show] do
    resources :reviews, only: [:show, :create, :destroy]
  end

# TODO 1 : Review nested resources in routes.rb file. 
# Goal : once itemDetail is clicked I want item/id to show the reviews for that particular item.

  # resources :user_items, only: [:index, :show, :create, :destroy, :update]
  resources :user_items, only: [:show, :index, :destroy]
  resources :users, except: [:update, :destroy]
  resources :items, only: [:index, :show]
  # TODO : may want to add a show route for reviews to search a partical item and have it's review associated.
  resources :reviews, except: [:show, :update]
  # resources :reviews, only: [:show, :index, :create :destroy]

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
