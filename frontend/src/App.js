import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Flame, Award, Search, 
  CheckCircle, ShieldCheck, Tag, Plus, Trash2, Clock, Star, ChefHat, Settings,
  History, Leaf, ArrowUpDown, X, QrCode, User, LogOut, Sun, Moon, BookOpen, Key
} from 'lucide-react';

function App() {
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

  // Auth & SEU Student Validation States with Password support
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState('');

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpStep, setOtpStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: New Password
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  // Profile Edit, Password Change & Dropdown States
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [userName, setUserName] = useState('SEU Student');
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500');

  // Theme & Reading Mode States
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' | 'light' | 'reading'

  // Single Order Token State
  const [orderToken, setOrderToken] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Preparing');

  // Order History & Modal States
  const [orderHistory, setOrderHistory] = useState([]);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [activeToken, setActiveToken] = useState(null);

  // Load saved data from LocalStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuth');
    const savedEmail = localStorage.getItem('userEmail');
    const savedName = localStorage.getItem('userName');
    const savedPic = localStorage.getItem('profilePic');
    const savedTheme = localStorage.getItem('themeMode');
    const savedStaff = localStorage.getItem('isStaffMode');

    if (savedAuth) setIsAuth(JSON.parse(savedAuth));
    if (savedEmail) {
      setUserEmail(savedEmail);
      setUserName(savedEmail.split('@')[0]);
      const userOrders = localStorage.getItem(`orderHistory_${savedEmail}`);
      if (userOrders) {
        setOrderHistory(JSON.parse(userOrders));
      }
    }
    if (savedName) setUserName(savedName);
    if (savedPic) setProfilePic(savedPic);
    if (savedTheme) setThemeMode(savedTheme);
    if (savedStaff) setIsStaffMode(JSON.parse(savedStaff));
  }, []);

  // STAFF & FLASH SALE CONTROLS (Password Protected)
  const [isStaffMode, setIsStaffMode] = useState(false);
  const [showStaffPasswordModal, setShowStaffPasswordModal] = useState(false);
  const [staffPasswordInput, setStaffPasswordInput] = useState('');
  const [staffPasswordError, setStaffPasswordError] = useState('');
  
  const [isSaleActive, setIsSaleActive] = useState(() => {
    const savedSaleState = localStorage.getItem('isSaleActive');
    return savedSaleState !== null ? JSON.parse(savedSaleState) : true;
  });

  const [discountPercent, setDiscountPercent] = useState(20);
  const [startTime, setStartTime] = useState('16:00');
  const [endTime, setEndTime] = useState('17:30');
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    localStorage.setItem('isSaleActive', JSON.stringify(isSaleActive));
  }, [isSaleActive]);

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

  const handleStaffLogin = (e) => {
    e.preventDefault();
    const correctPassword = "seu1234"; 

    if (staffPasswordInput === correctPassword) {
      setIsStaffMode(true);
      localStorage.setItem('isStaffMode', JSON.stringify(true));
      setShowStaffPasswordModal(false);
      setStaffPasswordInput('');
      setStaffPasswordError('');
    } else {
      setStaffPasswordError('Incorrect Password! Access denied.');
    }
  };

  const handleLogoutStaff = () => {
    setIsStaffMode(false);
    localStorage.removeItem('isStaffMode');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = userEmail.trim().toLowerCase();
    
    if (!cleanEmail.endsWith('@seu.edu.bd')) {
      setAuthError('Only SEU student email (e.g. 2024100000001@seu.edu.bd) is allowed!');
      return;
    }

    if (!userPassword || userPassword.length < 4) {
      setAuthError('Please enter a valid password (at least 4 characters)!');
      return;
    }

    const storedPass = localStorage.getItem(`pass_${cleanEmail}`);
    if (storedPass && storedPass !== userPassword) {
      setAuthError('Incorrect password! Please enter your correct previously used password or use Forgot Password.');
      return;
    }

    if (!storedPass) {
      localStorage.setItem(`pass_${cleanEmail}`, userPassword);
    }

    setAuthError('');
    setIsAuth(true);
    const extractedName = cleanEmail.split('@')[0];
    setUserName(extractedName);
    localStorage.setItem('isAuth', JSON.stringify(true));
    localStorage.setItem('userEmail', cleanEmail);
    localStorage.setItem('userName', extractedName);

    const savedUserOrders = localStorage.getItem(`orderHistory_${cleanEmail}`);
    if (savedUserOrders) {
      setOrderHistory(JSON.parse(savedUserOrders));
    } else {
      setOrderHistory([]);
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setUserEmail('');
    setUserPassword('');
    setOrderHistory([]);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userEmail');
  };

  // Forgot Password Handlers
  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanEmail = forgotEmail.trim().toLowerCase();
    if (!cleanEmail.endsWith('@seu.edu.bd')) {
      setForgotMsg('Please enter a valid SEU student email!');
      return;
    }
    
    // Generate random 4-digit OTP
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setForgotMsg(`OTP sent successfully to ${cleanEmail}! (Demo OTP: ${randomOtp})`);
    setOtpStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (inputOtp.trim() === generatedOtp) {
      setForgotMsg('');
      setOtpStep(3);
    } else {
      setForgotMsg('Invalid OTP! Please enter the correct code.');
    }
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (forgotNewPassword.length < 4) {
      setForgotMsg('Password must be at least 4 characters!');
      return;
    }
    localStorage.setItem(`pass_${forgotEmail.trim().toLowerCase()}`, forgotNewPassword);
    setForgotMsg('Password reset successfully! You can now login.');
    setTimeout(() => {
      setShowForgotModal(false);
      setOtpStep(1);
      setForgotEmail('');
      setInputOtp('');
      setForgotNewPassword('');
      setForgotMsg('');
    }, 2000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentStoredPass = localStorage.getItem(`pass_${userEmail}`) || 'seu123';
    if (oldPasswordInput !== currentStoredPass) {
      setPasswordMsg('Current password is incorrect!');
      return;
    }
    if (newPasswordInput.length < 4) {
      setPasswordMsg('New password must be at least 4 characters!');
      return;
    }
    localStorage.setItem(`pass_${userEmail}`, newPasswordInput);
    setPasswordMsg('Password changed successfully!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setOldPasswordInput('');
      setNewPasswordInput('');
      setPasswordMsg('');
    }, 1500);
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
    localStorage.setItem(`orderHistory_${userEmail}`, JSON.stringify(updatedHistory));
    setCart([]);

    setTimeout(() => {
      setOrderStatus('Ready for Pickup');
      setOrderHistory(prev => {
        const updated = prev.map(ord =>
          ord.token === newToken
            ? { ...ord, status: 'Ready for Pickup' }
            : ord
        );
        localStorage.setItem(`orderHistory_${userEmail}`, JSON.stringify(updated));
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

  const getThemeClasses = () => {
    if (themeMode === 'light') {
      return {
        bg: 'bg-slate-100 text-slate-900',
        nav: 'bg-white border-slate-200 shadow-sm',
        card: 'bg-white border-slate-200 text-slate-900 shadow-sm',
        subText: 'text-slate-600',
        input: 'bg-slate-50 border-slate-300 text-slate-900',
        border: 'border-slate-200'
      };
    } else if (themeMode === 'reading') {
      return {
        bg: 'bg-[#f4ecd8] text-[#3c2f2f]',
        nav: 'bg-[#e9dfc7] border-[#d8ccb0] shadow-sm',
        card: 'bg-[#fffbf0] border-[#d8ccb0] text-[#3c2f2f] shadow-sm',
        subText: 'text-[#655252]',
        input: 'bg-[#fffbf0] border-[#d8ccb0] text-[#3c2f2f]',
        border: 'border-[#d8ccb0]'
      };
    } else {
      return {
        bg: 'bg-slate-900 text-slate-100',
        nav: 'bg-slate-800 border-slate-700 shadow-md',
        card: 'bg-slate-800 border-slate-700 text-slate-100 shadow-md',
        subText: 'text-slate-400',
        input: 'bg-slate-900 border-slate-700 text-white',
        border: 'border-slate-700'
      };
    }
  };

  const t = getThemeClasses();

  return (
    <div className={`min-h-screen font-sans pb-12 relative transition-colors duration-300 ${t.bg}`}>
      
      {/* 1. TOP NAVBAR */}
      <nav className={`${t.nav} border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-xl text-white font-black text-xl tracking-tighter">CF</div>
            <div>
              <h1 className="text-xl font-black text-orange-400 tracking-wide">CAMFood</h1>
              <p className={`text-[10px] uppercase tracking-wider font-semibold ${t.subText}`}>SEU Cafeteria Optimization Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme & Reading Mode Switcher Buttons */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border ${t.border} ${themeMode === 'light' ? 'bg-slate-200' : themeMode === 'reading' ? 'bg-[#dfd3bc]' : 'bg-slate-900'}`}>
              <button 
                onClick={() => { setThemeMode('dark'); localStorage.setItem('themeMode', 'dark'); }}
                title="Dark Mode"
                className={`p-1.5 rounded-lg text-xs font-bold transition ${themeMode === 'dark' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => { setThemeMode('light'); localStorage.setItem('themeMode', 'light'); }}
                title="Light Mode"
                className={`p-1.5 rounded-lg text-xs font-bold transition ${themeMode === 'light' ? 'bg-orange-500 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => { setThemeMode('reading'); localStorage.setItem('themeMode', 'reading'); }}
                title="Reading Mode"
                className={`p-1.5 rounded-lg text-xs font-bold transition ${themeMode === 'reading' ? 'bg-orange-500 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Staff Mode Switcher / Logout */}
            {!isStaffMode ? (
              <button 
                onClick={() => setShowStaffPasswordModal(true)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-bold transition ${t.subText} ${t.border} hover:opacity-100`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Staff Login</span>
              </button>
            ) : (
              <button 
                onClick={handleLogoutStaff}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-bold bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30 transition"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Exit Staff Mode</span>
              </button>
            )}

            {/* SEU USER AUTH & PASSWORD SECTION WITH FORGOT PASSWORD */}
            {!isAuth ? (
              <div className="flex flex-col items-end">
                <form onSubmit={handleLogin} className="flex flex-col sm:flex-row gap-2 items-center">
                  <input 
                    type="email" 
                    placeholder="2024100000001@seu.edu.bd"
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value); setAuthError(''); }}
                    className={`${t.input} border text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-orange-500 min-w-[180px]`}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => { setUserPassword(e.target.value); setAuthError(''); }}
                    className={`${t.input} border text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-orange-500 min-w-[120px]`}
                    required
                  />
                  <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition shadow-md shadow-orange-500/20">
                    Login
                  </button>
                </form>
                <div className="flex justify-between w-full mt-1 px-1">
                  {authError ? <span className="text-[10px] text-red-400 font-semibold">{authError}</span> : <span></span>}
                  <button 
                    type="button" 
                    onClick={() => { setShowForgotModal(true); setOtpStep(1); setForgotMsg(''); }}
                    className="text-[10px] text-orange-400 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center gap-2 border py-1 px-2.5 rounded-xl cursor-pointer hover:border-orange-500 transition ${t.input}`}
                >
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-lg object-cover border border-orange-500"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="flex items-center gap-1 text-[11px] font-bold">
                      <span>{userName}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <p className="text-[9px] text-emerald-500 font-medium">Verified Student</p>
                  </div>
                </div>

                {showDropdown && (
                  <div className={`absolute right-0 mt-2 w-64 border rounded-xl shadow-2xl py-2 z-50 ${t.card}`}>
                    <div className={`px-4 py-3 border-b ${t.border}`}>
                      <p className={`text-xs ${t.subText}`}>Signed in as</p>
                      <p className="text-sm font-semibold truncate text-orange-400">{userEmail}</p>
                    </div>

                    <button 
                      onClick={() => { setShowProfileModal(true); setShowDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 hover:opacity-80 flex items-center gap-3 text-sm transition`}
                    >
                      <User className="w-4 h-4 text-orange-400" /> Edit Profile & Details
                    </button>

                    <button 
                      onClick={() => { setShowPasswordModal(true); setShowDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 hover:opacity-80 flex items-center gap-3 text-sm transition`}
                    >
                      <Key className={`w-4 h-4 ${t.subText}`} /> Reset / Change Password
                    </button>

                    <div className={`border-t ${t.border} my-1`}></div>

                    <button 
                      onClick={() => { handleLogout(); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-rose-950/40 text-rose-500 flex items-center gap-3 text-sm transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                )}
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
            <div className={`${t.card} border-2 border-amber-500/80 rounded-2xl p-5 shadow-xl space-y-4`}>
              <div className={`flex items-center justify-between border-b ${t.border} pb-2`}>
                <h3 className="font-bold text-amber-500 flex items-center gap-2 text-base">
                  <Settings className="w-5 h-5 text-amber-500" /> Cafeteria Staff Manager: Flash Sale Schedule
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-500 font-bold px-2 py-0.5 rounded border border-amber-500/30">Admin Authorized</span>
              </div>

              <form onSubmit={handleApplyStaffSchedule} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className={`${t.subText} block mb-1`}>Start Time</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={`w-full ${t.input} border p-2 rounded font-mono`} />
                </div>
                <div>
                  <label className={`${t.subText} block mb-1`}>End Time</label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={`w-full ${t.input} border p-2 rounded font-mono`} />
                </div>
                <div>
                  <label className={`${t.subText} block mb-1`}>Discount %</label>
                  <select value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className={`w-full ${t.input} border p-2 rounded font-bold`}>
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

              <div className={`flex items-center justify-between pt-2 border-t ${t.border} text-xs`}>
                <span className={t.subText}>Instant Manual Override:</span>
                <button 
                  onClick={() => setIsSaleActive(!isSaleActive)}
                  className={`px-3 py-1 rounded font-bold transition ${
                    isSaleActive ? 'bg-red-500/20 text-red-500 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
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
                  <span className="bg-black/35 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 mb-3">
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
            <div className={`${t.card} border rounded-2xl p-4 text-center ${t.subText} text-sm`}>
              <p>Regular Cafeteria Hours. No active flash sales at this moment.</p>
            </div>
          )}

          {/* SEARCH, SORT & CATEGORY FILTER */}
          <div className={`flex flex-wrap gap-3 items-center justify-between ${t.card} p-4 rounded-xl border shadow-sm`}>
            <div className="relative flex-1 min-w-[180px]">
              <Search className={`w-4 h-4 absolute left-3 top-3 ${t.subText}`} />
              <input 
                type="text" 
                placeholder="Search food item..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${t.input} border text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
              />
            </div>

            <div className={`flex items-center gap-1.5 ${t.input} border px-2.5 py-2 rounded-lg`}>
              <ArrowUpDown className={`w-3.5 h-3.5 ${t.subText}`} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs focus:outline-none cursor-pointer"
              >
                <option value="default" className={t.card}>Sort By: Default</option>
                <option value="low" className={t.card}>Price: Low to High</option>
                <option value="high" className={t.card}>Price: High to Low</option>
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
                      : `${t.input} ${t.subText} hover:opacity-100 border`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FOOD MENU GRID */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-400" /> Cafeteria Live Menu
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFoods.map(item => {
                const finalPrice = isSaleActive ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
                return (
                  <div key={item._id} className={`${t.card} rounded-xl p-4 border transition flex flex-col justify-between shadow-md`}>
                    <div>
                      <div className={`h-40 ${t.input} rounded-lg overflow-hidden mb-3 relative border`}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] font-bold bg-slate-950/80 text-orange-300 px-2 py-1 rounded-md backdrop-blur-md border border-slate-700">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-base">{item.name}</h4>
                        <div className="flex items-center gap-1 bg-amber-950/60 text-amber-400 border border-amber-800/50 text-xs px-2 py-0.5 rounded-md font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      <div className={`flex gap-2 text-[10px] ${t.subText} mt-2`}>
                        <span className={`${t.input} px-2 py-0.5 rounded border`}>{item.calories}</span>
                        <span className="bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50 flex items-center gap-1">
                          <Leaf className="w-3 h-3" /> {item.ecoSave}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-orange-500 font-extrabold text-xl">৳ {finalPrice}</span>
                        {isSaleActive && (
                          <span className={`text-xs ${t.subText} line-through`}>৳ {item.price}</span>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(item)}
                      className={`mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition shadow-md`}
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
            <div className={`${t.card} border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-4`}>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-1 animate-bounce" />
                <h3 className="text-base font-bold text-emerald-500">Order Confirmed!</h3>
                <p className={`text-xs ${t.subText}`}>Show this token at the cafeteria counter:</p>
                <div className="bg-emerald-950 text-emerald-200 text-2xl font-mono font-black py-2.5 rounded-xl border border-emerald-700/60 mt-2 tracking-widest shadow-inner">
                  {orderToken}
                </div>
              </div>

              <div className={`pt-2 border-t ${t.border}`}>
                <div className={`flex justify-between text-[11px] font-semibold ${t.subText} mb-2`}>
                  <span>Status:</span>
                  <span className={orderStatus === 'Ready for Pickup' ? 'text-emerald-500 font-bold' : 'text-orange-500 font-bold'}>
                    {orderStatus}
                  </span>
                </div>
                <div className={`w-full ${t.input} rounded-full h-2.5 overflow-hidden border`}>
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
          <div className={`${t.card} rounded-2xl p-5 border shadow-md`}>
            <div className={`flex items-center justify-between mb-4 pb-3 border-b ${t.border}`}>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold">Your Food Tray</h3>
              </div>
              <span className="bg-orange-500/20 text-orange-500 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                {cart.length} items
              </span>
            </div>

            {cart.length === 0 ? (
              <p className={`text-xs ${t.subText} text-center py-8`}>Your tray is empty. Tap items to add!</p>
            ) : (
              <div className="space-y-3">
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item, index) => (
                    <div key={index} className={`flex justify-between items-center ${t.input} p-2.5 rounded-lg border text-xs`}>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-orange-500 font-bold">৳ {item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className={`${t.subText} hover:text-red-500 p-1 transition`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className={`pt-3 border-t ${t.border} flex justify-between font-bold text-sm`}>
                  <span>Total Amount:</span>
                  <span className="text-orange-500 text-base">৳ {totalAmount}</span>
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
            <div className={`${t.card} rounded-2xl p-5 border shadow-md`}>
              <div className={`flex items-center gap-2 mb-4 pb-3 border-b ${t.border}`}>
                <History className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold">Order History Log</h3>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {orderHistory.map((ord, i) => (
                  <div key={i} className={`${t.input} p-3 rounded-xl border text-xs space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-emerald-500">{ord.token}</span>
                      <span className={`text-[10px] ${t.subText}`}>{ord.time}</span>
                    </div>
                    <div className={`flex justify-between ${t.subText}`}>
                      <span>{ord.items.length} items</span>
                      <span className="font-bold">৳ {ord.total}</span>
                    </div>
                    <div className={`flex justify-between items-center pt-1 border-t ${t.border}`}>
                      <span className={`text-[10px] ${t.subText}`}>Status:</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ord.status === 'Ready for Pickup' ? 'bg-emerald-950 text-emerald-500 border border-emerald-800' : 'bg-orange-950 text-orange-500 border border-orange-800 animate-pulse'
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
          <div className={`${t.card} rounded-2xl p-5 border shadow-md`}>
            <div className={`flex items-center gap-2 mb-4 pb-3 border-b ${t.border}`}>
              <Award className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold">Weekly Student Favorites</h3>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Chicken Cheese Burger', rating: '4.9 ★', votes: '128 orders' },
                { name: 'Iced Cold Coffee', rating: '4.7 ★', votes: '94 orders' },
                { name: 'Smokey Chicken Wrap', rating: '4.6 ★', votes: '81 orders' }
              ].map((topItem, idx) => (
                <div key={idx} className={`flex justify-between items-center ${t.input} p-2.5 rounded-xl border`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-bold w-5 h-5 ${t.card} text-orange-500 flex items-center justify-center rounded-full border`}>
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold">{topItem.name}</p>
                      <p className={`text-[10px] ${t.subText}`}>{topItem.votes}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-500 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                    {topItem.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FORGOT PASSWORD MODAL WITH OTP */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${t.card} border rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center`}>
            <button onClick={() => setShowForgotModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100`}>
              <X className="w-5 h-5" />
            </button>

            <Key className="w-10 h-10 text-orange-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Password Recovery</h3>

            {otpStep === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-3 mt-4 text-left">
                <p className={`text-xs ${t.subText}`}>Enter your SEU student email to receive an OTP code:</p>
                <input 
                  type="email" 
                  placeholder="2024100000001@seu.edu.bd"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
                  required
                />
                {forgotMsg && <p className="text-[11px] text-red-400 font-semibold">{forgotMsg}</p>}
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition">
                  Send OTP
                </button>
              </form>
            )}

            {otpStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-3 mt-4 text-left">
                <p className={`text-xs text-emerald-400 font-medium bg-emerald-950/40 p-2 rounded border border-emerald-800/50`}>{forgotMsg}</p>
                <label className={`text-xs ${t.subText} block`}>Enter 4-digit OTP code:</label>
                <input 
                  type="text" 
                  placeholder="e.g. 4821"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  className={`w-full ${t.input} border text-base tracking-widest text-center font-mono px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
                  required
                  maxLength={4}
                />
                {forgotMsg && inputOtp !== generatedOtp && <p className="text-[11px] text-red-400 font-semibold">{forgotMsg}</p>}
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition">
                  Verify OTP
                </button>
              </form>
            )}

            {otpStep === 3 && (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3 mt-4 text-left">
                <p className={`text-xs ${t.subText}`}>OTP Verified! Now create your new password:</p>
                <input 
                  type="password" 
                  placeholder="New Password (min 4 chars)"
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
                  required
                />
                {forgotMsg && <p className={`text-[11px] font-semibold ${forgotMsg.includes('success') ? 'text-emerald-500' : 'text-red-400'}`}>{forgotMsg}</p>}
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* STAFF PASSWORD MODAL */}
      {showStaffPasswordModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${t.card} border rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative`}>
            <button onClick={() => setShowStaffPasswordModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100`}>
              <X className="w-5 h-5" />
            </button>

            <Settings className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Staff Access Control</h3>
            <p className={`text-xs ${t.subText} mt-1 mb-4`}>Enter secret password to open staff mode:</p>

            <form onSubmit={handleStaffLogin} className="space-y-3">
              <input 
                type="password" 
                placeholder="Enter Staff Password"
                value={staffPasswordInput}
                onChange={(e) => { setStaffPasswordInput(e.target.value); setStaffPasswordError(''); }}
                className={`w-full ${t.input} border text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 text-center font-mono`}
                required
                autoFocus
              />
              {staffPasswordError && <p className="text-[11px] text-red-400 font-semibold">{staffPasswordError}</p>}

              <button 
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition shadow-md"
              >
                Unlock Staff Mode
              </button>
            </form>
          </div>
        </div>
      )}

      {/* POPUP TOKEN MODAL WITH QR CODE */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${t.card} border rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative`}>
            <button onClick={() => setShowTokenModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100`}>
              <X className="w-5 h-5" />
            </button>

            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2 animate-bounce" />
            <h3 className="text-lg font-bold">Order Confirmed!</h3>
            <p className={`text-xs ${t.subText} mt-1`}>Scan or show this token at the cafeteria counter:</p>

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

      {/* EDIT PROFILE & DETAILS MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${t.card} border rounded-2xl max-w-md w-full p-6 shadow-2xl relative`}>
            <button onClick={() => setShowProfileModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 ${t.input} p-1.5 rounded-full`}>
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-orange-500 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Edit Profile & Information
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-orange-500 shadow-md" />
                  <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-xs font-medium text-white">
                    Change
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            const newImg = uploadEvent.target.result;
                            setProfilePic(newImg);
                            localStorage.setItem('profilePic', newImg);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                <p className={`text-[11px] ${t.subText} mt-1`}>Hover to update picture</p>
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-1`}>Display Name</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
                />
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-1`}>SEU Student Email</label>
                <input 
                  type="email" 
                  value={userEmail} 
                  disabled
                  className={`w-full opacity-60 ${t.input} border text-sm px-3 py-2 rounded-lg cursor-not-allowed`}
                />
              </div>

              <button 
                onClick={() => {
                  localStorage.setItem('userName', userName);
                  setShowProfileModal(false);
                  alert("Profile updated successfully!");
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition mt-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${t.card} border rounded-2xl max-w-sm w-full p-6 shadow-2xl relative`}>
            <button onClick={() => setShowPasswordModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100`}>
              <X className="w-5 h-5" />
            </button>

            <Key className="w-10 h-10 text-orange-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Change Password</h3>
            <p className={`text-xs ${t.subText} mt-1 mb-4`}>Update your account password securely</p>

            <form onSubmit={handleChangePassword} className="space-y-3 text-left">
              <div>
                <label className={`text-xs ${t.subText} block mb-1`}>Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
                  required
                />
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-1`}>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password (min 4 chars)"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500`}
                  required
                />
              </div>

              {passwordMsg && <p className={`text-[11px] font-semibold ${passwordMsg.includes('success') ? 'text-emerald-500' : 'text-red-400'}`}>{passwordMsg}</p>}

              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md mt-2"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;