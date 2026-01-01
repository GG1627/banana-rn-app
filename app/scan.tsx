import { View, Alert, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { Text } from "@/components/nativewindui/Text";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Button } from "@/components/nativewindui/Button";
import { Icon } from "@/components/nativewindui/Icon";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { router } from "expo-router";

export default function ScanScreen() {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Show image picker options when screen loads (after a brief delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      showImagePickerOptions();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const showImagePickerOptions = () => {
    Alert.alert(
      "Choose Option",
      "How would you like to scan your banana?",
      [
        {
          text: "Take Photo",
          onPress: openCamera,
        },
        {
          text: "Choose from Gallery",
          onPress: openImagePicker,
        },
        {
          text: "Cancel",
          onPress: () => router.back(),
          style: "cancel",
        },
      ]
    );
  };

  const uploadImage = async (imageAsset: ImagePicker.ImagePickerAsset) => {
    setLoading(true);
    
    try {
      // Create FormData
      const formData = new FormData();
      
      // Get the file extension from the URI or default to jpg
      const uriParts = imageAsset.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const fileName = imageAsset.fileName || `banana.${fileType}`;
      
      // Append the image file
      // @ts-ignore - FormData types don't match React Native's implementation
      formData.append('file', {
        uri: imageAsset.uri,
        type: imageAsset.type || `image/${fileType}`,
        name: fileName,
      } as any);

      // Make the API call
      const response = await fetch('https://web-production-0977.up.railway.app/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (e) {
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (e2) {
            // Keep default error message
          }
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setPrediction(result);
      
    } catch (error: any) {
      console.error('Upload failed:', error);
      Alert.alert(
        'Error', 
        error.message || 'Failed to upload image. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera permission is required to take photos");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const imageAsset = result.assets[0];
      setSelectedImage(imageAsset.uri);
      await uploadImage(imageAsset);
    }
  };

  const openImagePicker = async () => {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Gallery permission is required to select photos");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const imageAsset = result.assets[0];
      setSelectedImage(imageAsset.uri);
      await uploadImage(imageAsset);
    }
  };

  // Color mapping based on days left (more days = fresher = green, fewer days = going bad = red)
  // Colors chosen to contrast with yellow background (#FFE75C)
  const getColorForDays = (days: number): string => {
    if (days >= 11) return "#059669"; // emerald green (11-12+ days = very fresh)
    if (days >= 9 && days < 11) return "#10B981"; // green (9-10 days = fresh)
    if (days >= 7 && days < 9) return "#06B6D4"; // cyan (7-8 days = good)
    if (days >= 5 && days < 7) return "#3B82F6"; // blue (5-6 days = getting ripe)
    if (days >= 3 && days < 5) return "#F59E0B"; // amber orange (3-4 days = overripe)
    if (days >= 1 && days < 3) return "#F97316"; // orange-red (1-2 days = almost bad)
    return "#EF4444"; // red (0-1 days = gone bad)
  };

  // Funnier + less-cringe banana freshness meter 🍌
const getPhrasesForDays = (days: number): string[] => {
    if (days >= 11) {
      return [
        "Super fresh! This banana still pays rent. 🟢",
        "Just a baby banana — untouched by time.",
        "Green as a stoplight on vacation.",
        "Peak banana potential unlocked.",
        "This banana has its whole life ahead of it.",
        "Fresh enough to be in a commercial.",
        "This banana has *dreams* still.",
        "Certified crisp and crunchy (for a banana).",
        "So green it’s basically a cucumber.",
        "Banana status: thriving."
      ];
    }
  
    if (days >= 9 && days < 11) {
      return [
        "Still fresh — banana confidence level: HIGH.",
        "This banana wakes up early and exercises.",
        "A solid, dependable banana.",
        "Prime snacking window activated.",
        "Still living its best yellow life.",
        "Banana morale remains excellent.",
        "Looking good, feeling good, peeling good.",
        "Fresh enough to impress your mom.",
        "This banana could run for office.",
        "Certified snack-ready."
      ];
    }
  
    if (days >= 7 && days < 9) {
      return [
        "Comfortably yellow — like a banana should be.",
        "This banana has entered its golden era.",
        "Now serving: optimal banana energy.",
        "Yellow means ‘yes please’.",
        "Ideal cereal-companion status achieved.",
        "A reliable breakfast buddy.",
        "Banana confidence slightly mellow, still strong.",
        "Tastes like victory (and potassium).",
        "Still in the ‘respectable fruit’ zone.",
        "Banana mood: content."
      ];
    }
  
    if (days >= 5 && days < 7) {
      return [
        "Getting ripe — personality developing.",
        "This banana is discovering who it really is.",
        "Banana bread vibes detected.",
        "Slightly spotty, deeply wise.",
        "Perfect for smoothies and emotional support.",
        "Flavor level: storytelling grandma.",
        "The banana is entering its thoughtful era.",
        "Time to start planning recipes 👩‍🍳",
        "A little soft, a lot lovable.",
        "Peak banana character arc."
      ];
    }
  
    if (days >= 3 && days < 5) {
      return [
        "Orange alert! Use soon or forever hold your toast. 🟠",
        "This banana has seen some things.",
        "Banana bread destiny approaching.",
        "Soft but loyal.",
        "You and this banana are now on a timer.",
        "Spot count increasing — tension rising.",
        "A delicate situation. Handle with whisk.",
        "Perfect for pudding — and apologies.",
        "Consider preheating the oven.",
        "Banana plot twist incoming."
      ];
    }
  
    if (days >= 1 && days < 3) {
      return [
        "🚨 This banana is living minute-to-minute.",
        "Banana status: dramatic.",
        "Make banana bread or forever regret it.",
        "Emergency carbs extraction recommended.",
        "This banana is clinging to life… and flavor.",
        "Do something. Anything. Preferably baking.",
        "Your window of opportunity is tiny. Like a raisin.",
        "Banana ghost preparing to spawn.",
        "Highly compatible with Nutella & panic.",
        "Act now — this message will self-peel."
      ];
    }
  
    return [
      "It’s over. Banana has become a concept. 💀",
      "May this banana rest in compost.",
      "Gone to the great smoothie in the sky.",
      "Banana status: historical artifact.",
      "Too late — this banana is philosophical now.",
      "This banana has transcended edibility.",
      "Retired from food duty permanently.",
      "The banana has left its physical form.",
      "Toast? Yes. Banana? No.",
      "Banana bread deadline severely missed."
    ];
  };
  

  const getRandomPhrase = (days: number): string => {
    const phrases = getPhrasesForDays(days);
    return phrases[Math.floor(Math.random() * phrases.length)];
  };

  const getStatusColor = (days: number) => {
    return getColorForDays(days);
  };

  return (
    <>
      <StatusBar style="dark" />
      <View className="flex-1 bg-[#FFE75C]">
        {/* Header with Back Button */}
        <View className="pt-16 pb-6 px-6 flex-row items-center">
          <Pressable 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Text 
              className="text-black text-2xl font-bold"
              style={{ fontFamily: 'Poppins-Bold' }}
            >
              ←
            </Text>
          </Pressable>
          <Text 
            className="text-black text-2xl font-bold ml-2 tracking-tight"
            style={{ fontFamily: 'Poppins-Bold' }}
          >
            Home
          </Text>
        </View>

        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pb-8 items-center justify-start">
            {/* Selected Image */}
            {selectedImage && (
              <View className="w-full items-center mb-8 mt-2">
                <View className="rounded-3xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm p-3 border border-white/50">
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 300, height: 300, borderRadius: 20 }}
                    contentFit="cover"
                  />
                </View>
              </View>
            )}

            {/* Loading State */}
            {loading && selectedImage && (
              <View className="w-full items-center mb-8">
                <View className="bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-5 flex-row items-center gap-4 shadow-xl border border-white/50">
                  <ActivityIndicator size="small" color="#000" />
                  <Text 
                    className="text-black font-medium tracking-wide"
                    style={{ fontFamily: 'Poppins-Medium' }}
                  >
                    Processing your banana...
                  </Text>
                </View>
              </View>
            )}

            {/* Prediction Results */}
            {prediction && (() => {
              const daysLeft = parseFloat(prediction.predictions);
              const statusColor = getStatusColor(daysLeft);
              const randomPhrase = getRandomPhrase(daysLeft);
              
              return (
                <View className="w-full mb-8">
                  {/* Main Result Card */}
                  <View className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    {/* Color accent bar at top */}
                    <View 
                      className="h-1.5 w-full"
                      style={{ backgroundColor: statusColor }}
                    />
                    
                    <View className="p-8 pt-10">
                      {/* Days Number - Large and prominent */}
                      <View className="items-center mb-6 pt-2">
                        <Text 
                          className="text-6xl font-bold mb-2"
                          style={{ fontFamily: 'Poppins-Bold', color: statusColor, lineHeight: 72 }}
                        >
                          {daysLeft.toFixed(1)}
                        </Text>
                        <Text 
                          className="text-gray-400 text-xs tracking-wider uppercase"
                          style={{ fontFamily: 'Poppins-Medium', letterSpacing: 2 }}
                        >
                          Days Until Rotten
                        </Text>
                      </View>
                      
                      {/* Divider */}
                      <View className="h-px bg-gray-100 mb-6" />
                      
                      {/* Phrase - Elegant and subtle */}
                      <View className="items-center">
                        <Text 
                          className="text-lg text-gray-800 text-center leading-6"
                          style={{ fontFamily: 'Poppins-Medium' }}
                        >
                          {randomPhrase}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })()}

            {/* Rescan Button */}
            {prediction && (
              <Button 
                className="bg-black rounded-3xl h-16 shadow-2xl mt-4 w-full border-0" 
                onPress={showImagePickerOptions}
                style={{ elevation: 8 }}
              >
                <Text 
                  className="text-[#FFE75C] text-base font-semibold tracking-wide"
                  style={{ fontFamily: 'Poppins-SemiBold' }}
                >
                  Scan Another Banana
                </Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

