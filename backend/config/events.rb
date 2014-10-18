WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  subscribe :client_connected, :to => ListenersController, :with_method => :user_connected
  subscribe :client_disconnected, :to => ListenersController, :with_method => :user_disconnected
  subscribe :post_location, :to => ListenersController, :with_method => :post_location

  subscribe :authenticate, :to => ListenersController, :with_method => :user_authenticate
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.
end
