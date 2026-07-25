// import { Adventure, Provider, Review } from './types';

// export const adventures: Adventure[] = [
//   {
//     id: 1, name: 'Everest Base Camp Trek', location: 'Nepal', category: 'trekking',
//     difficulty: 'hard', price: 45000, rating: 4.9, reviews: 328, image: 'everest-trek-adv',
//     duration: '14 days', group: '12 max', trending: true, topRated: true, budget: false, isNew: false,
//     provider: 'Himalayan Trails Co.',
//     description: 'A legendary trek through the heart of the Khumbu region. Walk in the footsteps of mountaineering legends, passing through Sherpa villages, ancient monasteries, and breathtaking mountain scenery before reaching the iconic Everest Base Camp at 5,364m.',
//   },
//   {
//     id: 2, name: 'Bali Scuba Diving', location: 'Indonesia', category: 'water',
//     difficulty: 'easy', price: 8000, rating: 4.8, reviews: 512, image: 'bali-scuba-adv',
//     duration: '3 hours', group: '8 max', trending: true, topRated: true, budget: true, isNew: false,
//     provider: 'Bali Ocean Adventures',
//     description: "Explore the vibrant underwater world of Bali's coral reefs. Suitable for beginners and certified divers alike, with professional instructors guiding you through crystal-clear waters teeming with tropical marine life.",
//   },
//   {
//     id: 3, name: 'Swiss Alps Paragliding', location: 'Switzerland', category: 'aerial',
//     difficulty: 'moderate', price: 32000, rating: 4.9, reviews: 245, image: 'swiss-paraglide-adv',
//     duration: '2 hours', group: '2 max', trending: true, topRated: true, budget: false, isNew: false,
//     provider: 'Alpine Flight School',
//     description: 'Soar above the stunning Swiss Alps with a certified tandem pilot. Experience 20+ minutes of uninterrupted flight with panoramic views of snow-capped peaks, green valleys, and pristine lakes.',
//   },
//   {
//     id: 4, name: 'Rishikesh White Water Rafting', location: 'India', category: 'water',
//     difficulty: 'moderate', price: 2500, rating: 4.7, reviews: 890, image: 'rishikesh-rafting-adv',
//     duration: '5 hours', group: '8 max', trending: true, topRated: false, budget: true, isNew: false,
//     provider: 'Ganga Adventures',
//     description: "Tackle the legendary rapids of the Ganges river. From gentle floats to adrenaline-pumping Grade III+ rapids, this is India's most popular rafting experience set against the spiritual backdrop of Rishikesh.",
//   },
//   {
//     id: 5, name: 'Iceland Glacier Hiking', location: 'Iceland', category: 'trekking',
//     difficulty: 'hard', price: 28000, rating: 4.8, reviews: 178, image: 'iceland-glacier-adv',
//     duration: '8 hours', group: '10 max', trending: false, topRated: true, budget: false, isNew: false,
//     provider: 'Ice Walkers Iceland',
//     description: "Trek across Europe's largest glacier, Vatnajökull. Equipped with crampons and ice axes, explore ice caves, crevasses, and stunning blue ice formations in this once-in-a-lifetime adventure.",
//   },
//   {
//     id: 6, name: 'Patagonia Ice Climbing', location: 'Argentina', category: 'winter',
//     difficulty: 'extreme', price: 48000, rating: 4.9, reviews: 92, image: 'patagonia-ice-adv',
//     duration: '2 days', group: '4 max', trending: false, topRated: true, budget: false, isNew: true,
//     provider: 'Patagonia Vertical',
//     description: 'Scale frozen waterfalls and ice walls in the stunning Patagonian landscape. This intensive course teaches advanced ice climbing techniques under the guidance of certified mountain guides.',
//   },
//   {
//     id: 7, name: 'Kenya Big Five Safari', location: 'Kenya', category: 'wildlife',
//     difficulty: 'easy', price: 15000, rating: 4.7, reviews: 420, image: 'kenya-safari-adv',
//     duration: '3 days', group: '6 max', trending: true, topRated: false, budget: true, isNew: false,
//     provider: 'Savanna Expeditions',
//     description: "Witness the magnificent Big Five — lion, leopard, elephant, buffalo, and rhino — in their natural habitat. Expert naturalist guides lead you through Kenya's most iconic national reserves.",
//   },
//   {
//     id: 8, name: 'New Zealand Bungee Jumping', location: 'New Zealand', category: 'aerial',
//     difficulty: 'moderate', price: 12000, rating: 4.8, reviews: 356, image: 'nz-bungee-adv',
//     duration: '1 hour', group: '1 max', trending: false, topRated: true, budget: false, isNew: true,
//     provider: 'Kawarau Bridge Bungee',
//     description: "Take the leap at the world's original commercial bungee jumping site. Plummet 43 meters towards the crystal-clear Kawarau River in Queenstown — the adventure capital of the world.",
//   },
// ];

