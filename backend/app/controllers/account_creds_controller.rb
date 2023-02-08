class AccountCredsController < ApplicationController
  before_action :set_account_cred, only: %i[ show update destroy ]

  # GET /account_creds
  def index
    @account_creds = AccountCred.all

    render json: @account_creds
  end

  # GET /account_creds/1
  def show
    render json: @account_cred
  end

  # POST /account_creds
  def create
    @account_cred = AccountCred.new(account_cred_params)

    if @account_cred.save
      render json: @account_cred, status: :created, location: @account_cred
    else
      render json: @account_cred.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /account_creds/1
  def update
    if @account_cred.update(account_cred_params)
      render json: @account_cred
    else
      render json: @account_cred.errors, status: :unprocessable_entity
    end
  end

  # DELETE /account_creds/1
  def destroy
    @account_cred.destroy
  end

  def verify
    parsed_body = JSON.parse(request.body.read)
    account_cred = AccountCred.find_by(email: parsed_body['email'])

    if !account_cred
      render json: {status: 'not_found'}, status: :not_found
      return
    end
    if account_cred.password != parsed_body['password']
      render json: {status: 'unauthorized'}, status: :unauthorized
      return
    end
    render json: {account_id: account_cred.id, status: 'accepted'}, status: :accepted
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account_cred
      @account_cred = AccountCred.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def account_cred_params
      params.require(:account_cred).permit(:email, :password)
    end
end
