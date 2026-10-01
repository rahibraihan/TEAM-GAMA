import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Flame, Award, Search, 
  CheckCircle, ShieldCheck, Tag, Plus, Trash2, Clock, Star, ChefHat, Settings,
  History, Leaf, ArrowUpDown, X, QrCode, User, LogOut, Sun, Moon, BookOpen, Key, MessageSquare, Activity, Sparkles, PackageCheck, LayoutDashboard, MapPin, Compass, CreditCard, WalletCards, CalendarClock, Bell, SlidersHorizontal, Send, Check, ChevronDown, ChevronUp
} from 'lucide-react';


/* ============================================================
   CAMFOOD AI BUDDY + RIDER CONNECT + FOOD ARCADE
   Additive feature pack - existing CAMFood code stays intact.
   ============================================================ */
function CAMFoodAIBuddy({ orderStatus = 'Preparing', orderToken = null, foods = [] }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('ai');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am Mimo 🤖🍔, your CAMFood buddy. Ask me what to eat, your order status, or anything about CAMFood!' }
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [riderChat, setRiderChat] = useState([
    { from: 'rider', text: 'Hello! I am your CAMFood rider. I am on the way to your pickup point 🛵' }
  ]);
  const [riderInput, setRiderInput] = useState('');
  const [riderProgress, setRiderProgress] = useState(58);
  const [game, setGame] = useState('menu');
  const [score, setScore] = useState(0);
  const [gameMsg, setGameMsg] = useState('Choose a mini game and win CAMFood points! 🎮');
  const [quiz, setQuiz] = useState({ q: 'Which food is usually served cold?', options: ['French Fries', 'Ice Cream', 'Kacchi Biryani'], answer: 1 });
  const [spinResult, setSpinResult] = useState('');

  const safeFoods = Array.isArray(foods) ? foods : [];
  const speak = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.96;
    utterance.pitch = 1.15;
    utterance.volume = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const getFoodSuggestions = (text) => {
    const q = text.toLowerCase();
    if (!safeFoods.length) return 'Our menu is loading. Please check the food section in a moment.';
    let matches = safeFoods.filter(f => {
      const n = `${f.name} ${f.category} ${f.tag}`.toLowerCase();
      if (q.includes('cheap') || q.includes('budget') || q.includes('low price')) return Number(f.price) <= 130;
      if (q.includes('low calorie') || q.includes('healthy') || q.includes('light')) return parseInt(f.calories) <= 300;
      if (q.includes('sweet') || q.includes('dessert')) return /cake|ice cream|cheesecake|pastry|sweet|dessert/.test(n);
      if (q.includes('drink') || q.includes('coffee') || q.includes('juice')) return /cafe|coffee|juice|smoothie|shake|lemonade/.test(n);
      if (q.includes('spicy') || q.includes('jhal')) return /spicy|hot|smokey|kacchi|bhuna|kala/.test(n);
      if (q.includes('burger')) return /burger/.test(n);
      if (q.includes('biryani') || q.includes('rice')) return /biryani|rice|tehari|khichuri/.test(n);
      return false;
    });
    if (!matches.length) matches = [...safeFoods].sort((a,b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0,3);
    return `I suggest ${matches.slice(0,3).map(f => `${f.name} (৳${f.price})`).join(', ')}. 🍽️`;
  };

  const answerAI = (raw) => {
    const q = raw.toLowerCase().trim();
    if (!q) return 'Type something and I will help you! 😊';
    if (/hello|hi|hey|assalam|salam/.test(q)) return 'Assalamu Alaikum! 🌸 I am Mimo. Tell me your mood and budget, and I will suggest food.';
    if (/status|order|token|where.*order|ready/.test(q)) return orderToken ? `Your order #${orderToken} is currently ${orderStatus}. I will keep you updated. 🔔` : 'You do not have an active order yet. Pick something delicious from the menu! 🛒';
    if (/rider|delivery|courier/.test(q)) return 'Open Rider Connect below to see the demo rider location and send a message. 🛵';
    if (/game|play|fun/.test(q)) return 'Open Food Arcade 🎮 and try the Food Quiz or Spin & Win.';
    if (/help|what can you do|features/.test(q)) return 'I can suggest food, explain your order status, guide you to Rider Connect, and start a food mini-game. 🤖';
    if (/price|cheap|budget|low calorie|healthy|light|sweet|dessert|drink|coffee|juice|spicy|jhal|burger|biryani|rice/.test(q)) return getFoodSuggestions(q);
    if (/thank|thanks|dhonnobad/.test(q)) return 'You are very welcome! 💛 Enjoy your meal from CAMFood!';
    return 'I am your CAMFood smart buddy 🤖. Try asking: “What should I eat?”, “Suggest cheap food”, “Low calorie food?”, “Where is my rider?”, or “Order status?”.';
  };

  const sendAI = (forcedText = null) => {
    const text = (forcedText ?? input).trim();
    if (!text) return;
    const reply = answerAI(text);
    setMessages(prev => [...prev, { from:'user', text }, { from:'bot', text:reply }]);
    setInput('');
    setTimeout(() => speak(reply), 120);
  };

  const sendRider = () => {
    const text = riderInput.trim();
    if (!text) return;
    setRiderChat(prev => [...prev, { from:'user', text }]);
    setRiderInput('');
    const replies = [
      'Got it! I am coming toward the cafeteria pickup area. 🛵',
      'Sure! I am carrying your order carefully. 🍱',
      'I am nearby. Please keep your order token ready. 👍',
      'Thanks! I will update you if there is any delay. 🔔'
    ];
    setTimeout(() => setRiderChat(prev => [...prev, { from:'rider', text: replies[Math.floor(Math.random()*replies.length)] }]), 650);
  };

  useEffect(() => {
    const timer = setInterval(() => setRiderProgress(v => v >= 92 ? 58 : v + 1), 1800);
    return () => clearInterval(timer);
  }, []);

  const playQuiz = (idx) => {
    if (idx === quiz.answer) {
      setScore(v => v + 10);
      setGameMsg('Correct! 🎉 +10 CAMPoints.');
    } else setGameMsg('Not quite! 😄 Try the next one.');
    const qs = [
      { q:'Which food is usually served cold?', options:['French Fries','Ice Cream','Kacchi Biryani'], answer:1 },
      { q:'Which item is a drink?', options:['Mango Smoothie','Burger','Momos'], answer:0 },
      { q:'Which one is a dessert?', options:['Cheesecake','Chowmein','Chicken Wrap'], answer:0 },
      { q:'Which food is rice-based?', options:['Beef Tehari','Garlic Bread','Fries'], answer:0 }
    ];
    setTimeout(() => setQuiz(qs[Math.floor(Math.random()*qs.length)]), 700);
  };

  const spin = () => {
    const prizes = ['৳10 OFF', 'FREE DRINK', '5 CAMPoints', '৳20 OFF', 'TRY AGAIN'];
    setSpinResult(prizes[Math.floor(Math.random()*prizes.length)]);
  };

  return (
    <>
      <style>{`
        @keyframes mimoFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
        @keyframes mimoPulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,.22)} 50%{box-shadow:0 0 0 12px rgba(249,115,22,0)} }
        @keyframes riderMove { from{left:10%} to{left:78%} }
        @keyframes arcadeShine { 0%{transform:translateX(-120%)} 100%{transform:translateX(420%)} }
        .mimo-float{animation:mimoFloat 3s ease-in-out infinite}.mimo-pulse{animation:mimoPulse 2s infinite}
        .mimo-scroll{scrollbar-width:thin}.arcade-shine{animation:arcadeShine 2.8s infinite}
      `}</style>

      <button onClick={() => setOpen(v=>!v)} className="fixed bottom-5 right-5 z-[90] group" aria-label="Open CAMFood AI Buddy">
        <div className="relative mimo-pulse w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-violet-600 text-white flex items-center justify-center shadow-2xl border-4 border-white/80 hover:scale-110 transition-transform">
          <div className="text-3xl mimo-float">🤖</div>
          <span className="absolute -top-2 -right-1 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-full border-2 border-white">AI</span>
        </div>
      </button>

      {open && <div className="fixed bottom-24 right-4 z-[90] w-[min(430px,calc(100vw-2rem))] rounded-[28px] overflow-hidden border border-white/20 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl">
        <div className="p-4 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="text-4xl mimo-float">🤖</div><div><div className="font-black">Mimo AI Buddy</div><div className="text-[10px] font-bold opacity-90">Food • Order • Rider • Fun</div></div></div>
            <button onClick={()=>setOpen(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30">×</button>
          </div>
          <div className="mt-3 flex gap-1 bg-black/20 p-1 rounded-xl">
            {['ai','rider','game'].map(x=><button key={x} onClick={()=>setTab(x)} className={`flex-1 py-2 rounded-lg text-[10px] font-black ${tab===x?'bg-white text-slate-900':'text-white/80'}`}>{x==='ai'?'🤖 AI CHAT':x==='rider'?'🛵 RIDER':'🎮 ARCADE'}</button>)}
          </div>
        </div>

        {tab==='ai' && <div className="p-3">
          <div className="h-72 overflow-y-auto mimo-scroll space-y-2 p-1">
            {messages.map((m,i)=><div key={i} className={`flex ${m.from==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[84%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${m.from==='user'?'bg-orange-500 text-white rounded-br-sm':'bg-white/10 border border-white/10 text-slate-100 rounded-bl-sm'}`}>{m.text}</div></div>)}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {['Suggest cheap food','Low calorie food','I want something sweet','Where is my rider?'].map(q=><button key={q} onClick={()=>sendAI(q)} className="text-[9px] font-bold px-2 py-1.5 rounded-full bg-white/10 hover:bg-orange-500/30 border border-white/10">{q}</button>)}
          </div>
          <div className="flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendAI()} placeholder="Ask Mimo anything..." className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-orange-400"/><button onClick={()=>sendAI()} className="w-10 rounded-xl bg-orange-500 hover:bg-orange-600 flex items-center justify-center"><Send className="w-4 h-4"/></button></div>
          <button onClick={()=>speak('Welcome to CAMFood! I can suggest delicious food and help with your order.')} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 py-2 text-[10px] font-black">{speaking?'🔊 Speaking...':'🔊 Make Mimo Speak'}</button>
        </div>}

        {tab==='rider' && <div className="p-3 space-y-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
            <div className="flex justify-between items-center"><div><div className="text-xs font-black">Rider: Rahim 🛵</div><div className="text-[10px] text-emerald-400 font-bold">● Online • 2 min away</div></div><div className="text-2xl">🛵</div></div>
            <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-emerald-950 via-slate-900 to-orange-950 relative overflow-hidden border border-white/10"><div className="absolute inset-x-4 top-1/2 border-t-2 border-dashed border-white/20"></div><div className="absolute top-3 left-4 text-lg">🏫</div><div className="absolute bottom-3 right-4 text-lg">📍</div><div className="absolute top-[42%] text-xl transition-all duration-1000" style={{left:`${riderProgress}%`}}>🛵</div></div>
            <div className="flex justify-between mt-2 text-[9px] text-slate-400"><span>Kitchen</span><span>Rider is here → Pickup point</span></div>
          </div>
          <div className="h-40 overflow-y-auto mimo-scroll space-y-2">{riderChat.map((m,i)=><div key={i} className={`flex ${m.from==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[82%] px-3 py-2 rounded-2xl text-xs ${m.from==='user'?'bg-violet-500':'bg-white/10'}`}>{m.text}</div></div>)}</div>
          <div className="flex gap-2"><input value={riderInput} onChange={e=>setRiderInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendRider()} placeholder="Text your rider..." className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-xs outline-none"/><button onClick={sendRider} className="w-10 rounded-xl bg-violet-500 flex items-center justify-center"><Send className="w-4 h-4"/></button></div>
          <div className="text-[9px] text-center text-slate-400">Demo rider location is simulated locally for the project.</div>
        </div>}

        {tab==='game' && <div className="p-3">
          <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-fuchsia-600/30 via-orange-500/20 to-amber-400/20 border border-white/10"><div className="absolute -inset-y-10 -left-20 w-10 bg-white/20 blur-xl arcade-shine"></div><div className="text-center relative"><div className="text-4xl">🍔🎮🍕</div><div className="font-black mt-1">CAMFood Arcade</div><div className="text-[10px] text-white/60">Score: {score} CAMPoints</div></div></div>
          <div className="grid grid-cols-2 gap-2 mt-3"><button onClick={()=>{setGame('quiz');setGameMsg('Pick the correct answer!')}} className="rounded-2xl p-4 bg-white/10 border border-white/10 hover:bg-orange-500/20"><div className="text-2xl">🧠</div><div className="text-xs font-black mt-1">Food Quiz</div></button><button onClick={()=>{setGame('spin');setGameMsg('Spin for a surprise!')}} className="rounded-2xl p-4 bg-white/10 border border-white/10 hover:bg-pink-500/20"><div className="text-2xl">🎡</div><div className="text-xs font-black mt-1">Spin & Win</div></button></div>
          {game==='quiz' && <div className="mt-3 rounded-2xl bg-white/5 p-4"><div className="text-xs font-black mb-3">{quiz.q}</div><div className="space-y-2">{quiz.options.map((o,i)=><button key={o} onClick={()=>playQuiz(i)} className="w-full text-left px-3 py-2 rounded-xl bg-white/10 hover:bg-orange-500/30 text-xs font-bold">{o}</button>)}</div></div>}
          {game==='spin' && <div className="mt-3 text-center rounded-2xl bg-white/5 p-4"><div className="text-6xl mimo-float">🎡</div><button onClick={spin} className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 text-xs font-black">SPIN NOW</button>{spinResult&&<div className="mt-3 text-lg font-black text-amber-300">🎁 {spinResult}</div>}</div>}
          <div className="mt-3 text-center text-[10px] text-slate-400">{gameMsg}</div>
        </div>}
      </div>}
    </>
  );
}

function App() {
  // Foods state with Nutrition & Eco metrics (30 Items)
  const [foods, setFoods] = useState([
    { _id: '1', name: 'Chicken Cheese Burger', price: 180, category: 'Burgers', rating: 4.9, calories: '450 kcal', ecoSave: '120g Saved', tag: 'Bestseller 🔥', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', reviews: [] },
    { _id: '2', name: 'Iced Cold Coffee', price: 90, category: 'Cafe', rating: 4.7, calories: '180 kcal', ecoSave: '50g Saved', tag: 'Refreshing ❄️', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500', reviews: [] },
    { _id: '3', name: 'Crispy French Fries', price: 80, category: 'Snacks', rating: 4.4, calories: '320 kcal', ecoSave: '80g Saved', tag: 'Crispy 🍟', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500', reviews: [] },
    { _id: '4', name: 'Smokey Chicken Wrap', price: 150, category: 'Fast Food', rating: 4.6, calories: '380 kcal', ecoSave: '100g Saved', tag: 'Spicy 🌶️', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500', reviews: [] },
    { _id: '5', name: 'Chicken Kacchi Biryani', price: 220, category: 'Rice Dishes', rating: 4.9, calories: '650 kcal', ecoSave: '150g Saved', tag: 'Top Choice 👑', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500', reviews: [] },
    { _id: '6', name: 'Red Velvet Pastry Cake', price: 120, category: 'Cakes', rating: 4.8, calories: '290 kcal', ecoSave: '60g Saved', tag: 'Sweet 🍰', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500', reviews: [] },
    { _id: '7', name: 'Shorshe Ilish Platter', price: 280, category: 'Bangladeshi', rating: 4.9, calories: '510 kcal', ecoSave: '110g Saved', tag: 'Traditional 🐟', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500', reviews: [] },
    { _id: '8', name: 'Fried Chicken Drumsticks', price: 160, category: 'Fast Food', rating: 4.5, calories: '420 kcal', ecoSave: '90g Saved', tag: 'Crunchy 🍗', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500', reviews: [] },
    { _id: '9', name: 'Loaded Pepperoni Pizza', price: 350, category: 'Fast Food', rating: 4.8, calories: '720 kcal', ecoSave: '140g Saved', tag: 'Cheesy 🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', reviews: [] },
    { _id: '10', name: 'Creamy Alfredo Pasta', price: 210, category: 'Fast Food', rating: 4.6, calories: '530 kcal', ecoSave: '95g Saved', tag: 'Creamy 🍝', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281288?w=500', reviews: [] },
    { _id: '11', name: 'Fresh Mango Smoothie', price: 110, category: 'Cafe', rating: 4.9, calories: '210 kcal', ecoSave: '40g Saved', tag: 'Fresh 🥭', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500', reviews: [] },
    { _id: '12', name: 'Club Sub Sandwich', price: 140, category: 'Snacks', rating: 4.5, calories: '360 kcal', ecoSave: '75g Saved', tag: 'Healthy 🥪', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500', reviews: [] },
    { _id: '13', name: 'Chicken Chowmein', price: 170, category: 'Fast Food', rating: 4.7, calories: '480 kcal', ecoSave: '105g Saved', tag: 'Popular 🥢', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500', reviews: [] },
    { _id: '14', name: 'Chocolate Lava Cake', price: 130, category: 'Cakes', rating: 4.9, calories: '340 kcal', ecoSave: '55g Saved', tag: 'Hot Dessert 🍫', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500', reviews: [] },
    { _id: '15', name: 'Beef Kala Bhuna Rice', price: 260, category: 'Rice Dishes', rating: 4.9, calories: '690 kcal', ecoSave: '160g Saved', tag: 'Spicy Delight 🌶️', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500', reviews: [] },
    { _id: '16', name: 'Masala Lemonade Juice', price: 60, category: 'Cafe', rating: 4.3, calories: '90 kcal', ecoSave: '30g Saved', tag: 'Chilled 🍋', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500', reviews: [] },
    { _id: '17', name: 'Smokey BBQ Wings', price: 190, category: 'Fast Food', rating: 4.8, calories: '410 kcal', ecoSave: '85g Saved', tag: 'Smokey 🔥', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500', reviews: [] },
    { _id: '18', name: 'Hot Cappuccino', price: 100, category: 'Cafe', rating: 4.6, calories: '130 kcal', ecoSave: '45g Saved', tag: 'Hot Brew ☕', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500', reviews: [] },
    { _id: '19', name: 'Double Patty Beef Burger', price: 240, category: 'Burgers', rating: 4.9, calories: '620 kcal', ecoSave: '130g Saved', tag: 'Juicy 🍔', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500', reviews: [] },
    { _id: '20', name: 'Crispy Chicken Momos', price: 130, category: 'Snacks', rating: 4.7, calories: '310 kcal', ecoSave: '70g Saved', tag: 'Steam & Fried 🥟', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500', reviews: [] },
    { _id: '21', name: 'Beef Tehari', price: 210, category: 'Rice Dishes', rating: 4.8, calories: '580 kcal', ecoSave: '140g Saved', tag: 'Old Dhaka Style 🍚', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500', reviews: [] },
    { _id: '22', name: 'Cheese Garlic Bread', price: 110, category: 'Snacks', rating: 4.5, calories: '270 kcal', ecoSave: '65g Saved', tag: 'Cheesy 🥖', image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=500', reviews: [] },
    { _id: '23', name: 'Spicy Fried Noodles', price: 140, category: 'Fast Food', rating: 4.4, calories: '440 kcal', ecoSave: '90g Saved', tag: 'Hot 🍜', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500', reviews: [] },
    { _id: '24', name: 'Vanilla Ice Cream Sundae', price: 95, category: 'Cakes', rating: 4.7, calories: '250 kcal', ecoSave: '50g Saved', tag: 'Sweet Treat 🍨', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500', reviews: [] },
    { _id: '25', name: 'Thai Soup with Wonton', price: 160, category: 'Snacks', rating: 4.8, calories: '280 kcal', ecoSave: '80g Saved', tag: 'Warm & Spicy 🥣', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500', reviews: [] },
    { _id: '26', name: 'Bhuna Khichuri Platter', price: 190, category: 'Bangladeshi', rating: 4.9, calories: '540 kcal', ecoSave: '115g Saved', tag: 'Rainy Special 🌧️', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=500', reviews: [] },
    { _id: '27', name: 'Oreo Milkshake', price: 130, category: 'Cafe', rating: 4.8, calories: '390 kcal', ecoSave: '60g Saved', tag: 'Rich & Thick 🥤', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500', reviews: [] },
    { _id: '28', name: 'Mini Cheese Pizza (8")', price: 220, category: 'Fast Food', rating: 4.6, calories: '490 kcal', ecoSave: '100g Saved', tag: 'Personal Size 🍕', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500', reviews: [] },
    { _id: '29', name: 'Crispy Fish & Chips', price: 230, category: 'Fast Food', rating: 4.7, calories: '510 kcal', ecoSave: '105g Saved', tag: 'Sea Food 🐟', image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=500', reviews: [] },
    { _id: '30', name: 'Classic Blueberry Cheesecake', price: 160, category: 'Cakes', rating: 4.9, calories: '310 kcal', ecoSave: '50g Saved', tag: 'Premium 🍰', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500', reviews: [] }
  ]);

  // Main Navigation / Mode State ('dine-in' | 'pickup' | 'crowd-map' | 'staff') mimics Foodpanda top bar
  const [activeTab, setActiveTab] = useState('dine-in');

  // Cart & Search States
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Live Cafeteria Zones Crowd Status State
  const [cafeteriaZones, setCafeteriaZones] = useState(() => {
    const savedZones = localStorage.getItem('cafeteriaZones');
    return savedZones ? JSON.parse(savedZones) : [
      { id: 'zone1', name: 'Main Food & Biryani Counter', count: 28, status: 'red', waitTime: '15-20 mins', coordinates: { x: 30, y: 40 } },
      { id: 'zone2', name: 'Fast Food & Burger Station', count: 16, status: 'yellow', waitTime: '8-12 mins', coordinates: { x: 70, y: 35 } },
      { id: 'zone3', name: 'Cafe, Coffee & Drinks Bar', count: 6, status: 'green', waitTime: '3-5 mins', coordinates: { x: 50, y: 75 } }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cafeteriaZones', JSON.stringify(cafeteriaZones));
  }, [cafeteriaZones]);

  // Auth & SEU Student Validation States with Password support
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState('');

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpStep, setOtpStep] = useState(1);
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

  // Review & Rating Modal States (Play Store Style Interactive Rating)
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [activeFoodForReview, setActiveFoodForReview] = useState(null);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  // Compact review accordion: reviews remain closed until the arrow is clicked.
  const [expandedReviews, setExpandedReviews] = useState({});

  // Theme & Reading Mode States
  const [themeMode, setThemeMode] = useState('dark');

  // Single Order Token State
  const [orderToken, setOrderToken] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Preparing');

  // Order History & Modal States
  const [orderHistory, setOrderHistory] = useState([]);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [activeToken, setActiveToken] = useState(null);


  // ============================================================
  // CAMFood PRO FEATURE PACK (ADDITIVE - ORIGINAL FEATURES KEPT)
  // ============================================================

  // Mock Digital Payment Gateway
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [paymentReference, setPaymentReference] = useState('');
  const [studentBalance, setStudentBalance] = useState(() => {
    const saved = localStorage.getItem('camfoodStudentBalance');
    return saved ? Number(saved) : 2500;
  });
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // Smart Meal Pre-Order / Scheduling
  const [showPreOrderModal, setShowPreOrderModal] = useState(false);
  const [preOrderDate, setPreOrderDate] = useState('');
  const [preOrderSlot, setPreOrderSlot] = useState('12:30 PM - 12:45 PM');
  const [preOrderMessage, setPreOrderMessage] = useState('');
  const [preOrders, setPreOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('camfoodPreOrders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Dietary / Allergen Smart Filters
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [maxCalories, setMaxCalories] = useState('All');

  // Kitchen Staff Queue
  const [kitchenQueue, setKitchenQueue] = useState(() => {
    try {
      const saved = localStorage.getItem('camfoodKitchenQueue');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Toast / Real-Time Notification Center
  const [liveNotification, setLiveNotification] = useState('');
  const [notificationHistory, setNotificationHistory] = useState([]);

  // Cafeteria-wide service feedback
  const [showServiceFeedbackModal, setShowServiceFeedbackModal] = useState(false);
  const [serviceRating, setServiceRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [serviceFeedbackText, setServiceFeedbackText] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Smart feature panel visibility
  const [showSmartHub, setShowSmartHub] = useState(true);

  useEffect(() => {
    localStorage.setItem('camfoodStudentBalance', String(studentBalance));
  }, [studentBalance]);

  useEffect(() => {
    localStorage.setItem('camfoodPreOrders', JSON.stringify(preOrders));
  }, [preOrders]);

  useEffect(() => {
    localStorage.setItem('camfoodKitchenQueue', JSON.stringify(kitchenQueue));
  }, [kitchenQueue]);

  // Live notification whenever the current order changes status.
  useEffect(() => {
    if (!orderToken) return;
    const message = orderStatus === 'Preparing'
      ? `Order ${orderToken}: Kitchen is preparing your food.`
      : orderStatus === 'Ready for Pickup'
        ? `Order ${orderToken}: Your food is ready!`
        : `Order ${orderToken}: ${orderStatus}`;
    setLiveNotification(message);
    setNotificationHistory(prev => [
      { id: Date.now(), message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ...prev
    ].slice(0, 6));
    const timer = setTimeout(() => setLiveNotification(''), 4500);
    return () => clearTimeout(timer);
  }, [orderStatus, orderToken]);

  // Automatically clear payment feedback after a short period.
  useEffect(() => {
    if (!paymentMessage) return;
    const timer = setTimeout(() => setPaymentMessage(''), 3500);
    return () => clearTimeout(timer);
  }, [paymentMessage]);

  // Dietary matching helper. The original food objects are untouched.
  const getCaloriesNumber = (food) => {
    const value = String(food?.calories || '').match(/\d+/);
    return value ? Number(value[0]) : 9999;
  };

  const matchesDietaryFilter = (food) => {
    const name = `${food.name} ${food.category} ${food.tag}`.toLowerCase();
    if (dietaryFilter === 'Vegetarian') {
      return !/(chicken|beef|fish|ilish|momo|pepperoni|meat|wings|drumstick|kacchi|tehari|kala bhuna)/i.test(name);
    }
    if (dietaryFilter === 'Halal') {
      return true; // Demo catalog is treated as halal by the cafeteria demo.
    }
    if (dietaryFilter === 'Gluten-Free') {
      return /(rice|biryani|ilish|khichuri|soup|smoothie|lemonade|coffee|cappuccino|milkshake)/i.test(name)
        && !/(bread|pasta|burger|wrap|pizza|sandwich|noodle|chowmein|cake|cheesecake|fries)/i.test(name);
    }
    if (dietaryFilter === 'Low Calorie') {
      return getCaloriesNumber(food) <= 300;
    }
    return true;
  };

  const smartFilteredFoods = foods.filter(food => {
    const calorieOk = maxCalories === 'All'
      || getCaloriesNumber(food) <= Number(maxCalories);
    return matchesDietaryFilter(food) && calorieOk;
  });

  // Add a new order to the demo-wide kitchen queue.
  const pushToKitchenQueue = (order) => {
    setKitchenQueue(prev => {
      const next = [order, ...prev.filter(item => item.token !== order.token)].slice(0, 30);
      localStorage.setItem('camfoodKitchenQueue', JSON.stringify(next));
      return next;
    });
  };

  // Enhanced checkout flow: optional mock payment + kitchen queue + live tracking.
  const openMockPayment = () => {
    if (!isAuth) {
      alert("Please login with your SEU student email first!");
      return;
    }
    if (cart.length === 0) {
      alert("Your tray is empty. Add food items first!");
      return;
    }
    setPaymentReference('');
    setPaymentMessage('');
    setShowPaymentModal(true);
  };

  const createEnhancedOrderAfterPayment = (method, reference) => {
    const prefix = activeTab === 'pickup' ? 'PICKUP-' : 'CAM-';
    const newToken = prefix + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      token: newToken,
      orderType: activeTab === 'pickup' ? 'Self Pick-up' : 'Dine-In',
      items: [...cart],
      total: totalAmount,
      status: 'Preparing',
      paymentMethod: method,
      paymentReference: reference || 'DEMO-' + Date.now(),
      paid: true,
      studentEmail: userEmail,
      studentName: userName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString()
    };

    setOrderToken(newToken);
    setOrderStatus('Preparing');
    setActiveToken(newToken);
    setShowTokenModal(true);

    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem(`orderHistory_${userEmail}`, JSON.stringify(updatedHistory));
    pushToKitchenQueue(newOrder);
    setCart([]);

    // Demo real-time kitchen progression.
    setTimeout(() => {
      setOrderStatus('Cooking');
      setKitchenQueue(prev => prev.map(order =>
        order.token === newToken ? { ...order, status: 'Cooking' } : order
      ));
    }, 3500);

    setTimeout(() => {
      setOrderStatus('Ready for Pickup');
      setKitchenQueue(prev => prev.map(order =>
        order.token === newToken ? { ...order, status: 'Ready for Pickup' } : order
      ));
      setOrderHistory(prev => {
        const updated = prev.map(ord =>
          ord.token === newToken ? { ...ord, status: 'Ready for Pickup' } : ord
        );
        localStorage.setItem(`orderHistory_${userEmail}`, JSON.stringify(updated));
        return updated;
      });
    }, 7500);
  };

  const handleMockPayment = (e) => {
    e.preventDefault();
    if (!isAuth || cart.length === 0) return;

    setIsPaymentProcessing(true);
    setPaymentMessage('');

    setTimeout(() => {
      const cleanRef = paymentReference.trim() || `DEMO-${Math.floor(100000 + Math.random() * 900000)}`;

      if (paymentMethod === 'Student Account') {
        if (studentBalance < totalAmount) {
          setIsPaymentProcessing(false);
          setPaymentMessage('Insufficient student account balance.');
          return;
        }
        setStudentBalance(prev => prev - totalAmount);
      }

      setIsPaymentProcessing(false);
      setPaymentMessage(`Payment successful via ${paymentMethod}!`);
      createEnhancedOrderAfterPayment(paymentMethod, cleanRef);
      setTimeout(() => setShowPaymentModal(false), 900);
    }, 900);
  };

  // Pre-order a meal for a selected future time slot.
  const handlePreOrderSubmit = (e) => {
    e.preventDefault();
    if (!isAuth) {
      alert("Please login first to schedule a meal!");
      return;
    }
    if (cart.length === 0) {
      setPreOrderMessage('Please add at least one food item to your tray first.');
      return;
    }
    if (!preOrderDate) {
      setPreOrderMessage('Please select a date.');
      return;
    }

    const scheduled = {
      id: Date.now(),
      email: userEmail,
      token: 'PRE-' + Math.floor(100000 + Math.random() * 900000),
      date: preOrderDate,
      slot: preOrderSlot,
      items: [...cart],
      total: totalAmount,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    const next = [scheduled, ...preOrders];
    setPreOrders(next);
    localStorage.setItem('camfoodPreOrders', JSON.stringify(next));
    setCart([]);
    setPreOrderMessage(`Pre-order confirmed for ${preOrderDate} (${preOrderSlot}).`);
    setLiveNotification(`Meal pre-order ${scheduled.token} scheduled successfully.`);
  };

  const cancelPreOrder = (id) => {
    setPreOrders(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'Cancelled' } : item
    ));
  };

  // Kitchen dashboard controls.
  const updateKitchenOrderStatus = (token, status) => {
    setKitchenQueue(prev => {
      const next = prev.map(order => order.token === token ? { ...order, status } : order);
      localStorage.setItem('camfoodKitchenQueue', JSON.stringify(next));
      return next;
    });

    setOrderStatus(status);
    setOrderHistory(prev => {
      const next = prev.map(order => order.token === token ? { ...order, status } : order);
      if (userEmail) localStorage.setItem(`orderHistory_${userEmail}`, JSON.stringify(next));
      return next;
    });
  };

  // Cafeteria-wide service / cleanliness feedback.
  const handleServiceFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!isAuth) {
      alert("Please login first to submit cafeteria feedback!");
      return;
    }
    if (!serviceFeedbackText.trim()) {
      setFeedbackMessage('Please write a short feedback message.');
      return;
    }

    const record = {
      id: Date.now(),
      email: userEmail,
      user: userName,
      serviceRating,
      cleanlinessRating,
      comment: serviceFeedbackText.trim(),
      time: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem('camfoodServiceFeedback') || '[]');
    localStorage.setItem('camfoodServiceFeedback', JSON.stringify([record, ...existing]));
    setServiceFeedbackText('');
    setServiceRating(5);
    setCleanlinessRating(5);
    setFeedbackMessage('Thank you! Your cafeteria feedback has been recorded.');
    setTimeout(() => setShowServiceFeedbackModal(false), 900);
  };

  // Load saved data from LocalStorage on mount
  useEffect(() => {
    // --- START NEW CODE FOR BACKEND REAL DATA FETCH ---
    // (This loads your real backend database items in the frontend smoothly)
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => {
        if(data.success && data.data && data.data.length > 0) {
          setFoods(data.data);
        }
      })
      .catch(err => console.log("Waiting for backend connectivity...", err));
    // --- END NEW CODE ---

    const savedAuth = localStorage.getItem('isAuth');
    const savedEmail = localStorage.getItem('userEmail');
    const savedName = localStorage.getItem('userName');
    const savedTheme = localStorage.getItem('themeMode');
    const savedStaff = localStorage.getItem('isStaffMode');
    const savedFoods = localStorage.getItem('cafeteriaFoods');

    if (savedFoods) setFoods(JSON.parse(savedFoods));
    if (savedAuth) setIsAuth(JSON.parse(savedAuth));
    if (savedEmail) {
      setUserEmail(savedEmail);
      
      const userSpecificPic = localStorage.getItem(`profilePic_${savedEmail}`);
      if (userSpecificPic) {
        setProfilePic(userSpecificPic);
      } else {
        setProfilePic('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500');
      }

      const userOrders = localStorage.getItem(`orderHistory_${savedEmail}`);
      if (userOrders) {
        setOrderHistory(JSON.parse(userOrders));
      }
    }
    if (savedName) setUserName(savedName);
    if (savedTheme) setThemeMode(savedTheme);
    if (savedStaff && JSON.parse(savedStaff)) {
      setIsStaffMode(true);
    }
  }, []);

  // STAFF & FLASH SALE CONTROLS
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
      setActiveTab('staff');
    } else {
      setStaffPasswordError('Incorrect Password! Access denied.');
    }
  };

  const handleLogoutStaff = () => {
    setIsStaffMode(false);
    localStorage.removeItem('isStaffMode');
    setActiveTab('dine-in');
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
      setAuthError('Incorrect password! Please enter your correct password or use Forgot Password.');
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

    const userSpecificPic = localStorage.getItem(`profilePic_${cleanEmail}`);
    if (userSpecificPic) {
      setProfilePic(userSpecificPic);
    } else {
      const defaultPic = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500';
      setProfilePic(defaultPic);
    }

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
    setProfilePic('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userEmail');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanEmail = forgotEmail.trim().toLowerCase();
    if (!cleanEmail.endsWith('@seu.edu.bd')) {
      setForgotMsg('Please enter a valid SEU student email!');
      return;
    }
    
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

  const handleUpdateZoneCrowd = (zoneId, newCount) => {
    const countNum = Math.max(0, Number(newCount));
    let status = 'green';
    let waitTime = '3-5 mins';
    if (countNum > 25) {
      status = 'red';
      waitTime = '15-20 mins';
    } else if (countNum > 10) {
      status = 'yellow';
      waitTime = '8-12 mins';
    }

    const updatedZones = cafeteriaZones.map(z => z.id === zoneId ? { ...z, count: countNum, status, waitTime } : z);
    setCafeteriaZones(updatedZones);
  };

  // PLAY STORE STYLE REVIEW SUBMISSION (Strict 1 Review & 1 Comment per User per Item)
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuth) {
      alert("Please login first to submit a review!");
      return;
    }
    if (!newReviewComment.trim()) {
      alert("Please write a short comment!");
      return;
    }

    const updatedFoods = foods.map(item => {
      if (item._id === activeFoodForReview._id) {
        const existingReviews = item.reviews || [];
        
        // Check if user has already reviewed this item
        const existingIndex = existingReviews.findIndex(r => r.email === userEmail);

        let allReviews = [...existingReviews];
        const newReviewObj = {
          id: existingIndex >= 0 ? existingReviews[existingIndex].id : Date.now(),
          user: userName,
          email: userEmail,
          rating: Number(newReviewRating),
          comment: newReviewComment.trim(),
          time: new Date().toLocaleDateString()
        };

        if (existingIndex >= 0) {
          // Update existing review (Play Store style: user can update their review/comment once)
          allReviews[existingIndex] = newReviewObj;
        } else {
          // Add new review if none exists
          allReviews = [newReviewObj, ...existingReviews];
        }

        const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

        return {
          ...item,
          rating: Number(avgRating),
          reviews: allReviews
        };
      }
      return item;
    });

    setFoods(updatedFoods);
    localStorage.setItem('cafeteriaFoods', JSON.stringify(updatedFoods));
    setNewReviewComment('');
    setNewReviewRating(5);
    setShowReviewModal(false);
    alert("Review and rating submitted successfully! (Play Store style: Each user can submit/update 1 review per item)");
  };

  const handleDeleteReview = (foodId, reviewId, reviewEmail) => {
    if (!isStaffMode && (!isAuth || userEmail !== reviewEmail)) {
      alert("You can only delete your own reviews!");
      return;
    }

    const updatedFoods = foods.map(item => {
      if (item._id === foodId) {
        const filteredReviews = (item.reviews || []).filter(rev => rev.id !== reviewId);
        const avgRating = filteredReviews.length > 0 
          ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
          : 4.8;

        return {
          ...item,
          rating: Number(avgRating),
          reviews: filteredReviews
        };
      }
      return item;
    });

    setFoods(updatedFoods);
    localStorage.setItem('cafeteriaFoods', JSON.stringify(updatedFoods));
  };

  // --- NEW ASYNC MODIFICATION START: Backend connection for Add To Tray button ---
  const addToCart = async (food) => {
    const finalPrice = isSaleActive ? Math.round(food.price * (1 - discountPercent / 100)) : food.price;
    
    // BACKEND API CALL FOR CART
    try {
        await fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemId: food._id,
                itemName: food.name,
                price: finalPrice
            })
        });
    } catch (error) {
        console.error("Backend error when adding to cart:", error);
    }

    // EXISTING FRONTEND STATE UPDATE (unchanged)
    setCart([...cart, { ...food, price: finalPrice }]);
  };
  // --- NEW ASYNC MODIFICATION END ---

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

    const prefix = activeTab === 'pickup' ? 'PICKUP-' : 'CAM-';
    const newToken = prefix + Math.floor(100000 + Math.random() * 900000);
    
    setOrderToken(newToken);
    setOrderStatus('Preparing');
    setActiveToken(newToken);
    setShowTokenModal(true);

    const newOrder = {
      token: newToken,
      orderType: activeTab === 'pickup' ? 'Self Pick-up' : 'Dine-In',
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
        bg: 'bg-gradient-to-br from-slate-50 via-orange-50/20 to-amber-50/30 text-slate-900',
        nav: 'bg-white/80 backdrop-blur-xl border-slate-200/80 shadow-lg shadow-slate-200/50',
        card: 'bg-white/90 backdrop-blur-md border-slate-200/80 text-slate-900 shadow-xl shadow-slate-200/50 hover:shadow-2xl',
        subText: 'text-slate-500',
        input: 'bg-slate-50/80 border-slate-200 text-slate-900 focus:bg-white',
        border: 'border-slate-200/80'
      };
    } else if (themeMode === 'reading') {
      return {
        bg: 'bg-gradient-to-br from-[#f4ecd8] via-[#f7f1e3] to-[#eee2c6] text-[#3c2f2f]',
        nav: 'bg-[#e9dfc7]/90 backdrop-blur-xl border-[#d8ccb0] shadow-lg shadow-[#d8ccb0]/30',
        card: 'bg-[#fffbf0]/90 backdrop-blur-md border-[#d8ccb0] text-[#3c2f2f] shadow-xl shadow-[#d8ccb0]/20 hover:shadow-2xl',
        subText: 'text-[#655252]',
        input: 'bg-[#fffbf0] border-[#d8ccb0] text-[#3c2f2f] focus:bg-white',
        border: 'border-[#d8ccb0]'
      };
    } else {
      return {
        bg: 'bg-gradient-to-br from-slate-950 via-[#0f172a] to-[#1e1b4b] text-slate-100',
        nav: 'bg-slate-900/80 backdrop-blur-xl border-slate-800/80 shadow-2xl shadow-black/50',
        card: 'bg-slate-900/70 backdrop-blur-md border-slate-800/80 text-slate-100 shadow-2xl shadow-black/40 hover:shadow-orange-500/10',
        subText: 'text-slate-400',
        input: 'bg-slate-950/60 border-slate-800 text-white focus:bg-slate-950',
        border: 'border-slate-800/80'
      };
    }
  };

  const t = getThemeClasses();

  return (
    <div className={`min-h-screen font-sans pb-16 relative overflow-hidden transition-all duration-500 ${t.bg}`}>
      
      {/* CSS Animation Keyframes for Falling Food Effect */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
        .falling-food {
          position: absolute;
          top: -50px;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Falling Food Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { emoji: '🍔', left: '5%', duration: '12s', delay: '0s', size: 'text-2xl' },
          { emoji: '🍕', left: '15%', duration: '15s', delay: '3s', size: 'text-3xl' },
          { emoji: '🍟', left: '25%', duration: '10s', delay: '1s', size: 'text-2xl' },
          { emoji: '☕', left: '35%', duration: '14s', delay: '5s', size: 'text-3xl' },
          { emoji: '🍜', left: '45%', duration: '11s', delay: '2s', size: 'text-2xl' },
          { emoji: '🍰', left: '55%', duration: '16s', delay: '4s', size: 'text-3xl' },
          { emoji: '🍗', left: '65%', duration: '13s', delay: '0.5s', size: 'text-2xl' },
          { emoji: '🥤', left: '75%', duration: '10s', delay: '6s', size: 'text-3xl' },
          { emoji: '🥟', left: '85%', duration: '15s', delay: '2.5s', size: 'text-2xl' },
          { emoji: '🍔', left: '92%', duration: '12s', delay: '1.5s', size: 'text-3xl' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`falling-food ${item.size}`}
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Decorative ambient background glowing elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. TOP NAVBAR */}
      <nav className={`${t.nav} border-b sticky top-0 z-40 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-orange-600 to-amber-500 p-2.5 rounded-2xl text-white font-black text-xl tracking-tighter shadow-lg shadow-orange-500/30 transform hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent tracking-wide">CAMFood</h1>
              <p className={`text-[10px] uppercase tracking-widest font-bold ${t.subText}`}>SEU Cafeteria Optimization Hub</p>
            </div>
          </div>

          {/* FOODPANDA STYLE MODE SWITCHER (Dine-in, Pick-up, Crowd Radar Map, Staff Mode) */}
          <div className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md ${t.border} ${themeMode === 'light' ? 'bg-slate-200/60' : themeMode === 'reading' ? 'bg-[#dfd3bc]/60' : 'bg-slate-900/60'}`}>
            <button
              onClick={() => setActiveTab('dine-in')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${activeTab === 'dine-in' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' : `${t.subText} hover:opacity-100`}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Dine-In</span>
            </button>
            <button
              onClick={() => setActiveTab('pickup')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${activeTab === 'pickup' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' : `${t.subText} hover:opacity-100`}`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Pick-up</span>
            </button>
            <button
              onClick={() => setActiveTab('crowd-map')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${activeTab === 'crowd-map' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' : `${t.subText} hover:opacity-100`}`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Crowd Map</span>
            </button>
            {isStaffMode && (
              <button
                onClick={() => setActiveTab('staff')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${activeTab === 'staff' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40' : 'text-amber-400 hover:opacity-100'}`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Staff Panel</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            <div className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md ${t.border} ${themeMode === 'light' ? 'bg-slate-200/60' : themeMode === 'reading' ? 'bg-[#dfd3bc]/60' : 'bg-slate-900/60'}`}>
              <button 
                onClick={() => { setThemeMode('dark'); localStorage.setItem('themeMode', 'dark'); }}
                title="Dark Mode"
                className={`p-2 rounded-xl text-xs font-bold transition-all duration-300 ${themeMode === 'dark' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' : 'text-slate-400 hover:text-white'}`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => { setThemeMode('light'); localStorage.setItem('themeMode', 'light'); }}
                title="Light Mode"
                className={`p-2 rounded-xl text-xs font-bold transition-all duration-300 ${themeMode === 'light' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={() => { setThemeMode('reading'); localStorage.setItem('themeMode', 'reading'); }}
                title="Reading Mode"
                className={`p-2 rounded-xl text-xs font-bold transition-all duration-300 ${themeMode === 'reading' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>

            {/* Staff Mode Switcher / Login trigger */}
            {!isStaffMode ? (
              <button 
                onClick={() => setShowStaffPasswordModal(true)}
                className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border font-bold transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 ${t.subText} ${t.border}`}
              >
                <Settings className="w-4 h-4 text-amber-500" />
                <span>Staff Login</span>
              </button>
            ) : (
              <button 
                onClick={handleLogoutStaff}
                className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border font-bold bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-lg shadow-amber-500/10"
              >
                <Settings className="w-4 h-4 animate-spin" />
                <span>Exit Staff Mode</span>
              </button>
            )}

            {/* SEU USER AUTH */}
            {!isAuth ? (
              <div className="flex flex-col items-end">
                <form onSubmit={handleLogin} className="flex flex-col sm:flex-row gap-2 items-center">
                  <input 
                    type="email" 
                    placeholder="2024100000001@seu.edu.bd"
                    value={userEmail}
                    onChange={(e) => { setUserEmail(e.target.value); setAuthError(''); }}
                    className={`${t.input} border text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 min-w-[200px] transition-all`}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => { setUserPassword(e.target.value); setAuthError(''); }}
                    className={`${t.input} border text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 min-w-[130px] transition-all`}
                    required
                  />
                  <button type="submit" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 hover:scale-105">
                    Login
                  </button>
                </form>
                <div className="flex justify-between w-full mt-1 px-1">
                  {authError ? <span className="text-[10px] text-rose-400 font-semibold">{authError}</span> : <span></span>}
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
                  className={`flex items-center gap-2.5 border py-1.5 px-3 rounded-2xl cursor-pointer hover:border-orange-500 transition-all ${t.input} shadow-md`}
                >
                  <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-xl object-cover border-2 border-orange-500 shadow-sm" />
                  <div className="text-left hidden sm:block">
                    <div className="flex items-center gap-1 text-xs font-extrabold">
                      <span>{userName}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-[10px] text-emerald-500 font-semibold">Verified Student</p>
                  </div>
                </div>

                {showDropdown && (
                  <div className={`absolute right-0 mt-3 w-64 border rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-2xl ${t.card} animate-in fade-in slide-in-from-top-2 duration-200`}>
                    <div className={`px-4 py-3 border-b ${t.border}`}>
                      <p className={`text-xs ${t.subText}`}>Signed in as</p>
                      <p className="text-sm font-bold truncate text-orange-500">{userEmail}</p>
                    </div>

                    <button onClick={() => { setShowProfileModal(true); setShowDropdown(false); }} className={`w-full text-left px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 flex items-center gap-3 text-sm font-medium transition-all`}>
                      <User className="w-4 h-4 text-orange-500" /> Edit Profile & Details
                    </button>

                    <button onClick={() => { setShowPasswordModal(true); setShowDropdown(false); }} className={`w-full text-left px-4 py-3 hover:bg-orange-500/10 hover:text-orange-500 flex items-center gap-3 text-sm font-medium transition-all`}>
                      <Key className={`w-4 h-4 ${t.subText}`} /> Reset / Change Password
                    </button>

                    <div className={`border-t ${t.border} my-1`}></div>

                    <button onClick={() => { handleLogout(); setShowDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-rose-500/10 text-rose-500 flex items-center gap-3 text-sm font-medium transition-all">
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
</nav>


      {/* ============================================================
          NEW SMART HUB - PAYMENT / PRE-ORDER / DIETARY / FEEDBACK
          This section is additive; the original UI below remains intact.
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 relative z-10">
        <div className={`${t.card} border rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-orange-400 font-black">CAMFood Smart Layer</p>
              <h2 className="text-xl sm:text-2xl font-black mt-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" /> Smart Cafeteria Hub
              </h2>
              <p className={`text-xs ${t.subText} mt-1`}>New digital services added without removing the original CAMFood experience.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setShowSmartHub(!showSmartHub)} className={`${t.input} border px-3 py-2 rounded-xl text-xs font-bold hover:border-orange-500 transition-all`}>
                {showSmartHub ? 'Hide Smart Tools' : 'Show Smart Tools'}
              </button>
              <button onClick={() => setShowServiceFeedbackModal(true)} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-3 py-2 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all">
                <MessageSquare className="w-3.5 h-3.5 inline mr-1" /> Cafeteria Feedback
              </button>
            </div>
          </div>

          {showSmartHub && (
            <div className="mt-5 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Payment + Pre-order actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400"><CreditCard className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-black text-sm">Digital Payment Gateway</h3>
                      <p className={`text-[11px] ${t.subText}`}>bKash • Nagad • Card • Student Account</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                    <span className="text-xs font-bold text-emerald-400">Student Balance: ৳ {studentBalance}</span>
                    <button onClick={openMockPayment} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-105">
                      Pay & Place Order
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400"><CalendarClock className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-black text-sm">Smart Meal Pre-Order</h3>
                      <p className={`text-[11px] ${t.subText}`}>Reserve a lunch / dinner pickup slot before rush hour.</p>
                    </div>
                  </div>
                  <button onClick={() => { setPreOrderMessage(''); setShowPreOrderModal(true); }} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all hover:scale-[1.02]">
                    Schedule This Tray
                  </button>
                </div>
              </div>

              {/* Dietary and allergen-aware discovery */}
              <div className={`${t.input} border rounded-2xl p-4`}>
                <div className="flex flex-wrap justify-between items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                    <h3 className="font-black text-sm">Dietary & Allergen Smart Filter</h3>
                  </div>
                  <span className={`text-[10px] ${t.subText}`}>Demo classification layer</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Halal', 'Vegetarian', 'Gluten-Free', 'Low Calorie'].map(option => (
                    <button key={option} onClick={() => setDietaryFilter(option)} className={`px-3 py-2 rounded-xl text-[11px] font-black border transition-all ${dietaryFilter === option ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20 scale-105' : `${t.card} ${t.subText}`}`}>
                      {option}
                    </button>
                  ))}
                  <select value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} className={`${t.card} border px-3 py-2 rounded-xl text-[11px] font-bold`}>
                    <option value="All">Any Calories</option>
                    <option value="300">≤ 300 kcal</option>
                    <option value="500">≤ 500 kcal</option>
                    <option value="700">≤ 700 kcal</option>
                  </select>
                </div>

                {smartFilteredFoods.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {smartFilteredFoods.slice(0, 6).map(food => {
                      const finalPrice = isSaleActive ? Math.round(food.price * (1 - discountPercent / 100)) : food.price;
                      return (
                        <div key={`smart-${food._id}`} className={`${t.card} border rounded-2xl p-3 flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-300`}>
                          <img src={food.image} alt={food.name} className="w-14 h-14 rounded-xl object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="font-black text-xs truncate">{food.name}</p>
                            <p className={`text-[10px] ${t.subText}`}>{food.calories} • ⭐ {food.rating}</p>
                            <p className="text-orange-500 font-black text-xs mt-1">৳ {finalPrice}</p>
                          </div>
                          <button onClick={() => addToCart(food)} className="p-2 rounded-xl bg-orange-500 text-white hover:scale-110 transition-transform" title="Add to tray">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4 border border-dashed border-orange-500/30 rounded-2xl py-8 text-center">
                    <Search className="w-7 h-7 mx-auto text-orange-400 mb-2" />
                    <p className="font-black text-sm">No matching meal found</p>
                    <p className={`text-xs ${t.subText} mt-1`}>Try another dietary or calorie filter.</p>
                  </div>
                )}
              </div>

              {/* Scheduled orders preview */}
              {preOrders.filter(item => item.email === userEmail).length > 0 && (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <h3 className="font-black text-sm">My Scheduled Meals</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {preOrders.filter(item => item.email === userEmail).slice(0, 4).map(item => (
                      <div key={item.id} className={`${t.card} border rounded-xl p-3 flex justify-between items-center text-xs`}>
                        <div>
                          <p className="font-black text-blue-400">{item.token}</p>
                          <p className={`${t.subText} mt-1`}>{item.date} • {item.slot}</p>
                          <p className="font-bold mt-1">৳ {item.total} • {item.status}</p>
                        </div>
                        {item.status === 'Scheduled' && (
                          <button onClick={() => cancelPreOrder(item.id)} className="text-rose-400 hover:text-rose-500 text-[10px] font-black">Cancel</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Live toast notification */}
      {liveNotification && (
        <div className="fixed right-4 top-24 z-[60] max-w-sm animate-in slide-in-from-right-5 fade-in duration-300">
          <div className="bg-slate-950/95 text-white border border-emerald-500/40 rounded-2xl px-4 py-3 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl flex items-start gap-3">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl"><Bell className="w-4 h-4 animate-pulse" /></div>
            <div>
              <p className="text-xs font-black">Live Order Update</p>
              <p className="text-[11px] text-slate-300 mt-0.5">{liveNotification}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN LAYOUT ACCORDING TO ACTIVE TAB (Dine-in vs Pick-up vs Crowd Map vs Staff Mode) */}
      
      {/* ----------------- STAFF / ADMIN MODE SECTION ----------------- */}
      {activeTab === 'staff' && isStaffMode ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8 animate-in fade-in duration-300">
          <div className={`${t.card} border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 space-y-6 backdrop-blur-2xl`}>
            <div className={`flex items-center justify-between border-b ${t.border} pb-4`}>
              <div>
                <h2 className="text-2xl font-black text-amber-400 flex items-center gap-3">
                  <LayoutDashboard className="w-7 h-7 text-amber-500 animate-spin" /> Dedicated Staff Control & Management Page
                </h2>
                <p className={`text-xs ${t.subText} mt-1`}>Manage live flash sales, schedule discounts, and monitor counter queues.</p>
              </div>
              <span className="text-xs bg-amber-500/20 text-amber-300 font-black px-4 py-1.5 rounded-full border border-amber-500/40 shadow-inner">Admin Dashboard</span>
            </div>

            {/* Flash Sale Settings Form */}
            <form onSubmit={handleApplyStaffSchedule} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className={`${t.subText} block mb-1.5 font-bold`}>Flash Sale Start Time</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={`w-full ${t.input} border p-3 rounded-xl font-mono focus:ring-2 focus:ring-amber-500/50`} />
              </div>
              <div>
                <label className={`${t.subText} block mb-1.5 font-bold`}>Flash Sale End Time</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={`w-full ${t.input} border p-3 rounded-xl font-mono focus:ring-2 focus:ring-amber-500/50`} />
              </div>
              <div>
                <label className={`${t.subText} block mb-1.5 font-bold`}>Discount Percentage</label>
                <select value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className={`w-full ${t.input} border p-3 rounded-xl font-bold focus:ring-2 focus:ring-amber-500/50`}>
                  <option value={10}>10% Off</option>
                  <option value={20}>20% Off</option>
                  <option value={30}>30% Off</option>
                  <option value={40}>40% Off</option>
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black p-3 rounded-xl transition-all shadow-lg shadow-amber-500/20">Publish Schedule</button>
              </div>
            </form>

            {/* Live Crowd Counter Editor for Staff */}
            <div className={`pt-6 border-t ${t.border} space-y-4`}>
              <p className="font-extrabold text-amber-400 text-sm">Update Counter Crowd Congestion (Live Status Feed):</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cafeteriaZones.map(zone => (
                  <div key={zone.id} className={`${t.input} p-4 rounded-2xl border flex flex-col gap-2 shadow-sm`}>
                    <span className="font-bold text-sm truncate">{zone.name}</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={zone.count} 
                        onChange={(e) => handleUpdateZoneCrowd(zone.id, e.target.value)}
                        className={`w-24 ${t.card} border px-3 py-2 rounded-xl font-extrabold text-center focus:ring-2 focus:ring-amber-500/50`} 
                      />
                      <span className="text-xs opacity-75 font-medium">active orders</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MOVED: LIVE CAFETERIA CROWD RADAR - STAFF MODE ONLY */}
            <div className={`${t.card} border-2 border-amber-500/30 rounded-3xl p-6 shadow-xl shadow-amber-500/10 space-y-5 backdrop-blur-2xl`}>
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/15 p-2.5 rounded-2xl text-amber-400"><Activity className="w-6 h-6 animate-pulse" /></div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight text-amber-300">Live Cafeteria Crowd Radar</h3>
                    <p className={`text-xs ${t.subText}`}>Staff-only live queue monitor & counter congestion overview</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> LIVE FEED</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cafeteriaZones.map(zone => {
                  let badgeBg = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
                  let indicatorColor = 'bg-emerald-500';
                  let statusText = 'Low Crowd • Fast Service';
                  if (zone.status === 'red') { badgeBg = 'bg-rose-500/10 border-rose-500/30 text-rose-400'; indicatorColor = 'bg-rose-500 animate-pulse'; statusText = 'Heavy Rush • Delay Expected'; }
                  else if (zone.status === 'yellow') { badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-400'; indicatorColor = 'bg-amber-500'; statusText = 'Moderate • Normal Waiting'; }
                  return (
                    <div key={zone.id} className={`${t.input} border rounded-2xl p-4 space-y-3 shadow-sm`}>
                      <div className="flex justify-between items-start gap-2"><span className="text-xs font-black leading-snug">{zone.name}</span><span className={`w-3 h-3 rounded-full ${indicatorColor} flex-shrink-0 mt-0.5`}></span></div>
                      <div className="flex justify-between items-center"><span className={`text-[11px] ${t.subText}`}>Current Queue</span><span className="font-black text-base">{zone.count} orders</span></div>
                      <div className={`text-[10px] font-black px-2.5 py-1.5 rounded-xl border text-center ${badgeBg}`}>{statusText}</div>
                      <div className={`flex justify-between text-[10px] ${t.subText}`}><span>Wait</span><span className="font-black">{zone.waitTime || '5-10 mins'}</span></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`flex items-center justify-between pt-6 border-t ${t.border}`}>
              <span className={`${t.subText} font-bold text-xs`}>Instant Flash Sale Override Status:</span>
              <button 
                onClick={() => setIsSaleActive(!isSaleActive)}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all shadow-md text-xs ${
                  isSaleActive ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                }`}
              >
                {isSaleActive ? 'Stop Flash Sale Immediately' : 'Start Flash Sale Now'}
              </button>


            {/* NEW KITCHEN STAFF ORDER QUEUE */}
            <div className={`pt-6 border-t ${t.border} space-y-4`}>
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <p className="font-black text-amber-400 text-sm flex items-center gap-2"><ChefHat className="w-4 h-4" /> Live Kitchen Order Queue</p>
                  <p className={`text-[10px] ${t.subText}`}>Demo queue shared through localStorage for the cafeteria prototype.</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-black">
                  {kitchenQueue.filter(order => order.status !== 'Completed').length} Active
                </span>
              </div>

              {kitchenQueue.length > 0 ? (
                <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                  {kitchenQueue.map(order => (
                    <div key={order.token} className={`${t.input} border rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3`}>
                      <div className="min-w-[180px]">
                        <p className="font-mono font-black text-amber-400 text-xs">{order.token}</p>
                        <p className="font-bold text-xs mt-1">{order.studentName || 'SEU Student'} • {order.items?.length || 0} items</p>
                        <p className={`text-[10px] ${t.subText} mt-1`}>৳ {order.total} • {order.paymentMethod || 'Cash'}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Preparing', 'Cooking', 'Ready for Pickup', 'Completed'].map(status => (
                          <button
                            key={status}
                            onClick={() => updateKitchenOrderStatus(order.token, status)}
                            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black border transition-all ${order.status === status ? 'bg-amber-500 text-slate-950 border-amber-500' : `${t.card} ${t.subText}`}`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 rounded-2xl border border-dashed border-amber-500/30 text-center">
                  <PackageCheck className="w-7 h-7 mx-auto text-amber-400/70 mb-2" />
                  <p className="text-xs font-black">Kitchen queue is empty</p>
                  <p className={`text-[10px] ${t.subText} mt-1`}>Paid orders will appear here.</p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'pickup' ? (
        /* ----------------- PICKUP DEDICATED SECTION ----------------- */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Pickup Banner */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-black/30 backdrop-blur-md text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 inline-flex items-center gap-2 shadow-inner">
                  <PackageCheck className="w-4 h-4 text-emerald-300 animate-bounce" /> Self Pick-up Hub (Skip the Wait)
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Order Online & Collect Directly from Counter</h2>
                <p className="text-sm opacity-95 font-medium">Get a unique QR token, track live prep time, and pick up your hot food instantly!</p>
              </div>
            </div>
            <PackageCheck className="absolute -right-8 -bottom-8 w-44 h-44 opacity-10 rotate-12 pointer-events-none" />
          </div>

          {/* Search, Categories & Menu Grid for Pickup */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              <div className={`flex flex-wrap gap-4 items-center justify-between ${t.card} p-5 rounded-3xl border shadow-xl backdrop-blur-2xl`}>
                <div className="relative flex-1 min-w-[220px]">
                  <Search className={`w-4 h-4 absolute left-3.5 top-3.5 ${t.subText}`} />
                  <input 
                    type="text" 
                    placeholder="Search pickup menu..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full ${t.input} border text-sm pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                  />
                </div>

                <div className="flex gap-2">
                  {['All', 'Fast Food', 'Snacks', 'Drinks'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-4 py-2.5 rounded-2xl font-bold transition-all duration-300 ${
                        selectedCategory === cat ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-105' : `${t.input} ${t.subText} hover:opacity-100 border`
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Items for Pickup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredFoods.map(item => {
                  const finalPrice = isSaleActive ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
                  return (
                    <div key={item._id} className={`${t.card} rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1`}>
                      <div>
                        <div className={`h-48 ${t.input} rounded-2xl overflow-hidden mb-4 relative border shadow-inner`}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <span className="absolute top-3 left-3 text-xs font-extrabold bg-slate-950/80 text-emerald-300 px-3 py-1 rounded-xl backdrop-blur-xl border border-slate-700/80 shadow-lg">
                            Ready for Pick-up ⚡
                          </span>
                        </div>

                        <div className="flex justify-between items-start gap-3">
                          <h4 className="font-extrabold text-lg leading-snug">{item.name}</h4>
                          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-1 rounded-xl font-extrabold backdrop-blur-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2.5 mt-3">
                          <span className="text-emerald-500 font-black text-2xl">৳ {finalPrice}</span>
                          {isSaleActive && (
                            <span className={`text-sm ${t.subText} line-through font-bold`}>৳ {item.price}</span>
                          )}
                        </div>
                      </div>

                      <button 
                        onClick={() => addToCart(item)}
                        className="mt-5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs py-3 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30 hover:scale-[1.02]"
                      >
                        <Plus className="w-4 h-4" /> Add to Pickup Tray
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Pickup Cart & Token Sidebar */}
            <div className="space-y-6">
              <div className={`${t.card} rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl`}>
                <div className={`flex items-center justify-between mb-4 pb-3.5 border-b ${t.border}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-500">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-base">Your Pick-up Tray</h3>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30">
                    {cart.length} items
                  </span>
                </div>

                {cart.length === 0 ? (
                  <p className={`text-xs ${t.subText} text-center py-10 font-medium`}>Your pick-up tray is empty. Select items to order!</p>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                      {cart.map((item, index) => (
                        <div key={index} className={`flex justify-between items-center ${t.input} p-3 rounded-2xl border text-xs shadow-sm`}>
                          <div>
                            <p className="font-extrabold">{item.name}</p>
                            <p className="text-emerald-500 font-black mt-0.5">৳ {item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(index)} className={`${t.subText} hover:text-rose-500 p-2 transition-all rounded-xl hover:bg-rose-500/10`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className={`pt-4 border-t ${t.border} flex justify-between font-black text-base`}>
                      <span>Total Amount:</span>
                      <span className="text-emerald-500 text-xl">৳ {totalAmount}</span>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-emerald-500/30 tracking-wider hover:scale-[1.02]"
                    >
                      Confirm Pick-up Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'crowd-map' ? (
        /* ----------------- DEDICATED LIVE CAFETERIA CROWD MAP SYSTEM ----------------- */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Map Header Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="bg-black/30 backdrop-blur-md text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 inline-flex items-center gap-2 shadow-inner">
                  <Compass className="w-4 h-4 text-pink-300 animate-spin" /> Interactive Cafeteria Floor & Crowd Map
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Live Spatial Congestion Radar</h2>
                <p className="text-sm opacity-95 font-medium">Explore live counter crowding, real-time wait times, and locate the best seating spots in the SEU Cafeteria.</p>
              </div>
            </div>
            <Activity className="absolute -right-8 -bottom-8 w-44 h-44 opacity-10 rotate-12 pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Visual Floor Map Simulation */}
            <div className={`lg:col-span-2 ${t.card} rounded-3xl p-6 border shadow-2xl relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between min-h-[480px]`}>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 z-10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500 animate-bounce" />
                  <h3 className="font-black text-base">SEU Cafeteria Layout & Counter Pins</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold bg-slate-900/40 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Peaceful</span>
                  <span className="flex items-center gap-1 text-yellow-400"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate</span>
                  <span className="flex items-center gap-1 text-rose-400"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Heavy Rush</span>
                </div>
              </div>

              {/* Simulated Floor Plan Grid Background */}
              <div className="relative flex-1 my-6 rounded-2xl bg-slate-900/40 border border-white/10 overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Floor Plan Outlines / Tables visual guide */}
                <div className="absolute inset-6 border-2 border-dashed border-white/10 rounded-2xl pointer-events-none flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest font-black opacity-20">Main Dining Hall Floor Area</span>
                </div>

                {/* Interactive Zone Pins on Map */}
                <div className="relative w-full h-full min-h-[320px]">
                  {cafeteriaZones.map((zone, idx) => {
                    let pinBg = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-emerald-500/40';
                    let pulseColor = 'bg-emerald-500';
                    if (zone.status === 'red') {
                      pinBg = 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-rose-500/40';
                      pulseColor = 'bg-rose-500 animate-ping';
                    } else if (zone.status === 'yellow') {
                      pinBg = 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-amber-500/40';
                      pulseColor = 'bg-yellow-500';
                    }

                    // Positioning map pins dynamically
                    const positions = [
                      { top: '15%', left: '20%' },
                      { top: '25%', left: '65%' },
                      { top: '65%', left: '40%' }
                    ];
                    const pos = positions[idx] || { top: '50%', left: '50%' };

                    return (
                      <div 
                        key={zone.id} 
                        style={{ top: pos.top, left: pos.left }}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer`}
                      >
                        <div className={`px-3 py-1.5 rounded-2xl border ${pinBg} backdrop-blur-xl shadow-2xl flex items-center gap-2 transition-transform duration-300 group-hover:scale-110`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${pulseColor}`}></span>
                          <span className="text-xs font-black whitespace-nowrap">{zone.name}</span>
                          <span className="text-[10px] opacity-75 font-mono">({zone.count})</span>
                        </div>
                        <div className="w-1 h-6 bg-white/30"></div>
                        <div className="w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center text-xs opacity-75 font-medium">
                💡 Tip: Check counter congestion before walking down to grab your meal or place an instant pick-up order.
              </div>
            </div>

            {/* Zone Details Sidebar */}
            <div className="space-y-6">
              <div className={`${t.card} rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl space-y-4`}>
                <div className={`flex items-center justify-between pb-3.5 border-b ${t.border}`}>
                  <h3 className="font-black text-base flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-500" /> Zone Status Breakdown
                  </h3>
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">Live Feed</span>
                </div>

                <div className="space-y-3.5">
                  {cafeteriaZones.map(zone => {
                    let statusBadge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
                    let statusText = 'Low Crowd 🟢';
                    if (zone.status === 'red') {
                      statusBadge = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
                      statusText = 'Heavy Rush 🔴';
                    } else if (zone.status === 'yellow') {
                      statusBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                      statusText = 'Moderate 🟡';
                    }

                    return (
                      <div key={zone.id} className={`${t.input} p-4 rounded-2xl border space-y-2.5 shadow-sm`}>
                        <div className="flex justify-between items-start">
                          <span className="font-extrabold text-sm">{zone.name}</span>
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border ${statusBadge}`}>
                            {statusText}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                          <span className={`${t.subText}`}>Active Queue Orders:</span>
                          <span className="font-black text-sm">{zone.count} orders</span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <span className={`${t.subText}`}>Estimated Wait Time:</span>
                          <span className="font-black text-orange-400">{zone.waitTime || '5-10 mins'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setActiveTab('pickup')}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-orange-500/30 tracking-wider hover:scale-[1.02]"
                >
                  Order via Pick-up (Skip Counter)
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ----------------- DINE-IN DEFAULT SECTION ----------------- */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">

            {/* FLASH SALE BANNER */}
            {isSaleActive ? (
              <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-wrap justify-between items-center gap-6">
                  <div className="space-y-2">
                    <span className="bg-black/30 backdrop-blur-md text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 inline-flex items-center gap-2 shadow-inner">
                      <Flame className="w-4 h-4 text-yellow-300 animate-bounce" /> Zero Waste Flash Sale Active ({discountPercent}% OFF)
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">Surplus Discounts Scheduled ({startTime} - {endTime})</h2>
                    <p className="text-sm opacity-95 font-medium">Automatic discounts applied instantly to all cafeteria items!</p>
                  </div>

                  <div className="bg-slate-950/50 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-white/20 text-center shadow-xl">
                    <p className="text-[10px] uppercase font-black text-orange-200 tracking-widest">Ends In</p>
                    <div className="flex items-center gap-2 text-2xl font-mono font-black text-amber-300 mt-1">
                      <Clock className="w-5 h-5 animate-spin" />
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                </div>
                <Tag className="absolute -right-8 -bottom-8 w-44 h-44 opacity-10 rotate-12 pointer-events-none" />
              </div>
            ) : (
              <div className={`${t.card} border rounded-3xl p-6 text-center ${t.subText} text-sm font-medium shadow-md`}>
                <p>Regular Cafeteria Hours. No active flash sales at this moment.</p>
              </div>
            )}

            {/* SEARCH & CATEGORY FILTER */}
            <div className={`flex flex-wrap gap-4 items-center justify-between ${t.card} p-5 rounded-3xl border shadow-xl backdrop-blur-2xl`}>
              <div className="relative flex-1 min-w-[220px]">
                <Search className={`w-4 h-4 absolute left-3.5 top-3.5 ${t.subText}`} />
                <input 
                  type="text" 
                  placeholder="Search food item..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${t.input} border text-sm pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all`}
                />
              </div>

              <div className={`flex items-center gap-2 ${t.input} border px-3 py-2 rounded-2xl shadow-sm`}>
                <ArrowUpDown className={`w-4 h-4 ${t.subText}`} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer">
                  <option value="default" className={t.card}>Sort By: Default</option>
                  <option value="low" className={t.card}>Price: Low to High</option>
                  <option value="high" className={t.card}>Price: High to Low</option>
                </select>
              </div>

              <div className="flex gap-2">
                {['All', 'Fast Food', 'Snacks', 'Drinks'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-4 py-2.5 rounded-2xl font-bold transition-all duration-300 ${
                      selectedCategory === cat ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105' : `${t.input} ${t.subText} hover:opacity-100 border`
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* FOOD MENU GRID WITH REVIEWS, RATINGS & DELETE FEATURE */}
            <div className="space-y-4">
              <h3 className="text-xl font-black flex items-center gap-2.5 tracking-tight">
                <ChefHat className="w-6 h-6 text-orange-500" /> Cafeteria Live Menu & Reviews
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredFoods.map(item => {
                  const finalPrice = isSaleActive ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
                  const itemReviews = item.reviews || [];

                  return (
                    <div key={item._id} className={`${t.card} rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1`}>
                      <div>
                        <div className={`h-48 ${t.input} rounded-2xl overflow-hidden mb-4 relative border shadow-inner`}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute top-3 left-3 text-xs font-extrabold bg-slate-950/80 text-orange-300 px-3 py-1 rounded-xl backdrop-blur-xl border border-slate-700/80 shadow-lg">
                            {item.tag}
                          </span>
                        </div>

                        <div className="flex justify-between items-start gap-3">
                          <h4 className="font-extrabold text-lg leading-snug">{item.name}</h4>
                          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-2.5 py-1 rounded-xl font-extrabold backdrop-blur-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>

                        <div className={`flex gap-2 text-xs ${t.subText} mt-2.5 font-medium`}>
                          <span className={`${t.input} px-2.5 py-1 rounded-xl border`}>{item.calories}</span>
                          <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                            <Leaf className="w-3.5 h-3.5" /> {item.ecoSave}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2.5 mt-3">
                          <span className="text-orange-500 font-black text-2xl">৳ {finalPrice}</span>
                          {isSaleActive && (
                            <span className={`text-sm ${t.subText} line-through font-bold`}>৳ {item.price}</span>
                          )}
                        </div>

                        {/* Compact Review Accordion - keeps all food cards the same height until opened */}
                        <div className={`mt-4 pt-4 border-t ${t.border} space-y-2`}>
                          <div className="flex justify-between items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedReviews(prev => ({ ...prev, [item._id]: !prev[item._id] }))}
                              className={`flex-1 flex items-center justify-between text-left ${t.input} border px-3 py-2.5 rounded-xl hover:opacity-90 transition-all`}
                              aria-expanded={!!expandedReviews[item._id]}
                            >
                              <span className={`text-xs font-bold flex items-center gap-1.5 ${t.subText}`}>
                                <MessageSquare className="w-3.5 h-3.5" /> Reviews ({itemReviews.length})
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-black text-orange-400">
                                {expandedReviews[item._id] ? 'Hide' : 'View'}
                                {expandedReviews[item._id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!isAuth) { alert("Please login first to give a review/rating!"); return; }
                                setActiveFoodForReview(item);
                                const existing = (item.reviews || []).find(r => r.email === userEmail);
                                if (existing) { setNewReviewRating(existing.rating); setNewReviewComment(existing.comment); }
                                else { setNewReviewRating(5); setNewReviewComment(''); }
                                setShowReviewModal(true);
                              }}
                              className="shrink-0 text-xs text-orange-400 hover:underline font-extrabold px-1"
                            >
                              {item.reviews?.some(r => r.email === userEmail) ? 'Edit' : '+ Add'}
                            </button>
                          </div>

                          {expandedReviews[item._id] && (
                            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                              {itemReviews.length > 0 ? itemReviews.map(rev => {
                                const canDelete = isStaffMode || (isAuth && userEmail === rev.email);
                                return (
                                  <div key={rev.id} className={`${t.input} p-2.5 rounded-2xl border text-xs space-y-1 relative group/rev shadow-sm`}>
                                    <div className="flex justify-between items-center font-bold">
                                      <span className="text-orange-400">{rev.user}</span>
                                      <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-0.5 text-amber-400"><Star className="w-3 h-3 fill-amber-400" /><span>{rev.rating}</span></div>
                                        {canDelete && <button onClick={() => handleDeleteReview(item._id, rev.id, rev.email)} title="Delete review" className="text-rose-400 hover:text-rose-600 p-1 transition-all rounded-lg hover:bg-rose-500/10"><Trash2 className="w-3.5 h-3.5" /></button>}
                                      </div>
                                    </div>
                                    <p className={`${t.subText} font-medium`}>{rev.comment}</p>
                                  </div>
                                );
                              }) : <p className={`text-xs ${t.subText} italic px-1`}>No reviews yet. Be the first to review!</p>}
                            </div>
                          )}
                        </div>
                        </div>

                        <button
                        onClick={() => addToCart(item)}
                        className="mt-5 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs py-3 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
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
              <div className={`${t.card} border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl shadow-emerald-500/10 space-y-4 backdrop-blur-2xl animate-in zoom-in-95 duration-300`}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-emerald-500 shadow-lg">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-black text-emerald-500">Order Confirmed!</h3>
                  <p className={`text-xs ${t.subText} font-medium mt-0.5`}>Show this token at the cafeteria counter:</p>
                  <div className="bg-emerald-950/80 text-emerald-200 text-3xl font-mono font-black py-3.5 rounded-2xl border border-emerald-500/40 mt-3 tracking-widest shadow-2xl">
                    {orderToken}
                  </div>
                </div>

                <div className={`pt-3 border-t ${t.border}`}>
                  <div className={`flex justify-between text-xs font-bold ${t.subText} mb-2.5`}>
                    <span>Status:</span>
                    <span className={orderStatus === 'Ready for Pickup' ? 'text-emerald-400 font-black' : 'text-orange-400 font-black'}>
                      {orderStatus}
                    </span>
                  </div>
                  <div className={`w-full ${t.input} rounded-full h-3 overflow-hidden border p-0.5`}>
                    <div className={`h-full rounded-full transition-all duration-700 ${orderStatus === 'Ready for Pickup' ? 'bg-emerald-500 w-full shadow-lg shadow-emerald-500/50' : 'bg-gradient-to-r from-orange-500 to-amber-500 w-1/2 animate-pulse shadow-lg shadow-orange-500/50'}`}></div>
                  </div>
                </div>
              </div>
            )}

            {/* CART SECTION */}
            <div className={`${t.card} rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl`}>
              <div className={`flex items-center justify-between mb-4 pb-3.5 border-b ${t.border}`}>
                <div className="flex items-center gap-2.5">
                  <div className="bg-orange-500/20 p-2 rounded-xl text-orange-500">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-base">Your Food Tray</h3>
                </div>
                <span className="bg-orange-500/20 text-orange-500 text-xs font-black px-3 py-1 rounded-full border border-orange-500/30">
                  {cart.length} items
                </span>
              </div>

              {cart.length === 0 ? (
                <p className={`text-xs ${t.subText} text-center py-10 font-medium`}>Your tray is empty. Tap items to add!</p>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                    {cart.map((item, index) => (
                      <div key={index} className={`flex justify-between items-center ${t.input} p-3 rounded-2xl border text-xs shadow-sm`}>
                        <div>
                          <p className="font-extrabold">{item.name}</p>
                          <p className="text-orange-500 font-black mt-0.5">৳ {item.price}</p>
                        </div>
                        <button onClick={() => removeFromCart(index)} className={`${t.subText} hover:text-rose-500 p-2 transition-all rounded-xl hover:bg-rose-500/10`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className={`pt-4 border-t ${t.border} flex justify-between font-black text-base`}>
                    <span>Total Amount:</span>
                    <span className="text-orange-500 text-xl">৳ {totalAmount}</span>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-orange-500/30 tracking-wider hover:scale-[1.02]"
                  >
                    Checkout & Generate Token
                  </button>
                </div>
              )}
            </div>

            {/* ORDER HISTORY LOG */}
            {orderHistory.length > 0 && (
              <div className={`${t.card} rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl`}>
                <div className={`flex items-center gap-2.5 mb-4 pb-3.5 border-b ${t.border}`}>
                  <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-500">
                    <History className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-base">Order History Log</h3>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {orderHistory.map((ord, i) => (
                    <div key={i} className={`${t.input} p-3.5 rounded-2xl border text-xs space-y-2 shadow-sm`}>
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-black text-emerald-400 text-sm">{ord.token}</span>
                        <span className={`text-[10px] ${t.subText} font-bold`}>{ord.time}</span>
                      </div>
                      <div className={`flex justify-between ${t.subText} font-semibold`}>
                        <span>{ord.items.length} items ({ord.orderType || 'Dine-In'})</span>
                        <span className="font-black text-slate-200">৳ {ord.total}</span>
                      </div>
                      <div className={`flex justify-between items-center pt-2 border-t ${t.border}`}>
                        <span className={`text-[10px] ${t.subText} font-bold`}>Status:</span>
                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wide ${ord.status === 'Ready for Pickup' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm' : 'bg-orange-500/20 text-orange-400 border border-orange-500/40 animate-pulse'}`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEADERBOARD */}
            <div className={`${t.card} rounded-3xl p-6 border shadow-2xl backdrop-blur-2xl`}>
              <div className={`flex items-center gap-2.5 mb-4 pb-3.5 border-b ${t.border}`}>
                <div className="bg-amber-500/20 p-2 rounded-xl text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base">Weekly Student Favorites</h3>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Chicken Cheese Burger', rating: '4.9 ★', votes: '128 orders' },
                  { name: 'Iced Cold Coffee', rating: '4.7 ★', votes: '94 orders' },
                  { name: 'Smokey Chicken Wrap', rating: '4.6 ★', votes: '81 orders' }
                ].map((topItem, idx) => (
                  <div key={idx} className={`flex justify-between items-center ${t.input} p-3 rounded-2xl border shadow-sm`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black w-6 h-6 ${t.card} text-orange-500 flex items-center justify-center rounded-xl border shadow-sm`}>
                        #{idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold">{topItem.name}</p>
                        <p className={`text-[10px] ${t.subText} font-medium`}>{topItem.votes}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30">
                      {topItem.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* PLAY STORE STYLE & ATTRACTIVE REVIEW MODAL */}
      {showReviewModal && activeFoodForReview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative backdrop-blur-2xl text-left`}>
            <button onClick={() => setShowReviewModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 p-2 rounded-xl hover:bg-slate-500/10 transition-all`}>
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-orange-500 mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 fill-orange-500" /> Rate this item
            </h3>
            <p className={`text-xs ${t.subText} mb-6 font-semibold`}>Tell others what you think about <span className="text-orange-400 font-bold">{activeFoodForReview.name}</span>.</p>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              
              {/* PLAY STORE STYLE INTERACTIVE 5 STAR SELECTION */}
              <div className="flex flex-col items-center justify-center bg-orange-500/10 border border-orange-500/20 py-5 rounded-2xl gap-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transform hover:scale-125 transition-transform p-1 focus:outline-none"
                    >
                      <Star 
                        className={`w-9 h-9 transition-colors ${
                          (hoverRating || newReviewRating) >= star 
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
                            : 'text-slate-500/40'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest mt-1">
                  {newReviewRating === 5 ? '⭐⭐⭐⭐⭐ Excellent' : 
                   newReviewRating === 4 ? '⭐⭐⭐⭐ Very Good' : 
                   newReviewRating === 3 ? '⭐⭐⭐ Good' : 
                   newReviewRating === 2 ? '⭐⭐ Fair' : '⭐ Poor'}
                </span>
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-2 font-bold uppercase tracking-wider`}>Your Public Review / Comment</label>
                <textarea 
                  rows={4}
                  placeholder="What did you like or dislike? Write your review here..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className={`w-full ${t.input} border text-sm p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm resize-none`}
                  required
                />
                <p className={`text-[10px] ${t.subText} mt-1.5 italic`}>Note: Each student can submit or update 1 review per item.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowReviewModal(false)}
                  className={`flex-1 border ${t.border} py-3.5 rounded-2xl text-xs font-bold transition-all hover:bg-slate-500/10`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-orange-500/30"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center backdrop-blur-2xl`}>
            <button onClick={() => setShowForgotModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 p-2 rounded-xl hover:bg-slate-500/10 transition-all`}>
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-orange-500 shadow-lg">
              <Key className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black">Password Recovery</h3>

            {otpStep === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4 mt-5 text-left">
                <p className={`text-xs ${t.subText} font-medium`}>Enter your SEU student email to receive an OTP code:</p>
                <input 
                  type="email" 
                  placeholder="2024100000001@seu.edu.bd"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm`}
                  required
                />
                {forgotMsg && <p className="text-xs text-rose-400 font-semibold">{forgotMsg}</p>}
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3 rounded-2xl text-xs transition-all shadow-lg shadow-orange-500/30">
                  Send OTP
                </button>
              </form>
            )}

            {otpStep === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-4 mt-5 text-left">
                <p className={`text-xs text-emerald-400 font-bold bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30 text-center`}>{forgotMsg}</p>
                <label className={`text-xs ${t.subText} block font-bold`}>Enter 4-digit OTP code:</label>
                <input 
                  type="text" 
                  placeholder="e.g. 4821"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  className={`w-full ${t.input} border text-lg tracking-widest text-center font-mono font-black px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm`}
                  required
                  maxLength={4}
                />
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3 rounded-2xl text-xs transition-all shadow-lg shadow-orange-500/30">
                  Verify OTP
                </button>
              </form>
            )}

            {otpStep === 3 && (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4 mt-5 text-left">
                <p className={`text-xs ${t.subText} font-medium`}>OTP Verified! Now create your new password:</p>
                <input 
                  type="password" 
                  placeholder="New Password (min 4 chars)"
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm`}
                  required
                />
                {forgotMsg && <p className={`text-xs font-bold text-center ${forgotMsg.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>{forgotMsg}</p>}
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3 rounded-2xl text-xs transition-all shadow-lg shadow-orange-500/30">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* STAFF PASSWORD MODAL */}
      {showStaffPasswordModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative backdrop-blur-2xl`}>
            <button onClick={() => setShowStaffPasswordModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 p-2 rounded-xl hover:bg-slate-500/10 transition-all`}>
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-amber-500 shadow-lg">
              <Settings className="w-7 h-7 animate-spin" />
            </div>
            <h3 className="text-lg font-black">Staff Access Control</h3>
            <p className={`text-xs ${t.subText} mt-1 mb-5 font-medium`}>Enter secret password to open staff mode:</p>

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Enter Staff Password"
                value={staffPasswordInput}
                onChange={(e) => { setStaffPasswordInput(e.target.value); setStaffPasswordError(''); }}
                className={`w-full ${t.input} border text-sm px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-center font-mono font-bold shadow-sm`}
                required
                autoFocus
              />
              {staffPasswordError && <p className="text-xs text-rose-400 font-semibold">{staffPasswordError}</p>}

              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-amber-600 text-slate-950 font-black py-3 rounded-2xl text-xs transition-all shadow-xl shadow-amber-500/20">
                Unlock Staff Mode
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOKEN MODAL */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
          <div className={`${t.card} border rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative backdrop-blur-2xl`}>
            <button onClick={() => setShowTokenModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 p-2 rounded-xl hover:bg-slate-500/10 transition-all`}>
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-500 shadow-xl">
              <CheckCircle className="w-9 h-9 animate-bounce" />
            </div>
            <h3 className="text-xl font-black">Order Confirmed!</h3>
            <p className={`text-xs ${t.subText} mt-1 font-medium`}>Scan or show this token at the cafeteria counter:</p>

            <div className="my-5 bg-white p-5 rounded-2xl inline-block shadow-2xl border border-slate-200">
              <QrCode className="w-32 h-32 text-slate-900 mx-auto" />
              <p className="font-mono font-black text-2xl text-slate-900 mt-2 tracking-widest">{activeToken}</p>
            </div>

            <button onClick={() => setShowTokenModal(false)} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-orange-500/30">
              Done & Track Order
            </button>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-md w-full p-6 shadow-2xl relative backdrop-blur-2xl`}>
            <button onClick={() => setShowProfileModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 ${t.input} p-2 rounded-xl transition-all`}>
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-orange-500 mb-5 flex items-center gap-2.5">
              <User className="w-5 h-5" /> Edit Profile & Information
            </h3>

            <div className="space-y-5">
              <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500 shadow-2xl group-hover:scale-105 transition-all" />
                  <label className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all text-xs font-bold text-white shadow-inner">
                    Change Photo
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
                            if (userEmail) {
                              localStorage.setItem(`profilePic_${userEmail}`, newImg);
                            }
                            localStorage.setItem('profilePic', newImg);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                <p className={`text-[11px] ${t.subText} mt-2 font-semibold`}>Hover to update picture</p>
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-1.5 font-bold`}>Display Name</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm font-semibold`}
                />
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-1.5 font-bold`}>SEU Student Email</label>
                <input type="email" value={userEmail} disabled className={`w-full opacity-60 ${t.input} border text-sm px-3.5 py-3 rounded-2xl cursor-not-allowed font-semibold`} />
              </div>

              <button 
                onClick={() => {
                  localStorage.setItem('userName', userName);
                  if (userEmail) {
                    localStorage.setItem(`userName_${userEmail}`, userName);
                  }
                  setShowProfileModal(false);
                  alert("Profile updated successfully!");
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-orange-500/30 mt-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ============================================================
          NEW DIGITAL PAYMENT MODAL
      ============================================================ */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[55] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-md w-full p-6 shadow-2xl relative`}>
            <button onClick={() => !isPaymentProcessing && setShowPaymentModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 p-2 rounded-xl ${t.input} transition-all`}>
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <WalletCards className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-center">CAMFood Mock Payment</h3>
            <p className={`text-xs ${t.subText} text-center mt-1 mb-5`}>Secure demo gateway • No real money is charged</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {['bKash', 'Nagad', 'Card', 'Student Account'].map(method => (
                <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`p-3 rounded-xl border text-xs font-black transition-all ${paymentMethod === method ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : `${t.input} ${t.subText}`}`}>
                  {method}
                </button>
              ))}
            </div>

            <div className={`${t.input} border rounded-2xl p-4 mb-4`}>
              <div className="flex justify-between text-xs font-bold">
                <span>Total to Pay</span>
                <span className="text-emerald-400 text-lg">৳ {totalAmount}</span>
              </div>
              {paymentMethod === 'Student Account' && (
                <p className={`text-[10px] ${t.subText} mt-2`}>Available balance: ৳ {studentBalance}</p>
              )}
            </div>

            <form onSubmit={handleMockPayment} className="space-y-3">
              <input
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder={paymentMethod === 'Card' ? 'Demo card reference' : 'Demo transaction reference (optional)'}
                className={`w-full ${t.input} border px-3.5 py-3 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40`}
              />
              {paymentMessage && <p className={`text-xs font-bold text-center ${paymentMessage.includes('successful') ? 'text-emerald-400' : 'text-rose-400'}`}>{paymentMessage}</p>}
              <button disabled={isPaymentProcessing} type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 disabled:opacity-60 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl hover:scale-[1.02]">
                {isPaymentProcessing ? 'Processing Demo Payment...' : `Pay ৳ ${totalAmount} & Generate Token`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          NEW SMART PRE-ORDER MODAL
      ============================================================ */}
      {showPreOrderModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[55] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-md w-full p-6 shadow-2xl relative`}>
            <button onClick={() => setShowPreOrderModal(false)} className={`absolute top-4 right-4 ${t.subText} p-2 rounded-xl ${t.input}`}>
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-400">
              <CalendarClock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-center">Schedule Your Meal</h3>
            <p className={`text-xs ${t.subText} text-center mt-1 mb-5`}>Choose a future collection slot for your current tray.</p>

            <form onSubmit={handlePreOrderSubmit} className="space-y-4">
              <div>
                <label className={`text-xs ${t.subText} block mb-1.5 font-bold`}>Pickup Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} value={preOrderDate} onChange={(e) => setPreOrderDate(e.target.value)} className={`w-full ${t.input} border p-3 rounded-2xl text-xs`} required />
              </div>
              <div>
                <label className={`text-xs ${t.subText} block mb-1.5 font-bold`}>Meal Time Slot</label>
                <select value={preOrderSlot} onChange={(e) => setPreOrderSlot(e.target.value)} className={`w-full ${t.input} border p-3 rounded-2xl text-xs`}>
                  <option>11:30 AM - 11:45 AM</option>
                  <option>12:00 PM - 12:15 PM</option>
                  <option>12:30 PM - 12:45 PM</option>
                  <option>1:00 PM - 1:15 PM</option>
                  <option>5:30 PM - 5:45 PM</option>
                  <option>6:00 PM - 6:15 PM</option>
                  <option>7:00 PM - 7:15 PM</option>
                </select>
              </div>
              <div className={`${t.input} border rounded-2xl p-3 text-xs`}>
                <div className="flex justify-between font-bold"><span>Items</span><span>{cart.length}</span></div>
                <div className="flex justify-between font-black mt-1"><span>Total</span><span className="text-blue-400">৳ {totalAmount}</span></div>
              </div>
              {preOrderMessage && <p className={`text-xs font-bold text-center ${preOrderMessage.includes('confirmed') ? 'text-emerald-400' : 'text-rose-400'}`}>{preOrderMessage}</p>}
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black py-3.5 rounded-2xl text-xs shadow-xl hover:scale-[1.02] transition-all">
                Confirm Pre-Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          NEW CAFETERIA SERVICE FEEDBACK MODAL
      ============================================================ */}
      {showServiceFeedbackModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[55] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-md w-full p-6 shadow-2xl relative`}>
            <button onClick={() => setShowServiceFeedbackModal(false)} className={`absolute top-4 right-4 ${t.subText} p-2 rounded-xl ${t.input}`}>
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-violet-400">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-center">Cafeteria Feedback</h3>
            <p className={`text-xs ${t.subText} text-center mt-1 mb-5`}>Your feedback helps the demo cafeteria team improve.</p>

            <form onSubmit={handleServiceFeedbackSubmit} className="space-y-4">
              <div>
                <label className={`text-xs ${t.subText} block mb-2 font-bold`}>Service Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button key={`service-${star}`} type="button" onClick={() => setServiceRating(star)} className="p-1 hover:scale-125 transition-transform">
                      <Star className={`w-7 h-7 ${serviceRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-xs ${t.subText} block mb-2 font-bold`}>Cleanliness Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button key={`clean-${star}`} type="button" onClick={() => setCleanlinessRating(star)} className="p-1 hover:scale-125 transition-transform">
                      <Star className={`w-7 h-7 ${cleanlinessRating >= star ? 'fill-emerald-400 text-emerald-400' : 'text-slate-500'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea rows={4} value={serviceFeedbackText} onChange={(e) => setServiceFeedbackText(e.target.value)} placeholder="Tell us about service, cleanliness, waiting time..." className={`w-full ${t.input} border p-3 rounded-2xl text-xs resize-none`} required />
              {feedbackMessage && <p className={`text-xs font-bold text-center ${feedbackMessage.includes('Thank') ? 'text-emerald-400' : 'text-rose-400'}`}>{feedbackMessage}</p>}
              <button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-black py-3.5 rounded-2xl text-xs shadow-xl hover:scale-[1.02] transition-all">
                <Send className="w-4 h-4 inline mr-1" /> Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`${t.card} border rounded-3xl max-w-sm w-full p-6 shadow-2xl relative backdrop-blur-2xl`}>
            <button onClick={() => setShowPasswordModal(false)} className={`absolute top-4 right-4 ${t.subText} hover:opacity-100 p-2 rounded-xl hover:bg-slate-500/10 transition-all`}>
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-orange-500 shadow-lg">
              <Key className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black">Change Password</h3>
            <p className={`text-xs ${t.subText} mt-1 mb-5 font-medium`}>Update your account password securely</p>

            <form onSubmit={handleChangePassword} className="space-y-4 text-left">
              <div>
                <label className={`text-xs ${t.subText} block mb-1.5 font-bold`}>Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm`}
                  required
                />
              </div>

              <div>
                <label className={`text-xs ${t.subText} block mb-1.5 font-bold`}>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password (min 4 chars)"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className={`w-full ${t.input} border text-sm px-3.5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm`}
                  required
                />
              </div>

              {passwordMsg && <p className={`text-xs font-bold text-center ${passwordMsg.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>{passwordMsg}</p>}

              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-orange-500/30">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AI Buddy, Rider Connect & Food Arcade - additive floating feature */}
      <CAMFoodAIBuddy orderStatus={orderStatus} orderToken={orderToken} foods={foods} />

    </div>
  );
}

export default App;






