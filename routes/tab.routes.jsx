import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Profile from "../pages/profile";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const data = JSON.parse(user);
                setUser(data);
            } else setUser();
        } catch (error) {
            console.log({ error });
            setUser();
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            getUser()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => <Feather name="home" size={18} color="#fff" />,
                    tabBarLabel: "OceanDex",
                    tabBarLabelStyle: { fontSize: 16, color: "#fff" },
                    tabBarActiveBackgroundColor: "#333",
                    tabBarInactiveBackgroundColor: "#393D46",
                    tabBarLabelPosition: "below-icon",
                }}
            />
            <Screen
                name="Login"
                component={Login}
                options={{
                    tabBarIcon: () => <Feather name="log-in" size={18} color="#fff" />,
                    tabBarLabel: "Login",
                    tabBarLabelStyle: { fontSize: 16, color: "#fff" },
                    tabBarActiveBackgroundColor: "#333",
                    tabBarInactiveBackgroundColor: "#393D46",
                    tabBarLabelPosition: "below-icon",
                }}
            />
            <Screen
                name="Register"
                component={Register}
                options={{
                    tabBarIcon: () => <Feather name="user-plus" size={18} color="#fff" />,
                    tabBarLabel: "Register",
                    tabBarLabelStyle: { fontSize: 16, color: "#fff" },
                    tabBarActiveBackgroundColor: "#333",
                    tabBarInactiveBackgroundColor: "#393D46",
                    tabBarLabelPosition: "below-icon",
                }}
            />
            <Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: () => <Feather name="user" size={18} color="#fff" />,
                    tabBarLabel: "Perfil",
                    tabBarLabelStyle: { fontSize: 16, color: "#fff" },
                    tabBarActiveBackgroundColor: "#333",
                    tabBarInactiveBackgroundColor: "#393D46",
                    tabBarLabelPosition: "below-icon",
                }}
            />
        </Navigator>
    )
}