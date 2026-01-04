import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function HomeDashboard() {
  return (
    <View style={styles.container}>
      <View contentContainerStyle={styles.scroll}>

        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.username}>Hi, Bayzid</Text>
              <Text style={styles.subtitle}>Boost your career with AI</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.refreshBtn}>
            <Ionicons name="refresh" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ================= CENTER ORB ================= */}
        <View style={styles.center}>
          {/* Colorful Halo (no shadow = no black frame) */}
          {/* <LinearGradient
            colors={[
              "rgba(168,85,247,0.45)",
              "rgba(236,72,153,0.30)",
              "transparent",
            ]}
            style={styles.orbHalo}
          /> */}

          <LinearGradient
            colors={["#ff2b6a", "#a855f7", "#fbbf24", "#06b6d4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.orb}
          >
            <Ionicons name="sparkles" size={48} color="#fff" />
          </LinearGradient>

          <LinearGradient
            colors={["rgba(168,85,247,0.35)", "transparent"]}
            style={styles.shadowBar}
          />
        </View>

        {/* ================= FEATURE GRID ================= */}
        <View style={styles.grid}>

          <FeatureCard
            title="Speak with AI"
            icon="mic"
            colors={["#ec4899", "#8b5cf6"]}
          />

          <FeatureCard
            title="Chat with AI"
            icon="chatbubble-ellipses"
            colors={["#8b5cf6", "#06b6d4"]}
          />

          <FeatureCard
            title="Generate Images"
            icon="image"
            colors={["#f59e0b", "#ec4899"]}
          />

          <FeatureCard
            title="Scan to Search"
            icon="scan"
            colors={["#10b981", "#06b6d4"]}
          />

        </View>

        {/* ================= ASK BAR ================= */}
        <View style={styles.askBarContainer}>
          <BlurView
            intensity={25}
            tint="dark"
            experimentalBlurMethod="dimezisBlurView"
            style={styles.askBar}
          >
            <TextInput
              placeholder="Ask anything"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendBtn}>
              <LinearGradient
                colors={["#8b5cf6", "#06b6d4"]}
                style={styles.sendGradient}
              >
                <Ionicons name="send" size={18} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>

      </View>
    </View>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, icon, colors }) {
  return (
    <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.85}>
      <LinearGradient colors={colors} style={styles.cardGradient}>
        <BlurView
          intensity={30}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={styles.card}
        >
          <Ionicons name={icon} size={30} color="#fff" />
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDesc}>Tap to continue</Text>
          </View>
        </BlurView>
      </LinearGradient>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#000",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  row: {
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },

  username: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
  },

  subtitle: {
    color: "#999",
    fontSize: 12,
  },

  refreshBtn: {
    marginTop:10,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 60,
  },

  orb: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },

  orbHalo: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
  },

  shadowBar: {
    width: 200,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  cardWrapper: {
    width: "48%",
    height: 150,
    borderRadius: 26,
    marginBottom: 18,
    overflow: "hidden",
  },

  cardGradient: {
    flex: 1,
    padding: 1.5,
    borderRadius: 26,
  },

  card: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  cardDesc: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
  },

  askBarContainer: {
    marginTop: 10,
  },

  askBar: {
    flexDirection: "row",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },

  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },

  sendGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});