import React from 'react';
import { Sparkles, MapPin, Smile, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { StoryInput } from '../services/geminiService';

interface StoryFormProps {
  onGenerate: (input: StoryInput) => void;
  isLoading: boolean;
}

const CHARACTER_TYPES = ['Brave Squirrel', 'Friendly Robot', 'Magic Dragon', 'Curious Kitten', 'Smart Owl', 'Little Astronaut'];
const SETTINGS = ['Enchanted Forest', 'Moon Station', 'Underwater Kingdom', 'Clouds and Rainbows', 'Giant Tree House', 'Gingerbread Village'];
const MOODS = ['Happy & Adventurous', 'Cozy & Gentle', 'Magical & Mysterious', 'Funny & Silly', 'Brave & Strong'];

export default function StoryForm({ onGenerate, isLoading }: StoryFormProps) {
  const [characterType, setCharacterType] = React.useState(CHARACTER_TYPES[0]);
  const [setting, setSetting] = React.useState(SETTINGS[0]);
  const [mood, setMood] = React.useState(MOODS[0]);
  const [topic, setTopic] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ characterType, setting, mood, topic });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="storybook-card p-8 md:p-12 max-w-2xl mx-auto"
      id="story-form"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-primary/10 p-3 rounded-2xl">
          <Sparkles className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="text-3xl font-display text-slate-800">Create a New Story</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-lg font-medium mb-2 text-slate-600">
            <BookOpen className="w-5 h-5" /> Who is the hero?
          </label>
          <select 
            value={characterType} 
            onChange={(e) => setCharacterType(e.target.value)}
            className="input-pill appearance-none cursor-pointer"
            id="character-select"
          >
            {CHARACTER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-medium mb-2 text-slate-600">
            <MapPin className="w-5 h-5" /> Where does it happen?
          </label>
          <select 
            value={setting} 
            onChange={(e) => setSetting(e.target.value)}
            className="input-pill appearance-none cursor-pointer"
            id="setting-select"
          >
            {SETTINGS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-medium mb-2 text-slate-600">
            <Smile className="w-5 h-5" /> How should it feel?
          </label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="input-pill appearance-none cursor-pointer"
            id="mood-select"
          >
            {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-lg font-medium mb-2 text-slate-600">
             Something special to happen? (Optional)
          </label>
          <input 
            type="text"
            value={topic}
            placeholder="e.g. A missing birthday cake, or learning to fly"
            onChange={(e) => setTopic(e.target.value)}
            className="input-pill"
            id="topic-input"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="magic-button w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
          id="generate-button"
        >
          {isLoading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          ) : 'Generate Magic!'}
        </button>
      </div>
    </motion.form>
  );
}
