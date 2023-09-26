class ItemsController < ApplicationController
    skip_before_action :authorize, only: :index
    before_action :find_item, only: :show

    def index
            render json: Item.all, status: :ok
    end

    # TODO : if we GET one item, we should also see that item's reviews
    def show
        render json: @item, serializer: :ReviewSerializer 
    end

    private 
    def find_item
        @item = Item.find_by(id: params[:id])
    end
end
