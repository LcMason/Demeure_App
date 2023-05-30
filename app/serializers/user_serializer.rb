class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  # TODO : check serializer association below
  # has_many :user_items, serializer: UserItemSerializer
  has_many :user_items
end
