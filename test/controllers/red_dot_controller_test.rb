require 'test_helper'

class RedDotControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get red_dot_index_url
    assert_response :success
  end

end
