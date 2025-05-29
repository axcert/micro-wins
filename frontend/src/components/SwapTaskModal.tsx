import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './SwapTaskModal.styles';

interface Props {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SwapTaskModal: React.FC<Props> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Swap Task</Text>
          <Text style={styles.description}>
            Are you sure you want to swap this task with a different one?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SwapTaskModal;