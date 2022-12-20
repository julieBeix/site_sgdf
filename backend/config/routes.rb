Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/articles", to: "news#index"
  get "/article/:id", to: "news#show"
  post "/article", to: "news#create"
end
