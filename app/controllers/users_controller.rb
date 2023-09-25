class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    # rescue_from ActiveRecord::RecordInvalid, with: render_not_found_response


    # GET /me 
    def show
        render json: @current_user
    end

    # POST /signup
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    # Stretch - a user can destroy their account
    # def destroy
    #     user = User.find_by(:id params[id])
    # end

    private

    def render_not_found_response
        render json: { error: "Invalid Entry"}, status: :not_found
    end

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end
