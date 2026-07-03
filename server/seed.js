import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Service from './models/Service.js'
import Country from './models/Country.js'
import Testimonial from './models/Testimonial.js'
import Stat from './models/Stat.js'
import Feature from './models/Feature.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB for seeding...')

    // Clear existing data to prevent duplicates on multiple runs
    await Service.deleteMany()
    await Country.deleteMany()
    await Testimonial.deleteMany()
    await Stat.deleteMany()
    await Feature.deleteMany()
    console.log('🧹 Cleared existing database collections...')

    // Seed Services
    await Service.insertMany([
      { icon: 'fa-graduation-cap', title: 'Study Visa', description: 'Get admitted to top universities worldwide. We handle everything from university selection to visa approval for Canada, Australia, UK, USA & more.', order: 1 },
      { icon: 'fa-passport', title: 'Permanent Residency', description: 'Settle abroad permanently with expert PR guidance. We navigate Express Entry, PNP, skilled migration & points-based systems for you.', order: 2 },
      { icon: 'fa-briefcase', title: 'Work Permit', description: 'Secure work opportunities globally. Our team assists with employer sponsorship, LMIA processing, and work visa applications.', order: 3 },
      { icon: 'fa-plane', title: 'Tourist Visa', description: 'Travel the world hassle-free. We provide complete assistance for tourist and visitor visa applications to all major destinations.', order: 4 },
      { icon: 'fa-building', title: 'Business Visa', description: 'Expand your business internationally. Get expert guidance on investor visas, startup visas, and entrepreneur immigration programs.', order: 5 },
      { icon: 'fa-heart', title: 'Spouse / Family Visa', description: 'Reunite with your loved ones abroad. We handle spouse visas, dependent visas, family sponsorship & super visa applications.', order: 6 },
    ])

    // Seed Countries
    await Country.insertMany([
      { flag: '🇨🇦', name: 'Canada', desc: 'Top destination for PR & Study. Express Entry, PNP, and world-class universities await you.', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=530&fit=crop', order: 1 },
      { flag: '🇦🇺', name: 'Australia', desc: 'Skilled migration & student visas. Explore opportunities in the land down under.', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=530&fit=crop', order: 2 },
      { flag: '🇬🇧', name: 'United Kingdom', desc: 'Study at prestigious institutions and work in one of the world\'s largest economies.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=530&fit=crop', order: 3 },
      { flag: '🇺🇸', name: 'USA', desc: 'Green Card & H1B visas. The land of opportunities with a GDP of $21.5 Trillion.', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=530&fit=crop', order: 4 },
      { flag: '🇩🇪', name: 'Germany', desc: 'Free education & strong economy. Business freedom and investment opportunities.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=530&fit=crop', order: 5 },
      { flag: '🇳🇿', name: 'New Zealand', desc: 'Perfect for skilled workers & entrepreneurs. Start or buy a business in paradise.', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=530&fit=crop', order: 6 },
      { flag: '🇦🇪', name: 'Dubai (UAE)', desc: 'Golden Visa & business setup. Tax-free income in the heart of the Middle East.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=530&fit=crop', order: 7 },
      { flag: '🇸🇬', name: 'Singapore', desc: 'Asia\'s gateway for entrepreneurs. World-class infrastructure and business hub.', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=530&fit=crop', order: 8 },
    ])

    // Seed Testimonials
    await Testimonial.insertMany([
      { name: 'Kavita Narang', role: 'PR Applicant', text: 'During extremely difficult times, Future Point has been by our side every step of the way. My PR and visitor visa files are both progressing well. Thank you for your efforts!', initials: 'KN' },
      { name: 'Himank Garg', role: 'Study Visa Client', text: 'It\'s a pleasure getting services from Future Point. When it comes to filing, execution, and guidance, they\'re excellent — responsive, flexible, and quick to adapt.', initials: 'HG' },
      { name: 'Madhu Sachdeva', role: 'PNP Nomination', text: 'Future Point team is smart, organized, and efficient. They know how to boost your CRS and which PNP is best for you. I visited many consultants but they explain everything so well. I got the nomination!', initials: 'MS' },
      { name: 'Amartya Sharma', role: 'PR Client', text: 'Future Point has met and exceeded my expectations. They have given updates and information and continue to deliver results. I am referring all my friends and relatives to them!', initials: 'AS' },
    ])

    // Seed Stats
    await Stat.insertMany([
      { target: 15, suffix: '+', label: 'Year\'s Experience', order: 1 },
      { target: 25, suffix: '+', label: 'Countries Covered', order: 2 },
      { target: 10, suffix: 'K+', label: 'Happy Clients', order: 3 },
      { target: 200, suffix: '+', label: 'Associate Partners', order: 4 },
    ])

    // Seed Features
    await Feature.insertMany([
      { icon: 'fa-star', title: 'Experienced', desc: 'Over 15 years of proven immigration expertise', order: 1 },
      { icon: 'fa-users', title: 'Cooperative', desc: 'Friendly and approachable team always ready to help', order: 2 },
      { icon: 'fa-briefcase', title: 'Professional Ethics', desc: 'Highest standards of integrity and transparency', order: 3 },
      { icon: 'fa-check-circle', title: 'Trustworthy', desc: 'Thousands of successful cases and happy clients', order: 4 },
      { icon: 'fa-user', title: 'Personal Growth', desc: 'We invest in your growth and career development', order: 5 },
      { icon: 'fa-people-carry', title: 'Teamwork', desc: 'Collaborative approach for best possible outcomes', order: 6 },
      { icon: 'fa-coffee', title: 'Dedicated Consultant', desc: 'One-on-one guidance from a personal advisor', order: 7 },
      { icon: 'fa-headset', title: '24/7 Support', desc: 'Round-the-clock assistance whenever you need it', order: 8 },
    ])

    console.log('🌱 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()
