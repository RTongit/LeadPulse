import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { io } from "socket.io-client";

export default function App() {
  useEffect(() => {
    const socket = io("https://leadpulse-f6me.onrender.com/");

    socket.on("newLeads", (data) => {
      setLeads((prev) => [...prev, data]);
    });

    return () => {
      socket.off("newLeads");
      socket.disconnect();
    };
  }, []);

  const [leads, setLeads] = useState([]);

  function LeadItem({ name, email }) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leads</Text>

      {leads.length > 0 ? (
        <FlatList
          data={leads}
          renderItem={({ item }) => (
            <LeadItem name={item.name} email={item.email} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : null}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  list: {
    alignItems: "center",
  },

  card: {
    width: "100%",
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },

  email: {
    fontSize: 15,
    color: "#666",
  },
});
