import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReminderScreen from "./reminderScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reminder App" component={ReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  