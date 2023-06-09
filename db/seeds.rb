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
item1 = Item.create(name: "LOS ANGELES LAKERS", description: "MEN'S CREWNECK SWEATER", price: "280.00", image: "KN919004L_GY14_1391_2000x.jpeg")
item2 = Item.create(name: "KOBE BRYANT", description: "MEN'S VINTAGE T-SHIRT", price: "90.00", image: "e5d65ca783f593283f9f1a2285c55297.jpeg")
item3 = Item.create(name: "NEW YORK KNICKS", description: "MEN'S CREWNECK SWEATER", price: "280.00", image: "KN919004K__0450_2000x.jpeg")
item4 =Item.create(name: "GOLDEN STATE WARRIORS", description: "MEN'S CREWNECK SWEATER", price: "280.00", image: "KN919004W_GY14_1398_2000x.jpeg")
item5 = Item.create(name: "BOSTON CELTICS", description: "MEN'S CREWNECK SWEATER", price: "280.00", image: "KN919004C_GY14_1386_2000x.jpeg")
item6 = Item.create(name: "ATLANTA HAWKS", description: "MEN'S CREWNECK SWEATER", price: "280.00", image: "KN919004H_GY14_1393_2000x.jpeg")
item7 = Item.create(name: "PHOENIX SUNS", description: "MEN'S VINTAGE T-SHIRT", price: "80.00", image: "m_636f4bb4678c3a24ce07f4d2.jpeg")
item8 = Item.create(name: "CHICAGO BULLS VS. ORLANDO MAGIC", description: "1996 EASTERN CONFERENCE CHAMPIONSHIP T-SHIRT", price: "40.00", image: "DSC08833_clipped_rev_1_large.jpeg")
item9 = Item.create(name: "JOHN STOCTON & KARL MALONE", description: "1993 ALL STAR MVPS", price: "40.00", image: "DSC08288_clipped_rev_4_clipped_rev_1_clipped_rev_1_grande.jpeg")
item10 = Item.create(name: "MICHAEL JORDAN", description: "1996 EASTERN CONFERENCE CHAMPIONSHIP", price: "35.00", image: "s-l500.jpeg")
item11 = Item.create(name: "UTAH JAZZ", description: "1998 NBA FINALS", price: "400.00", image: "Screen-Shot-2022-04-18-at-8.38.20-PM.jpeg")
item12 = Item.create(name: "SAN ANTONIO SPURS", description: "1996 ALL STAR WEEKEND", price: "40.00", image: "79940870_046_b.jpeg")
item13 = Item.create(name: "CLEVELAND CAVAILERS", description: "WORKOUT T-SHIRT", price: "50.00", image: "Cavs-0101025573-charcoal-flat.jpeg")
item14 = Item.create(name: "CLEVELAND CAVAILERS", description: "T-SHIRT", price: "40.00", image: "Cleveland-Cavs-On-Fire-01010556325-wine-flat.jpeg")
item15 = Item.create(name: "JAYLEN BROWN & JAYSON TATUM", description: "NBA JAM T-SHIRT", price: "35.00", image: "NBA-Jam-Celtics-Brown-And-Tatum-01010479013-green-flat.jpeg")

puts "Seeding reviews..."
review1 = Review.create(title: "I love this sweater!", review: "I was looking for a cool, comfortable crewneck. This hit all the marks for me.", user_id: user1.id , item_id: item1.id )
review2 = Review.create(title: "The GOAT!", review: "RIP KOBE! Great shirt, comfortable fit.", user_id: user1.id , item_id: item2.id )
review3 = Review.create(title: "Great Fit!", review: "This crewneck gets a lot of compliments. The fit is great and the fabric is thick.", user_id: user1.id , item_id: item3.id )
review4 = Review.create(title: "GSW Is A Dynasty Team!", review: "Great crewneck. I wished it was more affordable.", user_id: user1.id , item_id: item4.id )
review5 = Review.create(title: "Looks great fits great!", review: "Great sweater. It looks just like the picture.", user_id: user1.id , item_id: item5.id )
review6 = Review.create(title: "Wonderful fabric", review: "This crewneck fits true to size and is great for spring nights.", user_id: user1.id , item_id: item6.id )
review7 = Review.create(title: "My son loves this shirt", review: "Good fitting shirt and brings back the nostalgia of the Suns.", user_id: user1.id , item_id: item7.id )
review8 = Review.create(title: "liked it", review: "Classic shirt for a good price.", user_id: user1.id , item_id: item8.id )
review9 = Review.create(title: "Stockton to Malone!", review: "Classic pick and roll duo. Classic shirt. Good fit. Fair price.", user_id: user1.id , item_id: item9.id )
review10 = Review.create(title: "Nice shirt", review: "The quality could be better but the price is fair.", user_id: user1.id , item_id: item10.id )
review11 = Review.create(title: "Love this warmup!", review: "Great warmup and the vintage colorway is perfect.", user_id: user1.id , item_id: item11.id )
review12 = Review.create(title: "Arguably best year in basketball!", review: "Great colorway for summer. Nice fit.", user_id: user1.id , item_id: item12.id )
review13 = Review.create(title: "great for workouts", review: "This shirt feels great during workouts. Washes great. If you want more flexibility and movmement, you might want to go up a size.", user_id: user1.id , item_id: item13.id )
review14 = Review.create(title: "liked it", review: "Good shirt for the price.", user_id: user1.id , item_id: item14.id )
review15 = Review.create(title: "Dynamic Duo", review: "My nephew loves this shirt. Tatum and Brown his two fav players.", user_id: user1.id , item_id: item15.id )