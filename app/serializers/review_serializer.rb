class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :review

  belongs_to :item
end
