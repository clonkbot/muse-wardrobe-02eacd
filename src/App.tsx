import { useState, useEffect } from 'react';
import './App.css';

interface OutfitItem {
  type: string;
  name: string;
  color: string;
  emoji: string;
}

interface Outfit {
  id: number;
  occasion: string;
  items: OutfitItem[];
  confidence: number;
  vibe: string;
}

interface CalendarEvent {
  time: string;
  title: string;
  type: 'work' | 'casual' | 'date' | 'fitness';
}

const weatherData = {
  temp: 68,
  condition: 'Partly Cloudy',
  high: 72,
  low: 58,
  humidity: 45,
};

const todayEvents: CalendarEvent[] = [
  { time: '9:00 AM', title: 'Team Standup', type: 'work' },
  { time: '12:30 PM', title: 'Lunch with Maya', type: 'casual' },
  { time: '6:00 PM', title: 'Yoga Class', type: 'fitness' },
];

const wardrobeItems = {
  tops: ['Cream Silk Blouse', 'Oversized Linen Shirt', 'Black Turtleneck', 'Rust Cardigan', 'White Tank'],
  bottoms: ['High-Waist Trousers', 'Midi Satin Skirt', 'Vintage Denim', 'Wide-Leg Pants', 'Pleated Shorts'],
  outerwear: ['Camel Coat', 'Leather Jacket', 'Denim Jacket', 'Wool Blazer'],
  shoes: ['Pointed Mules', 'White Sneakers', 'Ankle Boots', 'Ballet Flats', 'Loafers'],
  accessories: ['Gold Hoops', 'Silk Scarf', 'Leather Tote', 'Woven Bag', 'Delicate Necklace'],
};

const generateOutfits = (): Outfit[] => [
  {
    id: 1,
    occasion: 'Morning Meetings',
    vibe: 'Polished Professional',
    confidence: 94,
    items: [
      { type: 'Top', name: 'Cream Silk Blouse', color: '#F5F0E8', emoji: '👚' },
      { type: 'Bottom', name: 'High-Waist Trousers', color: '#2C2C2C', emoji: '👖' },
      { type: 'Outerwear', name: 'Wool Blazer', color: '#8B7355', emoji: '🧥' },
      { type: 'Shoes', name: 'Pointed Mules', color: '#D4A574', emoji: '👠' },
      { type: 'Accessory', name: 'Gold Hoops', color: '#D4AF37', emoji: '✨' },
    ],
  },
  {
    id: 2,
    occasion: 'Casual Lunch',
    vibe: 'Effortlessly Chic',
    confidence: 91,
    items: [
      { type: 'Top', name: 'Oversized Linen Shirt', color: '#E8E4DC', emoji: '👔' },
      { type: 'Bottom', name: 'Vintage Denim', color: '#6B8FAD', emoji: '👖' },
      { type: 'Shoes', name: 'White Sneakers', color: '#FFFFFF', emoji: '👟' },
      { type: 'Accessory', name: 'Woven Bag', color: '#C4A77D', emoji: '👜' },
    ],
  },
  {
    id: 3,
    occasion: 'Evening Yoga',
    vibe: 'Comfortable Flow',
    confidence: 97,
    items: [
      { type: 'Top', name: 'White Tank', color: '#FAFAFA', emoji: '🎽' },
      { type: 'Bottom', name: 'High-Waist Leggings', color: '#1A1A1A', emoji: '🩳' },
      { type: 'Shoes', name: 'Grip Socks', color: '#E8D4C4', emoji: '🧦' },
      { type: 'Accessory', name: 'Hair Claw', color: '#D4A574', emoji: '💫' },
    ],
  },
];

