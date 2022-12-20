class NewsController < ApplicationController
  NEWS = [{id: 1, title: "first article", body: "test", author: "Michel", publish_date: DateTime.now()},
    {id: 2, title: "second article", body: "test", author: "Lisa", publish_date: DateTime.now()}]
  def index
    render json: NEWS
  end

  def show
    render json: NEWS[params[:id].to_i - 1]
  end

  def create
    puts request.body.read
  end
end