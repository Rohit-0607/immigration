import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Country from './models/Country.js'

dotenv.config()

const featuredCountries = [
  { flag: '🇨🇦', name: 'Canada', desc: 'Top destination for PR & Study. Express Entry, PNP, and world-class universities await you.', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=530&fit=crop', order: 1, featured: true },
  { flag: '🇦🇺', name: 'Australia', desc: 'Skilled migration & student visas. Explore opportunities in the land down under.', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=530&fit=crop', order: 2, featured: true },
  { flag: '🇬🇧', name: 'United Kingdom', desc: 'Study at prestigious institutions and work in one of the world\'s largest economies.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=530&fit=crop', order: 3, featured: true },
  { flag: '🇺🇸', name: 'USA', desc: 'Green Card & H1B visas. The land of opportunities with a GDP of $21.5 Trillion.', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=530&fit=crop', order: 4, featured: true },
  { flag: '🇩🇪', name: 'Germany', desc: 'Free education & strong economy. Business freedom and investment opportunities.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=530&fit=crop', order: 5, featured: true },
  { flag: '🇳🇿', name: 'New Zealand', desc: 'Perfect for skilled workers & entrepreneurs. Start or buy a business in paradise.', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=530&fit=crop', order: 6, featured: true },
  { flag: '🇦🇪', name: 'United Arab Emirates', desc: 'Golden Visa & business setup. Tax-free income in the heart of the Middle East.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=530&fit=crop', order: 7, featured: true },
  { flag: '🇸🇬', name: 'Singapore', desc: 'Asia\'s gateway for entrepreneurs. World-class infrastructure and business hub.', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=530&fit=crop', order: 8, featured: true },
]

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=530&fit=crop'

const countryNames = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
  "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Nicaragua", "Niger", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
  "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

const seedCountries = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/future-point')
    console.log('✅ Connected to MongoDB for Country seeding...')

    await Country.deleteMany()
    console.log('🧹 Cleared existing Country collection...')

    console.log('🌍 Generating countries list locally...')

    const allCountries = countryNames.map((name, index) => {
      return {
        flag: '🏳️',
        name: name,
        desc: `Explore immigration, visa, and travel opportunities for ${name}. Contact us for personalized guidance.`,
        image: DEFAULT_IMAGE,
        order: 100 + index, 
        featured: false
      }
    })

    // Add featured countries
    featuredCountries.forEach(featured => {
      // Remove any regular country with the same name if it exists
      const existingIndex = allCountries.findIndex(c => c.name.toLowerCase() === featured.name.toLowerCase())
      if (existingIndex > -1) {
        allCountries.splice(existingIndex, 1)
      }
      allCountries.push(featured)
    })

    // Sort to put featured first, then alphabetical
    allCountries.sort((a, b) => a.order - b.order)

    // 3. Insert to DB
    await Country.insertMany(allCountries)
    
    console.log(`🌱 Successfully seeded ${allCountries.length} countries!`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding countries:', error)
    process.exit(1)
  }
}

seedCountries()
