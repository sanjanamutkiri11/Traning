class CommentsController < ApplicationController
    before_action :set_blog
  
    def create
      @comment = @blog.comments.build(comment_params)
  
      if @comment.save
        redirect_to @blog, notice: "Comment added successfully"
      else
        render "blogs/show"
      end
    end
  
    private
  
    def set_blog
      @blog = Blog.find(params[:blog_id])
    end
  
    def comment_params
      params.require(:comment).permit(:content)
    end
  end
  