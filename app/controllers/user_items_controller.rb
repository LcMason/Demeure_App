class UserItemsController < ApplicationController
 before_action :authorize, only: :cart
    # Full CRUD Controller
    def cart
        cartItem = UserItem.find{|userItem| userItem.item_id === params[:item_id] && userItem.user_id === params[:user_id]}
        if(cartItem)
            if(params[:step] == "add")
                cartItem.update(quantity: cartItem.quantity += 1)
            elsif(params[:step] == "subtract")
                cartItem.update(quantity: cartItem.quantity -= 1)
            end
            render json: cartItem
        else
            # @user_item = UserItem.create(user_item_params)
            @user_item = UserItem.create!(user_item_params)
            render json: @user_item
        end
    end

    def show
        # @user_item = UserItem.find(params[:id]) 
        @user_item = UserItem.find_by(id: params[:id]) 
        render json: @user_item
    end

    # TODO : current_user.items to show ?
    # def index
    #     byebug
    #     @user_items = @current_user.user_items
    #     render json: @user_items 
        def index    
            render json: @current_user.user_items
    end

    def destroy
        # @user_item = UserItem.find(params[:id]) 
        @user_item = UserItem.find_by(id: params[:id])
        @user_item.destroy
    end

    private
    def user_item_params
        params.permit(:user_id, :item_id, :quantity).merge(quantity: 1)
    end


end
