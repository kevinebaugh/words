import React, { useState, useEffect } from 'react';
import { ReactFitty } from 'react-fitty';

const SwipeableWord = () => {
  const words = [
    "hopscotch", "fur", "piano", "world", "back", "amazing", "discover", "architecture", "thanksgiving", "village", "snow", "dirty", "quiet",
    "close", "island", "beak", "black", "librarian", "loud", "roller skates", "vehicle", "seal", "beach", "knowledge", "autumn", "kiss", "bike", "listen", "trail", "cylinder", "vulture", "building", "unwavering", "learn", "violin", "day", "growth", "cube", "laughing", "hug", "net", "white", "scales", "butterfly", "slide", "quilt", "eraser", "bright", "stuffed animal", "ruler", "colors", "circle", "deer", "inside", "seahorse", "honest", "child", "big", "zoo", "music", "painter", "week", "word", "windy", "scooter", "sky", "create", "parent", "bunny", "front", "mountain", "xylophone", "measure", "hooves", "play", "turtle", "mammal", "juice", "umbrella", "aunt", "wild", "baby", "responsible", "imagination", "panda", "oval", "soccer", "write", "triangle", "month", "nature", "jellyfish", "dragonfly", "tail", "king", "pumpkin", "out", "yesterday", "dolphin", "sandbox", "small", "yellow", "book", "engineer", "whale", "zippy", "galaxy", "christmas", "yummy", "excellent", "help", "instrument", "above", "explore", "helicopter", "dynamic", "birthday", "", "car", "scared", "wagon", "lesson", "incredible", "game", "number", "grape", "playful", "reindeer", "presents", "iguana", "spider", "baker", "brilliant", "universe", "sing", "sheep", "chair", "clean", "bark", "yak", "fantastic", "elf", "on", "fox", "thoughtful", "fourth of july", "off", "spirited", "fruit", "knowledgeable", "horse", "sun", "astronaut", "blue", "pond", "joyful", "wonderful", "soft", "cat", "doctor", "magnificent", "picture", "dinosaur", "passionate", "morning", "motivated", "teacher", "queen", "drum", "root", "red", "evening", "marker", "perseverance", "wind", "swing", "adventure", "plant", "hide-and-seek", "determined", "forest", "daisy", "fish", "tiger", "tall", "x-ray", "red light, green light", "left", "alligator", "lion", "country", "smooth", "wholesome", "robot", "dance", "right", "seed", "naptime", "love", "hill", "ice", "summer", "crayon", "guitar", "grandparent", "lunchtime", "block", "penguin", "time", "thirsty", "starfish", "library", "glue", "cloud", "firefighter", "paws", "bridge", "simon says", "bus", "santa claus", "planet", "gardener", "cousin", "multiply", "rain", "share", "skateboard", "stem", "student", "nest", "green", "wolf", "cow", "rainbow", "shape", "quick-witted", "pencil", "wise", "reptile", "moon", "hat", "kite", "below", "outstanding", "talented", "animal",
    "short", "rose", "draw", "insect", "valentine's day", "climb", "waiter", "talk", "rainy", "zucchini", "cold", "jigsaw", "tape", "victory",
    "costume", "sand", "tree", "candy", "alphabet", "rough", "sentence", "musician", "amphibian", "veterinarian", "uncle", "walrus", "letter",
    "quail", "friend", "unique", "respectful", "read", "zebra", "excited", "noble", "hungry", "night", "kindness", "easter", "watermelon",
    "market", "dog", "milk", "imagine", "optimistic", "umpire", "park", "weather", "subtract", "scientist", "valiant", "see-saw", "volcano", "bear", "paintbrush", "quest", "st. patrick's day", "song", "city", "storm", "ball", "walk", "chicken", "horn", "fireworks", "happiness", "duck, duck, goose", "tricycle", "ship", "run", "loyal", "chef", "today", "duckling", "open", "tomorrow", "giraffe", "youthful", "rock", "gorilla", "circle time", "nurturing", "tulip", "laugh", "snack time", "pig", "joyous", "xtraordinary", "hippopotamus", "train", "angry", "courage", "heart", "crescent", "ant", "store", "enthusiastic", "dirt", "koala", "slow", "feather", "extraordinary", "trumpet", "nurse", "doll", "cave", "fins", "quirky", "fly", "judge", "bed", "mighty", "radiant", "supportive", "fast", "dry", "family", "orange", "vibrant", "sphere", "petal", "add", "octopus", "egg", "hard", "wet", "swim", "scissors", "ladybug", "teddy bear", "grass", "jovial", "superb", "pink", "crawl", "down", "brother", "hairstylist", "grasshopper", "happy", "garden", "bee", "story", "key", "duck", "gray", "jump", "brown", "desert", "class", "in", "color", "shark", "alien", "inspiring", "narwhal", "divide", "sister", "freeze dance", "winter", "lake", "space", "new year", "rectangle", "firefly", "diamond", "sunflower", "cake", "vegetable", "creative", "fabulous", "snowy", "water", "officer", "tenacious", "playdate", "halloween", "flute", "parade", "shoe", "cloudy", "user", "year", "wing", "up", "afternoon", "leaf", "storytime", "star", "river", "tired", "sunny", "valley", "purple", "road", "plain", "count", "boat", "paper", "pet", "holiday", "generous", "banana", "sad", "luminous", "branch", "thunder", "rabbit", "yo-yo", "square", "house", "school", "board game", "plane", "genuine", "paint", "lily", "outside", "monkey", "ocean", "zestful", "harmonious", "curious", "saxophone", "owl", "stick", "frog", "balloon", "toy", "bird", "tag", "spring", "ice cream", "zealous", "musical chairs", "unity", "farm", "lightning", "friendship", "elephant", "recess", "puzzle", "crab", "flamingo", "balance", "unicorn", "turkey",
    "playground", "jungle", "caterpillar", "cone", "flower", "hot", "smile", "rocket", "go ahead!", "trunk", "pyramid", "apple", "inventor"
  ]

  const [wordIndex, setWordIndex] = useState(() => {
    const storedIndex = localStorage.getItem('wordIndex');
    return storedIndex !== null ? Number(storedIndex) : Math.floor(Math.random() * words.length);
  });

  const [startX, setStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [background, setBackground] = useState(getRandomPastelColor());

  const handleSwipeStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setStartX(event.touches ? event.touches[0].clientX : event.clientX);
    setTranslateX(0);
  };

  const handleSwipeEnd = (event) => {
    if (startX === null) return;

    const endX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > window.innerWidth / 2 && deltaX > 0 && wordIndex > 0) {
      setWordIndex(wordIndex - 1);
    } else if (Math.abs(deltaX) > window.innerWidth / 2 && deltaX < 0 && wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    }

    setStartX(null);
    setTranslateX(0);
  };

  const handleSwipeMove = (event) => {
    if (startX === null) return;

    const currentX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = currentX - startX;

    setTranslateX(deltaX);
  };

  useEffect(() => {
    localStorage.setItem('wordIndex', wordIndex.toString());
    setBackground(getRandomPastelColor());
  }, [wordIndex]);

  useEffect(() => {
    // Prevent vertical scrolling by adding CSS properties to the body element
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable vertical scrolling when the component is unmounted
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // Disable pinch-to-zoom on mobile devices
    const handleTouchMove = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const containerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: background,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    touchAction: 'manipulation',
  };

  const wordContainerStyle = {
    textAlign: 'center',
    width: '80%',
    margin: '0 auto',
  };

  const wordStyle = {
    fontSize: '5rem',
    transition: 'opacity 0.3s',
    opacity: Math.abs(translateX) >= window.innerWidth / 2 ? 0.2 : 1,
  };

  function getRandomPastelColor() {
    // Generate a random pastel color
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  return (
    <div
      style={containerStyle}
      onTouchStart={handleSwipeStart}
      onTouchEnd={handleSwipeEnd}
      onTouchMove={handleSwipeMove}
      onMouseDown={handleSwipeStart}
      onMouseUp={handleSwipeEnd}
      onMouseMove={handleSwipeMove}
    >
      <div style={wordContainerStyle}>
        <ReactFitty style={wordStyle}>{words[wordIndex]}</ReactFitty>
      </div>
    </div>
  );
};

export default SwipeableWord;
