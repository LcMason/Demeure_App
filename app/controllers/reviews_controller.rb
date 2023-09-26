class ReviewsController < ApplicationController
skip_before_action :authorize, only: :index
# rescue_from ActiveRecord::RecordInvalid, with: render_not_found_response

# TODO : may delete index action here due to reviews being in our items_serializer. Reviews only need to be associated with the item.
# it's uneccessary to load up the reviews on its own.
def index
    if params[item.id]
        item = Item.find(params[:item_id])
        reviews = item.reviews
    else
        reviews = Review.all
    end
    render json: reviews, include: :items
end

# TODO : may want to add a show route to search a specific item and see all associated reviews.
# how to get all reviews associated with items?

    def create
        @review = Review.create!(review_params)
        render json: @review, status: :created
    rescue ActiveRecord::RecordInvalid # => invalid
        render_not_found_response
        # render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end

     def destroy
        @review = Review.find_by(id: params[:id])
        if @review.user_id == current_user.id 
        @review.destroy
        head :no_content
        else
            render json: {message: "Cannot Delete"}
        end
    end

    private

    # def render_not_found_response
    #     render json: { error: "Invalid Entry"}, status: :unprocessable_entity
    # end

    def review_params
        params.permit(:title, :review, :user_id, :item_id)
    end
end
