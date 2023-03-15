class ArticlesController < ApplicationController
  before_action :set_article, only: %i[ show modify destroy ]
  before_action except: %i[show index create] do
    authorize_request('admin')
  end

  def index
    render json: Article.all
  end

  def show
    render json: @article
  end

  def create
    parsed_body = JSON.parse(request.body.read)
    Article.create(title: parsed_body['title'], body: parsed_body['body'], author: parsed_body['author'])
  end

  def delete
    @article.destroy
  end

  def modify
    parsed_body = JSON.parse(request.body.read)
    @article.update(title: parsed_body['title'], body: parsed_body['body'], author: parsed_body['author'])
  end

  private
  def set_article
    @article = Article.find(params[:id].to_i)
  end
end