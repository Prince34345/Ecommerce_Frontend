import { addAddress, AddressInfo, postaddressThunk } from '@/store/slices/addressSlice';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput ,StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

interface formProps {
    onOpen?: any,
    currentId?: string
    address?: AddressInfo
}

const AddressForm = ({onOpen, currentId, address}: formProps) => {
   const dispatch = useDispatch();
   const {items, loading, error} = useSelector((state: RootState) => state.address)
   const [input, setInput] = useState<AddressInfo>(address as AddressInfo)
   const addressId = uuidv4();

   const handleFormSubmission = () => {  
      if (input && input?.addressId) {
          dispatch(addAddress(input));           
      }
   };
   
   useEffect(() => {
        let timer : NodeJS.Timeout;
        timer = setTimeout(dispatch(postaddressThunk(items) as any));
        return () => {
            if (timer) {
                 clearTimeout(timer);
            }
        }
   }, [items, dispatch, postaddressThunk]);

 
return (
    <ScrollView>
    <Text style={{fontSize: 20, fontWeight: '900'}}>Address</Text>
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
     <View style={{flexGrow: 1.5}}>
      <TextInput
        style={styles.input}
        value={input?.firstName}
        onChangeText={text => {setInput({...input, firstName: text})}}
        placeholder="First Name"

      />
      </View>
    <View style={{flexGrow: 1.5, margin: 4}} >
      <TextInput
        style={styles.input}
        value={input?.lastName}
        onChangeText={text => {setInput({...input, lastName: text})}}
        placeholder="Last Name"
      />
      </View>
    </View>
      <TextInput
        style={styles.input}
        value={input?.phoneNumber}
        onChangeText={text => {setInput({...input, phoneNumber: text})}}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={input?.email}
        onChangeText={text => {setInput({...input, email: text})}}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={input?.StreetAddress1}
        onChangeText={text => {setInput({...input, StreetAddress1: text})}}
        placeholder="Street Address 1"
      />
      <TextInput
        style={styles.input}
        value={input?.StreetAddress2}
        onChangeText={text => {setInput({...input, StreetAddress2: text})}}
        placeholder="Street Address 2"
      />
      <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
     <View style={{flexGrow: 2}}>
      <TextInput
        style={styles.input}
        value={input?.city}
        onChangeText={text => {setInput({...input, city: text})}}
        placeholder="City"
      />

      <TextInput
        style={styles.input}
        value={input?.state}
        onChangeText={text => {setInput({...input, state: text})}}
        placeholder="State"
      />
      </View>
      <View style={{flexGrow: 1.5, marginHorizontal: 5}}>
      <TextInput
        style={styles.input}
        value={input?.postalCode}
        onChangeText={text => {setInput({...input, postalCode: text})}}
        placeholder="Postal Code"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={input?.country}
        onChangeText={text => {setInput({...input, country: text})}}
        placeholder="Country"
      />
      </View>
      </View>
      <Pressable style={styles.button} onPress={handleFormSubmission}>
        <Text style={styles.buttonText}>Add New Address</Text>
      </Pressable>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  label: {
    fontSize: 1,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 8,
    fontSize: 12,
    textAlign: "center",
    width: "100%"
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 3
  },
  button: {
    backgroundColor: '#d9d9d999',
    margin: 5,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
      fontSize: 16, 
      fontWeight: '500',
  }
});

export default AddressForm;