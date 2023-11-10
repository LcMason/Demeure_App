require 'stripe'
# rescue_from ActiveRecord::RecordInvalid, with: render_not_found_response

class ClientSecretController < ApplicationController
    
    def create
        begin
        # Nicholas - where does PaymentItent come from? Where did we get this code from? ln 10. Where does client_secret come from? ln 16.
        # Nicholas - added error handling
            print "current_user"
            # Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
            Stripe.api_key = "sk_test_51IlDPTH1TNv3FkZt5Q0nUHE9HqwimJtFxF6CZENKga9jERWW0E26TT366y9F3nODHLPXqWtp2U9qa7UcKpXHdnsw00BiMfawda"
            intent = Stripe::PaymentIntent.create({
                :amount => 2000,
                :currency => 'usd',
                :payment_method_types => ['card']
            })
            render json: {client_secret: intent.client_secret}
        rescue Stripe::CardError => e
        # Handle card errors
            render json: {error: e.message, code: e.code}, status: :unprocessable_entity
        rescue Stripe::StripeError => e
        # Handle other Stripe errors
            render json: {error: e.message}, status: :unprocessable_entity
        rescue => e
        # Handle other unexpected errors
            render json: {error: "An unexpected error occurred."}, status: :internal_server_error
        end
    end
end
