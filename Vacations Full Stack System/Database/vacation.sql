-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2023 at 12:43 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation`
--
CREATE DATABASE IF NOT EXISTS `vacation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(1, 7),
(2, 2),
(5, 4),
(3, 6),
(2, 10),
(2, 1),
(2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(30) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(1, 'Josef', 'Smith', 'Josef789@gmail.com', 'Josef89!#', 1),
(2, 'George', 'Stewart', 'Georges9854@gmail.com', 'Georges984!#', 2),
(3, 'Jordan', 'Kane', 'Jordan2543@gmail.com', 'Jordan253!#', 2),
(4, 'Guy', 'Philips', 'Guy753@gmail.com', 'Guy73!#', 2),
(5, 'Dolev', 'Timothy', 'Dolev845@gmail.com', 'Dolev85!#', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `name`, `description`, `dateStart`, `dateEnd`, `price`, `imageName`) VALUES
(1, 'DoubleTree by Hilton Las Vegas North', 'Take advantage of recreational opportunities offered, including an outdoor pool, a spa tub, and a 24-hour fitness center.Enjoy a meal at the restaurant, or stay in and take advantage of the hotel\'s room service. Quench your thirst with your favorite drink at the bar/lounge. Cooked-to-order breakfasts are available daily from 6:30 AM to 10:00 AM for a fee.Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and multilingual staff. This hotel has 2 meeting rooms available for events. Free self parking is available onsite.Stay in one of 129 guestrooms featuring LCD televisions. Your pillowtop bed comes with premium bedding. \r\n', '2023-08-01', '2023-08-03', '540.00', '9a129207-870a-4310-94bd-a391f8941e9e.jpg'),
(2, 'Vdara Hotel & Good spa', 'The award-winning boutique Vdara Hotel & Spa, part of the retail, dining and entertainment CityCenter complex, is located on the Las Vegas Strip. This all-suite tower is set between the Bellagio and ARIA Resort & Casino. Each of the suites is decadently furnished and features a 42-inch flat-screen TV with premium channels, pay movies, private bathroom with deep soaking tub, premium bedding, sofa bed, blackout drapes and gourmet kitchen. You’ll enjoy views of The Strip or surrounding mountains. Take full advantage of The Spa at Vdara experience including holistic natural treatments and skincare products. Enjoy fresh breakfast, lunch, gourmet coffees and pastries at Market Café Vdara Hotel & Spa. The Bar Vdara Hotel & Spa serves tasty light fare (with lunch and dinner options) and handcrafted cocktails.', '2023-07-18', '2023-07-20', '270.00', '0d16f361-c111-4dca-966f-5782eb0e579a.jpg'),
(3, 'Hotel Circus Circus', 'Hotel Circus Circus is a well-known hotel resort that boasts an exciting Splash Zone, live entertainment, and Adventuredome, a thrilling indoor theme park. Situated on the Las Vegas Strip, the property is a 15-minute walk from the Fashion Show shopping centre. All of the spacious rooms at Hotel Circus Circus incorporate cable TV, writing desk, safe, hairdryer and ironing equipment. Each room also includes a bathroom and air conditioning. An expansive arcade, casino and 40,000 square foot shopping area ensures there\'s plenty to do when on-site at the resort. Free on-site parking is a boost for car-dependent travellers. The Steak House is an award-winning restaurant and the place to enjoy prime rib or fresh lobster, while Vince Neil\'s cooks up mouth-watering burgers. A traditional buffet can be enjoyed at the Circus Buffet, Pizzeria serves made to order pizzas, and Blue Iguana provides a taste of authentic Mexican cuisine. The Las Vegas Convention Center is a one-mile journey.', '2023-04-02', '2023-04-04', '480.00', '229afcc7-9f0f-4199-be62-3b63229b135e.jpg'),
(4, 'Treasure Island - TI Hotel Casino', 'Boasting a prime location on the famous Las Vegas Strip, Treasure Island - TI Hotel Casino, a Radisson Hotel is directly opposite the Fashion Show Mall, and easily distinguished by it\'s unique curved outer facade and lavish interiors. Rooms and suites are warmly decorated with elegant finishes. Large floor-to-ceiling windows, mini fridges, plush pillow-top beds, and sizeable marble bathrooms are standard, while suites add luxurious hot tubs. In addition to a lively casino, the hotel also provides ample opportunity for guests to enjoy luxurious treatments at the spa. An outdoor pool, hot tub, well-equipped fitness centre, and live shows every day makes staying at Treasure Island - TI Hotel Casino, a Radisson Hotel quite an experience. Dining on site is a culinary adventure.', '2023-04-16', '2023-04-17', '310.00', '12968372-bffa-4c9e-bf59-7ceec891861c.jpg'),
(5, 'Virgin Hotels Las Vegas', 'Positioned only two blocks from the world-famous Strip, the rock-and-roll-themed Virgin Hotels Las Vegas, Curio Collection by Hilton takes pride in its live musical entertainment performances, full-service casino, countless dining venues, and world-class spa. Posh rooms and suites come with 55-inch LED TVs, fully stocked minibars, and oversized bathrooms with deluxe toiletries. Upgraded units add jetted tubs, terraces, and living areas. Penthouse suites and spa pool villas are available.', '2023-04-18', '2023-04-20', '225.00', '866c43d2-521c-48f7-ad40-46fdcc5597cd.jpg'),
(6, 'The Mirage Hotel & Casino', 'A grand property, The Mirage Hotel & Casino can be found along the famous Las Vegas Strip, adjacent to Caesar\'s Palace and directly overlooking the iconic \'erupting volcano\'. Rooms and suites include all the mod-cons associated with a luxurious stay. Plush beds with pillow-top mattresses, black-out curtains, and marble bathrooms with complimentary bath amenities are standard features. Some rooms and villas boast floor-to-ceiling windows, private pools, and a butler service.', '2023-04-23', '2023-04-24', '195.00', '8eaa9586-423c-46af-8252-46ab7e3edef7.jpg'),
(7, 'Evalena Beach Hotel', 'The Evalena Beach Hotel is located in Fig Tree Bay in Protaras, and offers an outdoor pool, a wellness center and a restaurant. The property is within walking distance of shops, restaurants and bars. Free Wi-Fi access is available in all areas. All suites and rooms are air-conditioned and include satellite TV, hair dryer, private balcony, towels and bed linen.', '2023-04-25', '2023-04-26', '99.00', 'f40b5dfd-295f-46db-a7cb-b24a2710b52a.jpg'),
(8, 'Frangiorgio Hotel', 'The Frangiorgio Hotel has been completely renovated and is located in the center of Larnaca, just 250 meters from the popular Phinikoudes Promenade opposite the beach and the local market. The hotel has a rooftop pool and fast wireless internet in all areas. The rooms are fully air-conditioned and decorated in a modern style.', '2023-04-29', '2023-04-30', '200.00', 'ff32e5a5-67af-4941-b3ec-1877f2c08d1b.jpg'),
(9, 'The Marmara Antalya', 'The Marmara Antalya Hotel is located on the famous Falez hills, with a spectacular view of the Mediterranean Sea, and offers a private beach on the Turkish Riviera (Turquoise Coast). Besides the main building, the hotel includes a unique wing that rotates 360 degrees during the day. You can enjoy the experience of the revolving building, so that you wake up to views of the pool or the Mediterranean Sea every day. At the Marmara Tuti restaurant you can enjoy unique fusion dishes that combine Turkish and international cuisine. The restaurant uses locally produced organic products.', '2023-05-01', '2023-05-03', '300.00', 'd9dda155-82cc-412a-9918-6c38c278cc00.jpg'),
(10, 'Sveta Sofia Hotel', 'First Class Historical Hotel.The building is old and traditional in style. (lobby) The lobby is small and there is a lobby bar to relax in to the right of the entrance. (general) The hotel offers a very pleasant and relaxing stay in a great location. WS0908.\r\nThe building is old and traditional in style.', '2023-05-03', '2023-05-07', '540.00', '5b749763-b6e6-4a27-81e3-db99fe1f30a9.jpg\r\n'),
(11, 'Alekta Hotel Free Parking', 'The Electa Hotel is a family-run hotel located in the desirable Sea Garden area in the tourist center of Varna, a short walking distance from the beach, the city promenade and the main pedestrian street. This is the best location for tourists who want to be close to everything there is to see and do in Varna. The hotel offers a large outdoor swimming pool with sunbeds and a shallow water area for children and a sauna. Guests arriving by car can park for free in the hotel parking lot. In front of the hotel is a bus stop that is easy to find your way around.', '2023-05-21', '2023-05-22', '125.00', '677b4c07-81ff-49da-822a-bf1fb64621d6.jpg'),
(12, 'Kapetanios Odyssia', 'This comfortable hotel is conveniently located in one of the most privileged areas of Limassol, right in the centre and yet 100 metres from the beach. Guests might enjoy a drink or meal in the themed Irish bar and restaurant, or enjoy traditional local cuisine in the rustic tavern or modern main restaurant. There is also a pool bar which provides refreshing cool drinks and cocktails. The hotel is renowned for its excellent service, friendly atmosphere and the good food, making it ideal for a relaxing holiday.\r\nThe KAPETANIOS ODYSSIA is a Tourist hotel. Located in Limassol area. Shopping is accessible by bus/taxi and the nightlife/restaurants are located in the hotel.', '2023-05-24', '2023-05-27', '503.00', 'f67c12c8-d56a-4065-b854-39abba88492f.jpg'),
(13, 'Asteria Kremlin Palace', 'The Astria Kremlin Palace Resort (Kremlin Palace) inspired by the original Kremlin Palace in Russia, allows you to discover the home of the Russian Tsars. This is an all-inclusive resort that offers a private beach and a wide selection of 5-star pools and water sports facilities, 6 a la carte restaurants and 7 bars, as well as special entertainment for children. You can relax and refresh in the fully equipped spa center, and receive reflexology treatments, massages, seaweed treatments and more. You can also relax in the sauna and Turkish bath. The hotel has a water park with three slides for children and a water park for adults with 6 slides. You can also take dance lessons, practice archery or visit the nearby caves.', '2023-05-28', '2023-05-30', '480.00', 'afd88baf-7b11-4d9d-8dd1-cc24c0669b37.jpg'),
(35, 'Costa Rica', ' More than one million tourists enjoy Costa Rica vacations each year. Located in Central America, south of Nicaragua and northwest of Panama, Costa Rica is a mishmash of geographical phenomena, complete with misting rainforests, smoking volcanoes, crashing waterfalls and glistening beaches. Complementing the varied terrain is an ecological system equally as diverse. Covering only 0.03% of the surface of our planet, Costa Rica has approximately 6% of the world\'s biodiversity, much of which can be found in the country’s 20 national parks and eight biological reserves.', '2023-08-03', '2023-06-27', '658.00', '23649604-286e-4008-bbce-58ba914bab86.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
