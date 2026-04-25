import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Wand2, Download, Share2 } from 'lucide-react';
import { StoryResult } from '../services/geminiService';

interface StoryViewerProps {
  story: StoryResult;
  illustration: string | null;
  onBack: () => void;
  isGeneratingIllustration: boolean;
}

export default function StoryViewer({ story, illustration, onBack, isGeneratingIllustration }: StoryViewerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto pb-20 px-4"
      id="story-viewer"
    >
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors font-medium p-2"
        id="back-button"
      >
        <ArrowLeft className="w-5 h-5" /> Back to My Bag of Stories
      </button>

      <div className="storybook-card">
        {/* Illustration Section */}
        <div className="relative aspect-square md:aspect-video bg-indigo-50 border-b-4 border-white overflow-hidden group">
          <AnimatePresence mode="wait">
            {illustration ? (
              <motion.img 
                key="illustration"
                src={illustration}
                alt={story.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                id="story-illustration"
              />
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                id="illustration-placeholder"
              >
                {isGeneratingIllustration ? (
                  <div className="space-y-4">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Wand2 className="w-16 h-16 text-brand-primary mx-auto" />
                    </motion.div>
                    <p className="text-xl font-display text-brand-primary animate-pulse">
                      Painting the magic...
                    </p>
                  </div>
                ) : (
                  <div className="opacity-40">
                    <Wand2 className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-lg">Preparing the illustration</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute top-4 right-4 flex gap-2">
             <button className="bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg text-slate-700" title="Share Story">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Story Content Section */}
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-primary mb-8 leading-tight">
              {story.title}
            </h1>
            
            <div className="markdown-body text-xl md:text-2xl text-slate-700 leading-relaxed max-w-none">
              <ReactMarkdown>{story.content}</ReactMarkdown>
            </div>
          </motion.div>
          
          <div className="mt-12 pt-8 border-t-2 border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-secondary flex items-center justify-center text-2xl">✨</div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">The End</p>
                <p className="text-slate-600 font-medium italic">Sweet dreams and happy adventures!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={onBack}
          className="magic-button px-12"
          id="finish-button"
        >
          Read Another One!
        </button>
      </div>
    </motion.div>
  );
}
