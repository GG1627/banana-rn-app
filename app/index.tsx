import { View, ScrollView } from "react-native";
import { Text } from "@/components/nativewindui/Text";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Button } from "@/components/nativewindui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Main() {
  const handleScan = () => {
    router.push("/scan");
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1 bg-[#FFE75C]"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 min-h-screen px-6 pt-28 pb-8 items-center justify-start">
          {/* Logo Section */}
          <View className="items-center mb-10">
            <View className="rounded-3xl p-4 shadow-xl">
              <Image
                source={require("@/assets/logo.png")}
                style={{ width: 120, height: 120 }}
                contentFit="contain"
              />
            </View>
          </View>

          {/* Header Text */}
          <View className="items-center mb-12">
            <Text 
              className="text-black text-4xl font-bold text-center mb-4 tracking-tight"
              style={{ fontFamily: 'Poppins-Bold' }}
            >
              Banana Countdown
            </Text>
            <Text 
              className="text-black/75 text-base text-center leading-7 max-w-sm"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Point your camera at a banana to see how many days it has left before it goes bad.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="w-full gap-3 mb-14">
            <Button 
              className="bg-black rounded-3xl h-16 shadow-2xl border-0" 
              onPress={handleScan}
              style={{ elevation: 8 }}
            >
              <Text 
                className="text-[#FFE75C] text-base font-semibold tracking-wide"
                style={{ fontFamily: 'Poppins-SemiBold' }}
              >
                Scan a Banana
              </Text>
            </Button>
            
            <Button 
              className="bg-white/60 backdrop-blur-sm rounded-3xl h-16 border border-black/10 shadow-lg"
              onPress={() => router.push("/metrics")}
              style={{ elevation: 4 }}
            >
              <Text 
                className="text-black text-base font-medium tracking-wide"
                style={{ fontFamily: 'Poppins-Medium' }}
              >
                Performance Metrics
              </Text>
            </Button>
          </View>

          {/* Example Flow */}
          <View className="w-full mb-8">
            <Text 
              className="text-black/60 text-xs font-medium mb-6 text-center tracking-wider uppercase"
              style={{ fontFamily: 'Poppins-Medium', letterSpacing: 1.5 }}
            >
              How it works
            </Text>
            <View className="flex-row items-center justify-center gap-5">
              {/* Step 1 Box */}
              <View className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-xl items-center w-[140px] border border-white/50">
                <View className="bg-[#FFE75C] rounded-2xl w-16 h-16 items-center justify-center mb-4 shadow-lg">
                  <MaterialCommunityIcons name="camera" size={32} color="#000" />
                </View>
                <Text 
                  className="text-black text-xs font-medium text-center leading-4"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  Take Photo
                </Text>
              </View>

              {/* Arrow */}
              <Text className="text-black/50 text-3xl font-light">→</Text>

              {/* Step 2 Box */}
              <View className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-xl items-center w-[140px] border border-white/50">
                <View className="bg-[#F97316] rounded-2xl w-16 h-16 items-center justify-center mb-4 shadow-lg">
                  <Text 
                    className="text-white text-3xl font-bold"
                    style={{ fontFamily: 'Poppins-Bold' }}
                  >
                    3
                  </Text>
                </View>
                <Text 
                  className="text-black text-xs font-medium text-center leading-4"
                  style={{ fontFamily: 'Poppins-Medium' }}
                >
                  Days Left
                </Text>
              </View>
            </View>
          </View>

          {/* Copyright Footer */}
          <View className="w-full items-center mt-auto pt-6">
            <Text 
              className="text-black/40 text-xs tracking-wide"
              style={{ fontFamily: 'Poppins-Regular' }}
            >
              Made by @Gael Garcia ^-^
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}