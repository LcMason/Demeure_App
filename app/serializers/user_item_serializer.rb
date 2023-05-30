class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity
  # has_many :reviews, each_serializer: ReviewSerializer
  belongs_to :item
  has_many :reviews
  has_many :users
end
