import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { io } from "socket.io-client";

const SystemMessage = {
  id: 1,
  body: "Welcome to the Nest Chat app",
  author: "Bot",
};

const socket = io("http://localhost:3000", { autoConnect: false });

type ChatProps = {
  currentUser: string;
  onLogout: () => void;
};

export function Chat({ currentUser, onLogout }: ChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([SystemMessage]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("chat", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    socket.emit("chat", { author: currentUser, body: inputValue.trim() });
    setInputValue("");
  };

  const handleLogout = () => {
    socket.disconnect();
    onLogout();
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderText}>Nest Chat App</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.chatMessages}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              currentUser === item.author ? styles.outgoing : styles.incoming,
            ]}
          >
            <Image
              source={require("@/assets/images/default-avatar.png")} // Avatar image
              style={styles.avatar}
            />
            <View style={styles.messageBubble}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.messageBody}>{item.body}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.chatComposer}>
        <TextInput
          style={styles.chatInput}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Type a message..."
          onSubmitEditing={handleSendMessage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  chatHeader: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatHeaderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  logoutBtnText: {
    color: "white",
  },
  chatMessages: {
    flex: 1,
    paddingTop: 10,
  },
  message: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  incoming: {
    justifyContent: "flex-start",
  },
  outgoing: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageBubble: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
    marginBottom: 5,
  },
  author: {
    fontWeight: "bold",
    fontSize: 14,
  },
  messageBody: {
    fontSize: 16,
    color: "#333",
  },
  chatComposer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
    height: 40,
    marginRight: 10,
  },
});
