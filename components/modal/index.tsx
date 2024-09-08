import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal, { ReactNativeModal } from 'react-native-modal';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface modalProps {
visible?:boolean,
onClose?: () => void,
onOption2?: () => void,
onOption?: () => void,
optionText?: string,
optionText2?: string
bgOption?: string
bgOption2?: string
isSecondButton?: boolean,
children: ReactNode,
noButton?: boolean,
}

const ModalBox= ({visible, onClose, onOption ,children, noButton ,isSecondButton, onOption2 ,bgOption, optionText, optionText2  , bgOption2}: modalProps) => {
  
   return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
    >
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
        <View style={styles.dialogBox}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>

          {/* Option Buttons */}
          <View style={styles.buttonContainer}>
        {  noButton ? 
            <TouchableOpacity style={[styles.optionButton, {backgroundColor: bgOption}]} onPress={onOption}>
                <Text style={styles.buttonText}>{optionText}</Text>
            </TouchableOpacity> : null
        }
            {
            isSecondButton ?
            <TouchableOpacity  style={[styles.optionButton, {backgroundColor: bgOption2 }]} onPress={onOption2}>
                <Text style={styles.buttonText}>{optionText2}</Text>
            </TouchableOpacity> : null
            }
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  blurContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  content: {
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    cursor: "pointer"
  },
});

export default ModalBox;