import { NavigationContainer, useRoute } from '@react-navigation/native';
import TabRoutes from './tab.routes';

export default function Routes() {
    return (
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
    )
}