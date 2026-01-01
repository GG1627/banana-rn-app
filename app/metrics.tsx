import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/nativewindui/Text";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function MetricsScreen() {
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
          <View className="flex-1 px-6 pb-8 mt-1">
            {/* Model Overview Card */}
            <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
              <Text 
                className="text-black text-2xl font-bold mb-4"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Model Overview
              </Text>
              
              <View className="gap-3">
                <View>
                  <Text 
                    className="text-gray-500 text-xs uppercase tracking-wider mb-1"
                    style={{ fontFamily: 'Poppins-Medium', letterSpacing: 1 }}
                  >
                    Architecture
                  </Text>
                  <Text 
                    className="text-black text-base"
                    style={{ fontFamily: 'Poppins-Regular' }}
                  >
                    Vision Transformer (ViT-Base-Patch16-224)
                  </Text>
                </View>

                <View>
                  <Text 
                    className="text-gray-500 text-xs uppercase tracking-wider mb-1"
                    style={{ fontFamily: 'Poppins-Medium', letterSpacing: 1 }}
                  >
                    Task
                  </Text>
                  <Text 
                    className="text-black text-base"
                    style={{ fontFamily: 'Poppins-Regular' }}
                  >
                    Regression — Predict days until overripe (0–12 days)
                  </Text>
                </View>

                <View>
                  <Text 
                    className="text-gray-500 text-xs uppercase tracking-wider mb-1"
                    style={{ fontFamily: 'Poppins-Medium', letterSpacing: 1 }}
                  >
                    Training
                  </Text>
                  <Text 
                    className="text-black text-base"
                    style={{ fontFamily: 'Poppins-Regular' }}
                  >
                    20 epochs • AdamW optimizer • Cosine annealing scheduler
                  </Text>
                </View>
              </View>
            </View>

            {/* Performance Metrics Card */}
            <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
              <Text 
                className="text-black text-2xl font-bold mb-4"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Performance
              </Text>
              
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1 bg-gray-50 rounded-2xl p-4">
                  <Text 
                    className="text-gray-500 text-xs uppercase tracking-wider mb-2"
                    style={{ fontFamily: 'Poppins-Medium', letterSpacing: 1 }}
                  >
                    MAE
                  </Text>
                  <Text 
                    className="text-black text-3xl font-bold"
                    style={{ fontFamily: 'Poppins-Bold' }}
                  >
                    0.58
                  </Text>
                  <Text 
                    className="text-gray-400 text-xs mt-1"
                    style={{ fontFamily: 'Poppins-Regular' }}
                  >
                    days
                  </Text>
                </View>

                <View className="flex-1 bg-gray-50 rounded-2xl p-4">
                  <Text 
                    className="text-gray-500 text-xs uppercase tracking-wider mb-2"
                    style={{ fontFamily: 'Poppins-Medium', letterSpacing: 1 }}
                  >
                    RMSE
                  </Text>
                  <Text 
                    className="text-black text-3xl font-bold"
                    style={{ fontFamily: 'Poppins-Bold' }}
                  >
                    0.79
                  </Text>
                  <Text 
                    className="text-gray-400 text-xs mt-1"
                    style={{ fontFamily: 'Poppins-Regular' }}
                  >
                    days
                  </Text>
                </View>
              </View>

              <Text 
                className="text-gray-600 text-sm leading-5"
                style={{ fontFamily: 'Poppins-Regular' }}
              >
                Predicts within ~0.6 days on average
              </Text>
            </View>

            {/* Charts Section */}
            <View className="mb-6">
              <Text 
                className="text-black text-2xl font-bold mb-4"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Evaluation Charts
              </Text>

              {/* Training Progress */}
              <View className="bg-white rounded-3xl p-4 mb-4 shadow-xl overflow-hidden">
                <Text 
                  className="text-black text-lg font-semibold mb-3"
                  style={{ fontFamily: 'Poppins-SemiBold' }}
                >
                  Training Progress
                </Text>
                <Image
                  source={require("@/assets/training_progress.png")}
                  style={{ width: '100%', height: 200, borderRadius: 16 }}
                  contentFit="contain"
                />
              </View>

              {/* Predictions vs Actual */}
              <View className="bg-white rounded-3xl p-4 mb-4 shadow-xl overflow-hidden">
                <Text 
                  className="text-black text-lg font-semibold mb-3"
                  style={{ fontFamily: 'Poppins-SemiBold' }}
                >
                  Predictions vs Actual
                </Text>
                <Image
                  source={require("@/assets/predictions_vs_actual.png")}
                  style={{ width: '100%', height: 200, borderRadius: 16 }}
                  contentFit="contain"
                />
              </View>

              {/* Error Distribution */}
              <View className="bg-white rounded-3xl p-4 shadow-xl overflow-hidden">
                <Text 
                  className="text-black text-lg font-semibold mb-3"
                  style={{ fontFamily: 'Poppins-SemiBold' }}
                >
                  Error Distribution
                </Text>
                <Image
                  source={require("@/assets/error_distribution.png")}
                  style={{ width: '100%', height: 200, borderRadius: 16 }}
                  contentFit="contain"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

