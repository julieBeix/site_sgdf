Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/articles", to: "articles#index"
  get "/articles/:id", to: "articles#show"
  post "/articles", to: "articles#create"
  delete "/articles/:id", to: "articles#delete"
  put "/articles/:id", to: "articles#modify"

  post "/connection", to: "account_creds#verify"
end
