class ArticlesController < ApplicationController
  def index
    render json: Article.all
  end

  def show
    render json: Article.find(params[:id].to_i)
  end

  def create
    parsed_body = JSON.parse(request.body.read)
    Article.create(title: parsed_body['title'], body: parsed_body['body'], author: parsed_body['author'])
  end

  def delete
    parsed_body = JSON.parse(request.body.read)
    puts parsed_body
    Article.destroy(parsed_body)
  end
end