/*
  open:grounds - data.js
  zero waste, davis - researched place data for davis, ca.
  loaded before script.js in index.html.
*/

var CATEGORIES = [
  { id: 'all',        label: 'all',                 color: '#15130F' },
  { id: 'refill',     label: 'refill & bulk',        color: '#2F9BD6' },
  { id: 'repair',     label: 'repair',               color: '#4F6BFF' },
  { id: 'secondhand', label: 'secondhand & reuse',   color: '#805AD5' },
  { id: 'toollib',    label: 'tool library',          color: '#00A3C4' },
  { id: 'compost',    label: 'compost & recycling',  color: '#38A169' },
  { id: 'swap',       label: 'swap & share',          color: '#FF9D00' },
  { id: 'food',       label: 'food & farmers market', color: '#C2185B' },
  { id: 'cafe',       label: 'bring your own cup',    color: '#8B5CF6' }
];

var SEED_DATA = [
  {
    id: 'zw1',
    name: 'Davis Food Co-op',
    category: 'refill',
    lat: 38.54956, lng: -121.73985,
    geocodeAddress: '620 G St, Davis, CA 95616',
    address: '620 G St, Davis, CA 95616',
    link: 'https://davisfood.coop/',
    description: 'community-owned grocery with several distinct ways to cut down on packaging in one stop. also carries dairy in returnable glass bottles from a local creamery - you pay a deposit, return the bottle, get a refund.',
    source: 'researched',
    tags: ['community'],
    lastVerified: '2026-06-22',
    personalNote: "my home base. most of what I actually need week to week is here without ever leaving davis - the only thing worth leaving town for is dairy, since that's the one thing I won't let sit around waiting for a day trip.",
    parts: [
      {
        name: 'Refill station',
        description: 'bring your own bottles for household cleaners and body care products (soap, shampoo, lotion) - weigh your empty container, fill it up, pay by weight.'
      },
      {
        name: 'Bulk department',
        description: 'over 750 items sold loose by weight - grains, beans, flours, spices, nuts, dried fruit, coffee, tea, and more. bring your own jars or bags, or use the paper bags provided.',
        pdf: {
          label: 'full bulk item list (PDF)',
          url: 'https://davisfood.coop/wp-content/uploads/2022/12/DFC-Bulk-List-Updated-1_23_23-Sheet4.pdf'
        }
      },
      {
        name: 'Glass bottle dairy',
        description: 'milk and cream available in returnable glass bottles. pay a deposit at checkout, bring the empty back to the co-op, get your deposit refunded. keeps glass in circulation instead of landfill.'
      },
      {
        name: 'Bath & body refill wall',
        description: 'bulk dish soap, laundry soap, liquid lotion, liquid shampoo, and liquid conditioner by the ounce. Dr. Bronner\'s is available both in bulk jugs and pre-packaged cartons if you\'d rather grab and go.'
      },
      {
        name: 'Toothpaste tabs & bars',
        description: 'toothpaste tabs come in recyclable packaging. shampoo and conditioner bars are here too, including a Camuu neem oil bar for dandruff.'
      },
      {
        name: 'Sunscreen & balms',
        description: 'Badger Balm products in tin, including sunscreen. Attitude sunscreen also available in cardboard packaging as a second option.'
      },
      {
        name: 'Bulk medicinal & period care',
        description: 'a small selection of medicinal items sold in bulk, plus reusable period products for purchase.'
      },
      {
        name: 'Makeup',
        description: 'eyeshadow and lip products from Fat and the Moon, a small-batch natural makeup brand, sold in-store.'
      }
    ]
  },
  {
    id: 'zw2',
    name: 'Community Mercantile',
    category: 'secondhand',
    lat: 38.54933, lng: -121.71962,
    geocodeAddress: '622 Cantrill Dr, Davis, CA 95618',
    address: '622 Cantrill Dr, Davis, CA 95618',
    link: 'https://www.communitymercdavis.org/',
    description: 'reuse shop and nonprofit working to keep usable goods out of the landfill - clothing, housewares, furniture, tools, and more, all secondhand. also runs a tool lending library on-site.',
    source: 'researched',
    tags: ['nonprofit', 'volunteer-run'],
    lastVerified: '2026-06-22',
    parts: [
      {
        name: 'Thrift shop',
        description: 'clothing, household items, furniture, and small appliances. well-organized and reasonably priced - worth checking before buying anything new.'
      },
      {
        name: 'Library of Things',
        description: 'over 100 tools and items available to borrow - power tools, party supplies, camping gear, and more. $15/year membership, no per-item fee.'
      }
    ]
  },
  {
    id: 'zw3',
    name: 'Community Mercantile - Library of Things',
    category: 'toollib',
    lat: 38.54933, lng: -121.71962,
    geocodeAddress: '622 Cantrill Dr, Davis, CA 95618',
    address: '622 Cantrill Dr, Davis, CA 95618',
    link: 'https://www.communitymercdavis.org/library-of-things',
    description: 'tool and equipment lending library run out of Community Mercantile - over 100 items available, from power tools to party supplies. $15/year membership, no per-item fee.',
    source: 'researched',
    tags: ['membership', 'nonprofit'],
    lastVerified: '2026-06-22'
  },
  {
    id: 'zw4',
    name: 'Davis Bike Collective',
    category: 'repair',
    lat: 38.54722, lng: -121.73445,
    geocodeAddress: '1221 4th St, Davis, CA 95616',
    address: '1221 1/2 4th St, Davis, CA 95616',
    link: 'https://davisbikecollective.org/',
    description: 'volunteer-run nonprofit DIY bike shop. bring your own bike and fix it yourself with their tools, stock of used parts, and guidance from volunteers - they teach, they don\'t do the repair for you.',
    source: 'researched',
    tags: ['volunteer-run', 'nonprofit', 'donation-based'],
    lastVerified: '2026-06-22'
  },
  {
    id: 'zw4b',
    name: 'Davis Bike Garage',
    category: 'repair',
    lat: 38.55058, lng: -121.71530,
    geocodeAddress: '606 Pena Dr #300, Davis, CA 95618',
    address: '606 Pena Dr #300, Davis, CA 95618',
    link: 'https://daviswiki.org/Davis_Bike_Garage',
    description: 'community bike garage offering free basic bike repairs and tune-ups. you can also donate your old bike here - they refurbish donated bikes and redistribute them to people in the community who need them.',
    source: 'researched',
    tags: ['free', 'volunteer-run', 'nonprofit'],
    lastVerified: '2026-06-22',
    parts: [
      {
        name: 'Free repair service',
        description: 'volunteers provide free basic repairs and tune-ups - flat tires, brake adjustments, cable replacements. come by during open hours.'
      },
      {
        name: 'Bike donation',
        description: 'drop off a bike you no longer need. they clean it up, fix what needs fixing, and pass it along to someone in Davis who needs wheels. keeps bikes out of the landfill and in the community.'
      }
    ]
  },
  {
    id: 'zw5',
    name: 'yololab Repair Café',
    category: 'repair',
    lat: 38.55682, lng: -121.74710,
    geocodeAddress: '315 E 14th St, Davis, CA 95616',
    address: 'Mary L. Stephens Davis Branch Library, 315 E 14th St, Davis, CA 95616',
    link: 'https://yolocountylibrary.org/yololab/',
    description: 'recurring repair café inside the public library\'s yololab makerspace - bring broken electronics, furniture, and small appliances, and trained volunteers help you fix them. the makerspace also has tools, a 3D printer, and craft equipment available for public use. check the library calendar for the next repair café date.',
    source: 'official',
    tags: ['free', 'volunteer-run'],
    lastVerified: '2026-06-22'
  },
  {
    id: 'zw6',
    name: 'Recology Davis Recycling Center',
    category: 'compost',
    lat: 38.54901, lng: -121.71778,
    geocodeAddress: '2727 2nd St, Davis, CA 95618',
    address: '2727 2nd St, Davis, CA 95618',
    link: 'https://www.recology.com/recology-davis/',
    description: 'free 24/7 drop-off for recyclables the curbside cart won\'t take in bulk: cardboard, scrap metal, cartons, used motor oil and filters, sharps containers, and more. CRV buy-back and mattress recycling available during staffed hours. also a drop-off point for sharps and metal razor blades - important for safety razor users doing zero waste shaving.',
    source: 'official',
    tags: ['free', '24-7'],
    lastVerified: '2026-06-22',
    parts: [
      {
        name: 'Recycling drop-off (24/7)',
        description: 'cardboard, scrap metal, cartons, used motor oil and filters. free, no attendant needed.'
      },
      {
        name: 'Sharps & razor blade drop-off',
        description: 'safe disposal for used razor blades (safety razors, cartridge heads), syringes, and other sharps. if you\'ve switched to a safety razor to avoid plastic cartridges, this is where the used blades go - do not throw loose blades in the trash or recycling.'
      }
    ]
  },
  {
    id: 'zw7',
    name: 'Davis Farmers Market',
    category: 'food',
    lat: 38.54469, lng: -121.74405,
    geocodeAddress: 'Central Park, 4th St & C St, Davis, CA 95616',
    address: 'Central Park, 4th & C St, Davis, CA 95616',
    link: 'https://www.davisfarmersmarket.org/',
    description: 'one of the best farmers markets in California - twice weekly, year-round. produce, bread, baked goods, eggs, flowers, hot food, and more from local farms and vendors. buying direct from farmers is one of the most zero-waste ways to shop: minimal packaging, no supply chain waste, and you can bring your own bags and containers.',
    source: 'researched',
    tags: ['community'],
    lastVerified: '2026-06-22',
    parts: [
      {
        name: 'Produce',
        description: 'local, often organic fruit and vegetables direct from farms - no plastic clamshells, no supermarket packaging. bring your own bags or reuse paper bags from home.'
      },
      {
        name: 'Bread & baked goods',
        description: 'several bakery vendors including Uppercrrust Bakery. bring a mesh bag, a pillowcase, or a cloth bread bag - many vendors will put your loaf directly in it instead of using a paper or plastic bag.'
      }
    ]
  },
  {
    id: 'zw8',
    name: 'Uppercrrust Bakery',
    category: 'food',
    lat: 38.55020, lng: -121.74010,
    geocodeAddress: '634 G St, Davis, CA 95616',
    address: '634 G St, Davis, CA 95616',
    link: 'https://www.daviswiki.org/Uppercrrust_Bakery',
    description: 'a great local bakery that also sells at the farmers market on saturdays. bring a mesh bag, pillowcase, or cloth bag - they\'ll put your loaf or pastries directly into it so you skip the paper bag entirely.',
    personalNote: "heads up: this only covers baked goods. if you order a drink for here, hot drinks come in real glassware, but a cold drink still comes in a plastic to-go cup even if you're staying to drink it.",
    source: 'researched',
    tags: ['community'],
    lastVerified: '2026-06-22'
  },
  {
    id: 'zw9',
    name: "Mishka's Cafe",
    category: 'cafe',
    lat: 38.54315, lng: -121.74052,
    geocodeAddress: '610 2nd St, Davis, CA 95616',
    address: '610 2nd St, Davis, CA 95616',
    link: 'https://www.mishkascafe.com/',
    description: 'downtown Davis coffee shop roasting organic fair trade beans since 1995. bring your own mug for your order to go. if you\'re staying to drink it, they\'ll serve you in real glassware instead of a disposable cup.',
    source: 'researched',
    tags: ['community'],
    lastVerified: '2026-07-05'
  },
  {
    id: 'zw10',
    name: 'Pachamama Coffee',
    category: 'cafe',
    lat: 38.54352, lng: -121.73869,
    geocodeAddress: '130 G St, Davis, CA 95616',
    address: '130 G St, Davis, CA 95616',
    link: 'https://pachamamacoffee.com/',
    description: 'coffee cooperative that is 100% owned by the smallholder farmers who grow the beans. honors your own cup for orders, both to-go and for here.',
    personalNote: "my favorite coffee in davis. it's pricier than a chain, but it's farmer-owned and the sourcing is genuinely ethical - worth it.",
    source: 'researched',
    tags: ['community'],
    lastVerified: '2026-07-05'
  },
  {
    id: 'zw11',
    name: 'East Davis Little Free Library',
    category: 'swap',
    lat: 38.55408, lng: -121.72331,
    geocodeAddress: '2222 E 8th St, Davis, CA 95618',
    address: '2222 E 8th St, Davis, CA 95618',
    link: 'https://littlefreelibrary.org/map/',
    description: 'a small, open-24/7 book box. take a book, leave a book, no card or account needed! easy to walk past without registering it as a real zero waste habit, but every book taken here is one that you do not need buy new or get shipped. a good way to also learn what your local community enjoys reading, and to share your own favorites.',
    personalNote: "this is one of several little free libraries scattered around davis, not the only one. the official map link above will show whichever ones are closest to wherever you're starting from. also try opengrounds davis commons for a larger list of little free libraries in davis, plus other free and sharing resources.",
    source: 'researched',
    tags: ['free', 'volunteer-run'],
    lastVerified: '2026-07-05'
  }
];


