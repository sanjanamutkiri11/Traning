Rails.application.routes.draw do
  root "blogs#index"
  devise_for :users

  resources :users, only: [:index, :show, :edit, :update]
  resources :blogs do
    resources :comments, only: [:create, :destroy]
  end
end
