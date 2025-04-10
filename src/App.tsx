import React, { useState } from 'react';
import { Copy, Check, Moon, Sun, Loader2, BookOpen } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { ExamplePrompts } from './ExamplePrompts';

// Development areas with descriptions
const DEVELOPMENT_AREAS = {
  'Unit Testing': {
    description: 'Generate prompts for writing effective unit tests',
    placeholder: 'Example: I need to test a user authentication function that validates email and password'
  },
  'API Development': {
    description: 'Create prompts for API design and implementation',
    placeholder: 'Example: I need to design a RESTful API for a blog platform with posts and comments'
  },
  'Data Processing': {
    description: 'Generate prompts for data manipulation tasks',
    placeholder: 'Example: I need to process a CSV file containing sales data and calculate monthly trends'
  },
  'CLI Applications': {
    description: 'Create prompts for command-line tool development',
    placeholder: 'Example: I need a CLI tool that processes images in a directory with custom options'
  },
  'Web Scraping': {
    description: 'Generate prompts for web scraping solutions',
    placeholder: 'Example: I need to scrape product prices and reviews from an e-commerce website'
  },
  'Task Automation': {
    description: 'Create prompts for automation scripts',
    placeholder: 'Example: I need to automate the backup of specific files to cloud storage'
  },
  'Database Operations': {
    description: 'Generate prompts for database interactions',
    placeholder: 'Example: I need to design a schema for a social media platform with users and posts'
  },
  'ML Model Creation': {
    description: 'Create prompts for machine learning tasks',
    placeholder: 'Example: I need to build a sentiment analysis model for customer reviews'
  },
  'Security Tools': {
    description: 'Generate prompts for security-related tools',
    placeholder: 'Example: I need to create a tool that checks password strength and common vulnerabilities'
  },
  'Design Patterns': {
    description: 'Create prompts for implementing design patterns',
    placeholder: 'Example: I need to implement an observer pattern for a logging system'
  },
  'Performance Optimization': {
    description: 'Generate prompts for optimizing code',
    placeholder: 'Example: I need to optimize a database query that\'s taking too long to execute'
  },
  'Error Handling': {
    description: 'Create prompts for robust error handling',
    placeholder: 'Example: I need to implement comprehensive error handling for an API client'
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [selectedArea, setSelectedArea] = useState('Unit Testing');
  const [request, setRequest] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCopyPrompt = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy prompt');
    }
  };

  const handleGenerate = async () => {
    if (!request.trim()) {
      toast.error('Please enter a request');
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt('');

    try {
      const response = await fetch('https://api.together.xyz/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
          prompt: `You are an expert at writing clear and effective prompts for AI coding assistants. Generate a detailed prompt for the following ${selectedArea} request:\n\n${request}\n\nCreate a prompt that:\n1. Clearly defines the requirements\n2. Includes specific technical details\n3. Mentions edge cases to consider\n4. Suggests best practices to follow\n\nProvide only the prompt without any explanations or additional context.\n\nPrompt:`,
          max_tokens: 1500,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
          stop: ['</s>', 'Human:', 'Assistant:', 'Request:'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log to inspect the response structure

      // Together API returns the generated text in the 'choices[0].text' property
      const generatedText = data.choices?.[0]?.text || '';
      
      if (!generatedText) {
        throw new Error('No prompt generated from the API');
      }

      setGeneratedPrompt(generatedText.trim());
      toast.success('Prompt generated successfully!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(`Failed to generate prompt: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (showExamples) {
    return (
      <div className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <ExamplePrompts
            area={selectedArea}
            onBack={() => setShowExamples(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            AI Prompt Generator
          </h1>
          <button
            onClick={handleThemeToggle}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
            } hover:opacity-80 transition-opacity`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className={`space-y-6 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          <div>
            <label className="block text-sm font-medium mb-2">
              Choose Development Area
            </label>
            <div className="flex gap-4 items-center">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className={`flex-1 p-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                {Object.entries(DEVELOPMENT_AREAS).map(([area, { description }]) => (
                  <option key={area} value={area}>
                    {area} - {description}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowExamples(true)}
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-800'
                } border border-gray-300 transition-colors`}
              >
                <BookOpen size={20} />
                <span>View Examples</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Describe Your Request
            </label>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder={DEVELOPMENT_AREAS[selectedArea].placeholder}
              className={`w-full h-32 p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !request.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
              isLoading || !request.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Generating...
              </>
            ) : (
              'Generate Prompt'
            )}
          </button>

          {generatedPrompt && (
            <div className={`relative mt-8 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="absolute right-2 top-2">
                <button
                  onClick={handleCopyPrompt}
                  className={`p-2 rounded ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {isCopied ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <Copy size={20} className={
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } />
                  )}
                </button>
              </div>
              <pre className={`p-4 overflow-x-auto ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <code>{generatedPrompt}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;