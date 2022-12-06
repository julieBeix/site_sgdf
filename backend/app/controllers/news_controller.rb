class NewsController < ApplicationController
  NEWS = [{id: 1, title: "first article", boby: "test"}, {id: 2, title: "second article", boby: "test"}]
  def index
    render json: NEWS
  end

  def show
    render json: NEWS[params[:id].to_i - 1]
  end
end