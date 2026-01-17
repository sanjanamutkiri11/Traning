class CommentsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :blog
  load_and_authorize_resource :comment, through: :blog

  def create
    @comment.user = current_user
    if @comment.save
      redirect_to @blog, notice: "Comment added"
    else
      redirect_to @blog, alert: "Failed to add comment"
    end
  end

  def destroy
    @comment.destroy
    redirect_to @blog, notice: "Comment deleted"
  end
end
