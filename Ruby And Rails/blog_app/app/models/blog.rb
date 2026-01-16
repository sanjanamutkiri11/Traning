class Blog < ApplicationRecord
    validates :title, presence: true
    validates :body, length: { minimum: 10 }
  end
  