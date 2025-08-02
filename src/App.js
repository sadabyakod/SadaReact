import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

const App = () => {
  // State for the input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [submittedData, setSubmittedData] = useState(null); // New state to store submitted data

  // Handle form submission
  const handleSubmit = () => {
    // Store the submitted data in state
    setSubmittedData({ name, email, phone, address, age });

    // Clear the inputs
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setAge('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Enter Your Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Button title="Submit" onPress={handleSubmit} />

        {/* Display submitted data */}
        {submittedData && (
          <View style={styles.submittedData}>
            <Text style={styles.submittedHeader}>Submitted Data:</Text>
            <Text>Name: {submittedData.name}</Text>
            <Text>Email: {submittedData.email}</Text>
            <Text>Phone: {submittedData.phone}</Text>
            <Text>Address: {submittedData.address}</Text>
            <Text>Age: {submittedData.age}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submittedData: {
    marginTop: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#eaeaea',
  },
  submittedHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
