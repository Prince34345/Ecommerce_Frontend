import AddressForm from '@/components/addressform';
import ModalBox from '@/components/modal';
import { useAuth } from '@/context/auth';
import { AddressInfo } from '@/store/slices/addressSlice';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacityBase, TouchableOpacity, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

const AddressScreen: React.FC = () => {
  const { items, loading } = useSelector((state: RootState) => state.address);
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false);
  const [currentId, setCurrentId] = useState("")
  const { authUser } = useAuth();

  const renderItem = ({ item }: { item: AddressInfo }) => {
    return (
      <><View style={styles.addressContainer}>
        <Text style={styles.addressText}>{item.firstName}</Text>
        <Text style={[styles.addressText, { fontSize: 10.5, color: "#b0b9b9" }]}>{item.lastName}</Text>
        <View style={styles.actionButtons}>
          {item.isDefault && (
            <>
              <Text style={styles.defaultText}>
                Default
              </Text>
            </>
          )}
          {!item.isDefault && (
            <><View style={{ backgroundColor: "black", padding: 10, borderRadius: 20 }}><TouchableOpacity></TouchableOpacity><Text style={{ color: 'white', fontWeight: "900" }}>Set as Default</Text></View></>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => { setIsEdit(true); setCurrentId(item.addressId); }}>
            <Ionicons name="pencil-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Ionicons name="trash" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ textAlign: "right" }}>{item.firstName}</Text>
        </View>
      </View>
      <ModalBox visible={isEdit || isAdd} onClose={() => { setIsEdit(false); setIsAdd(false); }} noButton>
        <AddressForm currentId={currentId} address={item}/>
      </ModalBox>
      </>
    )
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: "900", textAlign: 'center', padding: 20 }}>Address</Text>
        {authUser ?
          <>
            {
              !items || items?.length === 0 || loading ?
                <View style={{ display: "flex", transform: "scale(1.2)", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ textAlign: "center", color: "#989898" }}>You Have no Address</Text>
                  <Ionicons name='sad' color={"#989898"} />
                </View>
                : <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.addressId}
                  contentContainerStyle={styles.list}
                />
            }
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={50} color="blue" onPress={() => setIsAdd(true)} />
            </TouchableOpacity></> : null
        }
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
  },
  list: {
    paddingBottom: 20,
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#e4e4e4',
    borderWidth: 1,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "800"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  defaultText: {
    color: '#acaf',
    fontWeight: 'bold',
    textAlign: "left"
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default AddressScreen;