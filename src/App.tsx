import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookHeart } from 'lucide-react';
import StoryForm from './components/StoryForm';
import StoryViewer from './components/StoryViewer';
import { StoryInput, StoryResult, generateStory, generateIllustration } from './services/geminiService';

export default function App() {
  const [story, setStory] = React.useState<StoryResult | null>(null);
  const [illustration, setIllustration] = React.useState<string | null>(null);
  const [isGeneratingStory, setIsGeneratingStory] = React.useState(false);
  const [isGeneratingIllustration, setIsGeneratingIllustration] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = async (input: StoryInput) => {
    setIsGeneratingStory(true);
    setError(null);
    setStory(null);
    setIllustration(null);

    try {
      const result = await generateStory(input);
      setStory(result);
      setIsGeneratingStory(false);

      // Start generating illustration immediately after story is ready
      setIsGeneratingIllustration(true);
      try {
        const imageUrl = await generateIllustration(result.illustrationPrompt);
        setIllustration(imageUrl);
      } catch (err) {
        console.error('Failed to generate illustration:', err);
        // We don't block the story if illustration fails
      } finally {
        setIsGeneratingIllustration(false);
      }
    } catch (err) {
      console.error('Failed to generate story:', err);
      setError('Oh no! The magic failed. Please try again!');
      setIsGeneratingStory(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" id="app-root">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-dark/10 rounded-full blur-[100px]" />

      <header className="pt-12 pb-8 px-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-brand-secondary w-20 h-20 rounded-3xl flex items-center justify-center rotate-6 shadow-lg mb-6"
          >
            <BookHeart className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-display text-slate-800 tracking-tight mb-2">
            Sparkle Stories
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-lg">
            Magical adventures made just for you by AI magic! ✨
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {!story ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <StoryForm onGenerate={handleGenerate} isLoading={isGeneratingStory} />
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-red-50 border-2 border-red-100 rounded-2xl text-red-500 text-center font-medium max-w-xl mx-auto"
                >
                  {error}
                </motion.div>
              )}

              <footer className="mt-16 pb-12 text-center text-slate-400 font-medium">
                <div className="flex items-center justify-center gap-6 mb-4">
                   <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">🐿️</span>
                    <span className="text-xs uppercase tracking-widest">Animals</span>
                   </div>
                   <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">🚀</span>
                    <span className="text-xs uppercase tracking-widest">Space</span>
                   </div>
                   <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">🏰</span>
                    <span className="text-xs uppercase tracking-widest">Magic</span>
                   </div>
                </div>
                <p>&copy; 2026 Sparkle Stories Generator</p>
              </footer>
            </motion.div>
          ) : (
            <StoryViewer 
              story={story} 
              illustration={illustration} 
              isGeneratingIllustration={isGeneratingIllustration}
              onBack={() => setStory(null)} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

