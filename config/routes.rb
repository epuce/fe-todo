Rails.application.routes.draw do
  get 'red-dot', to: 'red_dot#index'
  get 'post', to: 'posts#index'

  root 'home#index'
  get '*unmatched_route', to: 'main#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
