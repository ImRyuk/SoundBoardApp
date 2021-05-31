import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {Sampler} from "./components/Sampler";
import {NavigationContainer} from "@react-navigation/native";
import {Main} from "./components/Main";
import {Sound} from "./components/download/Sound";

export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Main"
              component={Main}
              options={{
                title: 'SoundBoard App',
                headerStyle: {
                  backgroundColor: '#E7414D',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
          />
            <Stack.Screen
                name="Sound"
                component={Sound}
                options={{
                    title: 'Searched Sound',
                    headerStyle: {
                        backgroundColor: '#E7414D',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