/*
  DAYTRIP_DATA
  refill shops and zero waste stores beyond davis - reachable by bike,
  amtrak capitol corridor, bart, or bus, no car required. separate from
  SEED_DATA because these aren't on the davis map - they get their own
  tab with transit directions instead of a pin.

  status: 'favorite' | 'regular' | 'want-to-visit'
  images: file paths under images/daytrips/ - empty until I add photos.
          drop a file in that folder and list its path here to have it
          show up in the drawer gallery.
*/
var DAYTRIP_DATA = [
  {
    id: 'dt-reup',
    name: 'Re-Up Refills',
    city: 'Rockridge, Oakland, CA',
    category: 'refill',
    address: '6025 College Ave, Oakland, CA 94618',
    link: 'https://reuprefills.org/',
    status: 'favorite',
    statusLabel: "my favorite - worth the trip",
    distanceLabel: '68 mi southwest of davis',
    personalNote: "I go once a month, sometimes every other month. this is the one I think has pretty much everything and is worth the whole journey. when I lived in berkeley this was my regular stop for oil and vanilla extract too, since the co-op's oil selection isn't great. they do carry dairy in the fridge, but I skip it here since it doesn't survive the ride back to davis.",
    items: ['loofahs', 'gum', 'breath mints', 'toothbrushes', 'floss', 'blue kids hair conditioner (detangles without breaking hair)', 'stain remover stick', 'reusable coffee filter', 'reusable coffee bag (now refilled with coffee from the davis co-op)', 'Cult Crackers', 'Attitude makeup', 'mouthwash tablets (crunch and go)', 'charcoal toothpaste tabs', 'bulk shea butter and vitamin E oil for DIY care'],
    transit: {
      summary: 'amtrak to richmond, transfer to BART to rockridge',
      totalTime: 'roughly 1.5-2 hrs door to door from davis',
      steps: [
        { mode: 'train', title: 'amtrak capitol corridor: davis → richmond', body: 'about 45-50 min. bikes are allowed onboard, so bring yours if you want to skip the walk on the other end.' },
        { mode: 'bart', title: 'BART: richmond → rockridge', body: 'richmond station connects directly to BART. take a Richmond-line train toward Warm Springs/South Fremont or Millbrae/SF and get off at Rockridge, about 20 min.' },
        { mode: 'walk', title: 'walk or bike to College Ave', body: 'Rockridge station puts you about 5 min on foot (or 2 min by bike) from the shop at 6025 College Ave.' }
      ]
    },
    images: [],
    source: 'researched',
    lastVerified: '2026-07-05'
  },
  {
    id: 'dt-fillgood',
    name: 'Fillgood',
    city: 'Berkeley, CA',
    category: 'refill',
    address: '1579A Solano Ave, Berkeley, CA 94707',
    link: 'https://www.fillgood.co/',
    status: 'regular',
    statusLabel: 'goes regularly - a little easier than re-up',
    distanceLabel: '65 mi southwest of davis',
    personalNote: "I like fillgood - it's a bit easier to get to than re-up. I get cinnamon toothpaste tabs here, a reusable q-tip, and makeup pads from Marleys Monsters (also sold at ecojoyous and re-up). they carry sustainable school supplies too. I used to buy socks here, but I don't buy socks anymore since I mend my own now.",
    items: ['cinnamon toothpaste tabs', 'reusable cotton swab', 'Marleys Monsters makeup remover pads', 'sustainable school supplies'],
    transit: {
      summary: 'amtrak to berkeley, then a bike ride up Solano Ave',
      totalTime: 'roughly 1.5 hrs door to door from davis',
      steps: [
        { mode: 'train', title: 'amtrak capitol corridor: davis → berkeley', body: 'about 55-65 min direct, no transfer. the Berkeley station is at 3rd & University.' },
        { mode: 'bike', title: 'bike north to Solano Ave', body: 'about 2 miles, mostly flat, 12-15 min. north berkeley BART is also nearby if you\'d rather walk the last stretch from there.' }
      ]
    },
    images: [],
    source: 'researched',
    lastVerified: '2026-07-05'
  },
  {
    id: 'dt-ecojoyous',
    name: 'EcoJoyous',
    city: 'Old Sacramento, CA',
    category: 'refill',
    address: '110 L St, Sacramento, CA 95814',
    link: 'https://www.ecojoyous.com/',
    status: 'regular',
    statusLabel: 'goes most of the time for toothpaste tabs & mouthwash',
    distanceLabel: '15 mi east of davis',
    personalNote: "run by Hope, who I know and really like. this is usually where I get toothpaste tabs and mouthwash, plus bamboo utensils and cleaning supplies. also sells liquid sunscreen in bulk if you're avoiding pre-bottled ones - still looking for one that doesn't leave a white cast.",
    items: ['toothpaste tabs', 'mouthwash', 'bamboo utensils', 'bulk liquid sunscreen', 'cleaning supplies'],
    transit: {
      summary: 'closest day trip - amtrak or bike, then a short walk',
      totalTime: 'roughly 30-40 min door to door from davis',
      steps: [
        { mode: 'train', title: 'amtrak capitol corridor: davis → sacramento valley station', body: 'about 15-20 min. Yolobus 42/42A also runs this route if you\'d rather bus it - slower but cheaper.' },
        { mode: 'walk', title: 'walk into Old Sacramento', body: 'about a half mile, 10 min on foot or 3-4 min by bike, straight toward the riverfront district.' }
      ]
    },
    images: [],
    source: 'researched',
    lastVerified: '2026-07-05'
  },
  {
    id: 'dt-refillmadness',
    name: 'Refill Madness',
    city: 'Midtown Sacramento, CA',
    category: 'refill',
    address: '1828 29th St, Sacramento, CA 95816',
    link: 'https://refillmadnesssacramento.com/',
    status: 'want-to-visit',
    statusLabel: "haven't been yet",
    distanceLabel: '17 mi east of davis',
    personalNote: "on my list but I haven't made it here yet. soap and detergent refillery in midtown, near the Sacramento Natural Foods Co-Op.",
    items: [],
    transit: {
      summary: 'amtrak to sacramento, then bike into midtown',
      totalTime: 'roughly 35-45 min door to door from davis',
      steps: [
        { mode: 'train', title: 'amtrak capitol corridor: davis → sacramento valley station', body: 'about 15-20 min.' },
        { mode: 'bike', title: 'bike into midtown', body: 'about 1.9 miles to 29th & I St, 10-12 min. SacRT light rail toward 29th St station is a backup if you don\'t have a bike with you.' }
      ]
    },
    images: [],
    source: 'researched',
    lastVerified: '2026-07-05'
  },
  {
    id: 'dt-nudge',
    name: 'Nudge Eco Store',
    city: 'Sacramento, CA',
    category: 'refill',
    address: '2131 K St, Sacramento, CA 95811',
    link: 'https://www.nudgeecostore.com/',
    status: 'want-to-visit',
    statusLabel: "haven't been yet",
    distanceLabel: '16 mi east of davis',
    personalNote: "another one on my list. plastic-free household and body goods, no liquid refill bar as of now, but worth a look next time I'm in sacramento.",
    items: [],
    transit: {
      summary: 'amtrak to sacramento, then a short bike ride',
      totalTime: 'roughly 30-40 min door to door from davis',
      steps: [
        { mode: 'train', title: 'amtrak capitol corridor: davis → sacramento valley station', body: 'about 15-20 min.' },
        { mode: 'bike', title: 'bike to K St', body: 'about 1.3 miles, 8 min. easily walkable too, around 25 min on foot.' }
      ]
    },
    images: [],
    source: 'researched',
    lastVerified: '2026-07-05'
  },
  {
    id: 'dt-rainbow',
    name: 'Rainbow Grocery Cooperative',
    city: 'Mission District, San Francisco, CA',
    category: 'refill',
    address: '1745 Folsom St, San Francisco, CA 94103',
    link: 'https://rainbow.coop/',
    status: 'want-to-visit',
    statusLabel: "planning my first visit",
    distanceLabel: '75 mi southwest of davis',
    personalNote: "the one I'm most excited about. worker-owned co-op with a reputation as the bulk mecca of the bay - supposedly almost everything sustainably packaged, but that's unconfirmed until I've actually been. a trip is in the works. photos will go up here once it happens.",
    items: [],
    transit: {
      summary: "amtrak to richmond, BART to 16th St Mission, then a short bike or bus",
      totalTime: 'roughly 2-2.5 hrs door to door from davis',
      steps: [
        { mode: 'train', title: 'amtrak capitol corridor: davis → richmond', body: 'about 45-50 min. bring a bike onboard if you have one.' },
        { mode: 'bart', title: 'BART: richmond → 16th St Mission', body: 'take a Richmond-line train toward Millbrae/SF or Warm Springs/South Fremont, about 30-35 min.' },
        { mode: 'bike', title: 'bike or bus the last stretch', body: 'about 3 min by bike, or hop MUNI 22 or 55 toward Folsom St. either way it\'s a short hop from the station to 1745 Folsom.' }
      ]
    },
    images: [],
    tripStatus: 'upcoming',
    source: 'researched',
    lastVerified: '2026-07-05'
  }
];

/*
  DAYTRIP_CLOSED
  places that no longer operate - kept as a footnote for local
  knowledge, not shown as a card.
*/
var DAYTRIP_CLOSED = [
  { name: 'The Davis Refillery', note: 'closed - no longer operating. was gone by the time I moved back to davis.' }
];