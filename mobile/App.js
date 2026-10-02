import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { io } from "socket.io-client";

export default function App() {

  // useEffect(()=>{
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("http://10.27.117.12:5000/");
  //       const response = await res.json();
  //       setLeads((prev)=> [...prev,response])
  //     }
  //     catch(error) {
  //       console.log("Error:", error);
  //     }
  //   }

  //   fetchData();
  // }, 
  // []
  // )

  useEffect(()=>{
    const socket = io("http://10.27.117.12:5000/")

    socket.on("newLeads",(data)=>{
      setLeads((prev)=> [...prev,data])
    })

    return (()=>{
      socket.off("newLeads")
      socket.disconnect();
    })
  }
  ,[])
  
  const [leads, setLeads] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@gmail.com",
    },
    {
      id: "2",
      name: "Alice Smith",
      email: "alice@gmail.com",
    },
    {
      id: "3",
      name: "Rohan",
      email: "rohan@gmail.com",
    },
  ])

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

      <FlatList
        data={leads}
        renderItem={({ item }) => (
          <LeadItem name={item.name} email={item.email} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />


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
