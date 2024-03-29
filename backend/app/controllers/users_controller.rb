class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  # before_action except: %i[show create update] do
  #   authorize_request('admin')
  # end

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def verify
    parsed_body = JSON.parse(request.body.read)
    user = User.find_by(email: parsed_body['email'])
    puts(parsed_body)
    puts(user)
    if !user || user.pwd != parsed_body['pwd']
      render json: {status: 'unauthorized'}, status: :unauthorized
      return
    end
    token = JsonWebToken.encode(user_id: user.id, role: user.role)
    time = Time.now + 24.hours.to_i
    render json: {token: token, exp: time.strftime("%m-%d-%Y %H:%M"), account_id: user.id, first_name: user.first_name, last_name: user.last_name, status: 'accepted'}, status: :accepted
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      JSON.parse(request.body.read)
    end
end
