// src/utils/categoryUtils.js
// Dynamic category styling utilities

// Pool of gradients for dynamic assignment
const GRADIENT_POOL = [
    "from-lime-600 to-lime-400",
    "from-blue-600 to-blue-400",
    "from-purple-700 to-purple-500",
    "from-indigo-700 to-indigo-500",
    "from-slate-700 to-slate-500",
    "from-pink-600 to-pink-400",
    "from-red-600 to-red-400",
    "from-green-600 to-green-400",
    "from-teal-600 to-teal-400",
    "from-orange-600 to-orange-400",
    "from-cyan-600 to-cyan-400",
    "from-rose-600 to-rose-400",
    "from-violet-600 to-violet-400",
    "from-amber-600 to-amber-400",
    "from-emerald-600 to-emerald-400",
    "from-fuchsia-600 to-fuchsia-400"
  ];
  
  // Pool of emojis for dynamic assignment
  const EMOJI_POOL = [
    "🛡️", "💰", "🏠", "🏡", "📈", "💎", "💳", "🏦", 
    "📊", "🎯", "💼", "🔐", "⚡", "🌟", "🚀", "💡",
    "🎁", "🔑", "📱", "💻", "🏆", "🎓", "🌍", "✨"
  ];
  
  /**
   * Generate a consistent hash from a string
   * Same name = same color/icon every time
   */
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  
  /**
   * Get icon for a category
   * Priority: 1) CMS icon, 2) Generated from name
   */
  export function getCategoryIcon(category) {
    // If CMS provides icon, use it
    if (category?.icon) {
      return category.icon;
    }
  
    // Generate consistent icon from name
    const categoryName = category?.name || category || "Default";
    const hash = hashString(categoryName);
    const iconIndex = hash % EMOJI_POOL.length;
    return EMOJI_POOL[iconIndex];
  }
  
  /**
   * Get gradient color for a category
   * Priority: 1) CMS gradient, 2) CMS color, 3) Generated from name
   */
  export function getCategoryGradient(category) {
    // If CMS provides gradient, use it
    if (category?.gradient) {
      return category.gradient;
    }
  
    // If CMS provides color, create gradient
    if (category?.color) {
      return `from-[${category.color}] to-[${category.color}]`;
    }
  
    // Generate consistent gradient from name
    const categoryName = category?.name || category || "Default";
    const hash = hashString(categoryName);
    const gradientIndex = hash % GRADIENT_POOL.length;
    return GRADIENT_POOL[gradientIndex];
  }
  
  /**
   * Get complete style for a category
   */
  export function getCategoryStyle(category) {
    return {
      icon: getCategoryIcon(category),
      gradient: getCategoryGradient(category)
    };
  }