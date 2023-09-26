class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :review #:item_id, :user_id

  belongs_to :item
end
