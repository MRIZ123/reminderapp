import React, { useState } from "react";
import { View, Button, Alert, Text, StyleSheet } from "react-native";
import { scheduleNotificationAsync } from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Notifications } from "expo-notifications";

export default function ReminderScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    if (date) {
      setSelectedDate(date);
      const now = new Date();
      const triggerTime = new Date(date);

      if (triggerTime <= now) {
        Alert.alert("Invalid Time", "Please select a future time for the reminder.");
        return;
      }

      const trigger = new Date(Date.now() + 10000);
      trigger.setMinutes(0);
      trigger.setSeconds(0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Happy new hour!',
        },
        trigger,
      });

      setReminderSet(true); // Set a flag to indicate reminder is set
      Alert.alert("REMINDER SET", "You will be reminded at the selected time.");
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set a Reminder</Text>
      <Button title="Set Reminder" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
