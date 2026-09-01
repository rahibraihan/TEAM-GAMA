import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Flame, Award, Search, 
  CheckCircle, ShieldCheck, Tag, Plus, Trash2, Clock, Star, ChefHat, Settings,
  History, Leaf, ArrowUpDown, X, QrCode, User, LogOut
} from 'lucide-react';

function App() {
  // Foods state with Nutrition & Eco metrics
  // Foods state with Nutrition & Eco metrics (30 Items)
  const [foods] = useState([
    { _id: '1', name: 'Chicken Cheese Burger', price: 180, category: 'Burgers', rating: 4.9, calories: '450 kcal', ecoSave: '120g Saved', tag: 'Bestseller 🔥', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { _id: '2', name: 'Iced Cold Coffee', price: 90, category: 'Cafe', rating: 4.7, calories: '180 kcal', ecoSave: '50g Saved', tag: 'Refreshing ❄️', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500' },
    { _id: '3', name: 'Crispy French Fries', price: 80, category: 'Snacks', rating: 4.4, calories: '320 kcal', ecoSave: '80g Saved', tag: 'Crispy 🍟', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500' },
    { _id: '4', name: 'Smokey Chicken Wrap', price: 150, category: 'Fast Food', rating: 4.6, calories: '380 kcal', ecoSave: '100g Saved', tag: 'Spicy 🌶️', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500' },
    { _id: '5', name: 'Chicken Kacchi Biryani', price: 220, category: 'Rice Dishes', rating: 4.9, calories: '650 kcal', ecoSave: '150g Saved', tag: 'Top Choice 👑', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500' },
    { _id: '6', name: 'Red Velvet Pastry Cake', price: 120, category: 'Cakes', rating: 4.8, calories: '290 kcal', ecoSave: '60g Saved', tag: 'Sweet 🍰', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500' },
    { _id: '7', name: 'Shorshe Ilish Platter', price: 280, category: 'Bangladeshi', rating: 4.9, calories: '510 kcal', ecoSave: '110g Saved', tag: 'Traditional 🐟', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500' },
    { _id: '8', name: 'Fried Chicken Drumsticks', price: 160, category: 'Fast Food', rating: 4.5, calories: '420 kcal', ecoSave: '90g Saved', tag: 'Crunchy 🍗', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500' },
    { _id: '9', name: 'Loaded Pepperoni Pizza', price: 350, category: 'Fast Food', rating: 4.8, calories: '720 kcal', ecoSave: '140g Saved', tag: 'Cheesy 🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500' },
    { _id: '10', name: 'Creamy Alfredo Pasta', price: 210, category: 'Fast Food', rating: 4.6, calories: '530 kcal', ecoSave: '95g Saved', tag: 'Creamy 🍝', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281288?w=500' },
    { _id: '11', name: 'Fresh Mango Smoothie', price: 110, category: 'Cafe', rating: 4.9, calories: '210 kcal', ecoSave: '40g Saved', tag: 'Fresh 🥭', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500' },
    { _id: '12', name: 'Club Sub Sandwich', price: 140, category: 'Snacks', rating: 4.5, calories: '360 kcal', ecoSave: '75g Saved', tag: 'Healthy 🥪', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500' },
    { _id: '13', name: 'Chicken Chowmein', price: 170, category: 'Fast Food', rating: 4.7, calories: '480 kcal', ecoSave: '105g Saved', tag: 'Popular 🥢', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500' },
    { _id: '14', name: 'Chocolate Lava Cake', price: 130, category: 'Cakes', rating: 4.9, calories: '340 kcal', ecoSave: '55g Saved', tag: 'Hot Dessert 🍫', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500' },
    { _id: '15', name: 'Beef Kala Bhuna Rice', price: 260, category: 'Rice Dishes', rating: 4.9, calories: '690 kcal', ecoSave: '160g Saved', tag: 'Spicy Delight 🌶️', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500' },
    { _id: '16', name: 'Masala Lemonade Juice', price: 60, category: 'Cafe', rating: 4.3, calories: '90 kcal', ecoSave: '30g Saved', tag: 'Chilled 🍋', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500' },
    { _id: '17', name: 'Smokey BBQ Wings', price: 190, category: 'Fast Food', rating: 4.8, calories: '410 kcal', ecoSave: '85g Saved', tag: 'Smokey 🔥', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500' },
    { _id: '18', name: 'Hot Cappuccino', price: 100, category: 'Cafe', rating: 4.6, calories: '130 kcal', ecoSave: '45g Saved', tag: 'Hot Brew ☕', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500' },
    { _id: '19', name: 'Double Patty Beef Burger', price: 240, category: 'Burgers', rating: 4.9, calories: '620 kcal', ecoSave: '130g Saved', tag: 'Juicy 🍔', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500' },
    { _id: '20', name: 'Crispy Chicken Momos', price: 130, category: 'Snacks', rating: 4.7, calories: '310 kcal', ecoSave: '70g Saved', tag: 'Steam & Fried 🥟', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500' },
    { _id: '21', name: 'Beef Tehari', price: 210, category: 'Rice Dishes', rating: 4.8, calories: '580 kcal', ecoSave: '140g Saved', tag: 'Old Dhaka Style 🍚', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500' },
    { _id: '22', name: 'Cheese Garlic Bread', price: 110, category: 'Snacks', rating: 4.5, calories: '270 kcal', ecoSave: '65g Saved', tag: 'Cheesy 🥖', image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=500' },
    { _id: '23', name: 'Spicy Fried Noodles', price: 140, category: 'Fast Food', rating: 4.4, calories: '440 kcal', ecoSave: '90g Saved', tag: 'Hot 🍜', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500' },
    { _id: '24', name: 'Vanilla Ice Cream Sundae', price: 95, category: 'Cakes', rating: 4.7, calories: '250 kcal', ecoSave: '50g Saved', tag: 'Sweet Treat 🍨', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500' },
    { _id: '25', name: 'Thai Soup with Wonton', price: 160, category: 'Snacks', rating: 4.8, calories: '280 kcal', ecoSave: '80g Saved', tag: 'Warm & Spicy 🥣', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500' },
    { _id: '26', name: 'Bhuna Khichuri Platter', price: 190, category: 'Bangladeshi', rating: 4.9, calories: '540 kcal', ecoSave: '115g Saved', tag: 'Rainy Special 🌧️', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=500' },
    { _id: '27', name: 'Oreo Milkshake', price: 130, category: 'Cafe', rating: 4.8, calories: '390 kcal', ecoSave: '60g Saved', tag: 'Rich & Thick 🥤', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500' },
    { _id: '28', name: 'Mini Cheese Pizza (8")', price: 220, category: 'Fast Food', rating: 4.6, calories: '490 kcal', ecoSave: '100g Saved', tag: 'Personal Size 🍕', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500' },
    { _id: '29', name: 'Crispy Fish & Chips', price: 230, category: 'Fast Food', rating: 4.7, calories: '510 kcal', ecoSave: '105g Saved', tag: 'Sea Food 🐟', image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=500' },
    { _id: '30', name: 'Classic Blueberry Cheesecake', price: 160, category: 'Cakes', rating: 4.9, calories: '310 kcal', ecoSave: '50g Saved', tag: 'Premium 🍰', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500' }
  ]);

  // Cart & Search States
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('horizontal'); // 'horizontal' or 'vertical'
  // Auth & SEU Student Validation States
  const [userEmail, setUserEmail] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState('');

  // Single Order Token State
  const [orderToken, setOrderToken] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Preparing');

  // Order History & Modal States
  const [orderHistory, setOrderHistory] = useState([]);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [activeToken, setActiveToken] = useState(null);
  // Load saved data from LocalStorage
useEffect(() => {
  const savedAuth = localStorage.getItem('isAuth');
  const savedEmail = localStorage.getItem('userEmail');
  const savedOrders = localStorage.getItem('orderHistory');

  if (savedAuth) setIsAuth(JSON.parse(savedAuth));
  if (savedEmail) setUserEmail(savedEmail);
  if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
}, []);

  // STAFF & FLASH SALE CONTROLS (With LocalStorage Persistence)
  const [isStaffMode, setIsStaffMode] = useState(false);
  
  // Load initial sale status from LocalStorage if available
  const [isSaleActive, setIsSaleActive] = useState(() => {
    const savedSaleState = localStorage.getItem('isSaleActive');
    return savedSaleState !== null ? JSON.parse(savedSaleState) : true;
  });

  const [discountPercent, setDiscountPercent] = useState(20);
  const [startTime, setStartTime] = useState('16:00');
  const [endTime, setEndTime] = useState('17:30');
  const [timeLeft, setTimeLeft] = useState(3600);

  // Save Sale state to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isSaleActive', JSON.stringify(isSaleActive));
  }, [isSaleActive]);

  // Countdown timer when sale is active
  useEffect(() => {
    let timer;
    if (isSaleActive) {
      timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSaleActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SEU Email Validation Handler
  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = userEmail.trim().toLowerCase();
    
    // Check SEU domain restriction
    if (!cleanEmail.endsWith('@seu.edu.bd')) {
      setAuthError('Only SEU student email (e.g. 2024100000001@seu.edu.bd) is allowed!');
      return;
    }

    setAuthError('');
    setIsAuth(true);
    localStorage.setItem('isAuth', JSON.stringify(true));
localStorage.setItem('userEmail', cleanEmail);
  };

  const handleLogout = () => {
    setIsAuth(false);
    setUserEmail('');
    setOrderHistory([]);

  localStorage.removeItem('isAuth');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('orderHistory');
  };

  const handleApplyStaffSchedule = (e) => {
    e.preventDefault();
    setIsSaleActive(true);
    setTimeLeft(3600);
    alert(`Flash Sale Updated! Scheduled from ${startTime} to ${endTime} with ${discountPercent}% discount.`);
  };

  const addToCart = (food) => {
    const finalPrice = isSaleActive ? Math.round(food.price * (1 - discountPercent / 100)) : food.price;
    setCart([...cart, { ...food, price: finalPrice }]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!isAuth) {
      alert("Please login with your SEU student email first!");
      return;
    }
    if (cart.length === 0) return;

    const newToken = 'CAM-' + Math.floor(100000 + Math.random() * 900000);
    
    setOrderToken(newToken);
    setOrderStatus('Preparing');
    setActiveToken(newToken);
    setShowTokenModal(true);

    const newOrder = {
      token: newToken,
      items: [...cart],
      total: totalAmount,
      status: 'Preparing',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

   const updatedHistory = [newOrder, ...orderHistory];
setOrderHistory(updatedHistory);
localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
    setCart([]);

    setTimeout(() => {
      setOrderStatus('Ready for Pickup');
      setOrderHistory(prev => {
  const updated = prev.map(ord =>
    ord.token === newToken
      ? { ...ord, status: 'Ready for Pickup' }
      : ord
  );

  localStorage.setItem('orderHistory', JSON.stringify(updated));
  return updated;
});
    }, 6000);
  };

  const filteredFoods = foods
    .filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const priceA = isSaleActive ? Math.round(a.price * (1 - discountPercent / 100)) : a.price;
      const priceB = isSaleActive ? Math.round(b.price * (1 - discountPercent / 100)) : b.price;
      if (sortBy === 'low') return priceA - priceB;
      if (sortBy === 'high') return priceB - priceA;
      return 0;
    });

  // Extract ID / Username for Logo Badge
  const studentIdDisplay = userEmail ? userEmail.split('@')[0] : '';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12 relative">
      
      {/* 1. TOP NAVBAR */}
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-xl text-white font-black text-xl tracking-tighter">CF</div>
            <div>
              <h1 className="text-xl font-black text-orange-400 tracking-wide">CAMFood</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">SEU Cafeteria Optimization Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Staff Mode Switcher */}
            <button 
              onClick={() => setIsStaffMode(!isStaffMode)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                isStaffMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isStaffMode ? 'Staff Mode Active' : 'Switch to Staff Mode'}</span>
            </button>

            {/* SEU USER AUTH & LOGO PROFILE SECTION */}
            {!isAuth ? (
              <div className="flex flex-col items-end">
                <form onSubmit={handleLogin} className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="2024100000001@seu.edu.bd"
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value); setAuthError(''); }}
                    className="bg-slate-900 border border-slate-700 text-xs px-3 py-1.5 rounded-lg text-white focus:outline-none focus:border-orange-500 min-w-[200px]"
                    required
                  />
                  <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition shadow-md shadow-orange-500/20">
                    Login
                  </button>
                </form>
                {authError && <span className="text-[10px] text-red-400 mt-1 font-semibold">{authError}</span>}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 py-1 px-2.5 rounded-xl">
                {/* Student Logo Avatar */}
                <div className="w-7 h-7 rounded-lg bg-orange-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-md uppercase">
                  {studentIdDisplay.charAt(0) || <User className="w-4 h-4" />}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-200">
                    <span>{studentIdDisplay}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-[9px] text-emerald-400 font-medium">SEU Verified Student</p>
                </div>

                <button 
                  onClick={handleLogout} 
                  title="Logout"
                  className="text-slate-400 hover:text-red-400 p-1 transition border-l border-slate-700 ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 2. MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* STAFF CONTROL PANEL */}
          {isStaffMode && (
            <div className="bg-slate-800 border-2 border-amber-500/80 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <h3 className="font-bold text-amber-400 flex items-center gap-2 text-base">
                  <Settings className="w-5 h-5 text-amber-400" /> Cafeteria Staff Manager: Flash Sale Schedule
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">Admin Control</span>
              </div>

              <form onSubmit={handleApplyStaffSchedule} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Start Time</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white font-mono" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">End Time</label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white font-mono" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Discount %</label>
                  <select value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white font-bold">
                    <option value={10}>10% Off</option>
                    <option value={20}>20% Off</option>
                    <option value={30}>30% Off</option>
                    <option value={40}>40% Off</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black p-2 rounded-lg transition">Publish Schedule</button>
                </div>
              </form>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700 text-xs">
                <span className="text-slate-300">Instant Manual Override:</span>
                <button 
                  onClick={() => setIsSaleActive(!isSaleActive)}
                  className={`px-3 py-1 rounded font-bold transition ${
                    isSaleActive ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  }`}
                >
                  {isSaleActive ? 'Stop Sale Immediately' : 'Start Sale Now'}
                </button>
              </div>
            </div>
          )}

          {/* FLASH SALE BANNER */}
          {isSaleActive ? (
            <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className="bg-black/30 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 mb-3">
                    <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" /> Zero Waste Flash Sale Active ({discountPercent}% OFF)
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight">Surplus Discounts Scheduled ({startTime} - {endTime})</h2>
                  <p className="text-sm opacity-90 mt-1">Automatic discounts applied to cafeteria items!</p>
                </div>

                <div className="bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center">
                  <p className="text-[10px] uppercase font-bold text-orange-200 tracking-wider">Ends In</p>
                  <div className="flex items-center gap-1 text-xl font-mono font-black text-amber-300 mt-0.5">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>
              <Tag className="absolute -right-6 -bottom-6 w-36 h-36 opacity-15 rotate-12" />
            </div>
          ) : (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center text-slate-400 text-sm">
              <p>Regular Cafeteria Hours. No active flash sales at this moment.</p>
            </div>
          )}

          {/* SEARCH, SORT & CATEGORY FILTER */}
          <div className="flex flex-wrap gap-3 items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search food item..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-sm pl-9 pr-4 py-2 rounded-lg text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Price Sort Feature */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2.5 py-2 rounded-lg">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="default" className="bg-slate-900">Sort By: Default</option>
                <option value="low" className="bg-slate-900">Price: Low to High</option>
                <option value="high" className="bg-slate-900">Price: High to Low</option>
              </select>
            </div>

            <div className="flex gap-1.5">
              {['All', 'Fast Food', 'Snacks', 'Drinks'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-2 rounded-lg font-semibold transition ${
                    selectedCategory === cat 
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FOOD MENU GRID */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-200 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-400" /> Cafeteria Live Menu
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFoods.map(item => {
                const finalPrice = isSaleActive ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
                return (
                  <div key={item._id} className="bg-slate-800 rounded-xl p-4 border border-slate-700/80 hover:border-slate-500 transition flex flex-col justify-between shadow-md">
                    <div>
                      <div className="h-40 bg-slate-900 rounded-lg overflow-hidden mb-3 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] font-bold bg-slate-950/80 text-orange-300 px-2 py-1 rounded-md backdrop-blur-md border border-slate-700">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-slate-100 text-base">{item.name}</h4>
                        <div className="flex items-center gap-1 bg-amber-950/60 text-amber-400 border border-amber-800/50 text-xs px-2 py-0.5 rounded-md font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      {/* Nutrition & Eco Badge */}
                      <div className="flex gap-2 text-[10px] text-slate-400 mt-2">
                        <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700">{item.calories}</span>
                        <span className="bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50 flex items-center gap-1">
                          <Leaf className="w-3 h-3" /> {item.ecoSave}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-orange-400 font-extrabold text-xl">৳ {finalPrice}</span>
                        {isSaleActive && (
                          <span className="text-xs text-slate-500 line-through">৳ {item.price}</span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(item)}
                      className="mt-4 w-full bg-slate-700 hover:bg-orange-500 text-white text-xs py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Add to Tray
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* LIVE ORDER TRACKER CARD */}
          {orderToken && (
            <div className="bg-slate-800 border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-1 animate-bounce" />
                <h3 className="text-base font-bold text-emerald-300">Order Confirmed!</h3>
                <p className="text-xs text-slate-400">Show this token at the cafeteria counter:</p>
                <div className="bg-emerald-950 text-emerald-200 text-2xl font-mono font-black py-2.5 rounded-xl border border-emerald-700/60 mt-2 tracking-widest shadow-inner">
                  {orderToken}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-2">
                  <span>Status:</span>
                  <span className={orderStatus === 'Ready for Pickup' ? 'text-emerald-400 font-bold' : 'text-orange-400 font-bold'}>
                    {orderStatus}
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-700">
                  <div 
                    className={`h-full transition-all duration-700 ${
                      orderStatus === 'Ready for Pickup' ? 'bg-emerald-500 w-full' : 'bg-orange-500 w-1/2 animate-pulse'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* CART SECTION */}
          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-slate-200">Your Food Tray</h3>
              </div>
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                {cart.length} items
              </span>
            </div>

            {cart.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Your tray is empty. Tap items to add!</p>
            ) : (
              <div className="space-y-3">
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                      <div>
                        <p className="font-semibold text-slate-200">{item.name}</p>
                        <p className="text-orange-400 font-bold">৳ {item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-slate-500 hover:text-red-400 p-1 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-700 flex justify-between font-bold text-sm">
                  <span>Total Amount:</span>
                  <span className="text-orange-400 text-base">৳ {totalAmount}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-orange-500/25 tracking-wide"
                >
                  Checkout & Generate Token
                </button>
              </div>
            )}
          </div>

          {/* ACTIVE ORDER HISTORY TRACKER */}
          {orderHistory.length > 0 && (
            <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-md">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <History className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-200">Order History Log</h3>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {orderHistory.map((ord, i) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-emerald-400">{ord.token}</span>
                      <span className="text-[10px] text-slate-400">{ord.time}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>{ord.items.length} items</span>
                      <span className="font-bold">৳ {ord.total}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                      <span className="text-[10px] text-slate-400">Status:</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ord.status === 'Ready for Pickup' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-orange-950 text-orange-400 border border-orange-800 animate-pulse'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEADERBOARD */}
          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-slate-200">Weekly Student Favorites</h3>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Chicken Cheese Burger', rating: '4.9 ★', votes: '128 orders' },
                { name: 'Iced Cold Coffee', rating: '4.7 ★', votes: '94 orders' },
                { name: 'Smokey Chicken Wrap', rating: '4.6 ★', votes: '81 orders' }
              ].map((topItem, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold w-5 h-5 bg-slate-800 text-orange-400 flex items-center justify-center rounded-full border border-slate-700">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{topItem.name}</p>
                      <p className="text-[10px] text-slate-400">{topItem.votes}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                    {topItem.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* POPUP TOKEN MODAL WITH QR CODE */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <button onClick={() => setShowTokenModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
            <h3 className="text-lg font-bold text-white">Order Confirmed!</h3>
            <p className="text-xs text-slate-400 mt-1">Scan or show this token at the cafeteria counter:</p>

            <div className="my-4 bg-white p-4 rounded-xl inline-block shadow-inner">
              <QrCode className="w-28 h-28 text-slate-900 mx-auto" />
              <p className="font-mono font-black text-xl text-slate-900 mt-2 tracking-widest">{activeToken}</p>
            </div>

            <button 
              onClick={() => setShowTokenModal(false)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Done & Track Order
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;