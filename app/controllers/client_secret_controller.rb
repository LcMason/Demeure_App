require 'stripe'
# rescue_from ActiveRecord::RecordInvalid, with: render_not_found_response

class ClientSecretController < ApplicationController
    
    def create
        # Nicholas - where does PaymentItent come from? ln 10. Where does client_secret come from? ln 15
        print "current_user"
        Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
        intent = Stripe::PaymentIntent.create({
            :amount => 2000,
            :currency => 'usd',
            :payment_method_types => ['card']
        })
        render json: {client_secret: intent.client_secret}
        # rescue_from ActiveRecord::RecordInvalid, with: render_not_found_response
    end

            # render json: { :message "oops" }. status: :not_acceptable 


            # private
            # def wrong_card_info
            #     render json: { error: "Invalid Entry"}, status: :14
            # end

            # render json: { errors: ["Invalid username or password"] }, status: :unprocessable_entity
end
