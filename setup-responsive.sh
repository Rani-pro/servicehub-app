#!/bin/bash

echo "🚀 Setting up Responsive Design System..."

# Install required dependencies
echo "📦 Installing dependencies..."
yarn add react-native-size-matters react-native-responsive-screen

# For iOS, run pod install
if [ -d "ios" ]; then
    echo "🍎 Installing iOS pods..."
    cd ios && pod install && cd ..
fi

echo "✅ Responsive Design System setup complete!"
echo ""
echo "📱 Your React Native app now includes:"
echo "   • Responsive utilities and hooks"
echo "   • Scalable typography system"
echo "   • Adaptive spacing and components"
echo "   • Cross-platform consistency"
echo "   • Device-aware layouts"
echo ""
echo "📖 Check RESPONSIVE_DESIGN.md for detailed documentation"
echo "🧪 Test on different device sizes to see the responsive design in action"