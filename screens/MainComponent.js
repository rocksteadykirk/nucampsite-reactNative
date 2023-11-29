import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
};

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
        </Stack.Navigator>
    );
};

const AboutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='About'
                component={AboutScreen}
            />
        </Stack.Navigator>
    );
};

const ContactNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Contact'
                component={ContactScreen}
                options={{ title: 'Contact us' }}
            />
        </Stack.Navigator>
    );
};

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={{ title: 'Campsite Directory' }}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({ route }) => ({
                    title: route.params.campsite.name
                })}
            />
        </Stack.Navigator>
    );
};

const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{ title: 'Home' }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{ title: 'Directory' }}
                />
                <Drawer.Screen
                    name='About'
                    component={AboutNavigator}
                    options={{ title: 'About' }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={ContactNavigator}
                    options={{ title: 'Contact Us' }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;







/*

What is createStackNavigator()?
- createStackNavigator() is a function from React Navigation that creates a stack navigator for managing navigation in a React Native app.

What is Stack.Navigator, does it come with built-in functionality?
- Stack.Navigator is part of the stack navigator created by createStackNavigator(). It provides the structure for organizing screens but doesn't have built-in functionality.

What is Stack.Screen, does it come with built-in functionality?
- Stack.Screen represents a screen within the stack navigator. It doesn't come with built-in functionality but defines the content for a specific screen.

What is the options prop being passed to Stack.Screen?
- The options prop in Stack.Screen allows customization of the screen's appearance and behavior. It includes settings like title, headerShown, etc.

What is the purpose of DirectoryNavigator, ContactNavigator, AboutNavigator, and HomeNavigator?
- They are likely stack navigators for different app sections, organizing and managing navigation within each section.

Why does DirectoryNavigator require an initialRouteName='Directory' prop?
- It specifies that the initial screen displayed when navigating to this stack is associated with the route named 'Directory'.

Explain the options prop passed here options={({ route }) => ({ title: route.params.campsite.name })
- The options prop dynamically sets the screen title based on the campsite.name parameter passed through the navigation route, customizing the appearance based on route parameters.

*/