// export const providers: Provider[] = [
//   { name: 'Himalayan Trails Co.', location: 'Nepal', adventures: 45, rating: 4.9, image: 'provider-nepal', verified: true },
//   { name: 'Bali Ocean Adventures', location: 'Indonesia', adventures: 32, rating: 4.8, image: 'provider-bali', verified: true },
//   { name: 'Alpine Flight School', location: 'Switzerland', adventures: 18, rating: 4.9, image: 'provider-swiss', verified: true },
//   { name: 'Ganga Adventures', location: 'India', adventures: 28, rating: 4.7, image: 'provider-india', verified: true },
// ];

// export const reviews: Review[] = [
//   { name: 'Sarah Chen', avatar: 'review-sarah', adventure: 'Everest Base Camp Trek', rating: 5,
//     text: 'Life-changing experience! The guides were incredibly knowledgeable and the scenery was beyond words. Every day brought a new breathtaking view. Highly recommend to anyone seeking a real challenge.',
//     date: '2 weeks ago' },
//   { name: 'Marcus Johnson', avatar: 'review-marcus', adventure: 'Bali Scuba Diving', rating: 5,
//     text: 'As a first-time diver, I felt completely safe and well-guided. The coral reefs were absolutely stunning and we saw so many tropical fish. The team made it unforgettable.',
//     date: '1 month ago' },
//   { name: 'Elena Rodriguez', avatar: 'review-elena', adventure: 'Swiss Alps Paragliding', rating: 5,
//     text: "The most incredible feeling of freedom I've ever experienced. Floating above the Alps with nothing but the wind — pure magic. My pilot was amazing and made me feel at ease.",
//     date: '3 weeks ago' },
//   { name: 'James Park', avatar: 'review-james', adventure: 'Rishikesh Rafting', rating: 4,
//     text: 'Great fun and amazing value! The rapids were thrilling and the Ganges is beautiful. Only downside was the crowded starting point, but once on the river it was perfect.',
//     date: '2 months ago' },
//   { name: 'Aisha Patel', avatar: 'review-aisha', adventure: 'Kenya Big Five Safari', rating: 5,
//     text: 'We saw all the Big Five within two days! Our guide had an incredible eye for spotting animals. The accommodations were comfortable and the food was surprisingly good.',
//     date: '1 week ago' },
//   { name: 'Tom Wright', avatar: 'review-tom', adventure: 'Iceland Glacier Hiking', rating: 5,
//     text: 'Walking on a glacier feels like being on another planet. The blue ice formations are surreal. Safety was clearly a top priority and the equipment was excellent.',
//     date: '3 months ago' },
// ];

// export const difficultyColors: Record<string, string> = {
//   easy: 'bg-green-500/10 text-green-400 border-green-500/20',
//   moderate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
//   hard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
//   extreme: 'bg-red-500/10 text-red-400 border-red-500/20',
// };


import { Adventure, Provider } from './types';

