require "test_helper"

class AccountCredsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account_cred = account_creds(:one)
  end

  test "should get index" do
    get account_creds_url, as: :json
    assert_response :success
  end

  test "should create account_cred" do
    assert_difference("AccountCred.count") do
      post account_creds_url, params: { account_cred: { email: @account_cred.email, password: @account_cred.password } }, as: :json
    end

    assert_response :created
  end

  test "should show account_cred" do
    get account_cred_url(@account_cred), as: :json
    assert_response :success
  end

  test "should update account_cred" do
    patch account_cred_url(@account_cred), params: { account_cred: { email: @account_cred.email, password: @account_cred.password } }, as: :json
    assert_response :success
  end

  test "should destroy account_cred" do
    assert_difference("AccountCred.count", -1) do
      delete account_cred_url(@account_cred), as: :json
    end

    assert_response :no_content
  end
end
