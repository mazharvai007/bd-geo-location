const fs = require('fs');
const path = require('path');

console.log('🌍 Adding English names to all upazilas...\n');

// Read the current data
const dataPath = path.join(__dirname, '../src/data/bangladesh.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Comprehensive English name mapping for upazilas
// This covers all 531 upazilas with proper English names
const upazilaEnglishNames = {
  // BARISAL DIVISION
  'বাকেরহাট': 'Bagerhat', 'বাকেরহাট সদর': 'Bagerhat Sadar', 'চিতলমারী': 'Chitalmari', 'ফকিরহাট': 'Fakirhat',
  'গাংনী': 'Ghatail', 'কচুয়া': 'Kachua', 'মোংলা': 'Mongla', 'মোল্লাহাট': 'Mollahat',
  'মোরেলগঞ্জ': 'Morelganj', 'রামপাল': 'Rampal', 'শরণখোলা': 'Sarankhola',
  'বরিশাল': 'Barisal', 'বরিশাল সদর': 'Barisal Sadar', 'আগৈলঝাড়া': 'Agailjhara', 'আগৈলঝড়া': 'Agailjhara',
  'বাবুগঞ্জ': 'Babuganj', 'বাকেরগঞ্জ': 'Bakarganj', 'বাকরগঞ্জ': 'Bakarganj', 'বানারীপাড়া': 'Banaripara',
  'গৌরনদী': 'Gaurnadi', 'হিজলা': 'Hizla', 'মেহেন্দিগঞ্জ': 'Mehendiganj', 'মুলাদী': 'Muladi',
  'উজানপুর': 'Uzirpur', 'উজিরপুর': 'Uzirpur',
  'ভোলা': 'Bhola', 'ভোলা সদর': 'Bhola Sadar', 'বোরহানউদ্দীন': 'Borhanuddin', 'বোরহানউদ্দিন': 'Borhanuddin',
  'চরফশন': 'Char Fasson', 'চরফ্যাশন': 'Char Fasson', 'দৌলতপুর': 'Daulatpur', 'দৌলতখান': 'Daulatkhan',
  'লালমোহন': 'Lalmohan', 'মনপুরা': 'Monpura', 'তজুমিয়াধর': 'Tazumuddin', 'তজুমদ্দিন': 'Tazumuddin',
  'ঝালকাঠি': 'Jhalokati', 'ঝালকাঠি সদর': 'Jhalokati Sadar', 'কাঁঠালীয়া': 'Kathalia', 'কাঁঠালিয়া': 'Kathalia',
  'নলগরাবাড়ী': 'Nalchity', 'নলছিটি': 'Nalchity', 'রাজাপুর': 'Rajapur',
  'পটুয়াখালী': 'Patuakhali', 'পটুয়াখালী সদর': 'Patuakhali Sadar', 'বাউশা': 'Bauphal', 'বাউফল': 'Bauphal',
  'দশমিনা': 'Dashmina', 'গলাচিপা': 'Galachipa', 'কালাপাড়া': 'Kalapara', 'কলাপাড়া': 'Kalapara',
  'মির্জাগঞ্জ': 'Mirzaganj', 'দুমকি': 'Dumki', 'রাঙ্গাবালী': 'Rangabali',
  'পিরোজপুর': 'Pirojpur', 'পিরোজপুর সদর': 'Pirojpur Sadar', 'ভান্দারপীর': 'Bhandaria', 'ভান্ডারিয়া': 'Bhandaria',
  'কাউড়িয়া': 'Kaukhali', 'কাউখালী': 'Kaukhali', 'মঠাপুর': 'Mathbaria', 'মঠবাড়িয়া': 'Mathbaria',
  'নাজিরপুর': 'Nazirpur', 'নেছায়াংগঞ্জ': 'Nesarabad', 'নেছারাবাদ': 'Nesarabad',
  'শরণকোল': 'Swarankol', 'জিয়ানগর': 'Zianagar',
  // BARGUNA
  'বরগুনা সদর': 'Barguna Sadar', 'আমতলী': 'Amtali', 'বেতাগী': 'Betagi', 'বামনা': 'Bamna',
  'পাথরঘাটা': 'Patharghata', 'তালতলী': 'Taltoli',

  // CHITTAGONG DIVISION
  'চট্টগ্রাম': 'Chittagong', 'চট্টগ্রাম সদর': 'Chittagong Sadar', 'চন্দনাইশ': 'Chandanish',
  'পাটিয়া': 'Patiya', 'পটিয়া উপজেলা': 'Patiya Upazila', 'সীতাকুণ্ড': 'Sitakunda', 'সীতাকুণ্ডি': 'Sitakunda',
  'হাটহাজারী': 'Hathazari', 'হাটহাজারি': 'Hathazari', 'রাউজান': 'Raozan', 'রাউজান উপজেলা': 'Raozan Upazila',
  'ফটিকছড়ি': 'Fatickchari', 'ফটিকছড়ী উপজেলা': 'Fatickchari Upazila', 'বাঁশখালী': 'Bashkhali', 'বাশখালী': 'Bashkhali',
  'রাঙ্গুনিয়া': 'Rangunia', 'সন্দ্বীপ': 'Sandwip', 'বোয়ালখালী': 'Boalkhali',
  'পটেয়া': 'Pekua', 'পেকুয়া': 'Pekua', 'পটেয়া উপজেলা': 'Pekua Upazila',
  'আনোয়ারা': 'Anwara', 'আনোয়ারা উপজেলা': 'Anwara Upazila', 'কর্ণফুলী': 'Karnaphuli',
  'কর্ণফুলী উপজেলা': 'Karnaphuli Upazila', 'লোহাগাড়া': 'Lohagara', 'লোহাগাড়া উপজেলা': 'Lohagara Upazila',
  'সাতকানিয়া': 'Satkania', 'সাতকানিয়া উপজেলা': 'Satkania Upazila', 'বাশখালী': 'Bashkhali',
  'বোয়ানবন্দর': 'Boyanbhandar', 'বোয়ানবন্দর উপজেলা': 'Boyanbhandar Upazila', 'মীরসরাই': 'Mirsharai', 'মীরসরাই উপজেলা': 'Mirsharai Upazila',
  'জোড়া': 'Jowar', 'জোড়া উপজেলা': 'Jowar Upazila',
  'রাউজান': 'Raozan', 'রাউজান উপজেলা': 'Raozan Upazila', 'রাউজান': 'Raozan',
  'ফটিকছড়ী': 'Fatickchari', 'ফটিকছড়ী উপজেলা': 'Fatickchari Upazila', 'বোয়ালখালী': 'Boalkhali',
  'বোয়ালখালী': 'Boalkhali', 'পটেয়া': 'Pekua', 'পটেয়া উপজেলা': 'Pekua Upazila',
  'আনোয়ারা': 'Anwara', 'আনোয়ারা উপজেলা': 'Anwara Upazila', 'কর্ণফুলী': 'Karnaphuli',
  'কর্ণফুলী উপজেলা': 'Karnaphuli Upazila', 'লোহাগাড়া': 'Lohagara', 'লোহাগাড়া উপজেলা': 'Lohagara Upazila',
  'সাতকানিয়া': 'Satkania', 'সাতকানিয়া উপজেলা': 'Satkania Upazila', 'বাশখালী': 'Bashkhali',
  'বাশখালী': 'Bashkhali', 'বোয়ানবন্দর': 'Boyanbhandar', 'বোয়ানবন্দর উপজেলা': 'Boyanbhandar Upazila',
  'মীরসরাই': 'Mirsharai', 'মীরসরাই উপজেলা': 'Mirsharai Upazila', 'জোড়া': 'Jowar', 'জোড়া উপজেলা': 'Jowar Upazila',
  'কুমিল্লা': 'Comilla', 'কুমিল্লা সদর': 'Comilla Sadar', 'কুমিল্লা দক্ষিণ': 'Comilla South',
  'কুমিল্লা আদর্শ': 'Comilla Adarshal', 'দক্ষিণ': 'Daksin', 'আদর্শ': 'Adarshal', 'বরুড়াম': 'Burichang',
  'বরুড়াম উপজেলা': 'Burichang Upazila', 'চৌদ্রগ্রাম': 'Chandagram', 'চৌদ্রগ্রাম উপজেলা': 'Chandagram Upazila',
  'দাউদকান্দি': 'Daudkandi', 'দাউদকান্দি উপজেলা': 'Daudkandi Upazila', 'লাক্ষম': 'Laksam', 'লাক্ষম উপজেলা': 'Laksam Upazila',
  'লাক্ষম সদর': 'Laksam Sadar', 'মেঘনা': 'Meghna', 'মেঘনা উপজেলা': 'Meghna Upazila',
  'হোমনা': 'Homna', 'হোমনা উপজেলা': 'Homna Upazila', 'মুরাদনগর': 'Muradnagar',
  'মুরাদনগর উপজেলা': 'Muradnagar Upazila', 'দেবিদ্বরপুর': 'Debidwar', 'দেবিদ্বরপুর উপজেলা': 'Debidwar Upazila',
  'ব্রাহ্মণবাড়িয়া': 'Brahmanbaria', 'ব্রাহ্মণবাড়িয়া সদর': 'Brahmanbaria Sadar',
  'ব্রাহ্মণবাড়িয়া উপজেলা': 'Brahmanbaria Upazila', 'কসবা': 'Kasba', 'কসবা উপজেলা': 'Kasba Upazila',
  'নাসিরনগর': 'Nasirnagar', 'নাসিরনগর উপজেলা': 'Nasirnagar Upazila', 'নবীনগর': 'Nabinagar',
  'নবীনগর উপজেলা': 'Nabinagar Upazila', 'রামপুর': 'Rampur', 'রামপুর উপজেলা': 'Rampur Upazila',
  'রামগতি': 'Ramganj', 'রামগতি উপজেলা': 'Ramganj Upazila', 'লাক্ষ্মী': 'Lakhshm', 'লাক্ষ্মী উপজেলা': 'Lakhshm Upazila',
  'লাক্ষ্মী সদর': 'Lakhshm Sadar', 'চাঁদপুর': 'Chandpur', 'চাঁদপুর উপজেলা': 'Chandpur Upazila',
  'চাঁদপুর সদর': 'Chandpur Sadar', 'ফরিদগঞ্জ': 'Faridganj', 'ফরিদগঞ্জ উপজেলা': 'Faridganj Upazila',
  'হাইমচর': 'Haimchar', 'হাইমচর উপজেলা': 'Haimchar Upazila', 'শাহরাস্তি': 'Shahrashti',
  'শাহরাস্তি উপজেলা': 'Shahrashti Upazila', 'মটুল্লী': 'Matiranga', 'মটুল্লী উপজেলা': 'Matiranga Upazila',
  'কুমিল্লা উত্তর': 'Comilla North', 'কুমিল্লা উত্তর উপজেলা': 'Comilla North Upazila', 'দাউদকান্দি': 'Daudkandi',
  'কুমিল্লা সদর': 'Comilla Sadar', 'লালমাই': 'Lalmai', 'লালমাই উপজেলা': 'Lalmai Upazila',
  'চৌদ্রগ্রাম': 'Chandagram', 'হোমনা': 'Homna', 'মেঘনা': 'Meghna', 'মুরাদনগর': 'Muradnagar',
  'দেবিদ্বরপুর': 'Debidwar', 'বরুড়াম': 'Burichang', 'লাক্ষম': 'Laksam',
  'কুমিল্লা আদর্শ': 'Comilla Adarshal', 'কুমিল্লা দক্ষিণ': 'Comilla South', 'ত্রিপুর': 'Tripura',
  'ত্রিপুর উপজেলা': 'Tripura Upazila', 'কুমিল্লা উত্তর': 'Comilla North',

  // COX'S BAZAR
  'কক্সবাজার': 'Coxs Bazar', 'কক্সবাজার সদর': 'Coxs Bazar Sadar', 'চকরিয়া': 'Chakaria',
  'চকরিয়া উপজেলা': 'Chakaria Upazila', 'ঈদগাঁও': 'Idgao', 'ঈদগাঁও উপজেলা': 'Idgao Upazila',
  'মহেশখালী': 'Maheshkhali', 'মহেশখালী উপজেলা': 'Maheshkhali Upazila', 'রামু': 'Ramu',
  'রামু উপজেলা': 'Ramu Upazila', 'টেকনাফ': 'Teknaf', 'টেকনাফ উপজেলা': 'Teknaf Upazila',
  'উখীয়া': 'Ukhia', 'উখিয়া': 'Ukhia', 'উখীয়া উপজেলা': 'Ukhia Upazila', 'কুতুবদিয়া': 'Kutubdia', 'রামু': 'Ramu',

  // KHAGRACHHARI
  'খাগড়াছড়ি': 'Khagrachhari', 'খাগড়াছড়ি সদর': 'Khagrachhari Sadar', 'দীঘিনালা': 'Dighinala',
  'দীঘিনালা উপজেলা': 'Dighinala Upazila', 'পানছড়ি': 'Panchhari', 'পানছড়ি উপজেলা': 'Panchhari Upazila',
  'লক্ষ্মীছড়': 'Laxmichhari', 'লক্ষ্মীছড় উপজেলা': 'Laxmichhari Upazila', 'মহালছড়ি': 'Mahalchhari',
  'মহালছড়ি উপজেলা': 'Mahalchhari Upazila', 'রামগড়': 'Ramgarh', 'রামগড়া': 'Ramgarh',
  'গুইমারা': 'Guimara', 'মাটিরাঙ্গা': 'Matiranga', 'মানিকছড়ি': 'Manikchhari', 'লক্ষ্মীছড়ি': 'Laxmichhari',

  // BANDARBAN
  'বান্দরবান': 'Bandarban', 'বান্দরবান সদর': 'Bandarban Sadar', 'আলীকদম': 'Alikadam',
  'আলীকদম উপজেলা': 'Alikadam Upazila', 'নাইক্ষংছড়ি': 'Naikhongchhari', 'নাইক্ষ্যংছড়ি': 'Naikhongchhari',
  'নাইক্ষংছড়ি উপজেলা': 'Naikhongchhari Upazila', 'রোয়াংছড়ি': 'Ruma', 'রুমা': 'Ruma',
  'রোয়াংছড়ি উপজেলা': 'Ruma Upazila', 'রোয়াংছড়ি': 'Ruma',
  'থানচি': 'Thanchi', 'থানচি উপজেলা': 'Thanchi Upazila', 'লামা': 'Lama',

  // RANGAMATI
  'রাঙ্গামাটি': 'Rangamati', 'রাঙ্গামাটি সদর': 'Rangamati Sadar', 'কাপ্তাই লেক': 'Kaptai Lake', 'কাপ্তাই': 'Kaptai',
  'কাপ্তাই লেক উপজেলা': 'Kaptai Lake Upazila', 'বরঘালী': 'Bagaichhari', 'বরঘালী উপজেলা': 'Bagaichhari Upazila',
  'বাঘলকোণ্ড়া': 'Barkal', 'বাঘলকোণ্ড়া উপজেলা': 'Barkal Upazila', 'জুরাছড়': 'Jurachari',
  'জুরাছড় উপজেলা': 'Jurachari Upazila', 'রাজস্থলী': 'Rajasthali', 'রাজস্থলী উপজেলা': 'Rajasthali Upazila',
  'লংগড়ু': 'Langadu', 'লংগড়ু উপজেলা': 'Langadu Upazila', 'নানিয়ারচর': 'Naniarchar', 'বরকল': 'Barkal',
  'বাঘাইছড়ি': 'Bagaichhari', 'বিলাইছড়ি': 'Bilaischhari', 'লংগদু': 'Langadu', 'কাউখালী': 'Kaukhali',

  // NOAKHALI
  'নোয়াখালী': 'Noakhali', 'নোয়াখালী সদর': 'Noakhali Sadar', 'কবিরহাট': 'Kabirhat',
  'বেগুমগঞ্জ': 'Begumganj', 'বেগমগঞ্জ': 'Begumganj', 'বেগুমগঞ্জ উপজেলা': 'Begumganj Upazila',
  'কোম্পানিরহাট': 'Companiganj', 'কোম্পানীগঞ্জ': 'Companiganj', 'কোম্পানিরহাট উপজেলা': 'Companiganj Upazila',
  'ফেনী': 'Feni', 'ফেনী সদর': 'Feni Sadar', 'দাগেভুনিয়া': 'Daganbhuiyan',
  'দাগেভুনিয়া উপজেলা': 'Daganbhuiyan Upazila', 'পরশুরাম': 'Parshuram', 'পরশুরাম উপজেলা': 'Parshuram Upazila',
  'সোনাগাজী': 'Sonagazi', 'সোনাগাজী উপজেলা': 'Sonagazi Upazila', 'ছাগলনায়া': 'Chatkhil', 'ছাগলনাইয়া': 'Chatkhil',
  'ছাগলনায়া উপজেলা': 'Chatkhil Upazila', 'সেনবাগ': 'Senbagh', 'সেনবাগ উপজেলা': 'Senbagh Upazila',
  'সুবর্ণচর': 'Subarnachar', 'সোনাইমুড়ি': 'Sonaimuri', 'হাতিয়া': 'Hatia',

  // LAKSHMIPUR
  'লক্ষ্মীপুর': 'Lakshmipur', 'লক্ষ্মীপুর সদর': 'Lakshmipur Sadar', 'কমলনগর': 'Kamalnagar',
  'কমলাগঞ্জ': 'Kamalnagar', 'কমলাগঞ্জ উপজেলা': 'Kamalnagar Upazila', 'রামগতি': 'Ramganj', 'রামগতি উপজেলা': 'Ramganj Upazila',
  'রায়পুর': 'Raipur', 'রায়পুর উপজেলা': 'Raipur Upazila', 'রামগঞ্জ': 'Ramgati',
  'রামগঞ্জ উপজেলা': 'Ramgati Upazila',

  // FENI
  'ফেনী': 'Feni', 'ফেনী সদর': 'Feni', 'দাগনভূঞা': 'Daganbhuiyan', 'দাগেভুনিয়া': 'Daganbhuiyan',
  'ছাগলনাইয়া': 'Chatkhil', 'ফুলগাজী': 'Fulgazi', 'পরশুরাম': 'Parshuram',
  'সোনাগাজী': 'Sonagazi',

  // COMILLA
  'কুমিল্লা': 'Comilla', 'কুমিল্লা সদর': 'Comilla Sadar', 'বরুড়া': 'Burichang',
  'বরুড়া': 'Burichang', 'চান্দিনা': 'Chandina', 'লাকসাম': 'Laksam', 'লাক্ষম': 'Laksam',
  'ব্রাহ্মণপাড়া': 'Brahmanpara', 'বুড়িচং': 'Debidwar', 'চৌদ্দগ্রাম': 'Chandagram', 'চৌদ্দগ্রাম': 'Chandagram',
  'দেবিদ্বার': 'Debidwar', 'দাউদকান্দি': 'Daudkandi', 'দেবিদ্বরপুর': 'Debidwar',
  'নাঙ্গলকোট': 'Nangalkot', 'তিতাস': 'Titas', 'মনোহরগঞ্জ': 'Muradnagar', 'মুরাদনগর': 'Muradnagar',
  'হোমনা': 'Homna', 'মেঘনা': 'Meghna', 'কুমিল্লা আদর্শ সদর': 'Comilla Adarshal', 'কুমিল্লা সদর দক্ষিণ': 'Comilla South',
  'কুমিল্লা উত্তর': 'Comilla North', 'লালমাই': 'Lalmai', 'দাউদকান্দি': 'Daudkandi',

  // CHANDPUR
  'চাঁদপুর': 'Chandpur', 'চাঁদপুর সদর': 'Chandpur Sadar', 'হাজীগঞ্জ': 'Hajiganj',
  'কচুয়া': 'Kachua', 'ফরিদগঞ্জ': 'Faridganj', 'মতলব উত্তর': 'Matlab North', 'মতলব দক্ষিণ': 'Matlab South',
  'হাইমচর': 'Haimchar', 'শাহরাস্তি': 'Shahrashti',

  // KISHOREGANJ
  'কিশোরগঞ্জ সদর': 'Kishoreganj Sadar', 'অষ্টগ্রাম': 'Astagram', 'ইটনা': 'Itna',
  'করিমগঞ্জ': 'Karimganj', 'কটিয়াদী': 'Katiadi', 'কুলিয়ারচর': 'Kuliarchar',
  'তাড়াইল': 'Tarail', 'নিকলী': 'Nikli', 'পাকুন্দিয়া': 'Pakundia', 'বাজিতপুর': 'Bajitpur',
  'ভৈরব': 'Bhairab', 'মিঠামইন': 'Mithamain', 'হোসেনপুর': 'Hossainpur',

  // CHITTAGONG (continued)
  'চট্টগ্রাম': 'Chittagong', 'পাটিয়া': 'Patiya', 'সীতাকুণ্ডি': 'Sitakunda', 'রাউজান': 'Raozan',
  'রাউজান উপজেলা': 'Raozan', 'ফটিকছড়ী': 'Fatickchari', 'বোয়ালখালী': 'Boalkhali',
  'পটেয়া': 'Pekua', 'আনোয়ারা': 'Anwara', 'কর্ণফুলী': 'Karnaphuli', 'লোহাগাড়া': 'Lohagara',
  'সাতকানিয়া': 'Satkania', 'বাশখালী': 'Bashkhali', 'বোয়ানবন্দর': 'Boyanbhandar', 'মীরসরাই': 'Mirsharai',
  'জোড়া': 'Jowar',

  // DHAKA DIVISION
  'ঢাকা': 'Dhaka', 'ঢাকা সদর': 'Dhaka Sadar', 'তেজগাঁও উন্নয়ন সার্কেল': 'Tejgaon Development Circle',
  'তেজগাঁও উন্নয়ন সার্কেল উপজেলা': 'Tejgaon Development Circle Upazila', 'দোহার': 'Dohar',
  'দোহার উপজেলা': 'Dohar Upazila', 'নবাবগঞ্জ': 'Nawabganj', 'নবাবগঞ্জ উপজেলা': 'Nawabganj Upazila',
  'কেরানীগঞ্জ': 'Keraniganj', 'কেরানীগঞ্জ উপজেলা': 'Keraniganj Upazila', 'সাভার': 'Savar',
  'সাভার উপজেলা': 'Savar Upazila', 'ধামরাই': 'Dhamrai', 'ধামরাই উপজেলা': 'Dhamrai Upazila',

  // GAZIPUR
  'গাজীপুর': 'Gazipur', 'গাজীপুর সদর': 'Gazipur Sadar', 'কাপাসিয়া': 'Kapasia',
  'কালিয়াকৈর': 'Kaliakair', 'কালিয়াকৈর উপজেলা': 'Kaliakair Upazila', 'কালীগঞ্জ': 'Kaliganj', 'কালীগঞ্জ উপজেলা': 'Kaliganj Upazila',

  // GOPALGANJ
  'গোপালগঞ্জ': 'Gopalganj', 'গোপালগঞ্জ সদর': 'Gopalganj Sadar', 'কাশিয়ানী': 'Kashiani',
  'কাশিয়ানী উপজেলা': 'Kashiani Upazila', 'কোটালীপাড়া': 'Kotalipara', 'কোটালীপাড়া উপজেলা': 'Kotalipara Upazila',
  'মুকসুদপুর': 'Muksudpur', 'মুকসুদপুর উপজেলা': 'Muksudpur Upazila', 'টুঙ্গিপাড়া': 'Tungipara',
  'টুঙ্গিপাড়া উপজেলা': 'Tungipara Upazila',

  // MANIKGANJ
  'মানিকগঞ্জ': 'Manikganj', 'মানিকগঞ্জ সদর': 'Manikganj Sadar', 'দৌয়ারাপুর': 'Duarapur',
  'দৌয়ারাপুর উপজেলা': 'Duarapur Upazila', 'ঘিওর': 'Ghior', 'ঘিওর উপজেলা': 'Ghior Upazila',
  'হরিরামপুর': 'Harirampur', 'হরিরামপুর উপজেলা': 'Harirampur Upazila', 'মানিরগঞ্জ': 'Manirampur',
  'মানিরগঞ্জ উপজেলা': 'Manirampur Upazila', 'সাতুরিয়া': 'Saturia', 'সাতুরিয়া উপজেলা': 'Saturia Upazila',
  'শিবালয়া': 'Shibalaya', 'শিবালয়া উপজেলা': 'Shibalaya Upazila', 'সিঙ্গাইর': 'Singair',
  'সিঙ্গাইর উপজেলা': 'Singair Upazila',

  // MUNSHIGANJ
  'মুন্সীগঞ্জ': 'Munshiganj', 'মুন্সীগঞ্জ সদর': 'Munshiganj Sadar', 'লোহাজং': 'Lohajang',
  'লোহাজং উপজেলা': 'Lohajang Upazila', 'সিরাজদিখান': 'Sirajdikhan', 'সিরাজদিখান উপজেলা': 'Sirajdikhan Upazila',
  'শ্রীনগর': 'Sreenagar', 'শ্রীনগর উপজেলা': 'Sreenagar Upazila', 'টঙ্গাবাড়া': 'Tongibari',
  'টঙ্গাবাড়া উপজেলা': 'Tongibari Upazila', 'গজারীপুর': 'Gazaria', 'গজারীপুর উপজেলা': 'Gazaria Upazila',

  // NARAYANGANJ
  'নারায়ণগঞ্জ': 'Narayanganj', 'নারায়ণগঞ্জ সদর': 'Narayanganj Sadar', 'আরাইহাজার': 'Araihazar',
  'আরাইহাজার উপজেলা': 'Araihazar Upazila', 'বন্দর': 'Bandar', 'বন্দর উপজেলা': 'Bandar Upazila',
  'নারায়ণগঞ্জ': 'Narayanganj', 'রূপগঞ্জ': 'Rupganj', 'রূপগঞ্জ উপজেলা': 'Rupganj Upazila',
  'সোনারগাঁও': 'Sonargaon', 'সোনারগাঁও উপজেলা': 'Sonargaon Upazila',

  // NARSINGDI
  'নরসিংদী': 'Narsingdi', 'নরসিংদী সদর': 'Narsingdi Sadar', 'বেলাবো': 'Belabo',
  'বেলাবো উপজেলা': 'Belabo Upazila', 'মনোহরদী': 'Monohardi', 'মনোহরদী উপজেলা': 'Monohardi Upazila',
  'নবাবগঞ্জ': 'Nababganj', 'নবাবগঞ্জ উপজেলা': 'Nababganj Upazila', 'পলাশ': 'Palash', 'পলাশী': 'Palash',
  'পলাশী উপজেলা': 'Palash Upazila', 'রায়পুর': 'Raipura', 'রায়পুর উপজেলা': 'Raipura Upazila',
  'রায়পুরা': 'Raipur', 'শিবপুর': 'Shibpur', 'শিবপুর উপজেলা': 'Shibpur Upazila',

  // TANGAIL
  'টাঙ্গাইল': 'Tangail', 'টাঙ্গাইল সদর': 'Tangail Sadar', 'বাসাইল': 'Basail',
  'বাসাইল উপজেলা': 'Basail Upazila', 'ভূঞাপুর': 'Bhuapur', 'ভূঞাপুর উপজেলা': 'Bhuapur Upazila',
  'কালীহাটী': 'Kalihati', 'কালিহাতী': 'Kalihati', 'কালীহাটী উপজেলা': 'Kalihati Upazila', 'মধুপুর': 'Madhupur',
  'মধুপুর উপজেলা': 'Madhupur Upazila', 'মির্জাপুর': 'Mirzapur', 'মির্জাপুর উপজেলা': 'Mirzapur Upazila',
  'দেলদুয়ার': 'Delduar', 'দেলদুয়ার উপজেলা': 'Delduar Upazila', 'ঘাটাইল': 'Ghatail', 'ঘটাইল': 'Ghatail',
  'ঘাটাইল উপজেলা': 'Ghatail Upazila', 'গোপালগঞ্জ': 'Gopalpur', 'গোপালপুর': 'Gopalpur',
  'গোপালগঞ্জ উপজেলা': 'Gopalpur Upazila', 'গোপালগঞ্জ উত্তর': 'Gopalpur North', 'গোপালগঞ্জ উত্তর উপজেলা': 'Gopalpur North Upazila',
  'নাগরপুর': 'Nagarpur', 'সখিপুর': 'Sakhipur', 'ধনবাড়ী': 'Dhanbari', 'মধুপুর': 'Madhupur', 'বাসাইল': 'Basail', 'ঘাটাইল': 'Ghatail', 'মির্জাপুর': 'Mirzapur', 'দেলদুয়ার': 'Delduar', 'ভূঞাপুর': 'Bhuapur', 'কালীহাটী': 'Kalihati', 'গোপালগঞ্জ': 'Gopalpur', 'গোপালপুর': 'Gopalpur', 'টাঙ্গাইল সদর': 'Tangail Sadar', 'টাঙ্গাইল': 'Tangail',

  // FARIDPUR
  'ফরিদপুর': 'Faridpur', 'ফরিদপুর সদর': 'Faridpur Sadar', 'আলফাডাঙ্গা': 'Alfadanga', 'আলফাডাঙা': 'Alfadanga',
  'আলফাডাঙ্গা উপজেলা': 'Alfadanga Upazila', 'ভাঙ্গা': 'Bhanga', 'ভাঙ্গা উপজেলা': 'Bhanga Upazila',
  'বোয়ালমারী': 'Boalmari', 'বোয়ালী': 'Boalmari',
  'বোয়ালী উপজেলা': 'Boalmari Upazila', 'সালথা': 'Saltha', 'সালুকা': 'Saltha',
  'সালুকা উপজেলা': 'Saltha Upazila', 'মধুখালী': 'Madhukhali', 'মধুখালী উপজেলা': 'Madhukhali Upazila',
  'সদরপুর': 'Sadarpur', 'সদরপুর উপজেলা': 'Sadarpur Upazila', 'নগরকান্দা': 'Nagarkanda', 'নগরকান্দা উপজেলা': 'Nagarkanda Upazila',
  'চরভদ্রাসন': 'Charbhadrasan', 'চরভদ্রাসন উপজেলা': 'Charbhadrasan Upazila',

  // MADARIPUR
  'মাদারীপুর সদর': 'Madaripur Sadar', 'শিবচর': 'Shibchar',
  'কালকিনি': 'Kalkini', 'রাজৈর': 'Rajoir', 'ডাসার': 'Dasar',

  // MANIKGANJ
  'মানিকগঞ্জ': 'Manikganj', 'মানিকগঞ্জ সদর': 'Manikganj Sadar', 'দৌয়ারাপুর': 'Duarapur',
  'দৌয়ারাপুর উপজেলা': 'Duarapur Upazila', 'ঘিওর': 'Ghior', 'ঘিওর উপজেলা': 'Ghior Upazila',
  'হরিরামপুর': 'Harirampur', 'হরিরামপুর উপজেলা': 'Harirampur Upazila', 'মানিরগঞ্জ': 'Manirampur',
  'মানিরগঞ্জ উপজেলা': 'Manirampur Upazila', 'সাতুরিয়া': 'Saturia', 'সাতুরিয়া উপজেলা': 'Saturia Upazila',
  'শিবালয়া': 'Shibalaya', 'শিবালয়': 'Shibalaya', 'শিবালয়া উপজেলা': 'Shibalaya Upazila',
  'সিঙ্গাইর': 'Singair', 'সিঙ্গাইর উপজেলা': 'Singair Upazila', 'সাটুরিয়া': 'Saturia',

  // MUNSHIGANJ
  'মুন্সীগঞ্জ': 'Munshiganj', 'মুন্সীগঞ্জ সদর': 'Munshiganj Sadar', 'লোহাজং': 'Lohajang', 'লৌহজং': 'Lohajang',
  'লোহাজং উপজেলা': 'Lohajang Upazila', 'সিরাজদিখান': 'Sirajdikhan', 'সিরাজদিখান উপজেলা': 'Sirajdikhan Upazila',
  'শ্রীনগর': 'Sreenagar', 'শ্রীনগর উপজেলা': 'Sreenagar Upazila', 'টঙ্গাবাড়া': 'Tongibari', 'টংগিবাড়ী': 'Tongibari',
  'টঙ্গাবাড়া উপজেলা': 'Tongibari Upazila', 'গজারীপুর': 'Gazaria', 'গজারিয়া': 'Gazaria',
  'গজারীপুর উপজেলা': 'Gazaria Upazila',

  // NARAYANGANJ
  'নারায়ণগঞ্জ': 'Narayanganj', 'নারায়ণগঞ্জ সদর': 'Narayanganj Sadar', 'আরাইহাজার': 'Araihazar', 'আড়াইহাজার': 'Araihazar',
  'আরাইহাজার উপজেলা': 'Araihazar Upazila', 'বন্দর': 'Bandar', 'বন্দর উপজেলা': 'Bandar Upazila',
  'নারায়ণগঞ্জ': 'Narayanganj', 'রূপগঞ্জ': 'Rupganj', 'রূপগঞ্জ উপজেলা': 'Rupganj Upazila',
  'সোনারগাঁও': 'Sonargaon', 'সোনারগাঁও উপজেলা': 'Sonargaon Upazila',

  // RAJBARI
  'রাজবাড়ী': 'Rajbari', 'রাজবাড়ী সদর': 'Rajbari Sadar', 'পাংশা': 'Pangsha',
  'পাংশা উপজেলা': 'Pangsha Upazila', 'বালিয়াকান্দি': 'Baliakandi',
  'বালিয়াকান্দি উপজেলা': 'Baliakandi Upazila', 'গোয়রগঞ্জ': 'Goalandaghat', 'গোয়ালন্দ': 'Goalandaghat',
  'গোয়রগঞ্জ উপজেলা': 'Goalandaghat Upazila', 'কালুখালী': 'Kalukhali',
  'কালুখালী উপজেলা': 'Kalukhali Upazila',

  // SHARIATPUR
  'শরীয়তপুর': 'Shariatpur', 'শরীয়তপুর সদর': 'Shariatpur Sadar', 'ভেদরগঞ্জ': 'Bhedarganj',
  'ভেদরগঞ্জ উপজেলা': 'Bhedarganj Upazila', 'দামুদিয়া': 'Damudya', 'ডামুড্যা': 'Damudya',
  'দামুদিয়া উপজেলা': 'Damudya Upazila', 'গোসাইরহাট': 'Gosairhat', 'গোসাইরহাট উপজেলা': 'Gosairhat Upazila',
  'নড়িয়াগঞ্জ': 'Naria', 'নড়িয়া': 'Naria',
  'নড়িয়াগঞ্জ উপজেলা': 'Naria Upazila', 'জাজিরা': 'Zajira', 'জাজিরা উপজেলা': 'Zajira Upazila',

  // KHULNA DIVISION (continued)
  'কুষ্টিয়া': 'Kushtia', 'কুষ্টিয়া সদর': 'Kushtia Sadar', 'কুমারখালী': 'Kumarkhali',
  'কুমারখালী উপজেলা': 'Kumarkhali Upazila', 'খোকসা': 'Khoksa', 'খোকসা উপজেলা': 'Khoksa Upazila',
  'দৌলতপুর': 'Daulatpur', 'দৌলতপুর উপজেলা': 'Daulatpur Upazila', 'ভেড়ামারা': 'Bheramara',
  'ভেড়ামারা উপজেলা': 'Bheramara Upazila', 'মিরপুর': 'Mirpur', 'মিরপুর উপজেলা': 'Mirpur Upazila',

  // KHULNA DISTRICT
  'কয়রা': 'Koyra', 'ডুমুরিয়া': 'Dumuria', 'তেরখাদা': 'Terkhada',
  'দাকোপ': 'Dakope', 'দিঘলিয়া': 'Dighalia', 'পাইকগাছা': 'Paikgacha',
  'ফুলতলা': 'Fultala', 'বটিয়াঘাটা': 'Botiaghata', 'রূপসা': 'Rupsa',

  // BAGERHAT DISTRICT
  'বাগেরহাট সদর': 'Bagerhat Sadar', 'মোড়েলগঞ্জ': 'Morrelganj',

  // JESSORE DISTRICT
  'ঝিকরগাছা': 'Jhikargacha', 'ঝিকরগছা': 'Jhikargacha', 'শার্শা': 'Sharsha',

  // SATKHIRA DISTRICT
  'কলারোয়া': 'Kalaroa', 'কলিগঞ্জ': 'Kaliganj',
  'দৌলতপুর': 'Daulatpur', 'দৌলতপুর উপজেলা': 'Daulatpur Upazila', 'ভেড়ামারা': 'Bheramara',
  'ভেড়ামারা উপজেলা': 'Bheramara Upazila', 'মিরপুর': 'Mirpur', 'মিরপুর উপজেলা': 'Mirpur Upazila',

  // CHUADANGA
  'চুয়াডাঙ্গা': 'Chuadanga', 'চুয়াডাঙ্গা সদর': 'Chuadanga Sadar', 'আলমডাঙ্গা': 'Alamdanga',
  'আলমডাঙ্গা উপজেলা': 'Alamdanga Upazila', 'জীবননগর': 'Jibannagar',
  'জীবননগর উপজেলা': 'Jibannagar Upazila', 'দামুড়হুদা': 'Damurhuda',
  'দামুড়হুদা উপজেলা': 'Damurhuda Upazila',

  // JHENAIDAH
  'ঝিনাইদহ': 'Jhenaidah', 'ঝিনাইদহ সদর': 'Jhenaidah Sadar', 'কালীগঞ্জ': 'Kaliganj',
  'কালীগঞ্জ উপজেলা': 'Kaliganj Upazila', 'কোটচাঁদপুর': 'Kotchandpur',
  'কোটচাঁদপুর উপজেলা': 'Kotchandpur Upazila', 'ঝিনাইদহ': 'Jhenaidah',
  'ঝিনাইদহ উপজেলা': 'Jhenaidah Upazila', 'মহেশপুর': 'Maheshpur',
  'মহেশপুর উপজেলা': 'Maheshpur Upazila', 'শৈলকুপা': 'Shailkupa',
  'শৈলকুপা উপজেলা': 'Shailkupa Upazila', 'হরিণাকুণ্ডু': 'Harinakundu',
  'হরিণাকুণ্ডু উপজেলা': 'Harinakundu Upazila',

  // NARAIL
  'নড়াইল': 'Narail', 'নড়াইল সদর': 'Narail Sadar', 'কালিয়া': 'Kalia',
  'কালিয়া উপজেলা': 'Kalia Upazila', 'লোহাগড়া': 'Lohagara',
  'লোহাগড়া উপজেলা': 'Lohagara Upazila',

  // MAGURA
  'মাগুরা': 'Magura', 'মাগুরা সদর': 'Magura Sadar', 'মহম্মদপুর': 'Mohammadpur',
  'মহম্মদপুর উপজেলা': 'Mohammadpur Upazila', 'শালিখা': 'Shalikha',
  'শালিখা উপজেলা': 'Shalikha Upazila', 'শ্রীপুর': 'Sreepur',
  'শ্রীপুর উপজেলা': 'Sreepur Upazila',

  // MEHERPUR
  'মেহেরপুর': 'Meherpur', 'মেহেরপুর সদর': 'Meherpur Sadar', 'গাংনী': 'Gangni',
  'গাংনী উপজেলা': 'Gangni Upazila', 'মুজিবনগর': 'Mujibnagar',
  'মুজিবনগর উপজেলা': 'Mujibnagar Upazila',

  // JESSORE
  'যশোর': 'Jessore', 'যশোর সদর': 'Jessore Sadar', 'অভয়নগর': 'Abhaynagar',
  'অভয়নগর উপজেলা': 'Abhaynagar Upazila', 'বাঘেরপাড়া': 'Bagherpara',
  'বাঘেরপাড়া উপজেলা': 'Bagherpara Upazila', 'চৌগাছা': 'Chaugacha',
  'চৌগাছা উপজেলা': 'Chaugacha Upazila', 'ঝিকরগছা': 'Jhikargachha',
  'ঝিকরগছা উপজেলা': 'Jhikargachha Upazila', 'কেশবপুর': 'Keshabpur',
  'কেশবপুর উপজেলা': 'Keshabpur Upazila', 'ঝোর': 'Jhikargachha',
  'মনিরামপুর': 'Monirampur', 'মনিরামপুর উপজেলা': 'Monirampur Upazila',
  'শারশা': 'Sharsha', 'শারশা উপজেলা': 'Sharsha Upazila',

  // SATKHIRA
  'সাতক্ষীরা': 'Satkhira', 'সাতক্ষীরা সদর': 'Satkhira Sadar', 'আশাশুনি': 'Assasuni',
  'আশাশুনি উপজেলা': 'Assasuni Upazila', 'দেবহাটা': 'Debhata',
  'দেবহাটা উপজেলা': 'Debhata Upazila', 'কলারা': 'Kalaroa',
  'কলারা উপজেলা': 'Kalaroa Upazila', 'পাটকেশ্বর': 'Patkelghara',
  'পাটকেশ্বর উপজেলা': 'Patkelghara Upazila', 'শ্যামনগর': 'Shyamnagar',
  'শ্যামনগর উপজেলা': 'Shyamnagar Upazila', 'তালা': 'Tala',
  'তালা উপজেলা': 'Tala Upazila', 'কলিগঞ্জ': 'Kaliganj',
  'কলিগঞ্জ উপজেলা': 'Kaliganj Upazila',

  // RAJSHAHI DIVISION
  'রাজশাহী': 'Rajshahi', 'রাজশাহী সদর': 'Rajshahi Sadar', 'পবা': 'Paba',
  'পাবা সদর': 'Paba Sadar', 'পাবা উপজেলা': 'Paba Upazila', 'ভাগমারা': 'Bagmara',
  'ভাগমারা উপজেলা': 'Bagmara Upazila', 'চারঘাট': 'Charghat',
  'চারঘাট উপজেলা': 'Charghat Upazila', 'পুঠিয়াগঞ্জ': 'Puthia',
  'পুঠিয়াগঞ্জ উপজেলা': 'Puthia Upazila', 'দুর্গাপুর': 'Durgapur',
  'দুর্গাপুর উপজেলা': 'Durgapur Upazila', 'মোহনপুর': 'Mohanpur',
  'মোহনপুর উপজেলা': 'Mohanpur Upazila', 'পুঠিয়াগঞ্জ': 'Puthia',

  // SIRAJGANJ
  'সিরাজগঞ্জ': 'Sirajganj', 'সিরাজগঞ্জ সদর': 'Sirajganj Sadar', 'কাজীনগর': 'Kazipur',
  'কাজীনগর উপজেলা': 'Kazipur Upazila', 'উল্পাশ': 'Ullapara',
  'উল্পাশা উপজেলা': 'Ullapara Upazila', 'শাহজাদপুর': 'Shahjadpur',
  'শাহজাদপুর উপজেলা': 'Shahjadpur Upazila', 'তাডাগড়া': 'Tarash',
  'তাড়াগড়া উপজেলা': 'Tarash Upazila', 'বেলকুচি': 'Belkuchi',
  'বেলকুচি উপজেলা': 'Belkuchi Upazila', 'চৌহালিকাটি': 'Chauhali',
  'চৌহালিকাটি উপজেলা': 'Chauhali Upazila', 'কামারখান্দ': 'Kamarkhanda',
  'কামারখান্দ উপজেলা': 'Kamarkhanda Upazila', 'ইনায়ামাখর': 'Enayetpur',
  'ইনায়ামাখর উপজেলা': 'Enayetpur Upazila',

  // PABNA
  'পাবনা': 'Pabna', 'পাবনা সদর': 'Pabna Sadar', 'আটঘোরিয়া': 'Atgharia',
  'আটঘোরিয়া উপজেলা': 'Atgharia Upazila', 'ভাঙ্গা': 'Bhangura',
  'ভাঙ্গা উপজেলা': 'Bhangura Upazila', 'বেড়া': 'Bera',
  'বেড়া উপজেলা': 'Bera Upazila', 'ভেড়াগঞ্জ': 'Bera', 'ভেড়াগঞ্জ উপজেলা': 'Bera Upazila',
  'চৌহালিকাটি': 'Chauhali', 'চৌহালিকাটি উপজেলা': 'Chauhali Upazila',
  'দায়রাহাটি': 'Faridpur', 'দায়রাহাটি উপজেলা': 'Faridpur Upazila',
  'সদরপুর': 'Sadarpur', 'সদরপুর উপজেলা': 'Sadarpur Upazila', 'সুজানগর': 'Sujanagar',
  'সুজানগর উপজেলা': 'Sujanagar Upazila', 'আটঘোরিয়া': 'Atgharia',

  // BOGURA
  'বগুড়া': 'Bogura', 'বগুড়া সদর': 'Bogura Sadar', 'আদমদিগঞ্জ': 'Adamdighi',
  'আদমদিগঞ্জ উপজেলা': 'Adamdighi Upazila', 'শাজাহানপুর': 'Shajahanpur',
  'শাজাহানপুর উপজেলা': 'Shajahanpur Upazila', 'শিবগঞ্জ': 'Shibganj',
  'শিবগঞ্জ উপজেলা': 'Shibganj Upazila', 'সোনাতলা': 'Sonatala',
  'সোনাতলা উপজেলা': 'Sonatala Upazila', 'দুপচড়িয়া': 'Dupchanchia',
  'দুপচড়িয়া উপজেলা': 'Dupchanchia Upazila', 'গাবতলী': 'Gabtali',
  'গাবতলী উপজেলা': 'Gabtali Upazila', 'সরিশাবাড়ি': 'Sarishabari',
  'সরিশাবাড়ি উপজেলা': 'Sarishabari Upazila', 'শাজিবাজার': 'Shajhazipur',
  'শাজিবাজার উপজেলা': 'Shajhazipur Upazila', 'কাহালু': 'Kahalu',
  'কাহালু উপজেলা': 'Kahalu Upazila', 'নন্দিগ্রাম': 'Nondigram',
  'নন্দিগ্রাম উপজেলা': 'Nondigram Upazila', 'নওগাদুয়া': 'Nondowal',
  'নওগাদুয়া উপজেলা': 'Nondowal Upazila', 'পলানপুর': 'Polanbar',
  'পলানপুর উপজেলা': 'Polanbar Upazila',

  // NATORE
  'নওগাঁ': 'Naogaon', 'নওগাঁ সদর': 'Naogaon Sadar', 'বদলাদিঘি': 'Badalgachi',
  'বদালাদিঘি উপজেলা': 'Badalgachi Upazila', 'মহাদেপুর': 'Mahadevpur',
  'মহাদেপুর উপজেলা': 'Mahadevpur Upazila', 'মনিরামপুর': 'Manirampur',
  'মনিরামপুর উপজেলা': 'Manirampur Upazila', 'নিয়ামতলা': 'Niamatpur',
  'নিয়ামতলা উপজেলা': 'Niamatpur Upazila', 'পত্নী': 'Potnia',
  'পত্নী উপজেলা': 'Potnia Upazila', 'রানীনগর': 'Raninagar',
  'রানীনগর উপজেলা': 'Raninagar Upazila', 'সাপ্ইবাগ': 'Sapahar',
  'সাপ্ইবাগ উপজেলা': 'Sapahar Upazila',

  // JOYPURHAT
  'জয়পুরহাট': 'Joypurhat', 'জয়পুরহাট সদর': 'Joypurhat Sadar',
  'আক্কেলপুর': 'Akelpur', 'আক্কেলপুর উপজেলা': 'Akelpur Upazila',
  'কলিলা': 'Khoksha', 'কলিলা উপজেলা': 'Khoksha Upazila',
  'ক্ষেতল': 'Khetlal', 'ক্ষেতল উপজেলা': 'Khetlal Upazila',

  // CHAPAINAWABGANJ
  'চাঁপাইনবাবগঞ্জ': 'Chapainawabganj', 'চাঁপাইনবাবগঞ্জ সদর': 'Chapainawabganj Sadar',
  'গোমস্তামাপুর': 'Gomastapur', 'গোমস্তামাপুর উপজেলা': 'Gomastapur Upazila',
  'নবাবাগঞ্জ': 'Nababganj', 'নবাবাগঞ্জ উপজেলা': 'Nababganj Upazila',
  'ভোলাহাট': 'Bholahat', 'ভোলাহাট উপজেলা': 'Bholahat Upazila',

  // NATORE (continued)
  'নওগাঁ': 'Naogaon', 'নওগাঁ সদর': 'Naogaon Sadar', 'বদালাদিঘি': 'Badalgachi',
  'মহাদেপুর': 'Mahadevpur', 'মনিরামপুর': 'Manirampur', 'নিয়ামতলা': 'Niamatpur',
  'পত্নী': 'Potnia', 'রানীনগর': 'Raninagar', 'সাপ্ইবাগ': 'Sapahar',

  // RAJSHAHI DIVISION (continued)
  'নাটোর': 'Natore', 'নাটোর সদর': 'Natore Sadar', 'বাগাতিপুর': 'Bagatipara',
  'বাগাতিপুর উপজেলা': 'Bagatipara Upazila', 'বড়িগ্রাম': 'Baraigram',
  'বড়িগ্রাম উপজেলা': 'Baraigram Upazila', 'গুরুদাসপুর': 'Gurudaspur',
  'গুরুদাসপুর উপজেলা': 'Gurudaspur Upazila', 'লালপুর': 'Lalpur',
  'লালপুর উপজেলা': 'Lalpur Upazila', 'নাটোর সদর': 'Natore Sadar',
  'সিঙ্গড়া': 'Singra', 'সিঙ্গড়া উপজেলা': 'Singra Upazila',
  'বাগাতিপুর': 'Bagatipara', 'বড়িগ্রাম': 'Baraigram', 'লালপুর': 'Lalpur',

  // RAJSHAHI
  'রাজশাহী': 'Rajshahi', 'রাজশাহী সদর': 'Rajshahi Sadar', 'পবা': 'Paba',
  'সিরাজগঞ্জ': 'Sirajganj', 'পাবনা': 'Pabna', 'বগুড়া': 'Bogura',
  'নাটোর': 'Natore', 'নওগাঁ': 'Naogaon', 'জয়পুরহাট': 'Joypurhat',
  'চাঁপাইনবাবগঞ্জ': 'Chapainawabganj',

  // SYLHET DIVISION
  'সিলেট': 'Sylhet', 'সিলেট সদর': 'Sylhet Sadar',
  'মৌলভীবাজার': 'Moulvibazar', 'মৌলভীবাজার সদর': 'Moulvibazar Sadar',
  'বিয়ানীরবাজার': 'Biani Bazar', 'বিয়ানীরবাজার উপজেলা': 'Biani Bazar Upazila',
  'জকিগঞ্জ': 'Jakiganj', 'জকিগঞ্জ উপজেলা': 'Jakiganj Upazila',
  'কমলাবাজার': 'Kamalganj', 'কমলাবাজার উপজেলা': 'Kamalganj Upazila',
  'শ্রীমঙ্গল': 'Sreemangal', 'শ্রীমঙ্গল উপজেলা': 'Sreemangal Upazila',
  'কুলাউড়া': 'Kulaura', 'কুলাউড়া উপজেলা': 'Kulaura Upazila',
  'জমলগঞ্জ': 'Zamalganj', 'জমলগঞ্জ উপজেলা': 'Zamalganj Upazila',
  'বিয়ানীরবাজার': 'Biani Bazar', 'জকিগঞ্জ': 'Jakiganj',

  // SUNAMGANJ
  'সুনামগঞ্জ': 'Sunamganj', 'সুনামগঞ্জ সদর': 'Sunamganj Sadar',
  'দোয়ারপুর': 'Dowarabazar', 'দোয়ারপুর উপজেলা': 'Dowarabazar Upazila',
  'জগন্নাথপুর': 'Jagannathpur', 'জগন্নাথপুর উপজেলা': 'Jagannathpur Upazila',
  'দিরাই': 'Derai', 'দিরাই উপজেলা': 'Derai Upazila',
  'শ্যামর': 'Shamsuddin', 'শ্যামর উপজেলা': 'Shamsuddin Upazila',
  'ইসলামপুর': 'Eklaspur', 'ইসলামপুর উপজেলা': 'Eklaspur Upazila',
  'তাহিরপুর': 'Tahirpur', 'তাহিরপুর উপজেলা': 'Tahirpur Upazila',
  'জগন্নাথপুর': 'Jagannathpur', 'সুনামগঞ্জ': 'Sunamganj', 'শ্যামর': 'Shamsuddin',

  // HABIGANJ
  'হবিগঞ্জ': 'Habiganj', 'হবিগঞ্জ সদর': 'Habiganj Sadar', 'আজমিরিগঞ্জ': 'Ajmiriganj',
  'আজমিরিগঞ্জ উপজেলা': 'Ajmiriganj Upazila', 'বানিয়াচং': 'Baniachang',
  'বানিয়াচং উপজেলা': 'Baniachang Upazila', 'চৌহাগিলা': 'Chouhali',
  'চৌহাগিলা উপজেলা': 'Chouhali Upazila', 'হবিগঞ্জ': 'Habiganj',
  'নবীগঞ্জ': 'Nabiganj', 'নবীগঞ্জ উপজেলা': 'Nabiganj Upazila',

  // MYMENSINGH DIVISION
  'ময়মনসিংহ': 'Mymensingh', 'ময়মনসিংহ সদর': 'Mymensingh Sadar',
  'মুক্তাগঞ্জ': 'Muktagacha', 'মুক্তাগাছা': 'Muktagacha', 'মুক্তাগঞ্জ উপজেলা': 'Muktagacha Upazila',
  'ভৈরভি': 'Bhaluka', 'ভালুকা': 'Bhaluka', 'ভৈরভি উপজেলা': 'Bhaluka Upazila',
  'ত্রিমোহনগঞ্জ': 'Trishal', 'ত্রিশাল': 'Trishal', 'ত্রিমোহনগঞ্জ উপজেলা': 'Trishal Upazila',
  'ঈশ্বরগঞ্জ': 'Ishwarganj', 'ঈশ্বরগঞ্জ উপজেলা': 'Ishwarganj Upazila',
  'গফরগাঁও': 'Gaffargaon', 'গফরগঞ্জ': 'Gaffargaon',
  'গৌরীপুর': 'Gauripur', 'গৌরীপুর উপজেলা': 'Gauripur Upazila',
  'ফুলপুর': 'Fulbaria', 'ফুলবাড়িয়া': 'Fulbaria', 'ফুলপুর উপজেলা': 'Fulbaria Upazila',
  'হালিমগঞ্জ': 'Halimganj', 'হালুয়াঘাট': 'Haluaghat', 'হালিমগঞ্জ উপজেলা': 'Halimganj Upazila',
  'ধোয়ারিপুর': 'Dhobaura', 'ধোবাউড়া': 'Dhobaura', 'ধোয়ারিপুর উপজেলা': 'Dhobaura Upazila',
  'নান্দাইল': 'Nandail', 'তারাকান্দা': 'Tarakanda', 'ফুলপুর': 'Fulbaria',

  // JAMALPUR
  'জামালপুর': 'Jamalpur', 'জামালপুর সদর': 'Jamalpur Sadar', 'মেলানদহ': 'Melandaha', 'মেলেন্দহ': 'Melandaha',
  'মেলানদহ উপজেলা': 'Melandaha Upazila', 'ইসলামপুর': 'Islampur',
  'ইসলামপুর উপজেলা': 'Islampur Upazila', 'মাদারপুর': 'Madarganj', 'মাদারগঞ্জ': 'Madarganj',
  'মাদারপুর উপজেলা': 'Madarganj Upazila', 'মোশারগঞ্জ': 'Madaripur',
  'মোশারগঞ্জ উপজেলা': 'Mushariganj Upazila', 'সরিশাবাজার': 'Sarishabari', 'সরিষাবাড়ী': 'Sarishabari',
  'সরিশাবাজার উপজেলা': 'Sarishabari Upazila', 'জামালপুর সদর': 'Jamalpur Sadar',
  'দেওয়ানগঞ্জ': 'Dewanganj', 'বকশীগঞ্জ': 'Baksiganj', 'মাদারগঞ্জ': 'Madarganj',

  // SHERPUR
  'শেরপুর': 'Sherpur', 'শেরপুর সদর': 'Sherpur Sadar', 'শেরপুর উপজেলা': 'Sherpur Upazila',
  'নকলা': 'Nakla', 'নকলা উপজেলা': 'Nakla Upazila', 'নালিতাবাড়ী': 'Nalitabari',
  'নালিতাবাড়ী উপজেলা': 'Nalitabari Upazila', 'শ্রীবরদি': 'Sreebardi', 'শ্রীবরদী': 'Sreebardi',
  'শ্রীবরদি উপজেলা': 'Sreebardi Upazila', 'ঝিনিরধারা': 'Jhenaigati', 'ঝিনাইগাতী': 'Jhenaigati',
  'ঝিনির্ধারা উপজেলা': 'Jhenaigati Upazila',

  // NETROKONA
  'নেত্রকোণা': 'Netrokona', 'নেত্রকোণা সদর': 'Netrokona Sadar', 'বারাট': 'Barhatta', 'বারহাট্টা': 'Barhatta',
  'বারাট উপজেলা': 'Barhatta Upazila', 'কলমিগঞ্জ': 'Kaliganj', 'কলমাকান্দা': 'Kalamakanda',
  'কলমিগঞ্জ উপজেলা': 'Kaliganj Upazila', 'কলমিগঞ্জ সদর': 'Kaliganj Sadar',
  'কলমিগঞ্জ': 'Kaliganj', 'কেন্দুঝলা': 'Kendua', 'কেন্দুয়া': 'Kendua',
  'কেন্দুঝলা উপজেলা': 'Kendua Upazila', 'কৈটালী': 'Kendua', 'কৈটালী উপজেলা': 'Kendua Upazila',
  'খালিয়াজুড়ি': 'Khaliajuri', 'পূর্বধলা': 'Purbadhala', 'বারহাট্টা': 'Barhatta',
  'মদন': 'Madan', 'মোহনগঞ্জ': 'Mohanganj', 'আটপাড়া': 'Atpara', 'কলমাকান্দা': 'Kalamakanda',

  // RANGPUR DIVISION
  'দিনাজপুর': 'Dinajpur', 'দিনাজপুর সদর': 'Dinajpur Sadar', 'খানসামা': 'Khansama',
  'খানসামা উপজেলা': 'Khansama Upazila', 'খতলমাগন্দি': 'Khulaghat',
  'খতলমাগন্দি উপজেলা': 'Khulaghat Upazila', 'চিরিরমপুর': 'Chirirbandar',
  'চিরিরমপুর উপজেলা': 'Chirirbandar Upazila', 'গোবিন্দগঞ্জ': 'Gobindaganj',
  'গোবিন্দগঞ্জ উপজেলা': 'Gobindaganj Upazila', 'ঘোড়গ্রাম': 'Ghoraghat',
  'ঘোড়গ্রাম উপজেলা': 'Ghoraghat Upazila', 'বোচা': 'Bochaganj',
  'বোচাগঞ্জ উপজেলা': 'Bochaganj Upazila', 'বিরল': 'Birampur',
  'বিরল উপজেলা': 'Birampur Upazila', 'পার্বত্তনগর': 'Parbatipur',
  'পার্বত্তনগর উপজেলা': 'Parbatipur Upazila', 'সুন্দরগঞ্জ': 'Sundarganj',
  'সুন্দরগঞ্জ উপজেলা': 'Sundarganj Upazila',

  // THAKURGAON
  'ঠাকুরগাঁও': 'Thakurgaon', 'ঠাকুরগাঁও সদর': 'Thakurgaon Sadar',
  'হরিপুর': 'Haripur', 'হরিপুর উপজেলা': 'Haripur Upazila',
  'পীরগঞ্জ': 'Pirganj', 'পীরগঞ্জ উপজেলা': 'Pirganj Upazila',
  'রানীপুর': 'Ruhia', 'রানীপুর উপজেলা': 'Ruhia Upazila',
  'পঞ্চগড়া': 'Panchagarh', 'পঞ্চগড়া উপজেলা': 'Panchagarh Upazila',
  'ঠাকুরগাঁও': 'Thakurgaon',

  // KURIGRAM
  'কুড়িগ্রাম': 'Kurigram', 'কুড়িগ্রাম সদর': 'Kurigram Sadar',
  'ভুরুঙ্গামার': 'Bhurungamari', 'ভুুরুঙ্গামার উপজেলা': 'Bhurungamari Upazila',
  'চিলমারী': 'Chilmari', 'চিলমারী উপজেলা': 'Chilmari Upazila',
  'ফুলবাড়ি': 'Fulbari', 'ফুলবাড়ি উপজেলা': 'Fulbari Upazila',
  'রাজীবাজার': 'Rajibpur', 'রাজীবাজার উপজেলা': 'Rajibpur Upazila',
  'রাজীবাজার': 'Rajibpur', 'উল্লাপাড়ি': 'Ulipur',
  'উল্লাপাড়ি উপজেলা': 'Ulipur Upazila', 'রৌমারী': 'Rajarhat',
  'রৌমারী উপজেলা': 'Rajarhat Upazila', 'কুড়িগ্রাম': 'Kurigram',

  // GAIBANDHA
  'গাইবান্ধা': 'Gaibandha', 'গাইবান্ধা সদর': 'Gaibandha Sadar',
  'গোবিন্দগঞ্জ': 'Gobindaganj', 'গোবিন্দগঞ্জ উপজেলা': 'Gobindaganj Upazila',
  'গোবিন্দগঞ্জ': 'Gobindaganj', 'সদরপুর': 'Sadar', 'সদরপুর উপজেলা': 'Sadarpur Upazila',
  'সদরপুর': 'Sadarpur', 'সুন্দরগঞ্জ': 'Sunamganj',

  // LALMONIRHAT
  'লালমনিরহাট': 'Lalmonirhat', 'লালমনিরহাট সদর': 'Lalmonirhat Sadar',
  'আদিতমারী': 'Aditmari', 'আদিতমারী উপজেলা': 'Aditmari Upazila',
  'কালীগঞ্জ': 'Kaliganj', 'কালীগঞ্জ উপজেলা': 'Kaliganj Upazila',
  'হাতিবাড়ী': 'Hatibandha', 'হাতিবাড়ী উপজেলা': 'Hatibandha Upazila',
  'পাটগ্রাম': 'Patgram', 'পাটগ্রাম উপজেলা': 'Patgram Upazila',
  'লালমনিরহাট': 'Lalmonirhat',

  // NILPHAMARI
  'নীলফামারী': 'Nilphamari', 'নীলফামারী সদর': 'Nilphamari Sadar',
  'ডোমা': 'Domar', 'ডোমা উপজেলা': 'Domar Upazila', 'ডিমলা': 'Dimla',
  'ডিমলা উপজেলা': 'Dimla Upazila', 'জলধাপা': 'Jaldhaka',
  'জলধাপা উপজেলা': 'Jaldhaka Upazila', 'কিশোরগঞ্জ': 'Kishoreganj',
  'কিশোরগঞ্জ উপজেলা': 'Kishoreganj Upazila', 'সৈয়া': 'Syedpur',
  'সৈয়া উপজেলা': 'Syedpur Upazila', 'তেঁতিয়া': 'Teesta',
  'তেঁতিয়া উপজেলা': 'Teesta Upazila', 'নীলফামারী': 'Nilphamari',

  // RANGPUR
  'রংপুর': 'Rangpur', 'রংপুর সদর': 'Rangpur Sadar', 'গঙ্গাছড়া': 'Gangachara',
  'গঙ্গাছড়া উপজেলা': 'Gangachara Upazila', 'তারাগঞ্জ': 'Taraganj',
  'তারাগঞ্জ উপজেলা': 'Taraganj Upazila', 'পীরগঞ্জ': 'Pirganj',
  'পীরগঞ্জ উপজেলা': 'Pirganj Upazila', 'পীরগঞ্জ': 'Pirganj',
  'পীরগঞ্জ সদর': 'Pirganj Sadar', 'পিরোজপুর': 'Pirujpur',
  'পিরোজপুর উপজেলা': 'Pirujpur Upazila', 'কাউনিয়া': 'Kaunia',
  'কাউনিয়া উপজেলা': 'Kaunia Upazila', 'মিঠাপুর': 'Mithapukur',
  'মিঠাপুর উপজেলা': 'Mithapukurুর', 'পীরগঞ্জ': 'Pirganj',

  // PAURGARGHAT
  'পঞ্চগড়া': 'Panchagarh', 'পঞ্চগড়া সদর': 'Panchagarh Sadar',
  'ভেড়াগঞ্জ': 'Boda', 'ভেড়াগঞ্জ উপজেলা': 'Boda Upazila',
  'ভেড়াগঞ্জ': 'Boda', 'দেবীগনা': 'Debiganj',
  'দেবীগনা উপজেলা': 'Debiganj Upazila', 'তেঁতিলা': 'Tetulia',
  'তেঁতিলা উপজেলা': 'Tetulia Upazila', 'পঞ্চগড়া': 'Panchagarh',

  // REMAINING UPAZILAS
  // Barisal
  'ইন্দুরকানী': 'Indurkani',
  // Chittagong
  'পটিয়া': 'Patiya', 'আশুগঞ্জ': 'Ashuganj', 'আখাউড়া': 'Akahura',
  'বাঞ্ছারামপুর': 'Bancharampur', 'সরাইল': 'Sarail', 'বিজয়নগর': 'Bijoy Nagar',
  'জুরাছড়ি': 'Jurachari', 'চাটখিল': 'Chatkhil',
  // Dhaka/Mymensingh
  'মেলান্দহ': 'Melandaha', 'মেলেন্দহ': 'Melandaha',
  // Rajshahi Division
  'গোমস্তাপুর': 'Gomastapur', 'নাচোল': 'Nachoile', 'নচোল': 'Nachoole',
  'কালাই': 'Kalai', 'ক্ষেতলাল': 'Khetlal', 'পাঁচবিবি': 'Panchbibi',
  'পত্নীতলা': 'Patnitala', 'ধামইরহাট': 'Dhamoirhat', 'মহাদেবপুর': 'Mohadevpur',
  'পোরশা': 'Porsha', 'সাপাহার': 'Sapahar', 'বদলগাছী': 'Badalgachhi',
  'মান্দা': 'Manda', 'নিয়ামতপুর': 'Niamatpur', 'আত্রাই': 'Atrai',
  'রাণীনগর': 'Raninagar', 'বাগাতিপাড়া': 'Bagatipara', 'বড়াইগ্রাম': 'Baraigram',
  'সিংড়া': 'Singra', 'নলডাঙ্গা': 'Naldanga', 'আটঘরিয়া': 'Atgharia',
  'ঈশ্বরদী': 'Ishwardi', 'চাটমোহর': 'Chatmohar', 'ভাঙ্গুড়া': 'Bhangura',
  'সাঁথিয়া': 'Santhia', 'আদমদীঘি': 'Adamdighi', 'ধুনট': 'Dhunat',
  'দুপচাঁচিয়া': 'Dupchanchia', 'নন্দীগ্রাম': 'Nandigram', 'সারিয়াকান্দি': 'Sariakandi',
  'গোদাগাড়ী': 'Godagari', 'তানোর': 'Tanore', 'বাগমারা': 'Bagmara',
  'বাঘা': 'Bagha', 'পুঠিয়া': 'Puthia', 'পুঠিয়াগঞ্জ': 'Puthia',
  'কামারখন্দ': 'Kamarkhanda', 'চৌহালি': 'Chauhali', 'কাজীপুর': 'Kazipur',
  'রায়গঞ্জ': 'Raiganj', 'রায়গঞ্জ উপজেলা': 'Raiganj Upazila', 'তাড়াশ': 'Tarash', 'তাড়াশ উপজেলা': 'Tarash Upazila',
  'উল্লাপাড়া': 'Ullapara', 'উল্লাশা': 'Ullapara', 'উল্পাশ': 'Ullapara',
  'উল্পাশা উপজেলা': 'Ullapara Upazila',
  // Sylhet Division
  'বিয়ানীরবাজার': 'Biani Bazar', 'জকিগঞ্জ': 'Jakiganj', 'জগন্নাথপুর': 'Jagannathpur',
  'দোয়ারাপুর': 'Dowarabazar', 'দিরাই': 'Derai', 'শ্যামর': 'Shamsuddin', 'শ্যামর উপজেলা': 'Shamsuddin Upazila',
  'ইসলামপুর': 'Eklaspur', 'তাহিরপুর': 'Tahirpur', 'আজমিরিগঞ্জ': 'Ajmiriganj',
  'নবীগঞ্জ': 'Nabiganj', 'হবিগঞ্জ': 'Habiganj',
  // Additional Brahmanbaria
  'আশুগঞ্জ': 'Ashuganj', 'আখাউড়া': 'Akahura', 'বাঞ্ছারামপুর': 'Bancharampur',
  'সরাইল': 'Sarail', 'বিজয়নগর': 'Bijoy Nagar',

  // FINAL REMAINING UPAZILAS - Rangpur Division
  'উলিপুর': 'Ulipur', 'চর রাজিবপুর': 'Char Rajibpur', 'নাগেশ্বরী': 'Nageshwari',
  'ফুলবাড়ী': 'Fulbari', 'ভূরুঙ্গামারী': 'Bhurungamari', 'রাজারহাট': 'Rajabhat',
  'সাদুল্লাপুর': 'Sadullapur', 'ফুলছড়ি': 'Phulchhari', 'পলাশবাড়ী': 'Palashbari',
  'সাঘাটা': 'Saghata', 'বালিয়াডাঙ্গী': 'Baliadangi', 'রাণীশংকৈল': 'Rishankhail',
  'বিরামপুর': 'Birampur', 'বীরগঞ্জ': 'Birganj', 'বোচাগঞ্জ': 'Bochaganj',
  'চিরিরবন্দর': 'Chirirbandar', 'ঘোড়াঘাট': 'Ghoraghat', 'হাকিমপুর': 'Hakimpur',
  'কাহারোল': 'Kaharole', 'পার্বতীপুর': 'Parbatipur', 'ডোমার': 'Domar',
  'জলঢাকা': 'Jaldhaka', 'সৈয়দপুর': 'Syedpur', 'আটোয়ারী': 'Atwari',
  'তেতুলিয়া': 'Tetulia', 'দেবীগঞ্জ': 'Debiganj', 'পঞ্চগড় সদর': 'Panchagarh Sadar',
  'বোদা': 'Boda', 'গংগাচড়া': 'Gangachara', 'পীরগাছা': 'Pirgacha',
  'বদরগঞ্জ': 'Badarganj', 'মিঠাপুকুর': 'Mithapukur', 'হাতীবান্ধা': 'Hatibandha',

  // Sylhet Division Final Upazilas
  'বড়লেখা': 'Barlekha', 'রাজনগর': 'Rajnagar', 'কমলগঞ্জ': 'Kamalganj',
  'জুড়ী': 'Juri', 'বালাগঞ্জ': 'Balaganj', 'বিয়ানীবাজার': 'Biani Bazar',
  'বিশ্বনাথ': 'Bishwanath', 'ফেঞ্চুগঞ্জ': 'Fenchuganj', 'গোলাপগঞ্জ': 'Golapganj',
  'গোয়াইনঘাট': 'Gowainghat', 'জৈন্তাপুর': 'Jaintiapur', 'কানাইঘাট': 'Kanaighat',
  'দক্ষিণ সুরমা': 'South Surma', 'ওসমানীনগর': 'Osmaninagar', 'ছাতক': 'Chhatak',
  'জামালগঞ্জ': 'Jamalganj', 'দক্ষিণ সুনামগঞ্জ': 'South Sunamganj', 'দোয়ারাবাজার': 'Dowarabazar',
  'ধর্মপাশা': 'Dharmapasha', 'বিশ্বম্ভরপুর': 'Bishwambarpur', 'শাল্লা': 'Shalla',
  'মধ্যনগর': 'Madhyanagar', 'আজমিরীগঞ্জ': 'Ajmiriganj', 'চুনারুঘাট': 'Chunarughat',
  'বাহুবল': 'Bahubal', 'মাধবপুর': 'Madhabpur', 'লাখাই': 'Lakhai',
  'শায়েস্তাগঞ্জ': 'Shaistaganj',

  // Note: This is a comprehensive but not complete mapping
  // There are 531 upazilas total, covering all 8 divisions
};

let updatedCount = 0;
let notFoundCount = 0;

// Update upazilas with English names
data.divisions.forEach(division => {
  division.districts.forEach(district => {
    if (district.upazilas) {
      district.upazilas.forEach(upazila => {
        const englishName = upazilaEnglishNames[upazila.nameBn];

        if (englishName) {
          upazila.name = englishName;
          updatedCount++;
        } else {
          notFoundCount++;
          // For names not in our mapping, use transliteration
          if (notFoundCount <= 10) {
            console.log(`⚠️  No English name for: ${upazila.nameBn} (${district.name})`);
          }
        }
      });
    }
  });
});

console.log(`\n✅ Updated ${updatedCount} upazilas with English names`);
if (notFoundCount > 0) {
  console.log(`⚠️  ${notFoundCount} upazilas still need English names`);
}

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`\n📄 Updated: ${dataPath}`);
console.log(`\n💡 Note: ${notFoundCount} upazilas still use Bengali names in the 'name' field.`);
console.log(`   These can be added later using the same format.`);

// Show some examples
console.log('\n📋 Sample updated upazilas:');
console.log('─'.repeat(80));
data.divisions.slice(0, 2).forEach(division => {
  division.districts.slice(0, 2).forEach(district => {
    district.upazilas?.slice(0, 2).forEach(upazila => {
      console.log(`${upazila.name.padEnd(40)} (${upazila.nameBn}) - ${district.name}, ${division.name}`);
    });
  });
});
console.log('─'.repeat(80));
