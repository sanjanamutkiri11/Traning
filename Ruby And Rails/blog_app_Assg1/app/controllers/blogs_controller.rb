require "rails_helper"

RSpec.describe "Blogs API", type: :request do
  describe "GET /blogs" do
    before do
      create_list(:blog, 3, published: true)
      create_list(:blog, 2, published: false)
    end

    it "returns only published blogs" do
      get "/blogs"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json.length).to eq(3)
    end
  end
end