export const adventures: Adventure[] = [
  {
    id: 1, name: 'Everest Base Camp Trek', location: 'Nepal', category: 'trekking',
    difficulty: 'hard', price: 45000, rating: 4.9, reviews: 328, image: 'everest-trek-adv',
    duration: '14 days', group: '12 max', trending: true, topRated: true, budget: false, isNew: false,
    provider: 'Himalayan Trails Co.',
    description: 'A legendary trek through the heart of the Khumbu region. Walk in the footsteps of mountaineering legends, passing through Sherpa villages, ancient monasteries, and breathtaking mountain scenery before reaching the iconic Everest Base Camp at 5,364m.',
  },
  {
    id: 2, name: 'Bali Scuba Diving', location: 'Indonesia', category: 'water',
    difficulty: 'easy', price: 8000, rating: 4.8, reviews: 512, image: 'bali-scuba-adv',
    duration: '3 hours', group: '8 max', trending: true, topRated: true, budget: true, isNew: false,
    provider: 'Bali Ocean Adventures',
    description: "Explore the vibrant underwater world of Bali's coral reefs. Suitable for beginners and certified divers alike, with professional instructors guiding you through crystal-clear waters teeming with tropical marine life.",
  },
  {
    id: 3, name: 'Swiss Alps Paragliding', location: 'Switzerland', category: 'aerial',
    difficulty: 'moderate', price: 32000, rating: 4.9, reviews: 245, image: 'swiss-paraglide-adv',
    duration: '2 hours', group: '2 max', trending: true, topRated: true, budget: false, isNew: false,
    provider: 'Alpine Flight School',
    description: 'Soar above the stunning Swiss Alps with a certified tandem pilot. Experience 20+ minutes of uninterrupted flight with panoramic views of snow-capped peaks, green valleys, and pristine lakes.',
  },
  {
    id: 4, name: 'Rishikesh White Water Rafting', location: 'India', category: 'water',
    difficulty: 'moderate', price: 2500, rating: 4.7, reviews: 890, image: 'rishikesh-rafting-adv',
    duration: '5 hours', group: '8 max', trending: true, topRated: false, budget: true, isNew: false,
    provider: 'Ganga Adventures',
    description: "Tackle the legendary rapids of the Ganges river. From gentle floats to adrenaline-pumping Grade III+ rapids, this is India's most popular rafting experience set against the spiritual backdrop of Rishikesh.",
  },
  {
    id: 5, name: 'Iceland Glacier Hiking', location: 'Iceland', category: 'trekking',
    difficulty: 'hard', price: 28000, rating: 4.8, reviews: 178, image: 'iceland-glacier-adv',
    duration: '8 hours', group: '10 max', trending: false, topRated: true, budget: false, isNew: false,
    provider: 'Ice Walkers Iceland',
    description: "Trek across Europe's largest glacier, Vatnajökull. Equipped with crampons and ice axes, explore ice caves, crevasses, and stunning blue ice formations in this once-in-a-lifetime adventure.",
  },
  {
    id: 6, name: 'Patagonia Ice Climbing', location: 'Argentina', category: 'winter',
    difficulty: 'extreme', price: 48000, rating: 4.9, reviews: 92, image: 'patagonia-ice-adv',
    duration: '2 days', group: '4 max', trending: false, topRated: true, budget: false, isNew: true,
    provider: 'Patagonia Vertical',
    description: 'Scale frozen waterfalls and ice walls in the stunning Patagonian landscape. This intensive course teaches advanced ice climbing techniques under the guidance of certified mountain guides.',
  },
  {
    id: 7, name: 'Kenya Big Five Safari', location: 'Kenya', category: 'wildlife',
    difficulty: 'easy', price: 15000, rating: 4.7, reviews: 420, image: 'kenya-safari-adv',
    duration: '3 days', group: '6 max', trending: true, topRated: false, budget: true, isNew: false,
    provider: 'Savanna Expeditions',
    description: "Witness the magnificent Big Five — lion, leopard, elephant, buffalo, and rhino — in their natural habitat. Expert naturalist guides lead you through Kenya's most iconic national reserves.",
  },
  {
    id: 8, name: 'New Zealand Bungee Jumping', location: 'New Zealand', category: 'aerial',
    difficulty: 'moderate', price: 12000, rating: 4.8, reviews: 356, image: 'nz-bungee-adv',
    duration: '1 hour', group: '1 max', trending: false, topRated: true, budget: false, isNew: true,
    provider: 'Kawarau Bridge Bungee',
    description: "Take the leap at the world's original commercial bungee jumping site. Plummet 43 meters towards the crystal-clear Kawarau River in Queenstown — the adventure capital of the world.",
  },
];

export const providers: Provider[] = [
  { name: 'Himalayan Trails Co.', location: 'Nepal', adventures: 45, rating: 4.9, image: 'provider-nepal', verified: true },
  { name: 'Bali Ocean Adventures', location: 'Indonesia', adventures: 32, rating: 4.8, image: 'provider-bali', verified: true },
  { name: 'Alpine Flight School', location: 'Switzerland', adventures: 18, rating: 4.9, image: 'provider-swiss', verified: true },
  { name: 'Ganga Adventures', location: 'India', adventures: 28, rating: 4.7, image: 'provider-india', verified: true },
];

export const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  moderate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  hard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  extreme: 'bg-red-500/10 text-red-400 border-red-500/20',
};