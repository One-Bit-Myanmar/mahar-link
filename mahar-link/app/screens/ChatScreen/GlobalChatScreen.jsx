import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const initialMessages = [
  { id: '1', text: 'Hello!', sender: 'user', time: '10:00 AM', profileImage: 'https://placehold.co/400', senderName: 'User' },
  { id: '2', text: 'Hi there!', sender: 'other', time: '10:01 AM', profileImage: 'https://placehold.co/400', senderName: 'Other' },
  // ... other messages
];

export default function ChattingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { organizationName } = route.params;

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: organizationName,
    });
  }, [navigation, organizationName]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: inputText,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
        profileImage: 'https://placehold.co/400',
        senderName: organizationName,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageWrapper, item.sender === 'user' ? styles.userWrapper : styles.otherWrapper]}>
      {item.sender === 'other' && (
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      )}
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        </View>
        {item.sender === 'other' && (
          <View style={{
            display: 'flex', justifyContent: 'start', alignItems: 'start',
            flexDirection: 'column', width: '100%',
          }}>
            <Text style={styles.senderName}>{item.senderName}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <Button
          title="Send"
          onPress={handleSend}
          color={Colors.primary}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageWrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  otherWrapper: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '100%',
    borderRadius: 10,
    padding: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 99,
    marginRight: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  senderName: {
    fontSize: 14,
    fontWeight: 'thin',
    marginBottom: 5,
    marginTop: 5,
  },
  messageContent: {
    maxWidth: '100%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});