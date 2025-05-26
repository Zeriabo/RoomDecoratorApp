import React, {useState, useRef} from 'react';
import {
  Upload,
  Wand2,
  Download,
  Palette,
  Home,
  Sparkles,
  Camera,
  ChevronDown,
  Check,
} from 'lucide-react';

const RoomDecoratorApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [designStyle, setDesignStyle] = useState('');
  const [roomType, setRoomType] = useState('');
  const [colorPreference, setColorPreference] = useState('');
  const [preserveFurniture, setPreserveFurniture] = useState(true);
  const [loading, setLoading] = useState(false);
  const [decorationResults, setDecorationResults] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const designStyles = [
    {
      value: 'Finnish',
      label: 'Finnish',
      description: 'Minimalist, natural wood, clean lines',
    },
    {
      value: 'Swedish',
      label: 'Swedish',
      description: 'Scandinavian hygge, neutral tones',
    },
    {
      value: 'Arabic',
      label: 'Arabic',
      description: 'Rich patterns, ornate details, warm colors',
    },
    {
      value: 'Russian',
      label: 'Russian',
      description: 'Classical elegance, imperial colors',
    },
    {
      value: 'American',
      label: 'American',
      description: 'Contemporary comfort, bold colors',
    },
    {
      value: 'Modern',
      label: 'Modern',
      description: 'Clean lines, minimal clutter',
    },
  ];

  const roomTypes = [
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Dining Room',
    'Bathroom',
    'Office',
    'General Room',
  ];

  const colorOptions = [
    'Neutral',
    'Warm',
    'Cool',
    'Bold',
    'Earthy',
    'Pastel',
    'Monochrome',
  ];

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDecorate = async () => {
    if (!selectedImage || !designStyle) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('designStyle', designStyle);
      formData.append('roomType', roomType);
      formData.append('colorPreference', colorPreference);
      formData.append('preserveExistingFurniture', preserveFurniture);

      // Simulated API response for demo
      setTimeout(() => {
        const mockResults = {
          success: true,
          originalImageAnalysis: `Analyzed ${
            roomType || 'room'
          } with existing furniture and ${
            colorPreference.toLowerCase() || 'neutral'
          } color scheme.`,
          options: [1, 2, 3].map(i => ({
            id: `option-${i}`,
            designStyle: designStyle,
            imageBase64: imagePreview, // Using original image as placeholder
            description: `${designStyle} design variation ${i}. This approach ${
              i === 1
                ? 'preserves most existing furniture while adding complementary decorative elements'
                : i === 2
                ? 'balances existing pieces with new furniture for harmony'
                : 'boldly transforms the space with creative arrangements'
            }.`,
            addedElements: getAddedElements(designStyle, i),
            modifiedElements: [
              'Lighting arrangement',
              'Color coordination',
              'Furniture positioning',
            ],
            confidenceScore: 0.85 + i * 0.05,
          })),
        };

        setDecorationResults(mockResults);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Error decorating room:', error);
      setLoading(false);
    }
  };

  const getAddedElements = (style, variation) => {
    const styleElements = {
      Finnish: [
        'Birch wood accents',
        'Minimalist lighting',
        'Natural textiles',
      ],
      Swedish: ['Hygge textiles', 'Light wood furniture', 'Cozy blankets'],
      Arabic: ['Ornate patterns', 'Rich tapestries', 'Geometric art'],
      Russian: ['Classical furniture', 'Rich fabrics', 'Ornate decorations'],
      American: ['Contemporary furniture', 'Bold artwork', 'Mixed materials'],
      Modern: ['Clean-lined furniture', 'Neutral colors', 'Minimalist decor'],
    };

    const elements = styleElements[style] || styleElements['Modern'];
    if (variation === 3) {
      elements.push('Statement piece', 'Accent wall');
    }
    return elements;
  };

  const handleDownload = option => {
    // Create download link for the image
    const link = document.createElement('a');
    link.href = option.imageBase64;
    link.download = `decorated-room-${option.designStyle}-${option.id}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Room Decorator
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Upload Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/50 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Camera className="w-7 h-7 text-purple-500" />
            Upload Your Room
          </h2>

          <div
            className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center hover:border-purple-400 transition-all cursor-pointer bg-gradient-to-br from-purple-50/50 to-blue-50/50"
            onClick={() => fileInputRef.current?.click()}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Room preview"
                  className="max-w-md mx-auto rounded-xl shadow-lg"
                />
                <p className="text-green-600 font-medium">
                  ✓ Image uploaded successfully
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-purple-400 mx-auto" />
                <div>
                  <p className="text-xl font-medium text-gray-700">
                    Click to upload your room image
                  </p>
                  <p className="text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/50 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Palette className="w-7 h-7 text-blue-500" />
            Design Preferences
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Design Style */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Design Style *
              </label>
              <div
                className="w-full p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:border-purple-300 transition-all flex items-center justify-between"
                onClick={() => setShowStyleDropdown(!showStyleDropdown)}>
                <span
                  className={designStyle ? 'text-gray-900' : 'text-gray-500'}>
                  {designStyle
                    ? designStyles.find(s => s.value === designStyle)?.label
                    : 'Select design style'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showStyleDropdown ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {showStyleDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto">
                  {designStyles.map(style => (
                    <div
                      key={style.value}
                      className="p-4 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setDesignStyle(style.value);
                        setShowStyleDropdown(false);
                      }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {style.label}
                          </div>
                          <div className="text-sm text-gray-500">
                            {style.description}
                          </div>
                        </div>
                        {designStyle === style.value && (
                          <Check className="w-5 h-5 text-purple-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Room Type */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Room Type
              </label>
              <div
                className="w-full p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:border-blue-300 transition-all flex items-center justify-between"
                onClick={() => setShowRoomDropdown(!showRoomDropdown)}>
                <span className={roomType ? 'text-gray-900' : 'text-gray-500'}>
                  {roomType || 'Select room type (optional)'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showRoomDropdown ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {showRoomDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                  {roomTypes.map(type => (
                    <div
                      key={type}
                      className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                      onClick={() => {
                        setRoomType(type);
                        setShowRoomDropdown(false);
                      }}>
                      <span className="text-gray-900">{type}</span>
                      {roomType === type && (
                        <Check className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Color Preference */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Color Preference
              </label>
              <select
                value={colorPreference}
                onChange={e => setColorPreference(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl bg-white hover:border-green-300 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none">
                <option value="">Any color scheme</option>
                {colorOptions.map(color => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Preserve Furniture */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="preserve"
                checked={preserveFurniture}
                onChange={e => setPreserveFurniture(e.target.checked)}
                className="w-5 h-5 text-purple-500 rounded focus:ring-purple-400"
              />
              <label
                htmlFor="preserve"
                className="text-sm font-semibold text-gray-700">
                Preserve existing furniture
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleDecorate}
            disabled={!selectedImage || !designStyle || loading}
            className="w-full mt-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Generating magical designs...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                Transform My Room
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {decorationResults && (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-yellow-500" />
              Your Decorated Rooms
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {decorationResults.options.map((option, index) => (
                <div
                  key={option.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                  <div className="relative mb-4">
                    <img
                      src={option.imageBase64}
                      alt={`${option.designStyle} design`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Option {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {option.designStyle} Style
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {option.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">
                        Added Elements:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {option.addedElements.slice(0, 3).map((element, i) => (
                          <span
                            key={i}
                            className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOption(option)}
                      className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm">
                      View Details
                    </button>
                    <button
                      onClick={() => handleDownload(option)}
                      className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedOption && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedOption.designStyle} Design
                </h3>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedOption.imageBase64}
                    alt="Decorated room"
                    className="w-full rounded-xl shadow-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600">
                      {selectedOption.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Added Elements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOption.addedElements.map((element, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Modified Elements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOption.modifiedElements.map((element, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleDownload(selectedOption)}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Download High Resolution
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDecoratorApp;
