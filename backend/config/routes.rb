Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/news", to: "news#index"
  get "/news/:id", to: "news#show"
  post "/news", to: "news#create"
end
