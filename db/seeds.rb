# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
UserItem.destroy_all
User.destroy_all
Item.destroy_all
Review.destroy_all

puts "Seeding users..."
user1 = User.create(username: "vintage007", password: "123qwerty!")

puts "Seeding items..."     
# TODO : fix image links or find new images
item1 = Item.create(name: "WELCOME 2' THE JUNGLE", description: "BROWN COW-HIDE CHAIR", price: "180.00", image: "/images/AccentChair_1.jpg")
item2 = Item.create(name: "LOW CITY OF LOVE", description: "MAUVE MODERN VELVET SINGLE SOFA CHAIR", price: "175.00", image: "/images/AccentChair_3.jpg")
item3 = Item.create(name: "KNICKERBOCKER BUCKET", description: "BURNT ORANGE ARMLESS BUCKET CHAIR", price: "200.00", image: "/images/AccentChair_4.jpg")
item4 =Item.create(name: "DROP BUCKET SEAT", description: "GREY SUEDE LOW CHAIR", price: "170.00", image: "/images/AccentChair_5.jpg")
item5 = Item.create(name: "WHITE ON WHITE 'LOW'", description: "WHITE TUFTED VANITY CHAIR", price: "240.00", image: "/images/AccentChair_6.jpg")
item6 = Item.create(name: "HARDWOOD CLASSIC", description: "GUYOU MID CENTURY MODERN RATTAN CHAIR", price: "160.00", image: "/images/AccentChair_7.jpg")
item7 = Item.create(name: "ORCHARD BEACH CHAIR'", description: "SANDLEWOOD & HUNTER GREEN PENINSULA LOUNGE CHAIR", price: "280.00", image: "/images/AccentChair_8.jpg")
item8 = Item.create(name: "SCHOOL OF HARD KNOCKS ", description: "SLIPPER CHAIR", price: "90.00", image: "/images/AccentChairs_2.jpg")
item9 = Item.create(name: "DAVENPORT OF DREAMZ", description: "DAVENPORT PREMIUM BROWN LEATHER SOFA", price: "600.00", image: "/images/BrownLeatherSofa.jpg")
item10 = Item.create(name: "TUFTED THRONE", description: "BROWN LEATHER CHESTERFIELD CHAIR", price: "555.00", image: "/images/BrownTuftedSofa.jpg")
item11 = Item.create(name: "SPALDING TWO SEATER", description: "COPPER LOVE SEAT", price: "300.00", image: "/images/CopperLeatherCouch.jpg")
item12 = Item.create(name: "MOTT HAVEN DIRECTOR'S THRONE", description: "BLACK & MAHOGANY DIRECTOR'S CHAIR", price: "245.00", image: "/images/DirectorsChair.jpg")
item13 = Item.create(name: "VARSITY GREEN LOVE", description: "GREEN SUEDE LOVE SEAT", price: "290.00", image: "/images/GreenSuedeSofa.jpg")
item14 = Item.create(name: "CEMENT THREES", description: "CEMENT GRAY TWO SEATER", price: "300.00", image: "/images/GreySofa.jpg")
item15 = Item.create(name: "MASHBURN SNIPER POINTS", description: "NOBLE HOUSE TAFTON ORANGE", price: "600.00", image: "/images/TanTuftedSofa.jpg")

puts "Seeding reviews..."
review1 = Review.create(title: "I love this chair!!", review: "I was looking for a cool, comfortable accent chair. This hit all the marks for me.", user_id: user1.id , item_id: item1.id )
review2 = Review.create(title: "My favorite color!", review: "Beautiful piece that fits with my home decor. Comfortable and stylish fit.", user_id: user1.id , item_id: item2.id )
review3 = Review.create(title: "Minimal at its best!", review: "This chair gets a lot of compliments and fit's well the with color scheme in my home.", user_id: user1.id , item_id: item3.id )
review4 = Review.create(title: "Mancave addition!", review: "Great chair for a rugged/dark space.", user_id: user1.id , item_id: item4.id )
review5 = Review.create(title: "Perfect statement chair!", review: "Great chair for a cozy space, vanity", user_id: user1.id , item_id: item5.id )
review6 = Review.create(title: "Classic piece!", review: "This chair is a staple piece, well built and can be passed down for generations.", user_id: user1.id , item_id: item6.id )
review7 = Review.create(title: "I IMMEDIATELY ORDERED ANOTHER ONE!", review: "Cozy minimal chair. Great color during the Golden hour.", user_id: user1.id , item_id: item7.id )
review8 = Review.create(title: "Liked it", review: "Stylish chairs for small gatherings. Well priced and will order more.", user_id: user1.id , item_id: item8.id )
review9 = Review.create(title: "Super plush and comfy!", review: "Fair price for quality. Friends and family enjoy sitting on this plush bad boy!", user_id: user1.id , item_id: item9.id )
review10 = Review.create(title: "Great Statement Chair!", review: "This chair has such integrity. It feels like a throne as named and works well in my man cave", user_id: user1.id , item_id: item10.id )
review11 = Review.create(title: "Love this 2 seater!", review: "Roomy enough for two to sit comfortably. Great color.", user_id: user1.id , item_id: item11.id )
review12 = Review.create(title: "Great Buy!", review: "This chair is a statement piece and doesn't take up too much room. A bit pricy but worth every dollar.", user_id: user1.id , item_id: item12.id )
review13 = Review.create(title: "Comfy Love Seat", review: "This love seat is comfortable and fits well in my home. Great for sitting with friends or taking a quick nap.", user_id: user1.id , item_id: item13.id )
review14 = Review.create(title: "Aesthetic purchase", review: "Not the most comfortable seating. A bit pricey", user_id: user1.id , item_id: item14.id )
review15 = Review.create(title: "Love the color. Love the fabric. Love the size", review: "This chair is the perfect purchase for my foyer. The color contrasts with almost any finishing floors and its perfect for one.", user_id: user1.id , item_id: item15.id )





