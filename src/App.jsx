import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Video, 
  Pill, 
  FileText, 
  Activity, 
  Bell, 
  Menu, 
  Home, 
  User, 
  Search, 
  MapPin, 
  ChevronRight, 
  Clock, 
  Stethoscope,
  Ambulance,
  TestTube,
  Phone,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  AlertCircle,
  CalendarX,
  RefreshCw,
  BellRing,
  Megaphone,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Download,
  FileCheck,
  ShoppingBag,
  Upload,
  Plus,
  Minus,
  Truck,
  Package,
  X,
  ClipboardList,
  Thermometer,
  HeartPulse,
  Syringe,
  Weight,
  FlaskConical,
  Droplet,
  Lock,
  Eye,
  Share2,
  HeartHandshake,
  Info,
  Navigation,
  UserCheck,
  Users,
  Settings,
  LogOut,
  HelpCircle,
  Shield,
  Receipt,
  Accessibility
} from 'lucide-react';

/**
 * SAGAR HOSPITAL PATIENT APP
 * Fully Fixed & Consolidated Version
 * Features: Login, OTP, Appointments, Payments, Notifications, Video Consult, Pharmacy, Unified Practice Records, Lab Tests, News, Profile
 */

// --- Mock Data ---

const DEPARTMENTS = [
  { id: 1, name: "Cardiology", icon: Activity, color: "bg-red-100 text-red-600" },
  { id: 2, name: "General Medicine", icon: Stethoscope, color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Pediatrics", icon: User, color: "bg-yellow-100 text-yellow-600" },
  { id: 4, name: "Orthopedics", icon: Accessibility, color: "bg-green-100 text-green-600" },
];

const DOCTORS = [
  { id: 101, name: "Dr. Rajesh Kumar", dept: "Cardiology", exp: "12 Yrs", fee: 800, rating: 4.8, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" },
  { id: 102, name: "Dr. Sneha Gupta", dept: "General Medicine", exp: "8 Yrs", fee: 500, rating: 4.5, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
  { id: 103, name: "Dr. Amit Verma", dept: "Pediatrics", exp: "15 Yrs", fee: 700, rating: 4.9, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
];

const MEDICINES = [
  { id: 1, name: "Paracetamol 650mg", type: "Strip of 15", price: 30, image: "https://placehold.co/100x100/e0f2fe/0369a1?text=Para+650" },
  { id: 2, name: "Diabetes Care Kit", type: "Combo Pack", price: 450, image: "https://placehold.co/100x100/ecfdf5/047857?text=Diabetic" },
  { id: 3, name: "Vitamin C Supplements", type: "Bottle of 60", price: 250, image: "https://placehold.co/100x100/fef3c7/d97706?text=Vit+C" },
  { id: 4, name: "Cough Syrup", type: "100ml", price: 85, image: "https://placehold.co/100x100/fee2e2/b91c1c?text=Syrup" },
];

const LAB_TESTS = [
  { id: 1, name: "Complete Blood Count (CBC)", category: "Pathology", price: 350, tat: "12 Hrs", icon: Droplet, color: "text-red-500 bg-red-50" },
  { id: 2, name: "Thyroid Profile (T3, T4, TSH)", category: "Hormones", price: 550, tat: "24 Hrs", icon: Activity, color: "text-purple-500 bg-purple-50" },
  { id: 3, name: "HbA1c (Diabetes)", category: "Diabetes", price: 400, tat: "4 Hrs", icon: FlaskConical, color: "text-blue-500 bg-blue-50" },
  { id: 4, name: "Lipid Profile", category: "Cardiac", price: 600, tat: "12 Hrs", icon: HeartPulse, color: "text-rose-500 bg-rose-50" },
  { id: 5, name: "Full Body Checkup", category: "Package", price: 1200, tat: "24 Hrs", icon: User, color: "text-green-500 bg-green-50" },
];

const MY_LAB_REPORTS = [
  { id: "LR-001", name: "Complete Blood Count (CBC)", date: "10 Feb 2026", status: "Uploaded", doctor: "Dr. Rajesh Kumar", file: "cbc_report.pdf" },
  { id: "LR-002", name: "Lipid Profile", date: "10 Feb 2026", status: "Uploaded", doctor: "Dr. Rajesh Kumar", file: "lipid_report.pdf" },
  { id: "LR-003", name: "Vitamin D Test", date: "28 Jan 2026", status: "Processing", doctor: "Self", file: null },
];

const NEWS = [
  { 
    id: 1, 
    category: "Medical Camps", 
    title: "Free Cardiac Health Camp", 
    date: "15 Feb 2026", 
    desc: "Join us for a free heart checkup including ECG and consultation at Jayanagar branch.",
    image: "bg-red-100",
    icon: HeartPulse,
    iconColor: "text-red-600"
  },
  { 
    id: 2, 
    category: "Announcements", 
    title: "New 3T MRI Facility", 
    date: "10 Feb 2026", 
    desc: "Sagar Hospital introduces state-of-the-art 3 Tesla MRI scanning available 24/7.",
    image: "bg-purple-100",
    icon: Megaphone,
    iconColor: "text-purple-600"
  },
  { 
    id: 3, 
    category: "Campaigns", 
    title: "Monsoon Flu Awareness", 
    date: "01 Jun 2026", 
    desc: "Protect your family. Learn about symptoms and prevention of seasonal flu.",
    image: "bg-blue-100",
    icon: Info,
    iconColor: "text-blue-600"
  },
  { 
    id: 4, 
    category: "CSR", 
    title: "Rural Health Outreach", 
    date: "05 Feb 2026", 
    desc: "Providing free medicines and checkups to over 500 families in Kanakapura village.",
    image: "bg-green-100",
    icon: HeartHandshake,
    iconColor: "text-green-600"
  },
];

const CONSULTATIONS = [
  {
    id: 'ENC-2026-089',
    date: '10 Feb 2026',
    time: '10:30 AM',
    doctor: "Dr. Rajesh Kumar",
    dept: "Cardiology",
    type: "OPD",
    diagnosis: "Viral Fever & Mild Dehydration",
    vitals: { bp: "120/80", temp: "101°F", weight: "72kg", pulse: "88 bpm" },
    notes: "Patient reported high fever for 2 days. BP normal. Chest clear. Advised rest and hydration. Review in 5 days if fever persists.",
    medicines: [
      { name: "Dolo 650mg", dosage: "1-0-1 (3 Days)", type: "Tablet" },
      { name: "Electral Powder", dosage: "1 Sachet in 1L Water", type: "Sachet" },
      { name: "Pantop 40mg", dosage: "1-0-0 (Before Food)", type: "Tablet" }
    ],
    labReports: [
      { id: "L-101", name: "Complete Blood Count (CBC)", status: "Available", date: "10 Feb 2026" },
      { id: "L-102", name: "Widal Test", status: "Available", date: "10 Feb 2026" }
    ],
    followUp: "15 Feb 2026"
  },
  {
    id: 'ENC-2026-042',
    date: '05 Jan 2026',
    time: '04:00 PM',
    doctor: "Dr. Sneha Gupta",
    dept: "General Medicine",
    type: "VIDEO",
    diagnosis: "Seasonal Allergic Rhinitis",
    vitals: { bp: "118/78", temp: "98.4°F", weight: "71kg", pulse: "72 bpm" },
    notes: "Complaints of runny nose and sneezing. No fever. Allergic reaction suspected due to pollen.",
    medicines: [
      { name: "Cetrizine 10mg", dosage: "0-0-1 (5 Days)", type: "Tablet" },
      { name: "Otrivin Nasal Drops", dosage: "2 drops/nostril (SOS)", type: "Drops" }
    ],
    labReports: [],
    followUp: "None"
  }
];

const NOTIFICATIONS = [
  { id: 1, type: "reminder", title: "Appointment Reminder", msg: "Dr. Rajesh Kumar at 10:30 AM tomorrow.", time: "10 min ago", icon: Clock, color: "text-blue-600 bg-blue-100" },
  { id: 2, type: "lab", title: "Lab Report Ready", msg: "Your CBC Blood Test report is ready for download.", time: "2 hrs ago", icon: FileText, color: "text-purple-600 bg-purple-100" },
  { id: 3, type: "broadcast", title: "Free Cardiac Camp", msg: "Visit Jayanagar branch on 15th Feb for free checkup.", time: "1 day ago", icon: Megaphone, color: "text-orange-600 bg-orange-100" },
  { id: 4, type: "system", title: "Welcome to Sagar App", msg: "Your profile has been successfully created.", time: "2 days ago", icon: CheckCircle, color: "text-green-600 bg-green-100" },
];

const INITIAL_BILLS = [
  { id: "INV-003", title: "Lab Test - Thyroid Profile", date: "15 Feb 2026", amount: 550, status: "Pending" },
  { id: "INV-001", title: "Consultation - Dr. Rajesh", date: "10 Feb 2026", amount: 850, status: "Paid" },
  { id: "INV-002", title: "Pharmacy Order #9090", date: "12 Feb 2026", amount: 430, status: "Paid" },
];

// --- Helper Components ---

const Button = ({ children, onClick, className = "", variant = "primary", icon: Icon, disabled }) => {
  const baseStyle = "w-full flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100";
  const variants = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
    outline: "border-2 border-blue-600 text-blue-600 bg-transparent",
    success: "bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700"
  };
  
  return (
    <button disabled={disabled} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className} py-3 px-4`}>
      {Icon && <Icon size={18} className="mr-2" />}
      {children}
    </button>
  );
};

// --- Screens ---

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white p-8">
      <div className="bg-white p-4 rounded-3xl shadow-2xl mb-6 animate-bounce">
        <Activity size={48} className="text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Sagar Hospital</h1>
      <p className="text-blue-200 text-sm">Caring for you, always.</p>
      <div className="absolute bottom-10 text-xs text-blue-300 opacity-70">
        Powered by Kods
      </div>
    </div>
  );
};

const LoginScreen = ({ navigate, setMobileNumber }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (mobile && mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setMobileNumber(mobile || 'Guest'); 
    navigate('otp');
  };

  return (
    <div className="h-full flex flex-col bg-white p-8 animate-fade-in">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm">
          <Activity size={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-500 mb-8">Sign in to access your health records and appointments.</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mobile Number</label>
            <div className="flex items-center gap-3 border-b-2 border-gray-100 py-3 mt-1 transition-colors focus-within:border-blue-600">
              <span className="text-gray-900 font-bold text-lg">+91</span>
              <input 
                type="tel" 
                value={mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setMobile(val);
                  setError('');
                }}
                className="flex-1 text-lg font-bold outline-none placeholder:font-medium placeholder:text-gray-300 bg-transparent text-gray-900"
                placeholder="00000 00000"
              />
            </div>
            {error && <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1"><AlertCircle size={12}/> {error}</p>}
          </div>

          <Button onClick={handleSendOtp} className="w-full mt-4 h-14 text-lg shadow-blue-200">
            Get OTP
          </Button>
          <button 
            onClick={() => navigate('home')} 
            className="w-full mt-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
        By continuing, you agree to our <span className="underline">Terms</span> & <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

const OtpScreen = ({ navigate, mobileNumber }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    
    // Focus next
    if (val && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    navigate('home');
  };

  return (
    <div className="h-full flex flex-col bg-white p-8 animate-fade-in">
      <button onClick={() => navigate('login')} className="self-start p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 mb-8 transition-colors">
        <ArrowLeft size={24} />
      </button>
      
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
        <Lock size={28} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification</h1>
      <p className="text-gray-500 mb-8 text-sm leading-relaxed">
        Enter the 4-digit code we just sent to <br/>
        <span className="text-gray-900 font-bold text-base">+91 {mobileNumber}</span>
      </p>

      <div className="flex gap-4 mb-8 justify-center">
        {otp.map((data, index) => (
          <input
            key={index}
            ref={el => inputs.current[index] = el}
            type="text"
            maxLength="1"
            className="w-14 h-16 border-2 border-gray-100 rounded-2xl text-center text-2xl font-bold focus:border-blue-600 focus:outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-lg focus:shadow-blue-100 caret-blue-600"
            value={data}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <Button onClick={handleVerify} className="h-14 text-lg">
        Verify & Login
      </Button>
      <button 
        onClick={() => navigate('home')} 
        className="w-full mt-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
      >
        Skip Verification
      </button>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 font-medium">Didn't receive code?</p>
        <button className="text-sm font-bold text-blue-600 mt-2 hover:underline">Resend SMS</button>
      </div>
    </div>
  );
};

const NewsScreen = ({ navigate }) => {
  const [filter, setFilter] = useState('All');
  const categories = ["All", "Medical Camps", "Announcements", "Campaigns", "CSR"];

  const filteredNews = filter === 'All' ? NEWS : NEWS.filter(n => n.category === filter);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold">News & Events</h2>
          <p className="text-xs text-gray-500">Updates from Sagar Hospital</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto px-6 py-2 pb-4 scrollbar-hide bg-white border-b border-gray-100">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-600'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-4 pb-24">
        {filteredNews.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.image}`}>
                <item.icon className={item.iconColor} size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{item.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-gray-50 pt-3 justify-end">
               <button className="text-xs font-bold text-blue-600 flex items-center gap-1">
                 Read More <ChevronRight size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = ({ navigate }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 pb-24">
       {/* Header */}
       <div className="p-6 pt-14 pb-8 bg-blue-600 text-white rounded-b-[2.5rem] relative z-10 shadow-lg">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border-2 border-white/30">
               <User size={32} />
             </div>
             <div>
               <h2 className="text-xl font-bold">Rahul Sharma</h2>
               <p className="text-blue-100 text-sm">+91 98765 43210</p>
               <p className="text-blue-200 text-xs mt-1 font-mono bg-blue-700/30 px-2 py-0.5 rounded inline-block">UHID: SH-2026-8899</p>
             </div>
          </div>
       </div>

       {/* Menu Items */}
       <div className="flex-1 overflow-y-auto p-6 -mt-4 relative z-20 scrollbar-hide">
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-4">
            {/* Removed My Appointments from here */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer active:bg-gray-50 rounded-xl transition-colors">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg"><Users size={20} /></div>
              <div className="flex-1"><h4 className="text-sm font-bold text-gray-800">Family Members</h4><p className="text-xs text-gray-400">Manage dependents</p></div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            <div className="flex items-center gap-3 p-4 cursor-pointer active:bg-gray-50 rounded-xl transition-colors">
              <div className="bg-red-50 text-red-600 p-2 rounded-lg"><HeartPulse size={20} /></div>
              <div className="flex-1"><h4 className="text-sm font-bold text-gray-800">Health Vitals</h4><p className="text-xs text-gray-400">Track BP, Sugar, etc.</p></div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-4">
             <div className="flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer active:bg-gray-50 rounded-xl transition-colors">
               <div className="bg-orange-50 text-orange-600 p-2 rounded-lg"><MapPin size={20} /></div>
               <div className="flex-1"><h4 className="text-sm font-bold text-gray-800">Saved Addresses</h4><p className="text-xs text-gray-400">For medicine delivery</p></div>
               <ChevronRight size={16} className="text-gray-300" />
             </div>
             <div className="flex items-center gap-3 p-4 cursor-pointer active:bg-gray-50 rounded-xl transition-colors">
               <div className="bg-gray-100 text-gray-600 p-2 rounded-lg"><Settings size={20} /></div>
               <div className="flex-1"><h4 className="text-sm font-bold text-gray-800">Settings</h4><p className="text-xs text-gray-400">App preferences</p></div>
               <ChevronRight size={16} className="text-gray-300" />
             </div>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
             <div className="flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer active:bg-gray-50 rounded-xl transition-colors">
               <div className="bg-green-50 text-green-600 p-2 rounded-lg"><HelpCircle size={20} /></div>
               <div className="flex-1"><h4 className="text-sm font-bold text-gray-800">Help & Support</h4><p className="text-xs text-gray-400">FAQs & Contact Us</p></div>
             </div>
             <div className="flex items-center gap-3 p-4 border-b border-gray-50 cursor-pointer active:bg-gray-50 rounded-xl transition-colors">
               <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Shield size={20} /></div>
               <div className="flex-1"><h4 className="text-sm font-bold text-gray-800">Privacy Policy</h4><p className="text-xs text-gray-400">Terms of use</p></div>
             </div>
             <div onClick={() => navigate('login')} className="flex items-center gap-3 p-4 cursor-pointer active:bg-red-50 rounded-xl transition-colors group">
               <div className="bg-red-50 text-red-600 p-2 rounded-lg group-hover:bg-red-100"><LogOut size={20} /></div>
               <div className="flex-1"><h4 className="text-sm font-bold text-red-600">Logout</h4></div>
             </div>
         </div>
         
         <div className="text-center mt-6 mb-4">
            <p className="text-[10px] text-gray-400">Sagar Hospital App v1.0.2</p>
         </div>
       </div>
    </div>
  );
}

const BillsScreen = ({ navigate, bills, onPayBill }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 pt-14 pb-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
        <div>
          <h2 className="text-xl font-bold">Payments & Bills</h2>
          <p className="text-xs text-gray-500">Manage your invoices</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">Pending Bills</h3>
        <div className="space-y-3 mb-6">
          {bills.filter(b => b.status === 'Pending').length > 0 ? (
             bills.filter(b => b.status === 'Pending').map(bill => (
               <div key={bill.id} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                  <div className="flex justify-between items-start mb-2">
                     <div>
                        <h4 className="font-bold text-sm text-gray-800">{bill.title}</h4>
                        <p className="text-[10px] text-gray-500">{bill.date} • {bill.id}</p>
                     </div>
                     <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded">Unpaid</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                     <span className="font-bold text-lg text-gray-800">₹{bill.amount}</span>
                     <button onClick={() => onPayBill(bill)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-blue-200">Pay Now</button>
                  </div>
               </div>
             ))
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-xs">No pending bills</p>
            </div>
          )}
        </div>

        <h3 className="font-bold text-gray-800 mb-3 text-sm">Payment History</h3>
        <div className="space-y-3 pb-24">
          {bills.filter(b => b.status === 'Paid').map(bill => (
               <div key={bill.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="bg-green-50 text-green-600 p-2 rounded-lg"><Receipt size={20} /></div>
                     <div>
                        <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{bill.title}</h4>
                        <p className="text-[10px] text-gray-500">{bill.date}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="font-bold text-sm text-gray-800">₹{bill.amount}</p>
                     <p className="text-[10px] text-green-600 font-bold">Paid</p>
                  </div>
               </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const AppointmentsScreen = ({ navigate, upcomingAppt }) => {
  const [tab, setTab] = useState('upcoming');
  return (
    <div className="h-full flex flex-col bg-gray-50 pb-24">
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <div className="bg-gray-100 p-1 rounded-xl flex text-sm font-bold mt-4">
          <button 
            onClick={() => setTab('upcoming')}
            className={`flex-1 py-2 rounded-lg transition-all ${tab === 'upcoming' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setTab('completed')}
            className={`flex-1 py-2 rounded-lg transition-all ${tab === 'completed' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {tab === 'upcoming' ? (
          upcomingAppt ? (
            <div onClick={() => navigate('appt_details')} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer relative overflow-hidden">
              {upcomingAppt.type === 'VIDEO' && (
                <div className="absolute top-0 right-0 bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
                  VIDEO CONSULT
                </div>
              )}
              {upcomingAppt.reminder && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded w-fit mb-3">
                  <BellRing size={10} /> REMINDER SET
                </div>
              )}
              <div className="flex gap-4 border-b border-gray-100 pb-4 mb-4">
                <img src={upcomingAppt.image} alt="Dr" className="w-12 h-12 rounded-full bg-gray-100" />
                <div>
                  <h4 className="font-bold text-gray-800">{upcomingAppt.doctor}</h4>
                  <p className="text-xs text-gray-500">{upcomingAppt.dept}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500" />
                  <span>{upcomingAppt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-500" />
                  <span>{upcomingAppt.time}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
              <CalendarX size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-400 text-sm">No upcoming appointments</p>
              <button onClick={() => navigate('doctors')} className="text-blue-600 font-bold text-xs mt-3">Book Now</button>
            </div>
          )
        ) : (
          <div className="space-y-4">
            {CONSULTATIONS.map((consult) => (
              <div key={consult.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex gap-3">
                      <div className={`p-2 rounded-xl ${consult.type === 'VIDEO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {consult.type === 'VIDEO' ? <Video size={16} /> : <Stethoscope size={16} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{consult.doctor}</h4>
                        <p className="text-[10px] text-gray-500">{consult.dept}</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Completed</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {consult.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {consult.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const HomeScreen = ({ navigate, upcomingAppt, onStartVideoBooking, activeOrders }) => (
  <div className="h-full overflow-y-auto pb-24 animate-fade-in bg-gray-50 scrollbar-hide">
    {/* Header */}
    <div className="bg-blue-600 text-white pt-14 pb-12 px-6 rounded-b-[2.5rem] shadow-xl relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-blue-100 text-sm mb-0.5">Welcome Back,</p>
          <h2 className="text-2xl font-bold">Rahul Sharma</h2>
        </div>
        <div className="flex gap-3 items-center">
          <button 
            onClick={() => navigate('ambulance')} 
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-full backdrop-blur-sm flex items-center gap-1 text-white font-bold text-xs shadow-lg shadow-red-500/30 transition-colors"
          >
            <Ambulance size={14} /> SOS
          </button>
          <button 
            onClick={() => navigate('notifications')}
            className="p-2 bg-blue-500/50 rounded-full backdrop-blur-sm relative transition-transform active:scale-95"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-blue-600"></span>
          </button>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-3">
        <MapPin size={18} className="text-blue-200" />
        <span className="text-sm font-medium">Sagar Hospital, Jayanagar</span>
        <ChevronRight size={16} className="ml-auto text-blue-200" />
      </div>
    </div>

    {/* Quick Actions Grid */}
    <div className="px-6 -mt-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 grid grid-cols-4 gap-4">
        {[
          { label: "Book OPD", icon: Calendar, color: "text-blue-600 bg-blue-50", action: () => navigate('doctors') },
          { label: "Video Consult", icon: Video, color: "text-purple-600 bg-purple-50", action: onStartVideoBooking },
          { label: "Pharmacy", icon: Pill, color: "text-emerald-600 bg-emerald-50", action: () => navigate('pharmacy') },
          { label: "Lab Tests", icon: TestTube, color: "text-orange-600 bg-orange-50", action: () => navigate('lab') },
        ].map((item, idx) => (
          <div key={idx} onClick={item.action} className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60 transition-opacity">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
              <item.icon size={24} />
            </div>
            <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Status Trackers (Pharma & Lab) */}
    <div className="px-6 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Track Status</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-2">
        {/* Pharma Tracker */}
        <div onClick={() => navigate('pharmacy_tracking')} className="min-w-[85%] sm:min-w-[300px] snap-center bg-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-emerald-200 flex items-center gap-4 cursor-pointer">
          <div className="bg-white/20 p-2.5 rounded-xl">
            <Package size={24} />
          </div>
          <div className="flex-1">
             <p className="text-xs text-emerald-100 font-medium">Pharmacy Order</p>
             <p className="font-bold text-sm">Out for Delivery</p>
          </div>
          <ChevronRight size={20} className="text-emerald-200" />
        </div>

        {/* Lab Tracker */}
        <div onClick={() => navigate('lab')} className="min-w-[85%] sm:min-w-[300px] snap-center bg-purple-600 text-white p-4 rounded-2xl shadow-lg shadow-purple-200 flex items-center gap-4 cursor-pointer">
          <div className="bg-white/20 p-2.5 rounded-xl">
            <FlaskConical size={24} />
          </div>
          <div className="flex-1">
             <p className="text-xs text-purple-100 font-medium">Lab Report</p>
             <p className="font-bold text-sm">Processing...</p>
          </div>
          <ChevronRight size={20} className="text-purple-200" />
        </div>
      </div>
    </div>

    {/* Upcoming Appointment */}
    <div className="px-6 mt-8">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-lg font-bold text-gray-800">My Appointments</h3>
        {upcomingAppt && <span className="text-xs font-medium text-blue-600">See All</span>}
      </div>
      
      {upcomingAppt ? (
        <div onClick={() => navigate('appt_details')} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer relative overflow-hidden">
          {upcomingAppt.type === 'VIDEO' && (
            <div className="absolute top-0 right-0 bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">
              VIDEO CONSULT
            </div>
          )}

           {upcomingAppt.reminder && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded w-fit mb-3">
              <BellRing size={10} /> REMINDER SET
            </div>
           )}

          <div className="flex gap-4 border-b border-gray-100 pb-4 mb-4">
            <img src={upcomingAppt.image} alt="Dr" className="w-12 h-12 rounded-full bg-gray-100" />
            <div>
              <h4 className="font-bold text-gray-800">{upcomingAppt.doctor}</h4>
              <p className="text-xs text-gray-500">{upcomingAppt.dept}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" />
              <span>{upcomingAppt.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-blue-500" />
              <span>{upcomingAppt.time}</span>
            </div>
          </div>

          {upcomingAppt.type === 'VIDEO' && (
            <div className="mt-3">
              <Button 
                variant="primary" 
                className="py-2.5 text-sm bg-purple-600 shadow-purple-200 hover:bg-purple-700" 
                icon={Video}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('video_call');
                }}
              >
                Join Video Call
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400">
          <CalendarX size={32} className="mb-2" />
          <p className="text-sm">No upcoming appointments</p>
          <button onClick={() => navigate('doctors')} className="text-xs text-blue-600 font-bold mt-2">Book Now</button>
        </div>
      )}
    </div>

    {/* News & Events Preview */}
    <div className="px-6 mt-8">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-lg font-bold text-gray-800">News & Events</h3>
        <span onClick={() => navigate('news')} className="text-xs font-medium text-blue-600 cursor-pointer">See All</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {NEWS.slice(0, 3).map((item) => (
          <div key={item.id} className="min-w-[240px] bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
               <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
                {item.category}
               </span>
               <span className="text-[10px] text-gray-400">{item.date}</span>
            </div>
            <h4 className="font-bold text-gray-800 mb-1 line-clamp-1">{item.title}</h4>
            <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LabTestsScreen = ({ navigate, labCart, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'reports'

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-xl font-bold">Lab Services</h2>
              <p className="text-xs text-orange-600 font-medium">Pathology & Diagnostics</p>
            </div>
          </div>
          {activeTab === 'book' && (
            <button onClick={() => navigate('lab_cart')} className="p-2 bg-gray-100 rounded-full relative">
              <FlaskConical size={20} className="text-gray-600" />
              {labCart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">{labCart.length}</span>}
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-100 p-1 rounded-xl flex text-sm font-bold">
          <button 
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-2 rounded-lg transition-all ${activeTab === 'book' ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}
          >
            Book Tests
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-2 rounded-lg transition-all ${activeTab === 'reports' ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}
          >
            My Reports
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {activeTab === 'book' ? (
          <>
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-orange-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg mb-1">Book via Prescription</h3>
                        <p className="text-xs text-orange-100 mb-4 max-w-[150px]">Upload your doctor's note for lab tests.</p>
                        <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 active:scale-95 transition-transform">
                            <Upload size={14} /> Upload Now
                        </button>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                        <ClipboardList size={32} />
                    </div>
                </div>
            </div>

            <h3 className="font-bold text-gray-800 mb-4">Popular Tests</h3>
            <div className="space-y-3 pb-24">
                {LAB_TESTS.map((test) => (
                    <div key={test.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${test.color}`}>
                            <test.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm">{test.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{test.category}</span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10} /> TAT: {test.tat}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="font-bold text-gray-800 text-sm">₹{test.price}</span>
                            <button 
                                onClick={() => onAddToCart(test)}
                                className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg active:bg-orange-600 active:text-white transition-colors"
                            >
                                ADD
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </>
        ) : (
          <div className="space-y-4 pb-24">
            {MY_LAB_REPORTS.map((report) => (
              <div key={report.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{report.name}</h4>
                      <p className="text-[10px] text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${report.status === 'Uploaded' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] text-gray-400 flex items-center gap-1">
                       <Stethoscope size={10} /> Access: 
                     </span>
                     <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                       {report.doctor}
                     </span>
                  </div>
                  
                  {report.status === 'Uploaded' ? (
                    <button className="text-xs font-bold text-blue-600 flex items-center gap-1 active:scale-95 transition-transform">
                      <Download size={14} /> Download
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400 italic">Processing...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LabCartScreen = ({ navigate, cart, onRemove, onCheckout }) => {
    const [collectionType, setCollectionType] = useState('home'); 
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const collectionFee = collectionType === 'home' ? 100 : 0;
    const finalTotal = cartTotal + collectionFee;

    const slots = ["07:00 AM", "08:00 AM", "09:30 AM", "11:00 AM", "02:00 PM"];

    if (cart.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                 <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <FlaskConical size={32} />
                 </div>
                 <h2 className="text-xl font-bold text-gray-800">No Tests Selected</h2>
                 <p className="text-gray-500 text-sm mb-6">Browse and book diagnostic tests.</p>
                 <Button onClick={() => navigate('lab')}>View Tests</Button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50">
            <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate('lab')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Book Tests</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="space-y-3 mb-6">
                    {cart.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                                <p className="text-xs text-gray-500">₹{item.price}</p>
                            </div>
                            <button onClick={() => onRemove(idx)} className="p-2 text-gray-400 hover:text-red-500"><X size={16} /></button>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h3 className="font-bold text-sm text-gray-800 mb-3">Collection Method</h3>
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
                        <button 
                            onClick={() => setCollectionType('home')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${collectionType === 'home' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500'}`}
                        >
                            Home Collection
                        </button>
                        <button 
                            onClick={() => setCollectionType('center')}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${collectionType === 'center' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500'}`}
                        >
                            Visit Lab Center
                        </button>
                    </div>
                    {collectionType === 'home' && (
                        <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                            <MapPin size={18} className="text-orange-600 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-gray-800">Home Address</p>
                                <p className="text-[10px] text-gray-500">#46, 3rd Floor, BEML Layout, RR Nagar</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h3 className="font-bold text-sm text-gray-800 mb-3">Select Slot (Tomorrow)</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot) => (
                            <button 
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-2 text-xs font-bold rounded-lg border transition-all ${selectedSlot === slot ? 'bg-orange-50 border-orange-500 text-orange-600' : 'border-gray-200 text-gray-600'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-500">Total Tests Price</span>
                        <span className="font-bold text-gray-800">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-500">Collection Charges</span>
                        <span className="font-bold text-gray-800">{collectionFee === 0 ? 'FREE' : `₹${collectionFee}`}</span>
                    </div>
                    <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between items-center">
                        <span className="font-bold text-gray-800">To Pay</span>
                        <span className="font-bold text-xl text-orange-600">₹{finalTotal}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white">
                <Button onClick={() => onCheckout({ total: finalTotal, slot: selectedSlot })} disabled={!selectedSlot}>
                    Proceed to Pay
                </Button>
            </div>
        </div>
    );
};

const RecordsScreen = ({ navigate, onSelectConsultation }) => (
  <div className="h-full flex flex-col bg-gray-50 pb-24">
    <div className="p-6 pt-14 pb-6 bg-white shadow-sm sticky top-0 z-10">
      <h2 className="text-2xl font-bold">Practice Records</h2>
      <p className="text-sm text-gray-500">Unified view of your clinical encounters</p>
    </div>

    <div className="p-6 space-y-4 overflow-y-auto scrollbar-hide">
      {CONSULTATIONS.map((consult) => (
        <div 
          key={consult.id} 
          onClick={() => onSelectConsultation(consult)}
          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 active:scale-[0.99] transition-transform cursor-pointer"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
               <div className={`p-2.5 rounded-xl ${consult.type === 'VIDEO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  {consult.type === 'VIDEO' ? <Video size={20} /> : <Stethoscope size={20} />}
               </div>
               <div>
                  <h4 className="font-bold text-gray-800">{consult.doctor}</h4>
                  <p className="text-xs text-gray-500">{consult.dept}</p>
               </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
                {consult.date}
                </span>
                <span className="text-[9px] text-gray-400 mt-1">#{consult.id}</span>
            </div>
          </div>

          {/* Diagnosis Preview */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
             <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Diagnosis</p>
             <p className="text-sm text-gray-800 font-medium">{consult.diagnosis}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-1">
             <div className="flex gap-2">
                {consult.medicines.length > 0 && (
                   <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      <Pill size={12} /> {consult.medicines.length} Meds
                   </div>
                )}
                {consult.labReports.length > 0 && (
                   <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      <TestTube size={12} /> {consult.labReports.length} Labs
                   </div>
                )}
             </div>
             <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
                View Unified Record <ChevronRight size={14} />
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ConsultationDetailScreen = ({ navigate, consultation, onBookFollowUp }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate('records')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold">Unified Record</h2>
          <p className="text-xs text-gray-500">Encounter #{consultation.id}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6 pb-24">
        {/* Doctor Info Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
           <div className={`p-3 rounded-full ${consultation.type === 'VIDEO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
              {consultation.type === 'VIDEO' ? <Video size={24} /> : <User size={24} />}
           </div>
           <div>
              <h3 className="font-bold text-gray-800">{consultation.doctor}</h3>
              <p className="text-xs text-gray-500">{consultation.dept}</p>
              <p className="text-[10px] text-gray-400 mt-1">{consultation.date} • {consultation.time}</p>
           </div>
        </div>

        {/* 1. Diagnosis Details */}
        <div>
           <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Activity size={16} className="text-blue-600" /> Diagnosis Details
           </h3>
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-4">
                 <p className="text-sm font-medium text-gray-800">{consultation.diagnosis}</p>
              </div>
              
              {/* Vitals Grid */}
              <div className="grid grid-cols-4 gap-2">
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100">
                      <p className="text-[9px] text-gray-500 font-bold uppercase flex justify-center gap-1"><HeartPulse size={10} /> BP</p>
                      <p className="font-bold text-gray-800 text-xs mt-1">{consultation.vitals.bp}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100">
                      <p className="text-[9px] text-gray-500 font-bold uppercase flex justify-center gap-1"><Thermometer size={10} /> Temp</p>
                      <p className="font-bold text-gray-800 text-xs mt-1">{consultation.vitals.temp}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100">
                      <p className="text-[9px] text-gray-500 font-bold uppercase flex justify-center gap-1"><Weight size={10} /> Wt</p>
                      <p className="font-bold text-gray-800 text-xs mt-1">{consultation.vitals.weight}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center border border-gray-100">
                      <p className="text-[9px] text-gray-500 font-bold uppercase flex justify-center gap-1"><Activity size={10} /> HR</p>
                      <p className="font-bold text-gray-800 text-xs mt-1">{consultation.vitals.pulse}</p>
                  </div>
              </div>
           </div>
        </div>

        {/* 2. Doctor Consultation Notes */}
        <div>
           <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <ClipboardList size={16} className="text-yellow-600" /> Doctor Consultation Notes
           </h3>
           <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 shadow-sm">
              <p className="text-xs text-gray-700 leading-relaxed italic">
                 "{consultation.notes}"
              </p>
           </div>
        </div>

        {/* 3. Digital Prescriptions */}
        <div>
           <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FileCheck size={16} className="text-green-600" /> Digital Prescriptions
           </h3>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {consultation.medicines.map((med, idx) => (
                 <div key={idx} className="p-4 border-b border-gray-50 last:border-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                          {med.type === 'Tablet' ? <Pill size={16} /> : <Syringe size={16} />}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-800">{med.name}</p>
                          <p className="text-xs text-gray-500">{med.type}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">{med.dosage}</p>
                    </div>
                 </div>
              ))}
              <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                 <button className="text-xs font-bold text-blue-600 flex items-center justify-center gap-2 w-full py-1">
                    <Download size={14} /> Download Rx PDF
                 </button>
              </div>
           </div>
        </div>

        {/* 4. Lab Reports Mapping */}
        {consultation.labReports.length > 0 && (
           <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                 <TestTube size={16} className="text-purple-600" /> Lab Reports Mapping
              </h3>
              <div className="space-y-3">
                 {consultation.labReports.map((lab) => (
                    <div key={lab.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50 transition-colors">
                       <div className="flex items-center gap-3">
                          <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                             <FileText size={16} />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{lab.name}</p>
                             <p className="text-[10px] text-gray-500">ID: {lab.id} • {lab.status}</p>
                          </div>
                       </div>
                       <ChevronRight size={16} className="text-gray-300" />
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* 5. Follow-up Appointment Scheduling */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-2xl shadow-lg shadow-blue-200 mt-4">
           <div className="flex items-start justify-between mb-4">
              <div>
                 <h4 className="font-bold">Follow-up Scheduled</h4>
                 <p className="text-sm text-blue-100 opacity-90">Recommended: {consultation.followUp}</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                 <Calendar size={20} className="text-white" />
              </div>
           </div>
           <button 
              onClick={() => onBookFollowUp(consultation)}
              className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
           >
              Book Follow-up Appointment <ArrowLeft size={16} className="rotate-180" />
           </button>
        </div>

      </div>
    </div>
  );
};

const PharmacyScreen = ({ navigate, cart, onAddToCart }) => (
  <div className="h-full flex flex-col bg-gray-50">
    <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold">Pharmacy</h2>
          <p className="text-xs text-emerald-600 font-medium">Sagar Hospital Medicines</p>
        </div>
      </div>
      <button onClick={() => navigate('pharmacy_cart')} className="p-2 bg-gray-100 rounded-full relative">
         <ShoppingBag size={20} className="text-gray-600" />
         {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">{cart.length}</span>}
      </button>
    </div>

    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg mb-1">Upload Prescription</h3>
                    <p className="text-xs text-blue-100 mb-4 max-w-[150px]">We will read it and add medicines to your cart.</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 active:scale-95 transition-transform">
                        <Upload size={14} /> Upload Now
                    </button>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                    <FileText size={32} />
                </div>
            </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-4">Shop Medicines</h3>
        <div className="grid grid-cols-2 gap-4 pb-24">
            {MEDICINES.map((med) => (
                <div key={med.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
                    <div className="w-full h-24 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img src={med.image} className="w-full h-full object-cover" alt={med.name} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-800 line-clamp-2">{med.name}</h4>
                        <p className="text-[10px] text-gray-500 mb-2">{med.type}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-gray-800">₹{med.price}</span>
                        <button 
                            onClick={() => onAddToCart(med)}
                            className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center active:bg-emerald-600 active:text-white transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </div>
);

const PharmacyCartScreen = ({ navigate, cart, onUpdateQty, onCheckout }) => {
    const [deliveryMode, setDeliveryMode] = useState('delivery');
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFee = deliveryMode === 'delivery' ? 40 : 0;
    const finalTotal = cartTotal + deliveryFee;

    if (cart.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
                 <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <ShoppingBag size={32} />
                 </div>
                 <h2 className="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
                 <p className="text-gray-500 text-sm mb-6">Add medicines from the pharmacy store.</p>
                 <Button onClick={() => navigate('pharmacy')}>Browse Medicines</Button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50">
            <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate('pharmacy')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Your Cart</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                <Pill size={20} className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                                <p className="text-xs text-gray-500">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-lg">
                                <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-gray-600"><Minus size={14} /></button>
                                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-gray-600"><Plus size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <h3 className="font-bold text-sm text-gray-800 mb-3">Delivery Option</h3>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button onClick={() => setDeliveryMode('delivery')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${deliveryMode === 'delivery' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>Home Delivery</button>
                        <button onClick={() => setDeliveryMode('pickup')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${deliveryMode === 'pickup' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>Hospital Pickup</button>
                    </div>
                    {deliveryMode === 'delivery' ? (
                        <div className="mt-4 flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                            <Truck size={18} className="text-emerald-600 mt-0.5" />
                            <div><p className="text-xs font-bold text-gray-800">Delivering to Home</p><p className="text-[10px] text-gray-500">#46, 3rd Floor, BEML Layout, RR Nagar, Bengaluru</p></div>
                        </div>
                    ) : (
                         <div className="mt-4 flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <MapPin size={18} className="text-blue-600 mt-0.5" />
                            <div><p className="text-xs font-bold text-gray-800">Pickup from Hospital</p><p className="text-[10px] text-gray-500">Sagar Hospital Pharmacy, Block A, Ground Floor</p></div>
                        </div>
                    )}
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2 text-sm"><span className="text-gray-500">Item Total</span><span className="font-bold text-gray-800">₹{cartTotal}</span></div>
                    <div className="flex justify-between items-center mb-2 text-sm"><span className="text-gray-500">Delivery Fee</span><span className="font-bold text-gray-800">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                    <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between items-center"><span className="font-bold text-gray-800">To Pay</span><span className="font-bold text-xl text-emerald-600">₹{finalTotal}</span></div>
                </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-white"><Button onClick={() => onCheckout({ total: finalTotal, mode: deliveryMode })}>Proceed to Pay</Button></div>
        </div>
    );
};

const PharmacyTrackingScreen = ({ navigate }) => (
    <div className="h-full flex flex-col bg-gray-50">
        <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
             <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
             <h2 className="text-xl font-bold">Track Order</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 text-center">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 animate-pulse"><Truck size={32} /></div>
                 <h3 className="font-bold text-lg text-gray-800">Out for Delivery</h3>
                 <p className="text-xs text-gray-500">Arriving by 6:00 PM today</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-4 left-6 bottom-4 w-0.5 bg-gray-200"></div>
                <div className="relative flex gap-4 mb-8">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow ring-2 ring-emerald-100 z-10"></div>
                    <div><p className="text-sm font-bold text-gray-800 leading-none">Order Placed</p><p className="text-[10px] text-gray-500 mt-1">11:30 AM</p></div>
                </div>
                <div className="relative flex gap-4 mb-8">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow ring-2 ring-emerald-100 z-10"></div>
                    <div><p className="text-sm font-bold text-gray-800 leading-none">Order Packed</p><p className="text-[10px] text-gray-500 mt-1">Pharmacy has packed your items</p></div>
                </div>
                <div className="relative flex gap-4 mb-8">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow ring-2 ring-emerald-100 z-10 animate-pulse"></div>
                    <div><p className="text-sm font-bold text-emerald-600 leading-none">Out for Delivery</p><p className="text-[10px] text-gray-500 mt-1">Driver is on the way</p></div>
                </div>
                <div className="relative flex gap-4">
                    <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow z-10"></div>
                    <div><p className="text-sm font-bold text-gray-400 leading-none">Delivered</p><p className="text-[10px] text-gray-400 mt-1">Pending</p></div>
                </div>
            </div>
            <div className="mt-6"><Button variant="secondary" onClick={() => navigate('home')}>Back to Home</Button></div>
        </div>
    </div>
);

const VideoCallScreen = ({ navigate, doctor }) => {
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  return (
    <div className="h-full flex flex-col bg-gray-900 relative">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img src={doctor?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"} className="w-full h-full object-cover opacity-80" alt="Doctor" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>
      <div className="absolute top-12 left-0 w-full px-6 flex justify-between items-start z-10">
        <div><h2 className="text-white font-bold text-xl">{doctor?.name || "Dr. Rajesh Kumar"}</h2><div className="flex items-center gap-2 mt-1"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span><span className="text-white/80 text-xs">00:12:45</span></div></div>
        <div className="bg-black/30 backdrop-blur-md p-2 rounded-lg"><Activity className="text-green-400" size={20} /></div>
      </div>
      <div className="absolute top-32 right-6 w-28 h-36 bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl z-20">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full object-cover" alt="Me" />
        {!video && <div className="absolute inset-0 bg-gray-800 flex items-center justify-center"><VideoOff className="text-white/50" size={24} /></div>}
      </div>
      <div className="absolute bottom-10 left-0 w-full px-8 z-30 flex justify-between items-center">
        <button onClick={() => setMic(!mic)} className={`p-4 rounded-full backdrop-blur-md transition-all ${mic ? 'bg-white/20 text-white' : 'bg-white text-gray-900'}`}>{mic ? <Mic size={24} /> : <MicOff size={24} />}</button>
        <button onClick={() => navigate('post_consult')} className="p-5 bg-red-600 text-white rounded-full shadow-lg shadow-red-900/50 hover:bg-red-700 transform hover:scale-105 transition-all"><PhoneOff size={32} /></button>
        <button onClick={() => setVideo(!video)} className={`p-4 rounded-full backdrop-blur-md transition-all ${video ? 'bg-white/20 text-white' : 'bg-white text-gray-900'}`}>{video ? <Video size={24} /> : <VideoOff size={24} />}</button>
      </div>
    </div>
  );
};

const PostConsultationScreen = ({ navigate }) => (
  <div className="h-full flex flex-col bg-white p-6 pt-12 animate-fade-in">
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600"><CheckCircle size={40} /></div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Consultation Ended</h2>
      <p className="text-gray-500 mb-8">Dr. Rajesh Kumar has issued a digital prescription for you.</p>
      <div className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><FileText size={80} className="text-blue-600" /></div>
        <div className="flex items-center gap-3 mb-4"><div className="bg-blue-600 text-white p-2 rounded-lg"><FileCheck size={20} /></div><div><h4 className="font-bold text-gray-800">Digital Prescription</h4><p className="text-xs text-blue-600 font-medium">Ref: #RX-2026-889</p></div></div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600"><Pill size={14} /><span>Paracetamol 500mg (1-0-1)</span></div>
          <div className="flex items-center gap-2 text-sm text-gray-600"><Pill size={14} /><span>Cetrizine 10mg (0-0-1)</span></div>
        </div>
        <button className="w-full py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2"><Download size={16} /> Download PDF</button>
      </div>
    </div>
    <Button onClick={() => navigate('home')} className="w-full mb-4">Back to Home</Button>
  </div>
);

const NotificationsScreen = ({ navigate }) => (
  <div className="h-full flex flex-col bg-gray-50 pb-24">
    <div className="p-6 pt-14 pb-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
      <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
      <div><h2 className="text-2xl font-bold">Notifications</h2><p className="text-sm text-gray-500">Alerts & Updates</p></div>
    </div>
    <div className="p-6 space-y-4 overflow-y-auto scrollbar-hide">
      {NOTIFICATIONS.map((notif) => (
        <div key={notif.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}><notif.icon size={20} /></div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1"><h4 className="font-bold text-gray-800 text-sm">{notif.title}</h4><span className="text-[10px] text-gray-400 font-medium">{notif.time}</span></div>
            <p className="text-xs text-gray-500 leading-relaxed">{notif.msg}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DoctorsScreen = ({ navigate, setSelectedDoctor, bookingType }) => {
  const [selectedDept, setSelectedDept] = useState(null);
  const handleBook = (doc) => { setSelectedDoctor(doc); navigate('booking'); };
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white p-6 pt-14 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
          <div><h2 className="text-xl font-bold">{bookingType === 'VIDEO' ? 'Video Consultation' : 'Select Doctor'}</h2>{bookingType === 'VIDEO' && <p className="text-xs text-purple-600 font-medium">Secure Tele-health</p>}</div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => setSelectedDept(null)} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${!selectedDept ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>All</button>
          {DEPARTMENTS.map(d => (<button key={d.id} onClick={() => setSelectedDept(d.name)} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${selectedDept === d.name ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>{d.name}</button>))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32 scrollbar-hide">
        {DOCTORS.filter(d => !selectedDept || d.dept === selectedDept).map(doc => (
          <div key={doc.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative">
                <img src={doc.image} className="w-16 h-16 rounded-xl bg-gray-100 object-cover" alt={doc.name} />
                {bookingType === 'VIDEO' && (<div className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full border-2 border-white"><Video size={10} /></div>)}
              </div>
              <div><h3 className="font-bold text-gray-800 text-lg">{doc.name}</h3><p className="text-sm text-gray-500">{doc.dept}</p><div className="flex items-center gap-3 mt-2 text-xs text-gray-500"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{doc.exp} Exp</span><span>₹{doc.fee}</span></div></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="text-sm py-2">View Profile</Button>
              <Button className={`text-sm py-2 ${bookingType === 'VIDEO' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' : ''}`} onClick={() => handleBook(doc)} icon={bookingType === 'VIDEO' ? Video : undefined}>{bookingType === 'VIDEO' ? 'Book Video' : 'Book OPD Slot'}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookingScreen = ({ navigate, doctor, onConfirmBooking, isRescheduling, bookingType }) => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const dates = [{ day: "Mon", date: "12" }, { day: "Tue", date: "13" }, { day: "Wed", date: "14" }, { day: "Thu", date: "15" }, { day: "Fri", date: "16" }];
  const slots = ["09:00 AM", "09:30 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];
  const handleProceed = () => { onConfirmBooking({ doctor: doctor.name, dept: doctor.dept, image: doctor.image, date: `Feb ${dates[selectedDate].date}`, time: selectedTime, fee: doctor.fee, type: bookingType }); navigate('payment'); };
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 pt-14 pb-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white z-10">
        <button onClick={() => navigate(isRescheduling ? 'appt_details' : 'doctors')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
        <div><h2 className="text-xl font-bold">{isRescheduling ? "Reschedule" : `Select ${bookingType === 'VIDEO' ? 'Video' : 'OPD'} Slot`}</h2></div>
      </div>
      <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
        <div className={`flex items-center gap-3 mb-6 p-4 rounded-xl ${bookingType === 'VIDEO' ? 'bg-purple-50' : 'bg-blue-50'}`}>
            <div className="bg-white p-2 rounded-lg">{bookingType === 'VIDEO' ? <Video size={20} className="text-purple-600" /> : <Clock size={20} className="text-blue-600" />}</div>
            <div><p className="text-xs text-gray-500">Mode</p><p className="text-sm font-bold text-gray-800">{bookingType === 'VIDEO' ? 'Video Consultation' : 'In-Person OPD'}</p></div>
        </div>
        <h3 className="font-bold text-gray-800 mb-4">February 2026</h3>
        <div className="flex justify-between mb-8">{dates.map((d, i) => (<div key={i} onClick={() => setSelectedDate(i)} className={`flex flex-col items-center justify-center w-14 h-20 rounded-2xl cursor-pointer transition-all ${selectedDate === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-gray-100 text-gray-400'}`}><span className="text-xs font-medium mb-1">{d.day}</span><span className="text-xl font-bold">{d.date}</span></div>))}</div>
        <h3 className="font-bold text-gray-800 mb-4">Available Slots</h3>
        <div className="grid grid-cols-3 gap-3 mb-8">{slots.map((slot, i) => (<button key={i} onClick={() => setSelectedTime(slot)} className={`py-3 rounded-xl text-sm font-semibold border transition-all ${selectedTime === slot ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}>{slot}</button>))}</div>
        <div className="bg-gray-50 p-4 rounded-xl mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm text-gray-600">Consultation Fee</span><span className="font-bold text-gray-800">₹{doctor?.fee || 800}</span></div><div className="flex justify-between items-center"><span className="text-sm text-gray-600">Service Charge</span><span className="font-bold text-gray-800">₹50</span></div><div className="border-t border-gray-200 my-2 pt-2 flex justify-between items-center"><span className="font-bold text-gray-800">Total</span><span className="font-bold text-blue-600 text-lg">₹{(doctor?.fee || 800) + 50}</span></div></div>
      </div>
      <div className="p-6 border-t border-gray-100 bg-white"><Button onClick={handleProceed} className="w-full shadow-xl shadow-blue-200" disabled={!selectedTime}>{isRescheduling ? "Proceed to Reschedule" : "Pay & Confirm"}</Button></div>
    </div>
  );
};

const PaymentScreen = ({ navigate, bookingDetails, onPaymentSuccess }) => {
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  if (!bookingDetails) return <div className="h-full flex items-center justify-center">Loading...</div>;

  const handlePay = () => { setProcessing(true); setTimeout(() => { setProcessing(false); onPaymentSuccess(); navigate(bookingDetails.type === 'PHARMACY' || bookingDetails.type === 'LAB' || bookingDetails.type === 'BILL' ? 'success' : 'success'); }, 2000); };
  
  let totalAmount = 0;
  let description = "";
  if (bookingDetails.type === 'PHARMACY' || bookingDetails.type === 'LAB' || bookingDetails.type === 'BILL') {
      totalAmount = bookingDetails.totalAmount;
      description = bookingDetails.description;
  } else {
      totalAmount = (bookingDetails?.fee || 800) + 50;
      description = bookingDetails.type === 'VIDEO' ? 'Video Consult' : 'OPD Consultation';
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 pt-14 pb-4 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => navigate(bookingDetails.type === 'PHARMACY' ? 'pharmacy_cart' : (bookingDetails.type === 'LAB' ? 'lab_cart' : (bookingDetails.type === 'BILL' ? 'bills' : 'booking')))} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
        <h2 className="text-xl font-bold">Payment Gateway</h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
          <p className="text-gray-500 text-sm mb-1">Total Payable</p>
          <h2 className="text-3xl font-bold text-gray-800">₹{totalAmount}</h2>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-50 flex justify-between"><span>{description}</span><span>{bookingDetails.type === 'PHARMACY' || bookingDetails.type === 'LAB' || bookingDetails.type === 'BILL' ? 'Total' : bookingDetails?.doctor}</span></div>
        </div>
        <h3 className="font-bold text-gray-800 mb-4">Payment Method</h3>
        <div className="space-y-3">
          <div onClick={() => setMethod('card')} className={`bg-white p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${method === 'card' ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200'}`}><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><CreditCard size={20} /></div><div className="flex-1"><p className="font-bold text-gray-800">Credit / Debit Card</p><p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p></div>{method === 'card' && <div className="w-4 h-4 bg-blue-600 rounded-full"></div>}</div>
          <div onClick={() => setMethod('upi')} className={`bg-white p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${method === 'upi' ? 'border-blue-600 ring-1 ring-blue-600' : 'border-gray-200'}`}><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Phone size={20} /></div><div className="flex-1"><p className="font-bold text-gray-800">UPI</p><p className="text-xs text-gray-500">GPay, PhonePe, Paytm</p></div>{method === 'upi' && <div className="w-4 h-4 bg-blue-600 rounded-full"></div>}</div>
        </div>
        {method === 'card' && (<div className="mt-6 bg-white p-4 rounded-xl border border-gray-200 animate-fade-in"><div className="mb-3"><label className="text-xs font-bold text-gray-500">Card Number</label><input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 bg-gray-50 rounded-lg mt-1 text-sm border-none focus:ring-2 focus:ring-blue-600" /></div><div className="flex gap-3"><div><label className="text-xs font-bold text-gray-500">Expiry</label><input type="text" placeholder="MM/YY" className="w-full p-3 bg-gray-50 rounded-lg mt-1 text-sm border-none focus:ring-2 focus:ring-blue-600" /></div><div><label className="text-xs font-bold text-gray-500">CVV</label><input type="password" placeholder="123" className="w-full p-3 bg-gray-50 rounded-lg mt-1 text-sm border-none focus:ring-2 focus:ring-blue-600" /></div></div></div>)}
      </div>
      <div className="p-6 border-t border-gray-100 bg-white"><Button onClick={handlePay} className="w-full" disabled={processing}>{processing ? "Processing..." : `Pay ₹${totalAmount} Securely`}</Button></div>
    </div>
  );
};

const SuccessScreen = ({ navigate, bookingDetails, onSetReminder }) => {
  const [reminder, setReminder] = useState(false);
  let msg = "";
  if (bookingDetails?.type === 'LAB') {
      msg = `Lab Test booking confirmed for ${bookingDetails.date} at ${bookingDetails.slot}.`;
  } else if (bookingDetails?.type === 'PHARMACY') {
      msg = `Pharmacy Order placed successfully. Track it from home.`;
  } else if (bookingDetails?.type === 'BILL') {
      msg = `Payment of ₹${bookingDetails.totalAmount} for ${bookingDetails.description} was successful.`;
  } else {
      msg = `${bookingDetails?.type === 'VIDEO' ? 'Video Consultation' : 'OPD Appointment'} with ${bookingDetails?.doctor} confirmed for ${bookingDetails?.date} at ${bookingDetails?.time}.`;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white animate-fade-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-bounce"><CheckCircle size={48} /></div>
      <h2 className="text-2xl font-bold mb-2">Success!</h2>
      <p className="text-gray-500 mb-8">{msg}</p>
      {(bookingDetails?.type !== 'PHARMACY' && bookingDetails?.type !== 'BILL') && (
      <div className="w-full bg-gray-50 p-4 rounded-xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3 text-left"><div className="bg-orange-100 p-2 rounded-lg text-orange-600"><BellRing size={20} /></div><div><p className="font-bold text-sm text-gray-800">Set Reminder</p><p className="text-[10px] text-gray-500">Notify 1 hour before</p></div></div>
        <div onClick={() => { setReminder(!reminder); onSetReminder(!reminder); }} className={`w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-colors ${reminder ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${reminder ? 'translate-x-5' : 'translate-x-0'}`}></div></div>
      </div>
      )}
      <Button onClick={() => navigate('home')} className="w-full">Back to Home</Button>
    </div>
  );
};

const AppointmentDetailsScreen = ({ navigate, appt, onCancel, onReschedule }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
      <div className="bg-white p-6 pt-14 pb-4 sticky top-0 z-10 shadow-sm flex items-center gap-4"><button onClick={() => navigate('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button><h2 className="text-xl font-bold">Appointment Details</h2></div>
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center mb-6">
          <img src={appt.image} className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-100 object-cover" alt="Dr" />
          <h2 className="text-xl font-bold text-gray-800">{appt.doctor}</h2>
          <p className="text-gray-500">{appt.dept}</p>
          <div className="mt-4 flex flex-col items-center gap-2"><div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle size={12} /> CONFIRMED</div>{appt.type === 'VIDEO' && <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold"><Video size={12} /> VIDEO CONSULT</div>}</div>
        </div>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Calendar size={20} /></div><div><p className="text-xs text-gray-500">Date</p><p className="font-bold text-gray-800">{appt.date}</p></div></div>
          <div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Clock size={20} /></div><div><p className="text-xs text-gray-500">Time</p><p className="font-bold text-gray-800">{appt.time}</p></div></div>
          <div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><MapPin size={20} /></div><div><p className="text-xs text-gray-500">Location</p><p className="font-bold text-gray-800">{appt.type === 'VIDEO' ? 'Online (App)' : 'Sagar Hospital, OPD Block A'}</p></div></div>
        </div>
        {appt.reminder && <div className="mt-4 bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center gap-3 text-orange-700"><BellRing size={20} /><p className="text-sm font-semibold">Reminder set for 1 hour prior</p></div>}
      </div>
      <div className="p-6 bg-white border-t border-gray-100 grid grid-cols-2 gap-4"><Button variant="danger" icon={CalendarX} onClick={() => setShowConfirm(true)}>Cancel</Button><Button icon={RefreshCw} onClick={onReschedule}>Reschedule</Button></div>
      {showConfirm && (<div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"><div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm text-center"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600"><AlertCircle size={32} /></div><h3 className="text-xl font-bold text-gray-800 mb-2">Cancel Appointment?</h3><p className="text-sm text-gray-500 mb-6">Are you sure you want to cancel? This action cannot be undone.</p><div className="grid grid-cols-2 gap-3"><Button variant="secondary" onClick={() => setShowConfirm(false)}>Keep</Button><Button variant="danger" onClick={onCancel}>Yes, Cancel</Button></div></div></div>)}
    </div>
  );
};

const AmbulanceScreen = ({ navigate }) => {
  const [status, setStatus] = useState('idle'); // idle, searching, dispatched

  const handleRequest = () => {
    setStatus('searching');
    setTimeout(() => {
      setStatus('dispatched');
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col bg-red-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-b-[3rem] z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full p-6 pt-14">
        <button onClick={() => navigate('home')} className="self-start p-2 bg-white/20 text-white rounded-full mb-8 backdrop-blur-sm">
          <ArrowLeft size={24} />
        </button>

        <div className="text-center text-white mb-6">
          <div className={`w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl border-4 border-red-400 ${status === 'searching' ? 'animate-ping' : ''}`}>
            <Ambulance size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-1">
            {status === 'idle' && 'Emergency?'}
            {status === 'searching' && 'Searching...'}
            {status === 'dispatched' && 'On The Way'}
          </h2>
          <p className="text-red-100 px-8 text-sm">
            {status === 'idle' && 'Dispatch closest ambulance to your location.'}
            {status === 'searching' && 'Locating nearest available vehicle...'}
            {status === 'dispatched' && 'Help is arriving in 8 mins.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl flex-1 flex flex-col">
          {/* Status Timeline */}
          {status === 'dispatched' && (
            <div className="flex justify-between mb-6 px-2">
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mb-1"></div>
                  <span className="text-[10px] font-bold text-gray-600">Requested</span>
               </div>
               <div className="h-0.5 bg-green-500 flex-1 mt-2 mx-1"></div>
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mb-1 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-gray-600">Dispatched</span>
               </div>
               <div className="h-0.5 bg-gray-200 flex-1 mt-2 mx-1"></div>
               <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded-full mb-1"></div>
                  <span className="text-[10px] font-bold text-gray-400">Arrived</span>
               </div>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="w-full h-40 bg-gray-100 rounded-2xl mb-6 relative overflow-hidden border border-gray-200 flex items-center justify-center">
             <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenStreetMap_Standard_Map.png')] bg-cover opacity-30"></div>
             <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-gray-600 flex items-center gap-2 border border-gray-200 shadow-sm z-10">
               <Navigation size={14} className="text-blue-500" /> Future Scope: GPS Live Tracking
             </div>
             {/* Marker */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8 text-red-600 drop-shadow-md">
                <MapPin size={32} fill="currentColor" />
             </div>
          </div>

          {status === 'dispatched' ? (
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6 flex items-center gap-4">
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserCheck size={24} className="text-gray-500" />
               </div>
               <div className="flex-1">
                  <h4 className="font-bold text-gray-800">Ramesh K.</h4>
                  <p className="text-xs text-gray-500">KA-05-AM-108 • Driver</p>
               </div>
               <a href="tel:108" className="p-3 bg-green-500 text-white rounded-full shadow-lg shadow-green-200 active:scale-95 transition-transform">
                  <Phone size={20} />
               </a>
            </div>
          ) : (
            <div className="w-full bg-gray-100 p-4 rounded-xl flex items-center gap-3 mb-6">
              <MapPin className="text-red-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500">Pickup Location</p>
                <p className="text-sm font-bold text-gray-800">#46, 3rd Floor, BEML Layout, RR Nagar</p>
              </div>
            </div>
          )}

          <div className="mt-auto">
            {status === 'idle' ? (
              <button 
                onClick={handleRequest}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-200 active:scale-95 transition-transform flex items-center justify-center gap-3"
              >
                <Ambulance size={24} />
                REQUEST AMBULANCE
              </button>
            ) : (
              <button 
                onClick={() => setStatus('idle')}
                className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold text-lg hover:bg-gray-200 active:scale-95 transition-transform flex items-center justify-center gap-3"
              >
                Cancel Request
              </button>
            )}
            <p className="mt-4 text-center text-xs text-gray-400">For immediate assistance call <a href="tel:108" className="text-blue-600 font-bold underline">108</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [screen, setScreen] = useState('splash');
  
  // App State
  const [upcomingAppt, setUpcomingAppt] = useState({
    doctor: "Dr. Rajesh Kumar",
    dept: "Cardiology",
    date: "Feb 12",
    time: "10:30 AM",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    reminder: false,
    type: 'OPD' // 'OPD' or 'VIDEO'
  });
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [tempBooking, setTempBooking] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [bookingType, setBookingType] = useState('OPD'); // Context for booking flow
  const [selectedConsultation, setSelectedConsultation] = useState(null); // For detail view
  const [mobileNumber, setMobileNumber] = useState(''); // Store entered mobile number
  
  // Billing State (Moved to App state to allow updates)
  const [myBills, setMyBills] = useState(INITIAL_BILLS);

  // Pharmacy State
  const [cart, setCart] = useState([]);
  const [pharmacyOrders, setPharmacyOrders] = useState([]);

  // Lab State
  const [labCart, setLabCart] = useState([]);

  const navigate = (to) => setScreen(to);

  // Actions
  const handlePaymentSuccess = () => {
    if (tempBooking?.type === 'PHARMACY') {
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            items: cart,
            total: tempBooking.totalAmount,
            status: 'Out for Delivery',
            date: 'Today',
            mode: tempBooking.mode
        };
        setPharmacyOrders([newOrder, ...pharmacyOrders]);
        setCart([]); // Clear Cart
    } else if (tempBooking?.type === 'LAB') {
        setLabCart([]);
    } else if (tempBooking?.type === 'BILL') {
        // Update bill status to Paid
        const updatedBills = myBills.map(bill => 
          bill.id === tempBooking.id ? { ...bill, status: 'Paid' } : bill
        );
        setMyBills(updatedBills);
    } else {
        setUpcomingAppt({
            ...tempBooking,
            reminder: false
        });
        setIsRescheduling(false);
    }
    setTempBooking(null);
  };

  const handleCancelAppt = () => {
    setUpcomingAppt(null);
    navigate('home');
  };

  const handleStartReschedule = () => {
    setIsRescheduling(true);
    setBookingType(upcomingAppt.type); // Preserve type
    const doc = DOCTORS.find(d => d.name === upcomingAppt.doctor) || DOCTORS[0];
    setSelectedDoctor(doc);
    navigate('booking');
  };

  const handleStartVideoBooking = () => {
    setBookingType('VIDEO');
    navigate('doctors');
  };

  // Pharmacy Actions
  const addToCart = (medicine) => {
      const existing = cart.find(item => item.id === medicine.id);
      if (existing) {
          setCart(cart.map(item => item.id === medicine.id ? { ...item, qty: item.qty + 1 } : item));
      } else {
          setCart([...cart, { ...medicine, qty: 1 }]);
      }
  };

  const updateCartQty = (id, change) => {
      setCart(cart.map(item => {
          if (item.id === id) return { ...item, qty: Math.max(0, item.qty + change) };
          return item;
      }).filter(item => item.qty > 0));
  };

  const handlePharmacyCheckout = ({ total, mode }) => {
      setTempBooking({
          type: 'PHARMACY',
          totalAmount: total,
          description: 'Pharmacy Order',
          mode: mode
      });
      navigate('payment');
  };

  // Lab Actions
  const addToLabCart = (test) => {
      if (!labCart.find(item => item.id === test.id)) {
          setLabCart([...labCart, test]);
      }
  };

  const removeFromLabCart = (index) => {
      const newCart = [...labCart];
      newCart.splice(index, 1);
      setLabCart(newCart);
  };

  const handleLabCheckout = ({ total, slot }) => {
      setTempBooking({
          type: 'LAB',
          totalAmount: total,
          description: 'Lab Tests Booking',
          date: 'Tomorrow',
          slot: slot
      });
      navigate('payment');
  };

  const handleBillPayment = (bill) => {
      setTempBooking({
          type: 'BILL',
          totalAmount: bill.amount,
          description: bill.title,
          id: bill.id
      });
      navigate('payment');
  };

  // Consultation Actions
  const handleSelectConsultation = (consultation) => {
     setSelectedConsultation(consultation);
     navigate('consultation_detail');
  };

  const handleBookFollowUp = (consultation) => {
     const doc = DOCTORS.find(d => d.name === consultation.doctor) || DOCTORS[0];
     setSelectedDoctor(doc);
     setBookingType('OPD'); // Default to OPD for follow up
     navigate('booking');
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      {/* iPhone 17 Mockup Frame */}
      <div className="relative w-[380px] h-[800px] bg-black rounded-[55px] shadow-[0_0_0_12px_#3a3a3a,0_0_0_14px_#000,0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-4 ring-gray-900/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50 flex items-center justify-center gap-3">
            <div className="w-16 h-4 bg-black rounded-full flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-[#333] rounded-full"></div>
            </div>
        </div>
        <div className="absolute top-3 left-8 z-50 text-white text-xs font-medium tracking-wide">12:45</div>
        <div className="absolute top-3 right-8 z-50 flex gap-1.5 items-center">
          <div className="w-4 h-2.5 bg-white rounded-[2px]"></div>
          <div className="w-0.5 h-1.5 bg-white/50 rounded-[1px]"></div>
        </div>

        {/* Screen Content Area */}
        <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
          
          {screen === 'splash' && <SplashScreen onFinish={() => setScreen('login')} />}
          
          {screen === 'login' && <LoginScreen navigate={navigate} setMobileNumber={setMobileNumber} />}
          
          {screen === 'otp' && <OtpScreen navigate={navigate} mobileNumber={mobileNumber} />}

          {screen === 'home' && <HomeScreen navigate={navigate} upcomingAppt={upcomingAppt} onStartVideoBooking={handleStartVideoBooking} activeOrders={pharmacyOrders} />}
          
          {screen === 'appointments' && <AppointmentsScreen navigate={navigate} upcomingAppt={upcomingAppt} />}

          {screen === 'notifications' && <NotificationsScreen navigate={navigate} />}

          {screen === 'news' && <NewsScreen navigate={navigate} />}

          {screen === 'doctors' && <DoctorsScreen navigate={navigate} setSelectedDoctor={setSelectedDoctor} bookingType={bookingType} />}
          
          {screen === 'booking' && (
            <BookingScreen 
              navigate={navigate} 
              doctor={selectedDoctor} 
              onConfirmBooking={setTempBooking}
              isRescheduling={isRescheduling}
              bookingType={bookingType}
            />
          )}

          {screen === 'pharmacy' && (
              <PharmacyScreen navigate={navigate} cart={cart} onAddToCart={addToCart} />
          )}

          {screen === 'pharmacy_cart' && (
              <PharmacyCartScreen navigate={navigate} cart={cart} onUpdateQty={updateCartQty} onCheckout={handlePharmacyCheckout} />
          )}

          {screen === 'pharmacy_tracking' && (
              <PharmacyTrackingScreen navigate={navigate} />
          )}

          {screen === 'lab' && (
              <LabTestsScreen navigate={navigate} labCart={labCart} onAddToCart={addToLabCart} />
          )}

          {screen === 'lab_cart' && (
              <LabCartScreen navigate={navigate} cart={labCart} onRemove={removeFromLabCart} onCheckout={handleLabCheckout} />
          )}

          {screen === 'bills' && (
              <BillsScreen navigate={navigate} bills={myBills} onPayBill={handleBillPayment} />
          )}

          {screen === 'payment' && (
            <PaymentScreen 
              navigate={navigate} 
              bookingDetails={tempBooking}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {screen === 'success' && (
            <SuccessScreen 
              navigate={navigate} 
              bookingDetails={upcomingAppt} 
              onSetReminder={(val) => setUpcomingAppt({...upcomingAppt, reminder: val})}
            />
          )}
          
          {screen === 'appt_details' && (
             <AppointmentDetailsScreen 
                navigate={navigate} 
                appt={upcomingAppt}
                onCancel={handleCancelAppt}
                onReschedule={handleStartReschedule}
             />
          )}

          {screen === 'video_call' && (
            <VideoCallScreen navigate={navigate} doctor={DOCTORS.find(d => d.name === upcomingAppt?.doctor)} />
          )}

          {screen === 'post_consult' && (
            <PostConsultationScreen navigate={navigate} />
          )}
          
          {screen === 'records' && (
             <RecordsScreen 
                navigate={navigate} 
                onSelectConsultation={handleSelectConsultation} 
             />
          )}

          {screen === 'consultation_detail' && selectedConsultation && (
             <ConsultationDetailScreen 
                navigate={navigate} 
                consultation={selectedConsultation} 
                onBookFollowUp={handleBookFollowUp}
             />
          )}

          {screen === 'ambulance' && <AmbulanceScreen navigate={navigate} />}
          
          {screen === 'profile' && <ProfileScreen navigate={navigate} />}

          {/* Bottom Navigation */}
          {['home', 'appointments', 'records', 'profile', 'notifications', 'pharmacy', 'lab', 'news', 'bills'].includes(screen) && (
            <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 pt-3 pb-8 px-2 grid grid-cols-5 z-40">
              <div onClick={() => setScreen('home')} className={`flex flex-col items-center justify-end gap-1 cursor-pointer ${screen === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
                <Home size={24} strokeWidth={screen === 'home' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Home</span>
              </div>
              <div onClick={() => setScreen('appointments')} className={`flex flex-col items-center justify-end gap-1 cursor-pointer ${screen === 'appointments' ? 'text-blue-600' : 'text-gray-400'}`}>
                <Calendar size={24} strokeWidth={screen === 'appointments' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Appointments</span>
              </div>
              
              <div className="flex justify-center items-start w-full relative">
                <div onClick={() => setScreen('records')} className="absolute -top-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200/50 border-4 border-white cursor-pointer active:scale-95 transition-transform">
                  <FileText size={24} />
                </div>
              </div>

              <div onClick={() => setScreen('bills')} className={`flex flex-col items-center justify-end gap-1 cursor-pointer ${screen === 'bills' ? 'text-blue-600' : 'text-gray-400'}`}>
                <CreditCard size={24} strokeWidth={screen === 'bills' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Pay</span>
              </div>
              <div 
                onClick={() => setScreen('profile')} 
                className={`flex flex-col items-center justify-end gap-1 cursor-pointer ${screen === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <User size={24} strokeWidth={screen === 'profile' ? 2.5 : 2} />
                <span className="text-[10px] font-medium">Profile</span>
              </div>
            </div>
          )}

        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50 opacity-20"></div>
      </div>
    </div>
  );
}