function App() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setSelectedOutfit(null);
    setTimeout(() => {
      setOutfits(generateOutfits());
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1800);
  };

  useEffect(() => {
    if (outfits.length > 0 && !selectedOutfit) {
      setSelectedOutfit(outfits[0].id);
    }
  }, [outfits, selectedOutfit]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app">
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">Muse</span>
        </div>
        <nav className="nav">
          <button className="nav-btn active">Today</button>
          <button className="nav-btn">Wardrobe</button>
          <button className="nav-btn">Style Profile</button>
        </nav>
        <div className="header-right">
          <div className="avatar">S</div>
        </div>
      </header>

      <main className="main">
        <section className="context-panel">
          <div className="greeting-section">
            <p className="date-label">{currentDate}</p>
            <h1 className="greeting">Good morning, Sofia</h1>
            <p className="subtitle">Let's curate your look for today</p>
          </div>

          <div className="context-cards">
            <div className="context-card weather-card">
              <div className="card-header">
                <span className="card-icon">☀️</span>
                <span className="card-label">Weather</span>
              </div>
              <div className="weather-main">
                <span className="temp">{weatherData.temp}°</span>
                <span className="condition">{weatherData.condition}</span>
              </div>
              <div className="weather-details">
                <span>H: {weatherData.high}° · L: {weatherData.low}°</span>
              </div>
            </div>

            <div className="context-card calendar-card">
              <div className="card-header">
                <span className="card-icon">📅</span>
                <span className="card-label">Today's Schedule</span>
              </div>
              <div className="events-list">
                {todayEvents.map((event, idx) => (
                  <div key={idx} className={`event-item event-${event.type}`}>
                    <span className="event-time">{event.time}</span>
                    <span className="event-title">{event.title}</span>
                    <span className={`event-tag ${event.type}`}>{event.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="context-card wardrobe-card">
              <div className="card-header">
                <span className="card-icon">👗</span>
                <span className="card-label">Your Wardrobe</span>
              </div>
              <div className="wardrobe-stats">
                <div className="stat">
                  <span className="stat-value">{wardrobeItems.tops.length + wardrobeItems.bottoms.length}</span>
                  <span className="stat-label">Clothing</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{wardrobeItems.shoes.length}</span>
                  <span className="stat-label">Shoes</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{wardrobeItems.accessories.length}</span>
                  <span className="stat-label">Accessories</span>
                </div>
              </div>
              <div className="wardrobe-preview">
                {['#F5F0E8', '#2C2C2C', '#8B7355', '#6B8FAD', '#D4A574'].map((color, idx) => (
                  <div
                    key={idx}
                    className="wardrobe-dot"
                    style={{ backgroundColor: color, animationDelay: `${idx * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            className={`generate-btn ${isGenerating ? 'generating' : ''}`}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner" />
                <span>Curating your looks...</span>
              </>
            ) : (
              <>
                <span className="btn-icon">✨</span>
                <span>{hasGenerated ? 'Regenerate Outfits' : 'Generate Today\'s Outfits'}</span>
              </>
            )}
          </button>
        </section>

        <section className={`outfits-panel ${outfits.length > 0 ? 'has-outfits' : ''}`}>
          {outfits.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <div className="hanger">
                  <div className="hanger-hook" />
                  <div className="hanger-body" />
                </div>
              </div>
              <p className="empty-text">Your personalized outfits will appear here</p>
              <p className="empty-subtext">Based on your wardrobe, weather & schedule</p>
            </div>
          ) : (
            <>
              <h2 className="outfits-title">Today's Looks</h2>
              <div className="outfits-grid">
                {outfits.map((outfit, idx) => (
                  <div
                    key={outfit.id}
                    className={`outfit-card ${selectedOutfit === outfit.id ? 'selected' : ''}`}
                    onClick={() => setSelectedOutfit(outfit.id)}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="outfit-card-inner">
                      <div className="outfit-header">
                        <span className="outfit-occasion">{outfit.occasion}</span>
                        <span className="outfit-confidence">{outfit.confidence}% match</span>
                      </div>

                      <div className="outfit-items">
                        {outfit.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="outfit-item" style={{ animationDelay: `${(idx * 0.15) + (itemIdx * 0.05)}s` }}>
                            <div
                              className="item-color"
                              style={{ backgroundColor: item.color }}
                            />
                            <div className="item-details">
                              <span className="item-type">{item.type}</span>
                              <span className="item-name">{item.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="outfit-footer">
                        <span className="vibe-tag">{outfit.vibe}</span>
                        <button className="save-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tip-banner">
                <span className="tip-icon">💡</span>
                <p>Tip: The silk blouse pairs beautifully with your gold hoops for a cohesive warm tone</p>
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Requested by <a href="https://twitter.com/T1000_V2" target="_blank" rel="noopener noreferrer">@T1000_V2</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></p>
      </footer>
    </div>
  );
}

export default App;
