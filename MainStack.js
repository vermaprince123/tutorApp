import { createStackNavigator } from '@react-navigation/stack';
import DownloadedItem from './DownloadedItem';
import PdfItems from './PdfItems';

const Stack = createStackNavigator();

export default MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="pdfs"
                component={PdfItems}
            />
            <Stack.Screen
                name="download"
                component={DownloadedItem}
            />
        </Stack.Navigator>
    )
}