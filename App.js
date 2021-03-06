import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {Sampler} from "./components/sampler/Sampler";
import {NavigationContainer} from "@react-navigation/native";
import {Main} from "./components/Main";
import {Sound} from "./components/freesound/Sound";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import {Record} from "./components/library/Record";
import {LibrarySample} from "./components/library/LibrarySample";
import {Pad} from './components/sampler/Pad';

export default function App() {
  const Stack = createStackNavigator();
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        cardStyle: {
                            backgroundColor: '#fff'
                        }
                    }}>
                  <Stack.Screen
                      name="Main"
                      component={Main}
                      options={{
                        title: 'SoundBoard App',
                        headerStyle: {
                          backgroundColor: '#00AFB9',
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
                                backgroundColor: '#00AFB9',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Record"
                        component={Record}
                        options={{
                            title: 'Recording Sampler',
                            headerStyle: {
                                backgroundColor: '#00AFB9',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="LibrarySample"
                        component={LibrarySample}
                        options={{
                            title: 'Library Sound',
                            headerStyle: {
                                backgroundColor: '#00AFB9',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Pad"
                        component={Pad}
                        options={{
                            title: 'Pad Editing',
                            headerStyle: {
                                backgroundColor: '#00AFB9',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Stack.Navigator>
              </NavigationContainer>
          </PersistGate>
      </Provider>
  );
}
