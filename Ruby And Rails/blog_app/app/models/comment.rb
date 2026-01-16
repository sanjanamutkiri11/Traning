class Comment < ApplicationRecord
  belongs_to :blog

  validate :blog_must_be_published

  def blog_must_be_published
    errors.add(:blog, "must be published") unless blog&.published?
  end
end
