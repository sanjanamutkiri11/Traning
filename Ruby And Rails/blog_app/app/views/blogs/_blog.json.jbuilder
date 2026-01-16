json.extract! blog, :id, :title, :body, :user_id, :published, :created_at, :updated_at
json.url blog_url(blog, format: :json)
