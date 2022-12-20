class NewsController < ApplicationController
  NEWS = [{id: 1, title: "first article", boby: "test", author: "Michel", publish_date: DateTime.now()},
    {id: 2, title: "second article", boby: "test", author: "Lisa", publish_date: DateTime.now()}]
  def index
    render json: NEWS
  end

  def show
    render json: NEWS[params[:id].to_i - 1]
  end
end