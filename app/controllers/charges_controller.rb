require 'stripe'

class Api::V1::ChargesController < ApplicationController

    create
    Stripe.api_key = 'sk_test_51IlDPTH1TNv3FkZt5Q0nUHE9HqwimJtFxF6CZENKga9jERWW0E26TT366y9F3nODHLPXqWtp2U9qa7UcKpXHdnsw00BiMfawda'

    begin

            customer = Stripe::Customer.create(
                :email => current_user.email,
                :soure => params[:charge][:token]
            )

            charge = Stripe::Charge.create({
                :customer => customer.id,
                :amount => params[:charge][:amount]
                :description => params[:charge][:description]
                :currency => params[:charge][:currency],
            },{
                :idempotency_key => ip_key
            })

        rescue Stripe::CardError => e
            render json: { :message "oops" }. status: :not_acceptable
        end
    end
end
