import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeDashboard() {
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* USER HEADER */}
        <View style={styles.header}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.username}>Hi, Bayzid 👋</Text>
              <Text style={styles.subtitle}>Boost your career with AI</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.refreshBtn}>
            <Text style={styles.refreshIcon}>⟳</Text>
          </TouchableOpacity>
        </View>

        {/* CENTER ORB */}
        <View style={styles.center}>
          <LinearGradient
            colors={["#ff2b6a", "#7d4cff", "#00d4ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.orb}
          >
            <Text style={styles.orbIcon}>✨</Text>
          </LinearGradient>

          <View style={styles.shadowBar} />
        </View>

        {/* FEATURE GRID */}
        <View style={styles.grid}>

          <FeatureCard
            title="Speak with AI"
            colors={["#ff2b6a", "#7d4cff"]}
          />

          <FeatureCard
            title="Chat with AI"
            colors={["#7d4cff", "#00d4ff"]}
          />

          <FeatureCard
            title="Generate Images"
            colors={["#ff8a00", "#ff2b6a"]}
          />

          <FeatureCard
            title="Scan to Search"
            colors={["#00ffa3", "#00d4ff"]}
          />

        </View>

        {/* ASK BAR */}
        <View style={styles.askBar}>
          <TextInput
            placeholder="Ask anything"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Text style={styles.sendIcon}>➤</Text>
        </View>

      </ScrollView>
    </View>
  );
}

function FeatureCard({ title, colors }) {
  return (
    <TouchableOpacity style={styles.cardWrapper}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>Tap to continue →</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 12,
  },

  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  subtitle: {
    color: "#aaaaaa",
    fontSize: 11,
  },

  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  refreshIcon: {
    color: "white",
    fontSize: 22,
  },

  center: {
    alignItems: "center",
    marginTop: 30,
  },

  orb: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  orbIcon: {
    color: "white",
    fontSize: 40,
  },

  shadowBar: {
    width: 220,
    height: 30,
    marginTop: 8,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  grid: {
    marginTop: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardWrapper: {
    width: "48%",
    height: 130,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },

  card: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
  },

  cardTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  cardDesc: {
    marginTop: 6,
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },

  askBar: {
    marginTop: 100,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: "white",
    fontSize: 14,
  },

  sendIcon: {
    color: "white",
    fontSize: 20,
  },
});