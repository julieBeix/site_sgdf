Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/articles", to: "articles#index"
  get "/article/:id", to: "articles#show"
  post "/article", to: "articles#create"
  delete "admin/article/", to: "articles#delete"
  put "admin/article/:id", to: "articles#modify"
end
