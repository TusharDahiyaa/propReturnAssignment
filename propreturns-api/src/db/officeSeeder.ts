const officeModel = require("./officeSchema");
const mongooseModel = require("mongoose");
const path = require("path");

function generateOfficeData() {
  const offices = [];

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]; // USA states

  const ukRegions = ["England", "Scotland", "Wales", "Northern Ireland"];

  const japanPrefectures = [
    "Hokkaido",
    "Aomori",
    "Iwate",
    "Miyagi",
    "Akita",
    "Yamagata",
    "Fukushima",
    "Ibaraki",
    "Tochigi",
    "Gunma",
    "Saitama",
    "Chiba",
    "Tokyo",
    "Kanagawa",
    "Niigata",
    "Toyama",
    "Ishikawa",
    "Fukui",
    "Yamanashi",
    "Nagano",
    "Gifu",
    "Shizuoka",
    "Aichi",
    "Mie",
    "Shiga",
    "Kyoto",
    "Osaka",
    "Hyogo",
    "Nara",
    "Wakayama",
    "Tottori",
    "Shimane",
    "Okayama",
    "Hiroshima",
    "Yamaguchi",
    "Tokushima",
    "Kagawa",
    "Ehime",
    "Kochi",
    "Fukuoka",
    "Saga",
    "Nagasaki",
    "Kumamoto",
    "Oita",
    "Miyazaki",
    "Kagoshima",
    "Okinawa",
  ];

  // Define additional countries
  const countriesAndRegions: { [key: string]: string[] } = {
    France: [
      "Île-de-France",
      "Provence-Alpes-Côte d'Azur",
      "Auvergne-Rhône-Alpes",
      "Occitanie",
      "Nouvelle-Aquitaine",
      "Hauts-de-France",
      "Pays de la Loire",
      "Brittany",
      "Normandy",
      "Centre-Val de Loire",
      "Bourgogne-Franche-Comté",
      "Grand Est",
      "Corsica",
    ],
    Germany: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],
  };

  const countries = Object.keys(countriesAndRegions);

  const localAreas = [
    "Downtown",
    "Financial District",
    "Midtown",
    "Uptown",
    "Suburbia",
    "Waterfront",
    "Historic District",
    "Arts District",
    "Tech Hub",
  ];

  const facilities = [
    "Wi-Fi",
    "Parking",
    "Meeting Rooms",
    "Security",
    "Kitchen",
    "Air Conditioning",
    "Elevator",
    "Gym",
    "Coffee Bar",
    "Lounge Area",
    "Game Room",
    "Outdoor Space",
    "On-site Staff",
    "Pet Friendly",
  ];

  const furnishedStateInfo = [
    "Fully Furnished",
    "Semi-Furnished",
    "Not Furnished",
  ];

  for (let i = 1; i <= 4100; i++) {
    const newSize = Math.floor(Math.random() * 3000) + 2000; // Size between 2000 and 5000 sq. ft.
    const newAddress = `Street ${
      Math.floor(Math.random() * 100) + 1
    }, Building ${Math.floor(Math.random() * 100) + 1}`;

    // Select a random country
    const newCountry = countries[Math.floor(Math.random() * countries.length)];

    let newState;
    if (newCountry === "USA") {
      newState = usStates[Math.floor(Math.random() * usStates.length)];
    } else if (newCountry === "UK") {
      newState = ukRegions[Math.floor(Math.random() * ukRegions.length)];
    } else if (newCountry === "Japan") {
      newState =
        japanPrefectures[Math.floor(Math.random() * japanPrefectures.length)];
    } else {
      const regions = countriesAndRegions[newCountry];
      newState = regions[Math.floor(Math.random() * regions.length)];
    }

    const newRent = Math.floor(Math.random() * 2500000) + 50000; // Rent between ₹50,000 and ₹25,00,000 per month
    const newLocalArea =
      localAreas[Math.floor(Math.random() * localAreas.length)];
    const newFacility = facilities
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * (facilities.length - 1)) + 1); // Random facilities selection

    // Placeholder image URLs
    const imageUrls = generateImageUrls(); // Function to generate image URLs

    const office = {
      name: `Office ${i}`,
      description: `This is a ${newSize} sq. ft. office located at ${newAddress}, ${newLocalArea}, ${newState}, ${newCountry}. It offers various amenities including ${newFacility.join(
        ", "
      )}.`,
      address: newAddress,
      city: newLocalArea,
      state: newState,
      country: newCountry,
      postalCode: `ZIP${Math.floor(Math.random() * 90000) + 10000}`, // Random 5-digit postal code
      size: newSize,
      rent: newRent,
      furnishedState: furnishedStateInfo[Math.floor(Math.random() * 3)], // Selecting furnished state randomly
      verifiedStatus: Math.random() < 0.8,
      facilities: newFacility,
      images: imageUrls,
      available: Math.random() < 0.8, // 80% chance of availability
    };

    offices.push(office);
  }

  return offices;
}

// Function to generate placeholder image URLs
function generateImageUrls() {
  const imageUrls = [
    "/Commercial-Office-Space-1.webp",
    "/depositphotos_235840898-stock-photo-chinese-employees-work-wework-working.webp",
    "/depositphotos_649045064-stock-photo-corner-stylish-open-space-office.webp",
    "/gettyimages-1145667876-612x612.webp",
    "/photo-1571624436279-b272aff752b5.webp",
  ];
  const numImages = Math.floor(Math.random() * 5) + 1; // Random number of images (1 to 5)
  const newImages = [];
  for (let i = 0; i < numImages; i++) {
    newImages.push(imageUrls[Math.floor(Math.random() * imageUrls.length)]);
  }
  return newImages;
}

// Function to insert offices into the database in batches
async function insertOfficesInBatches(offices: any[]) {
  const batchSize = 20; // Number of offices to insert in each batch
  for (let i = 0; i < offices.length; i += batchSize) {
    const batch = offices.slice(i, i + batchSize);
    try {
      await officeModel.insertMany(batch);
      console.log(`Batch ${i / batchSize + 1} inserted successfully`);
    } catch (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}: ${error}`);
    }
  }
}

async function seedOfficeData() {
  try {
    const count = await officeModel.countDocuments();

    if (officeModel && count === 0) {
      const officesData = generateOfficeData();
      await insertOfficesInBatches(officesData);
      console.log("All offices inserted successfully");
    } else {
      console.log("Database already seeded");
    }
  } catch (error) {
    console.error("Error inserting offices:", error);
  } finally {
    // mongooseModel.disconnect();
  }
}

module.exports = seedOfficeData;
